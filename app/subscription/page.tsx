'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import ThemedHeader from '@/components/layout/ThemedHeader';
import Footer from '@/components/layout/Footer';
import SubscriptionCard from '@/components/ui/SubscriptionCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { SubscriptionOption } from '@/types';
import { fetchSubscriptionProducts, createCheckout, ShopifyProduct, getCustomerPortalUrl } from '@/lib/shopify';

export default function SubscriptionPage() {
  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dripOptions, setDripOptions] = useState<SubscriptionOption[]>([]);
  const [espressoOptions, setEspressoOptions] = useState<SubscriptionOption[]>([]);
  const [processingVariantId, setProcessingVariantId] = useState<string | null>(null);
  const MAX_RETRIES = 2;

  const fadeInUp = !prefersReducedMotion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  useEffect(() => {
    let retryAttempt = 0;

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const products = await fetchSubscriptionProducts();

        // Map Shopify products to subscription options
        const drip = products
          .filter((p) => p.title.toLowerCase().includes('drip'))
          .flatMap(mapProductToOptions);

        const espresso = products
          .filter((p) => p.title.toLowerCase().includes('espresso'))
          .flatMap(mapProductToOptions);

        // Use Shopify data if we have at least 2 options for each, otherwise use fallback
        setDripOptions(drip.length >= 2 ? drip : getFallbackDripOptions());
        setEspressoOptions(espresso.length >= 2 ? espresso : getFallbackEspressoOptions());
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to load products:', err);
        }

        // Use fallback options if Shopify fetch fails
        setDripOptions(getFallbackDripOptions());
        setEspressoOptions(getFallbackEspressoOptions());

        // Only show error if we've exhausted retries
        if (retryAttempt < MAX_RETRIES) {
          retryAttempt++;
          // Retry after 1 second
          setTimeout(() => loadProducts(), 1000);
        } else {
          setError('Unable to load latest pricing. Showing standard subscription options.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const mapProductToOptions = (product: ShopifyProduct): SubscriptionOption[] => {
    return product.variants.edges
      .filter(({ node: variant }) => variant.availableForSale)
      .map(({ node: variant }) => {
        const price = parseFloat(variant.priceV2.amount);

        // Extract bag count from product title (e.g., "Drip Subscription - 4 Bags")
        const productTitle = product.title.toLowerCase();
        let bags = 2; // default

        if (productTitle.includes('4 bag')) {
          bags = 4;
        } else if (productTitle.includes('2 bag')) {
          bags = 2;
        }

        // Get selling plan ID if available
        const sellingPlanId = variant.sellingPlanAllocations?.edges?.[0]?.node?.sellingPlan?.id;

        return {
          bags,
          frequency: 'Every 2 weeks',
          usageRate: bags === 2 ? 'YOU GO THROUGH 1 BAG A WEEK' : 'YOU GO THROUGH 0.5 BAG A WEEK',
          price: Math.round(price),
          shipping: 7,
          shopifyVariantId: variant.id,
          sellingPlanId,
        };
      })
      .sort((a, b) => a.bags - b.bags); // Sort by bags count
  };

  const getFallbackDripOptions = (): SubscriptionOption[] => [
    {
      bags: 2,
      frequency: 'Every 2 weeks',
      usageRate: 'YOU GO THROUGH 1 BAG A WEEK',
      price: 39,
      shipping: 7
    },
    {
      bags: 4,
      frequency: 'Every 2 weeks',
      usageRate: 'YOU GO THROUGH 0.5 BAG A WEEK',
      price: 70,
      shipping: 7
    }
  ];

  const getFallbackEspressoOptions = (): SubscriptionOption[] => [
    {
      bags: 2,
      frequency: 'Every 2 weeks',
      usageRate: 'YOU GO THROUGH 1 BAG A WEEK',
      price: 42,
      shipping: 7
    },
    {
      bags: 4,
      frequency: 'Every 2 weeks',
      usageRate: 'YOU GO THROUGH 0.5 BAG A WEEK',
      price: 75,
      shipping: 7
    }
  ];

  const handleSignUp = async (option: SubscriptionOption) => {
    // Prevent multiple rapid clicks
    if (processingVariantId) {
      return;
    }

    if (!option.shopifyVariantId) {
      if (process.env.NODE_ENV === 'development') {
        console.error('No Shopify variant ID found');
      }
      alert('This subscription is currently unavailable. Please try another option or contact us for assistance.');
      return;
    }

    try {
      setProcessingVariantId(option.shopifyVariantId);

      // Add timeout to prevent hanging requests
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 15000)
      );

      const checkoutPromise = createCheckout(
        option.shopifyVariantId,
        1,
        option.sellingPlanId
      );
      const checkoutUrl = await Promise.race([checkoutPromise, timeoutPromise]);

      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Checkout creation failed:', err);
      }

      // User-friendly error messages based on error type
      const errorMessage = err instanceof Error && err.message.includes('timeout')
        ? 'The request is taking longer than expected. Please check your internet connection and try again.'
        : 'We\'re unable to process your subscription right now. Please try again in a few moments or contact us for help.';

      alert(errorMessage);
    } finally {
      setProcessingVariantId(null);
    }
  };

  return (
    <div className="bg-cream min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <ThemedHeader theme="light" />

      {/* Hero Section */}
      <motion.div
        className="relative max-w-[1512px] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16"
        {...fadeInUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* C Logo */}
        <div className="flex justify-center mb-6 md:mb-8">
          <Image
            src="/images/c-logo.svg"
            alt="Commonwealth"
            width={33}
            height={42}
            className="w-[28px] h-[36px] md:w-[33px] md:h-[42px]"
          />
        </div>

        {/* Hero Text */}
        <h1 className="text-center text-brand-blue text-[2rem] sm:text-[2.5rem] md:text-[3.75rem] lg:text-[60px] tracking-[-0.06em] leading-tight max-w-[692px] mx-auto mb-12 md:mb-16">
          A curated coffee subscription by Commonwealth.
        </h1>
      </motion.div>

      {/* Blue Banner Section */}
      <motion.div
        className="bg-brand-blue h-[250px] md:h-[21.875rem] mb-12 md:mb-20"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.2 : 0, ease: "easeOut" }}
      >
      </motion.div>

      {/* JOIN THE ©LUB - Below blue banner */}
      <motion.div
        className="max-w-[1512px] mx-auto px-4 md:px-8 mb-12 md:mb-16"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.25 : 0, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-32 items-start">
          <div>
            <h2 className="text-brand-blue text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[-0.02em] mb-4 md:mb-8">
              JOIN THE ©LUB
            </h2>
            <p className="text-brand-blue text-[18px] sm:text-[22px] md:text-[28px] lg:text-[33px] leading-[1.4] md:leading-[44px] tracking-[-0.04em]">
              Select an amount and frequency below. Checkout and enjoy free shipping. Get our freshest coffee, straight to your door.
            </p>
          </div>

          <div className="flex items-start justify-start md:justify-end md:pt-[calc(40px+2rem)]">
            <div className="space-y-1 text-brand-blue text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-[2] md:leading-[56px] tracking-[-0.04em] uppercase">
              <p>— FRESHLY ROASTED</p>
              <p>— Flexible frequencies</p>
              <p>— FOR ESPRESSO & FILTER</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Manage Subscription Section */}
      <motion.div
        className="max-w-[1512px] mx-auto px-4 md:px-8 mb-12 md:mb-16"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.3 : 0, ease: "easeOut" }}
      >
        <div className="bg-cream border-2 border-brand-blue rounded-xl p-8 md:p-12 text-center max-w-[700px] mx-auto">
          <p className="text-brand-blue text-[20px] sm:text-[24px] md:text-[28px] mb-6 md:mb-8 font-normal">
            Already a subscriber?
          </p>
          <a
            href={getCustomerPortalUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-[61px] px-8 bg-cream border-2 border-brand-blue text-brand-blue text-[1.563rem] font-bold tracking-[-0.02em] hover:bg-brand-blue hover:text-cream focus-visible:ring-brand-blue transition-all duration-300 rounded-xl touch-target"
          >
            Manage Your Subscription
          </a>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="max-w-[1512px] mx-auto px-4 md:px-8">
        <div className="h-[2px] bg-brand-blue mb-8 md:mb-12" />
      </div>

      {/* Subscription Intro */}
      <motion.div
        className="max-w-[1512px] mx-auto px-4 md:px-8 mb-12 md:mb-16"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.3 : 0, ease: "easeOut" }}
      >
        <p className="text-center text-brand-blue text-[2rem] sm:text-[2.5rem] md:text-[3.75rem] lg:text-[60px] tracking-[-0.06em] leading-tight max-w-[692px] mx-auto">
          Start a subscription with any of the options below:
        </p>
      </motion.div>

      {/* Error Banner */}
      {error && (
        <motion.div
          className="max-w-[1512px] mx-auto px-4 md:px-8 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-brand-blue/10 border-2 border-brand-blue rounded-lg p-6 text-center">
            <p className="text-brand-blue text-[1.25rem]">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <motion.div
          className="max-w-[1512px] mx-auto px-4 md:px-8 mb-24 md:mb-32"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.4 : 0, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/50 rounded-lg p-8 animate-pulse">
                <div className="h-[300px] bg-brand-blue/10 rounded mb-6" />
                <div className="h-8 bg-brand-blue/10 rounded mb-4 w-3/4" />
                <div className="h-6 bg-brand-blue/10 rounded mb-2" />
                <div className="h-6 bg-brand-blue/10 rounded mb-2 w-5/6" />
                <div className="h-6 bg-brand-blue/10 rounded w-4/6" />
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Subscription Cards */
        <motion.div
          className="max-w-[1512px] mx-auto px-4 md:px-8 mb-24 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-8"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.4 : 0, ease: "easeOut" }}
        >
          <SubscriptionCard
            title="DRIP COLLECTION"
            image="/images/common-sub.jpg"
            description='Enjoy fresh coffee with our "DRIP COFFEE" subscription! Get a bag of rich espresso or unique single origin coffee delivered to your door every two weeks.'
            includes={[
              '1 BAG OF ESPRESSO SINGLE ORIGIN',
              '1 BAG OF ESPRESSO OG HOUSE BREW'
            ]}
            frequencyNote="CHOOSE YOUR FREQUENCY BELOW:"
            options={dripOptions}
            onSignUp={handleSignUp}
            processingVariantId={processingVariantId}
          />

          <SubscriptionCard
            title="ESPRESSO COLLECTION"
            image="/images/espresso-sub.jpg"
            description='Enjoy fresh coffee with our "ESPRESSO" subscription! Get a bag of rich espresso or unique single origin coffee delivered to your door every two weeks.'
            includes={[
              '1 BAG OF NEWLY ROASTED (IN CAFE) SINGLE ORIGIN',
              '1 BAG OF COMMON COFFEE OG HOUSE BREW'
            ]}
            frequencyNote="CHOOSE YOUR FREQUENCY BELOW:"
            options={espressoOptions}
            onSignUp={handleSignUp}
            processingVariantId={processingVariantId}
          />
        </motion.div>
      )}

      {/* Fresh Coffee Section */}
      <div className="max-w-[1512px] mx-auto px-4 md:px-8 mb-24 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.5 : 0, ease: "easeOut" }}
        >
          <h2 className="text-brand-blue text-[2rem] sm:text-[2.5rem] md:text-[3.75rem] lg:text-[60px] tracking-[-0.06em] leading-tight mb-8 md:mb-12">
            Fresh coffee beans, expertly roasted, at home.
          </h2>

          <h3 className="text-brand-blue text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[-0.02em] mb-4 md:mb-6">
            OUR ETHOS
          </h3>

          <div className="text-brand-blue text-[18px] sm:text-[22px] md:text-[28px] lg:text-[33px] leading-[1.4] md:leading-[44px] tracking-[-0.04em] space-y-4 md:space-y-6">
            <p>
              Commonwealth Coffee Roasters has been a cornerstone of quality in Birmingham, Michigan, delivering exceptional specialty coffee since 2010 at Commonwealth Cafe.
            </p>
            <p>
              We bring ethically sourced, expertly roasted beans right to your door. Our passion lies in showcasing the world&apos;s finest coffees, sourced from the world&apos;s top tier origins and producers, roasted with precision to unlock their fullest potential—so that you savor every sip.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative h-[400px] md:h-[600px] lg:h-[836px] overflow-hidden rounded-sm"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.6 : 0, ease: "easeOut" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/videos/FullSizeRender_VSCO-poster-00001.jpg"
          >
            <source src="/videos/FullSizeRender_VSCO-transcode.webm" type="video/webm" />
            <source src="/videos/FullSizeRender_VSCO-transcode.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-[1512px] mx-auto px-4 md:px-8">
        <div className="h-[2px] bg-brand-blue mb-12 md:mb-16" />
      </div>

      {/* Coffee Image Banner */}
      <motion.div
        className="relative w-full h-[250px] md:h-[363px] mb-12 md:mb-16 overflow-hidden"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.7 : 0, ease: "easeOut" }}
      >
        <Image
          src="/images/capp.png"
          alt="Fresh coffee"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="max-w-[1512px] mx-auto px-4 md:px-8 mb-24 md:mb-32"
        {...fadeInUp}
        transition={{ duration: 0.6, delay: !prefersReducedMotion ? 0.8 : 0, ease: "easeOut" }}
      >
        <h2 className="text-brand-blue text-[2rem] sm:text-[2.5rem] md:text-[3.75rem] lg:text-[60px] tracking-[-0.06em] mb-8 md:mb-12">
          FAQ
        </h2>

        <FAQAccordion
          theme="light"
          items={[
            {
              question: "Can I change up my subscription?",
              answer: "Yes! You can manage your subscription anytime through your Shopify customer account. Login to update payment methods, change delivery frequency, pause, or cancel your subscription. Click 'Manage Your Subscription' above or visit your customer portal."
            },
            {
              question: "Will I be charged for shipping?",
              answer: "Shipping is already included in the flat rate price."
            },
            {
              question: "Will I get the freshest coffee?",
              answer: "Subscribers always get our most fresh coffee! We roast and ship daily from our facilities in Detroit."
            },
            {
              question: "When can I expect my order?",
              answer: "We ship daily from our Detroit facility. You will be emailed a tracking number as soon as your order ships to follow the progress of your order."
            }
          ]}
        />
      </motion.div>

      {/* Footer */}
      <Footer theme="light" />
    </div>
  );
}
