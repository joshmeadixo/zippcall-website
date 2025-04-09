"use client";

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

function FAQItem({ question, answer, isOpen, toggleOpen }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-bold text-zippcall-blue"
        onClick={toggleOpen}
      >
        <span>{question}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-3 text-zippcall-neutral">
          {answer}
        </div>
      )}
    </div>
  );
}

type CountryDataType = {
  id: string;
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  continent: string;
  languages: string[];
  timeZones: string;
  description: string;
  callTips: string;
  popularCities: Array<{ name: string; description: string }>;
  businessInfo: string;
  faqs: Array<{ question: string; answer: string }>;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
} | undefined;

interface CountryFAQProps {
  countryData: CountryDataType;
  displayName?: string;
  dialCode?: string;
}

export default function CountryFAQ({ countryData, displayName, dialCode }: CountryFAQProps) {
  const [openFaqItem, setOpenFaqItem] = useState(0);
  
  const displayData = {
    name: displayName || countryData?.name || 'this country',
    dialCode: dialCode || countryData?.dialCode || 'the country code'
  };

  return (
    <div className="max-w-4xl mx-auto">
      {countryData?.faqs ? (
        // Display enhanced FAQs if available
        countryData.faqs.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFaqItem === index}
            toggleOpen={() => setOpenFaqItem(openFaqItem === index ? -1 : index)}
          />
        ))
      ) : (
        // Fallback to generic FAQs
        <>
          <FAQItem
            question={`How do I call ${displayData.name} with ZippCall?`}
            answer={`Simply create a ZippCall account, add credit, and dial ${displayData.dialCode} followed by the phone number. You can call from our web app, mobile app, or traditional phone.`}
            isOpen={openFaqItem === 0}
            toggleOpen={() => setOpenFaqItem(openFaqItem === 0 ? -1 : 0)}
          />
          <FAQItem
            question={`Do I need special equipment to call ${displayData.name}?`}
            answer="No special equipment is needed. You can use ZippCall from your existing smartphone, computer, or traditional landline phone."
            isOpen={openFaqItem === 1}
            toggleOpen={() => setOpenFaqItem(openFaqItem === 1 ? -1 : 1)}
          />
          <FAQItem
            question="Are there any connection fees or hidden charges?"
            answer="ZippCall has no hidden fees or connection charges. You only pay for the minutes you use at our transparent rates."
            isOpen={openFaqItem === 2}
            toggleOpen={() => setOpenFaqItem(openFaqItem === 2 ? -1 : 2)}
          />
        </>
      )}
    </div>
  );
} 