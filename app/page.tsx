import dynamic from 'next/dynamic'; // Import dynamic
import Hero from './components/Hero';
// import Features from './components/Features'; // Remove static imports for lazy-loaded components
// import HowItWorks from './components/HowItWorks';
// import Pricing from './components/Pricing';
// import Testimonials from './components/Testimonials'; // Keep commented out
// import FAQ from './components/FAQ';
// import CallToAction from './components/CallToAction';
// import UseCases from './components/UseCases';
// import FounderNote from './components/FounderNote';
import SkypeNotification from './components/SkypeNotification';
// import BackToTop from './components/BackToTop';
import Script from 'next/script';

// --- Dynamically import components that are likely below the fold ---
const HowItWorks = dynamic(() => import('./components/HowItWorks'), { ssr: false, loading: () => <p>Loading...</p> });
const Features = dynamic(() => import('./components/Features'), { ssr: false, loading: () => <p>Loading...</p> });
const UseCases = dynamic(() => import('./components/UseCases'), { ssr: false, loading: () => <p>Loading...</p> });
const Pricing = dynamic(() => import('./components/Pricing'), { ssr: false, loading: () => <p>Loading...</p> });
const FounderNote = dynamic(() => import('./components/FounderNote'), { ssr: false, loading: () => <p>Loading...</p> });
const FAQ = dynamic(() => import('./components/FAQ'), { ssr: false, loading: () => <p>Loading...</p> });
const CallToAction = dynamic(() => import('./components/CallToAction'), { ssr: false, loading: () => <p>Loading...</p> });
const BackToTop = dynamic(() => import('./components/BackToTop'), { ssr: false, loading: () => <p>Loading...</p> });
// const Testimonials = dynamic(() => import('./components/Testimonials')); // Keep Testimonials commented out

// --- Homepage Schema Markup ---
const websiteUrl = 'https://www.zippcall.com'; // Ensure this matches layout.tsx

// FAQPage Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does ZippCall work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ZippCall uses WebRTC technology to enable voice calls directly through your web browser. When you dial a number, our service connects your browser to the regular phone network, allowing you to make calls to any phone number worldwide without needing to install additional software.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to download anything to use ZippCall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No! That's one of the best parts about ZippCall. Everything works directly in your web browser. There's no need to download or install any software. Just create an account, add credits, and start making calls.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to use ZippCall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ZippCall offers pay-as-you-go pricing with no monthly fees or subscriptions. Rates vary by country, starting as low as $0.15 per minute. We provide transparent pricing for all countries, and you only pay for what you use.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I receive calls with ZippCall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Currently, ZippCall is designed for outbound calling only. You can make calls to any regular phone number worldwide, but you cannot receive incoming calls.',
      },
    },
    {
      '@type': 'Question',
      name: "Why can't I just use WhatsApp or Telegram for free?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Messaging services like WhatsApp and Telegram allow free calls between users on platform but it doesn't allow you to call landlines or mobile numbers.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a monthly subscription fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, ZippCall is entirely pay-as-you-go. There are no monthly fees, no contracts, and no minimum usage requirements. You only pay for the call time you actually use.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add credits to my account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can buy calling time through a secure payment processor in your account. We accept all major credit and debit cards as well as PayPal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What devices can I use with ZippCall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ZippCall works on any device with a modern web browser that supports WebRTC (including Chrome, Firefox, Safari, and Edge). This includes desktops, laptops, tablets, and smartphones.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ZippCall secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, security is our priority. All calls are encrypted using industry-standard protocols. Your personal information and payment details are protected with advanced security measures.',
      },
    },
  ],
};

// Service Schema
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'International Calling Service',
  serviceType: 'International Calling',
  description: 'Make affordable, high-quality international calls directly from your web browser with ZippCall. No downloads required, pay-as-you-go pricing.',
  provider: {
    '@type': 'Organization',
    name: 'ZippCall',
    url: websiteUrl, // Link back to the main organization
  },
  areaServed: {
    '@type': 'Country',
    name: 'Worldwide', // Assuming global coverage based on features
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Calling Rates',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pay-as-you-go International Calls',
        },
        priceSpecification: {
           '@type': 'UnitPriceSpecification',
           priceCurrency: 'USD', // Assuming USD, update if needed
           unitText: 'minute',
           // We can't specify exact price as it varies, but we note it starts low
           description: 'Rates vary by country, starting from $0.15 per minute.'
        }
      },
    ],
  },
  potentialAction: {
     '@type': 'Action',
     name: 'Make a Call (via Browser)',
     target: websiteUrl // Direct users to the main site/app
  }
};
// --- End Homepage Schema Markup ---

export default function Home() {
  return (
    <>
      {/* Inject Homepage Schemas */}
      <Script 
        id="homepage-faq-schema" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script 
        id="homepage-service-schema" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <SkypeNotification />
      <Hero />
      {/* Use the dynamically loaded components */}
      <HowItWorks />
      <Features />
      {/* <Testimonials /> */}
      <UseCases />
      <Pricing />
      <FounderNote />
      <FAQ />
      <CallToAction />
      <BackToTop />
    </>
  );
} 