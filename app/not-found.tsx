"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="w-24 h-24 mb-8 relative">
        <Image 
          src="/images/zippcall-logo.png" 
          alt="ZippCall Logo" 
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-zippcall-blue mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-zippcall-blue mb-6">Page Not Found</h2>
      
      <p className="text-lg text-zippcall-neutral max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        href="/" 
        className="btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80 transition-colors px-8 py-3 rounded-full text-lg"
      >
        Back to Home
      </Link>
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
        <Link href="/#features" className="text-zippcall-blue font-medium hover:text-zippcall-yellow transition-colors">
          Features
        </Link>
        <Link href="/#pricing" className="text-zippcall-blue font-medium hover:text-zippcall-yellow transition-colors">
          Pricing
        </Link>
        <Link href="/#how-it-works" className="text-zippcall-blue font-medium hover:text-zippcall-yellow transition-colors">
          How It Works
        </Link>
        <Link href="/#faq" className="text-zippcall-blue font-medium hover:text-zippcall-yellow transition-colors">
          FAQ
        </Link>
      </div>
    </div>
  );
} 