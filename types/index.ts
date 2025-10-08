// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subscription';
  size?: 'sm' | 'md' | 'lg' | 'subscription';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outline';
}

// Menu Types
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  category: string;
  isNew?: boolean;
  image?: string;
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuTab {
  id: string;
  label: string;
  categories: MenuCategory[];
}

export interface MenuData {
  lastUpdated: string;
  tabs: MenuTab[];
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Contact Types
export interface ContactInfo {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
}

// Home Page Types
export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    cta: {
      text: string;
      link: string;
    };
  };
  features: {
    id: string;
    title: string;
    description: string;
    icon?: string;
  }[];
}

// Event Types
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image?: string;
  location?: string;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

// Subscription Types
export interface SubscriptionOption {
  bags: number;
  frequency: string;
  usageRate: string;
  price: number;
  shipping: number;
  shopifyVariantId?: string; // Shopify variant ID for checkout
}

export interface SubscriptionCardProps {
  title: string;
  image: string;
  imageAlt?: string;
  description: string;
  includes: string[];
  frequencyNote: string;
  options: SubscriptionOption[];
  onSignUp?: (option: SubscriptionOption) => void;
  disabled?: boolean;
}

// Shopify Types
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
}

export interface ShopifyVariant {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}
