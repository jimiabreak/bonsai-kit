'use client';

import Image from 'next/image';
import Script from 'next/script';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <ThemedHeader theme="light" />

      <main className="pt-32 pb-20">
        <div className="max-w-[1512px] mx-auto px-4">
          {/* Hero Section with GIF and Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Gift Card GIF */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[500px]">
                <Image
                  src="/images/Commonwealth-GIftcard-GIF.gif"
                  alt="Commonwealth Gift Card"
                  width={500}
                  height={314}
                  unoptimized={true}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-brand-blue">
              <h1 className="font-serif text-[64px] leading-[1.1] tracking-[-0.02em] mb-8">
                Gift Cards
              </h1>
              <p className="text-[24px] leading-[1.5] tracking-[-0.01em]">
                Send a physical Commonwealth gift card directly to your special someone. Fill out your gift card recipient&apos;s shipping address below and we will make sure it gets to them. *Spend $100, and upgrade to an exclusive Commonwealth gift card box.
              </p>
            </div>
          </div>

          {/* Jotform Embed */}
          <div className="w-full">
            <div id="jotform-container" className="bg-white rounded-sm p-4 md:p-8">
              <Script
                src="https://form.jotform.com/jsform/231805714126148"
                strategy="afterInteractive"
                onLoad={() => {
                  console.log('Jotform loaded successfully');
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
