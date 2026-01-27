'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';
import { useSanityMenu, type MenuItem, type Category } from '@/hooks/useSanityMenu';
import { formatItemName, getDietaryKeyEntries } from '@/lib/menu-utils';

type TabType = 'food' | 'drinks' | 'features';

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<TabType>('food');
  const prefersReducedMotion = useReducedMotion();

  // Fetch menu data from Sanity with real-time updates
  const { menuData } = useSanityMenu();

  // Load active tab from sessionStorage on mount
  useEffect(() => {
    const savedTab = sessionStorage.getItem('menuActiveTab') as TabType;
    if (savedTab && ['food', 'drinks', 'features'].includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save active tab to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('menuActiveTab', activeTab);
  }, [activeTab]);

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        const scrolledY = window.scrollY;
        window.scrollTo({
          top: scrolledY - 180,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Get categories as arrays (new schema returns arrays directly)
  const foodCategories = menuData.tabs.food?.categories || [];
  const drinkCategories = menuData.tabs.drinks?.categories || [];
  const dietaryKeyEntries = getDietaryKeyEntries();

  return (
    <div style={{ "--background": "#152885" } as React.CSSProperties} className="min-h-[100dvh] w-full overflow-x-hidden bg-[var(--background)]">
      {/* Header */}
      <ThemedHeader theme="dark" />

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-20 w-full">
        {/* Menu Title */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-24"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-cream text-[80px] sm:text-[120px] md:text-[180px] lg:text-[240px] font-sans font-normal leading-none tracking-tight">
            MENU
          </h1>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex gap-4 sm:gap-6 md:gap-8 mb-12 overflow-x-auto"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.2 : 0, ease: "easeOut" }}
        >
          <button
            onClick={() => setActiveTab('food')}
            className={`text-[30px] sm:text-[40px] md:text-[50px] font-normal tracking-[-0.5px] md:tracking-[-3px] leading-normal transition-all duration-300 whitespace-nowrap ${
              activeTab === 'food' ? 'text-cream underline' : 'text-cream/50 hover:text-cream/70'
            }`}
          >
            Food
          </button>
          <button
            onClick={() => setActiveTab('drinks')}
            className={`text-[30px] sm:text-[40px] md:text-[50px] font-normal tracking-[-0.5px] md:tracking-[-3px] leading-normal transition-all duration-300 whitespace-nowrap ${
              activeTab === 'drinks' ? 'text-cream underline' : 'text-cream/50 hover:text-cream/70'
            }`}
          >
            Drinks
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`text-[30px] sm:text-[40px] md:text-[50px] font-normal tracking-[-0.5px] md:tracking-[-3px] leading-normal transition-all duration-300 whitespace-nowrap ${
              activeTab === 'features' ? 'text-cream underline' : 'text-cream/50 hover:text-cream/70'
            }`}
          >
            Features
          </button>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={!prefersReducedMotion ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Food Tab */}
          {activeTab === 'food' && (
            <div>
              {/* Category Navigation */}
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-16">
                {foodCategories.map((category: Category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal tracking-normal md:tracking-[-0.9px] leading-normal whitespace-nowrap hover:opacity-70 transition-opacity duration-300"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Food Categories */}
              {foodCategories.map((category: Category, index: number) => (
                <div key={category.id} id={category.id} className="mb-12 md:mb-16">
                  <h2 className="text-cream text-[30px] sm:text-[40px] md:text-[50px] font-normal tracking-[-0.5px] md:tracking-[-3px] leading-normal mb-6 md:mb-8">
                    {category.name}
                  </h2>
                  <div className="space-y-6">
                    {category.items.map((item: MenuItem, itemIndex: number) => (
                      <div
                        key={itemIndex}
                        className={`${
                          itemIndex !== category.items.length - 1 ? 'border-b border-cream/30 pb-6' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal flex-1">
                            {formatItemName(item.name, item.dietaryTags)}
                          </h3>
                          <span className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal flex-shrink-0">
                            ${item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-cream/80 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {index !== foodCategories.length - 1 && (
                    <div className="h-[2px] bg-cream/50 mt-16" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Drinks Tab */}
          {activeTab === 'drinks' && (
            <div>
              {/* Category Navigation */}
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-16">
                {drinkCategories.map((category: Category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal tracking-normal md:tracking-[-0.9px] leading-normal whitespace-nowrap hover:opacity-70 transition-opacity duration-300"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Drink Categories */}
              {drinkCategories.map((category: Category, index: number) => (
                <div key={category.id} id={category.id} className="mb-12 md:mb-16">
                  <h2 className="text-cream text-[30px] sm:text-[40px] md:text-[50px] font-normal tracking-[-0.5px] md:tracking-[-3px] leading-normal mb-6 md:mb-8">
                    {category.name}
                  </h2>
                  <div className="space-y-6">
                    {category.items.map((item: MenuItem, itemIndex: number) => (
                      <div
                        key={itemIndex}
                        className={`${
                          itemIndex !== category.items.length - 1 ? 'border-b border-cream/30 pb-6' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal flex-1">
                            {formatItemName(item.name, item.dietaryTags)}
                          </h3>
                          <span className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal flex-shrink-0">
                            ${item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-cream/80 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {index !== drinkCategories.length - 1 && (
                    <div className="h-[2px] bg-cream/50 mt-16" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div>
              <h2 className="text-cream text-[30px] sm:text-[40px] md:text-[50px] font-normal tracking-[-0.5px] md:tracking-[-3px] leading-normal mb-6 md:mb-8">
                {menuData.tabs.features?.name || 'Features'}
              </h2>
              <div className="space-y-6">
                {(menuData.tabs.features?.items || []).map((item: MenuItem, index: number) => (
                  <div
                    key={index}
                    className={`${
                      index !== (menuData.tabs.features?.items?.length || 0) - 1 ? 'border-b border-cream/30 pb-6' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal flex-1">
                        {formatItemName(item.name, item.dietaryTags)}
                      </h3>
                      <span className="text-cream text-[18px] sm:text-[24px] md:text-[30px] font-normal flex-shrink-0">
                        ${item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-cream/80 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Key */}
          <div className="mt-16 pt-8 border-t border-cream/50">
            <div className="flex flex-wrap gap-6 justify-center">
              {dietaryKeyEntries.map(({ abbreviation, fullName }) => (
                <div key={abbreviation} className="text-cream text-[1rem]">
                  <strong>{abbreviation}</strong> {fullName}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer theme="dark" />
    </div>
  );
}
