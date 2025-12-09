const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const SHOPIFY_GRAPHQL_ENDPOINT = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>({
  query,
  variables = {},
  retries = 2,
}: {
  query: string;
  variables?: Record<string, unknown>;
  retries?: number;
}): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(SHOPIFY_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.statusText}`);
      }

      const json = await response.json();

      if (json.errors) {
        throw new Error(json.errors[0]?.message || 'Shopify GraphQL error');
      }

      return json.data as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      // Don't retry on certain errors
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      // If this isn't the last attempt, wait before retrying
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError || new Error('Failed to fetch from Shopify');
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  metafields: Array<{
    key: string;
    value: string;
  }>;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  metafields: Array<{
    key: string;
    value: string;
  }>;
  sellingPlanAllocations?: {
    edges: Array<{
      node: {
        sellingPlan: {
          id: string;
          name: string;
        };
      };
    }>;
  };
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export async function fetchSubscriptionProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query GetSubscriptionProducts {
      products(first: 10, query: "tag:subscription") {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                  sellingPlanAllocations(first: 1) {
                    edges {
                      node {
                        sellingPlan {
                          id
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ProductsResponse>({ query });
  return data.products.edges.map((edge) => edge.node);
}

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    };
    userErrors: Array<{
      message: string;
      field: string[];
    }>;
  };
}

export async function createCheckout(
  variantId: string,
  quantity: number = 1,
  sellingPlanId?: string
): Promise<string> {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
          field
        }
      }
    }
  `;

  interface CartLineItem {
    merchandiseId: string;
    quantity: number;
    sellingPlanId?: string;
  }

  const lineItem: CartLineItem = {
    merchandiseId: variantId,
    quantity,
  };

  // Add selling plan if provided (for subscriptions)
  if (sellingPlanId) {
    lineItem.sellingPlanId = sellingPlanId;
  }

  const variables = {
    input: {
      lines: [lineItem],
    },
  };

  const data = await shopifyFetch<CartCreateResponse>({ query, variables });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(
      data.cartCreate.userErrors[0].message ||
        'Checkout creation failed'
    );
  }

  return data.cartCreate.cart.checkoutUrl;
}

/**
 * Get the URL for the Shopify customer account portal
 * where customers can manage their subscriptions
 */
export function getCustomerPortalUrl(): string {
  if (!domain) {
    throw new Error('Shopify domain is not configured');
  }
  return `https://${domain}/account`;
}
