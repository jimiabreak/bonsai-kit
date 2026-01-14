'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity.client';
import { menuQuery } from '@/lib/sanity.queries';
import menuDataFallback from '@/content/menu.json';

type MenuData = typeof menuDataFallback;

export function useSanityMenu() {
  const [menuData, setMenuData] = useState<MenuData>(menuDataFallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchMenu = async () => {
      try {
        const data = await client.fetch(menuQuery);
        if (data && data.tabs) {
          setMenuData(data as unknown as MenuData);
        }
      } catch (error) {
        console.warn('Failed to fetch menu from Sanity, using fallback:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();

    // Set up real-time subscription for updates
    const subscription = client.listen(menuQuery).subscribe((update) => {
      if (update.result) {
        setMenuData(update.result as unknown as MenuData);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { menuData, isLoading };
}
