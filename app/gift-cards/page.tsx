'use client';

import Image from 'next/image';
import Script from 'next/script';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';

declare global {
  interface Window {
    JotForm?: {
      init: () => void;
    };
  }
}

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <ThemedHeader theme="light" />

      <main className="pt-32 pb-20">
        <div className="max-w-[1512px] mx-auto px-4">
          {/* Stacked Layout: GIF, Title, Text, Form */}

          {/* Gift Card GIF */}
          <div className="flex justify-center mb-12">
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
          <div className="text-brand-blue text-center mb-12 max-w-[900px] mx-auto">
            <p className="text-[24px] leading-[1.5] tracking-[-0.01em]">
              Send a physical Commonwealth gift card directly to your special someone. Fill out your gift card recipient&apos;s shipping address below and we will make sure it gets to them. *Spend $100, and upgrade to an exclusive Commonwealth gift card box.
            </p>
          </div>

          {/* Jotform Embed */}
          <div className="w-full mb-20">
            <iframe
              id="JotFormIFrame-231805714126148"
              title="Gift Card Order Form"
              allowTransparency={true}
              allow="geolocation; microphone; camera; fullscreen"
              src="https://form.jotform.com/231805714126148"
              frameBorder="0"
              className="w-full border-0"
              style={{
                minHeight: '1800px',
              }}
            />
            <Script
              src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
              strategy="afterInteractive"
            />
            <Script id="jotform-resize" strategy="afterInteractive">
              {`
                window.handleIFrameMessage = function(e) {
                  if (typeof e.data === 'object') { return; }
                  var args = e.data.split(":");
                  if (args.length > 2) {
                    var iframe = document.getElementById("JotFormIFrame-" + args[(args.length - 1)]);
                    if (iframe) {
                      iframe.style.height = args[0] + "px";
                    }
                  }
                };
                if (window.addEventListener) {
                  window.addEventListener("message", handleIFrameMessage, false);
                } else if (window.attachEvent) {
                  window.attachEvent("onmessage", handleIFrameMessage);
                }
              `}
            </Script>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
