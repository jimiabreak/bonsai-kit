/**
 * Shopify Testing Utilities
 * 
 * Functions for testing and verifying Shopify integration
 * Use these to validate your setup before deploying to production
 */

// Lazy load env vars to support dotenv in test scripts
const getDomain = () => process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const getToken = () => process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const getEndpoint = () => `https://${getDomain()}/api/2024-01/graphql.json`;

interface TestResult {
  success: boolean;
  message: string;
  details?: Record<string, unknown>;
  error?: string;
}

/**
 * Verify that Shopify API credentials are valid
 */
export async function verifyCredentials(): Promise<TestResult> {
  try {
    const domain = getDomain();
    const token = getToken();

    if (!domain || !token) {
      return {
        success: false,
        message: 'Missing credentials',
        error: 'NEXT_PUBLIC_SHOPIFY_DOMAIN or NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN not set',
      };
    }

    const query = `
      query {
        shop {
          name
          primaryDomain {
            url
          }
        }
      }
    `;

    const response = await fetch(getEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: 'Invalid credentials',
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const json = await response.json();

    if (json.errors) {
      return {
        success: false,
        message: 'Authentication failed',
        error: json.errors[0]?.message || 'Unknown error',
      };
    }

    return {
      success: true,
      message: 'Credentials are valid',
      details: {
        shopName: json.data.shop.name,
        shopUrl: json.data.shop.primaryDomain.url,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if subscription products exist and are accessible
 */
export async function checkProductsExist(): Promise<TestResult> {
  try {
    const query = `
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              variants(first: 5) {
                edges {
                  node {
                    id
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(getEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': getToken() || '',
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      return {
        success: false,
        message: 'Failed to fetch products',
        error: json.errors[0]?.message,
      };
    }

    const products = json.data.products.edges;
    const availableProducts = products.filter(
      (p: { node: { availableForSale: boolean } }) => p.node.availableForSale
    );

    return {
      success: products.length > 0,
      message: `Found ${products.length} products, ${availableProducts.length} available for sale`,
      details: {
        totalProducts: products.length,
        availableProducts: availableProducts.length,
        products: products.map((p: { node: { id: string; title: string; availableForSale: boolean; variants: { edges: unknown[] } } }) => ({
          id: p.node.id,
          title: p.node.title,
          available: p.node.availableForSale,
          variantCount: p.node.variants.edges.length,
        })),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to check products',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Test checkout creation without redirecting
 * @param variantId - The variant ID to test with
 */
export async function testCheckoutCreation(
  variantId: string
): Promise<TestResult> {
  try {
    if (!isValidVariantId(variantId)) {
      return {
        success: false,
        message: 'Invalid variant ID format',
        error: 'Variant ID must start with gid://shopify/ProductVariant/',
      };
    }

    const query = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            lines(first: 5) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            message
            field
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity: 1,
          },
        ],
      },
    };

    const response = await fetch(getEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': getToken() || '',
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();

    if (json.errors) {
      return {
        success: false,
        message: 'GraphQL error',
        error: json.errors[0]?.message,
      };
    }

    const { cart, userErrors } = json.data.cartCreate;

    if (userErrors && userErrors.length > 0) {
      return {
        success: false,
        message: 'Cart creation failed',
        error: userErrors[0].message,
        details: { userErrors },
      };
    }

    return {
      success: true,
      message: 'Checkout created successfully (test mode - no redirect)',
      details: {
        cartId: cart.id,
        checkoutUrl: cart.checkoutUrl,
        lineItems: cart.lines.edges.map((edge: {
          node: {
            quantity: number;
            merchandise: {
              id: string;
              title: string;
              priceV2: {
                amount: string;
                currencyCode: string
              }
            }
          }
        }) => ({
          quantity: edge.node.quantity,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.title,
          price: edge.node.merchandise.priceV2.amount,
          currency: edge.node.merchandise.priceV2.currencyCode,
        })),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Validate that a variant ID has the correct format
 */
export function isValidVariantId(variantId: string): boolean {
  return variantId.startsWith('gid://shopify/ProductVariant/');
}

/**
 * Run all tests and return comprehensive results
 */
export async function runAllTests(): Promise<{
  credentialsTest: TestResult;
  productsTest: TestResult;
  overall: { success: boolean; message: string };
}> {
  const credentialsTest = await verifyCredentials();
  const productsTest = await checkProductsExist();

  const allPassed = credentialsTest.success && productsTest.success;

  return {
    credentialsTest,
    productsTest,
    overall: {
      success: allPassed,
      message: allPassed
        ? 'All tests passed! Shopify integration is ready.'
        : 'Some tests failed. Check details above.',
    },
  };
}

/**
 * Get API health status
 */
export async function getHealthStatus(): Promise<{
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  checks: {
    credentials: boolean;
    products: boolean;
  };
}> {
  const credentialsResult = await verifyCredentials();
  const productsResult = await checkProductsExist();

  const credentialsHealthy = credentialsResult.success;
  const productsHealthy = productsResult.success;

  let status: 'healthy' | 'degraded' | 'down';
  if (credentialsHealthy && productsHealthy) {
    status = 'healthy';
  } else if (credentialsHealthy) {
    status = 'degraded';
  } else {
    status = 'down';
  }

  return {
    status,
    timestamp: new Date().toISOString(),
    checks: {
      credentials: credentialsHealthy,
      products: productsHealthy,
    },
  };
}
