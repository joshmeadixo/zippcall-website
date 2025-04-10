"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLegalModals } from './ModalLegalPage';
import { useContactForm } from './ContactFormContext';

export default function Footer() {
  const { openPrivacyPolicy, openTermsOfService, openLegalInfo } = useLegalModals();
  const { openContactForm } = useContactForm();

  const handlePrivacyClick = () => {
    console.log("Privacy policy button clicked");
    openPrivacyPolicy();
  };

  const handleTermsClick = () => {
    console.log("Terms button clicked");
    openTermsOfService();
  };

  const handleLegalClick = () => {
    console.log("Legal button clicked");
    openLegalInfo();
  };

  const handleContactClick = () => {
    console.log("Contact button clicked");
    openContactForm();
  };

  return (
    <footer className="bg-zippcall-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/zippcall-logo.png"
                alt="ZippCall Logo"
                width={130}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-zippcall-light-blue mb-4">
              Make affordable international calls directly from your browser.
            </p>
          </div>

          {/* Helpful Info Section */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Helpful Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/country-codes" className="text-gray-300 hover:text-white transition-colors">
                  International Country Codes
                </Link>
              </li>
              {/* Add more helpful links here as they become available */}
            </ul>
          </div>

          {/* Empty column for now - for future content */}
          <div className="hidden lg:block">
            {/* This will be filled in the future */}
          </div>

          {/* Empty column for now - for future content */}
          <div className="hidden lg:block">
            {/* This will be filled in the future */}
          </div>
        </div>
        
        <div className="border-t border-zippcall-light-blue/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ZippCall. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <button 
              onClick={handleContactClick}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contact Us
            </button>
            <button 
              onClick={handlePrivacyClick}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={handleTermsClick}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={handleLegalClick}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Legal Information
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
} 