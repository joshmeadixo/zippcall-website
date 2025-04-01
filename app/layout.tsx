import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

// Use Inter as our main font
const inter = Inter({ 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZippCall - Affordable International Calls in Your Browser",
  description: "Make international calls directly from your browser with ZippCall. No downloads required, just affordable rates and crystal-clear quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
} 