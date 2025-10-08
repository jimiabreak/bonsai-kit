'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';
import menuData from '@/content/menu.json';

type TabType = 'food' | 'drinks' | 'features';

interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

interface Category {
  name: string;
  id: string;
  items: MenuItem[];
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<TabType>('food');
  const prefersReducedMotion = useReducedMotion();

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
      const offset = 120; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-brand-blue min-h-screen">
      {/* Header */}
      <ThemedHeader theme="dark" />

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-20">
        {/* Menu Title */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-cream text-[120px] md:text-[180px] lg:text-[240px] font-sans font-normal leading-none tracking-tight">
            MENU
          </h1>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex gap-8 mb-12"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.2 : 0, ease: "easeOut" }}
        >
          <button
            onClick={() => setActiveTab('food')}
            className={`text-[50px] font-normal tracking-[-3px] leading-normal transition-all duration-300 ${
              activeTab === 'food' ? 'text-cream underline' : 'text-cream/50 hover:text-cream/70'
            }`}
          >
            Food
          </button>
          <button
            onClick={() => setActiveTab('drinks')}
            className={`text-[50px] font-normal tracking-[-3px] leading-normal transition-all duration-300 ${
              activeTab === 'drinks' ? 'text-cream underline' : 'text-cream/50 hover:text-cream/70'
            }`}
          >
            Drinks
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`text-[50px] font-normal tracking-[-3px] leading-normal transition-all duration-300 ${
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
              <div className="flex flex-wrap gap-8 mb-16">
                {Object.values(menuData.tabs.food.categories).map((category: Category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className="text-cream text-[30px] font-normal tracking-[-0.9px] leading-normal whitespace-nowrap hover:opacity-70 transition-opacity duration-300"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Food Categories */}
              {Object.values(menuData.tabs.food.categories).map((category: Category, index: number) => (
                <div key={category.id} id={category.id} className="mb-16">
                  <h2 className="text-cream text-[50px] font-normal tracking-[-3px] leading-normal mb-8">
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
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-cream text-[1.5rem] md:text-[2rem] font-normal">
                            {item.name}
                          </h3>
                          <span className="text-cream text-[1.5rem] md:text-[2rem] font-normal ml-4 flex-shrink-0">
                            ${item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-cream/80 text-[1rem] md:text-[1.25rem] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {index !== Object.values(menuData.tabs.food.categories).length - 1 && (
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
              <div className="flex flex-wrap gap-8 mb-16">
                {Object.values(menuData.tabs.drinks.categories).map((category: Category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className="text-cream text-[30px] font-normal tracking-[-0.9px] leading-normal whitespace-nowrap hover:opacity-70 transition-opacity duration-300"
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Drink Categories */}
              {Object.values(menuData.tabs.drinks.categories).map((category: Category, index: number) => (
                <div key={category.id} id={category.id} className="mb-16">
                  <h2 className="text-cream text-[50px] font-normal tracking-[-3px] leading-normal mb-8">
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
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-cream text-[1.5rem] md:text-[2rem] font-normal">
                            {item.name}
                          </h3>
                          <span className="text-cream text-[1.5rem] md:text-[2rem] font-normal ml-4 flex-shrink-0">
                            ${item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-cream/80 text-[1rem] md:text-[1.25rem] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {index !== Object.values(menuData.tabs.drinks.categories).length - 1 && (
                    <div className="h-[2px] bg-cream/50 mt-16" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div>
              <h2 className="text-cream text-[50px] font-normal tracking-[-3px] leading-normal mb-8">
                {menuData.tabs.features.name}
              </h2>
              <div className="space-y-6">
                {menuData.tabs.features.items.map((item: MenuItem, index: number) => (
                  <div
                    key={index}
                    className={`${
                      index !== menuData.tabs.features.items.length - 1 ? 'border-b border-cream/30 pb-6' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-cream text-[1.5rem] md:text-[2rem] font-normal">
                        {item.name}
                      </h3>
                      <span className="text-cream text-[1.5rem] md:text-[2rem] font-normal ml-4 flex-shrink-0">
                        ${item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-cream/80 text-[1rem] md:text-[1.25rem] leading-relaxed">
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
              {Object.entries(menuData.dietaryKey).map(([key, value]) => (
                <div key={key} className="text-cream text-[1rem]">
                  <strong>{key}</strong> {value}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
