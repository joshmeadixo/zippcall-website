"use client";

import { useLegalModals } from './components/ModalLegalPage';

export default function TestModals() {
  const { openPrivacyPolicy, openTermsOfService, openLegalInfo } = useLegalModals();

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-8">Modal Test Page</h1>
      
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <button 
          onClick={openPrivacyPolicy}
          className="bg-zippcall-blue text-white p-3 rounded hover:bg-zippcall-blue/80"
        >
          Open Privacy Policy
        </button>
        
        <button 
          onClick={openTermsOfService}
          className="bg-zippcall-blue text-white p-3 rounded hover:bg-zippcall-blue/80"
        >
          Open Terms of Service
        </button>
        
        <button 
          onClick={openLegalInfo}
          className="bg-zippcall-blue text-white p-3 rounded hover:bg-zippcall-blue/80"
        >
          Open Legal Information
        </button>
      </div>
    </div>
  );
} 