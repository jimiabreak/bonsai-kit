'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity.client';
import { MENU_QUERY_LEGACY } from '@/lib/sanity.queries';

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  dietaryTags?: string[];
}

export interface Category {
  name: string;
  id: string;
  items: MenuItem[];
}

export interface MenuData {
  lastUpdated?: string;
  tabs: {
    food: {
      categories: Category[];
    };
    drinks: {
      categories: Category[];
    };
    features: {
      name: string;
      items: MenuItem[];
    };
  };
  dietaryKey?: Record<string, string>;
}

// Fallback data in case Sanity is unavailable
const fallbackMenuData: MenuData = {
  tabs: {
    food: { categories: [] },
    drinks: { categories: [] },
    features: { name: 'Features', items: [] },
  },
};

export function useSanityMenu() {
  const [menuData, setMenuData] = useState<MenuData>(fallbackMenuData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchMenu = async () => {
      try {
        const data = await client.fetch(MENU_QUERY_LEGACY);
        if (data && data.tabs) {
          setMenuData(data as MenuData);
        }
      } catch (error) {
        console.warn('Failed to fetch menu from Sanity, using fallback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();

    // Set up real-time subscription for updates
    const subscription = client.listen(MENU_QUERY_LEGACY).subscribe((update) => {
      const result = update.result as Record<string, unknown> | undefined;
      if (result && result.tabs) {
        setMenuData(result as unknown as MenuData);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { menuData, isLoading };
}
