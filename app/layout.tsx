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

// Use Caveat as our handwriting font
const caveat = Caveat({
  subsets: ["latin"],
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  title: "ZippCall - Affordable International Calls in Your Browser",
  description: "Make international calls directly from your browser with ZippCall. No downloads required, just affordable rates and crystal-clear quality.",
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