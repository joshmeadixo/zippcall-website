"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen && 
        menuRef.current && 
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12 mr-2">
              <Image 
                src="/images/zippcall-icon.png"
                alt="ZippCall Icon"
                fill
                sizes="(max-width: 768px) 48px, 48px"
                className="object-contain object-center"
                priority
              />
            </div>
            <span className="text-zippcall-blue font-bold text-xl">ZippCall</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/#features" className="text-zippcall-blue hover:text-zippcall-light-blue font-bold transition-colors text-sm">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-zippcall-blue hover:text-zippcall-light-blue font-bold transition-colors text-sm">
            How It Works
          </Link>
          <Link href="/#pricing" className="text-zippcall-blue hover:text-zippcall-light-blue font-bold transition-colors text-sm">
            Pricing
          </Link>
          <Link href="/#faq" className="text-zippcall-blue hover:text-zippcall-light-blue font-bold transition-colors text-sm">
            FAQ
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Link href="https://app.zippcall.com" className="btn btn-sm bg-zippcall-blue text-white hover:bg-zippcall-blue/80 px-4">
            MAKE A CALL
          </Link>
          
          {/* Hamburger menu button (mobile only) */}
          <button 
            ref={buttonRef}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 border border-zippcall-blue rounded p-1"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`bg-zippcall-blue block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-zippcall-blue block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-zippcall-blue block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        ref={menuRef} 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/#features" 
              className="text-zippcall-blue font-bold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-zippcall-blue font-bold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/#pricing" 
              className="text-zippcall-blue font-bold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/#faq" 
              className="text-zippcall-blue font-bold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 