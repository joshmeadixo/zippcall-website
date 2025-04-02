import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Caveat } from 'next/font/google';
import "./globals.css";
import Script from "next/script";
import Header from './components/Header';
import Footer from './components/Footer';
import { LegalModalsProvider } from './components/ModalLegalPage';
import { ContactFormProvider } from './components/ContactFormContext';

// Use Inter as our main font
const inter = Inter({ 
  subsets: ["latin"],
});

// Define the base URL before it's used in metadata
const websiteUrl = 'https://www.zippcall.com'; // <-- Replace with your actual production URL

// Use Caveat as our handwriting font
const caveat = Caveat({
  subsets: ["latin"],
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  metadataBase: new URL(websiteUrl),
  title: "ZippCall - Affordable International Calls in Your Browser",
  description: "Make international calls directly from your browser with ZippCall. No downloads required, just affordable rates and crystal-clear quality.",
  openGraph: {
    title: "ZippCall - Affordable International Calls in Your Browser",
    description: "Make international calls directly from your browser with ZippCall. No downloads required, just affordable rates and crystal-clear quality.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZippCall - Browser-based international calling',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZippCall - Affordable International Calls in Your Browser",
    description: "Make international calls directly from your browser with ZippCall. No downloads required, just affordable rates and crystal-clear quality.",
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png' },
    ],
    other: [
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/icons/site.webmanifest',
};

// --- Schema Markup Definition ---
// Assuming the main website URL - replace if necessary
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZippCall',
  url: websiteUrl,
  logo: `${websiteUrl}/icons/android-chrome-512x512.png`, // Using an existing icon
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ZippCall',
  url: websiteUrl,
  // Optional: Add potentialAction for Sitelinks Search Box if you have site search
  // potentialAction: {
  //   '@type': 'SearchAction',
  //   target: `${websiteUrl}/search?q={search_term_string}`,
  //   'query-input': 'required name=search_term_string',
  // },
};
// --- End Schema Markup Definition ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        {/* Add JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Plausible Analytics Script */}
        <Script 
          defer 
          data-domain="zippcall.com" 
          src="https://plausible.io/js/script.hash.outbound-links.js"
          strategy="afterInteractive" // Loads after the page is interactive
        />
      </head>
      <body className={`${inter.className} ${caveat.variable} font-sans`} suppressHydrationWarning>
        <ContactFormProvider>
          <LegalModalsProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </LegalModalsProvider>
        </ContactFormProvider>
        <Script id="handle-back-navigation" strategy="afterInteractive">
          {`
            window.addEventListener('pageshow', function(event) {
              if (event.persisted) {
                // Page was restored from bfcache
                window.location.reload();
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
} 