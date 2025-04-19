"use client";

import { useState } from 'react';
import { Metadata } from 'next';
// Import data directly from the JSON file
import allCountriesData from '@/app/data/countries.json';

// Define an interface for better type safety, matching the JSON structure
interface CountryJsonData {
  id: string;
  name: string;
  code: string; // ISO Code (e.g., 'GB')
  dialCode: string; // Dialing Code (e.g., '+44')
  // Add other fields from JSON if needed, but keep it minimal for this page
  [key: string]: any; // Allow other properties
}

// Type assertion for the imported data
const countryCodes = allCountriesData as CountryJsonData[];

// Define the FAQ structure for JSON-LD with popular countries
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    // UK
    {
      "@type": "Question",
      "name": "What is the country code for the United Kingdom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code for the United Kingdom is +44."
      }
    },
    {
      "@type": "Question",
      "name": "What country is code +44?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code +44 belongs to the United Kingdom."
      }
    },
    // US
    {
      "@type": "Question",
      "name": "What is the country code for the United States?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code for the United States is +1."
      }
    },
    {
      "@type": "Question",
      "name": "What country is code +1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code +1 is used by both the United States and Canada (as part of the North American Numbering Plan)."
      }
    },
    // Canada
    {
      "@type": "Question",
      "name": "What is the country code for Canada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code for Canada is +1."
      }
    },
    // Australia
    {
      "@type": "Question",
      "name": "What is the country code for Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code for Australia is +61."
      }
    },
    {
      "@type": "Question",
      "name": "What country is code +61?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code +61 belongs to Australia."
      }
    },
    // Germany
    {
      "@type": "Question",
      "name": "What is the country code for Germany?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code for Germany is +49."
      }
    },
    {
      "@type": "Question",
      "name": "What country is code +49?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code +49 belongs to Germany."
      }
    },
    // France
    {
      "@type": "Question",
      "name": "What is the country code for France?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code for France is +33."
      }
    },
    {
      "@type": "Question",
      "name": "What country is code +33?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The country code +33 belongs to France."
      }
    }
  ]
};

// Create an FAQ Item component for collapsible behavior
interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}

function FAQItem({ question, answer, isOpen, toggleOpen }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 py-4" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <button 
        className="flex justify-between items-center w-full text-left font-bold text-zippcall-blue"
        onClick={toggleOpen}
      >
        <span className="text-xl" itemProp="name">{question}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-3 text-zippcall-neutral" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
          <div itemProp="text">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CountryCodesPage() {
  const [openItem, setOpenItem] = useState(0); // Start with first item open
  const [searchTerm, setSearchTerm] = useState(""); // For filtering countries
  
  // FAQs data structure for the UI
  const faqItems = [
    {
      question: "What is the country code for the United Kingdom?",
      answer: <p>The country code for the United Kingdom is <strong className="text-zippcall-blue">+44</strong>.</p>
    },
    {
      question: "What country is code +44?",
      answer: <p>The country code <strong className="text-zippcall-blue">+44</strong> belongs to the <strong>United Kingdom</strong>.</p>
    },
    {
      question: "What is the country code for the United States?",
      answer: <p>The country code for the United States is <strong className="text-zippcall-blue">+1</strong>.</p>
    },
    {
      question: "What country is code +1?",
      answer: <p>The country code <strong className="text-zippcall-blue">+1</strong> is used by both the <strong>United States</strong> and <strong>Canada</strong> (as part of the North American Numbering Plan).</p>
    },
    {
      question: "What is the country code for Canada?",
      answer: <p>The country code for Canada is <strong className="text-zippcall-blue">+1</strong>.</p>
    },
    {
      question: "What is the country code for Australia?",
      answer: <p>The country code for Australia is <strong className="text-zippcall-blue">+61</strong>.</p>
    },
    {
      question: "What country is code +61?",
      answer: <p>The country code <strong className="text-zippcall-blue">+61</strong> belongs to <strong>Australia</strong>.</p>
    },
    {
      question: "What is the country code for Germany?",
      answer: <p>The country code for Germany is <strong className="text-zippcall-blue">+49</strong>.</p>
    },
    {
      question: "What country is code +49?",
      answer: <p>The country code <strong className="text-zippcall-blue">+49</strong> belongs to <strong>Germany</strong>.</p>
    },
    {
      question: "What is the country code for France?",
      answer: <p>The country code for France is <strong className="text-zippcall-blue">+33</strong>.</p>
    },
    {
      question: "What country is code +33?",
      answer: <p>The country code <strong className="text-zippcall-blue">+33</strong> belongs to <strong>France</strong>.</p>
    },
  ];
  
  return (
    <main>
      {/* Add JSON-LD Script for FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      {/* Hero section with primary call to action */}
      <section className="bg-zippcall-blue text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">International Country Codes Directory</h1>
          <p className="text-lg max-w-2xl opacity-90">
            Find the international dialing code for any country. Use these country codes when making international calls with ZippCall.
          </p>
        </div>
      </section>

      {/* Country Codes Table Section */}
      <section className="py-12 bg-zippcall-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-zippcall-blue mb-4 text-center">
              Complete Country Codes List
            </h2>
            <p className="text-center text-zippcall-neutral mb-8">
              Browse all international dialing codes below to find the code you need.
            </p>

            {/* Search input for filtering country codes */}
            <div className="mb-6 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-zippcall-light-blue/30 focus:border-zippcall-blue focus:outline-none focus:ring-2 focus:ring-zippcall-blue/20"
                  placeholder="Search by country, code or dial code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zippcall-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Country Codes Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-zippcall-light-blue/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zippcall-blue text-white text-sm uppercase">
                    <tr>
                      <th scope="col" className="py-4 px-6">Country Name</th>
                      <th scope="col" className="py-4 px-6">Dialing Code</th>
                      <th scope="col" className="py-4 px-6">ISO Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Filter countries based on search term */}
                    {countryCodes
                      .filter(country => 
                        searchTerm === "" || 
                        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        country.dialCode.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((country) => (
                      <tr key={country.code} className="border-b border-gray-200 hover:bg-zippcall-cream/50 transition-colors">
                        <th scope="row" className="py-4 px-6 font-medium text-zippcall-blue">
                          {country.name}
                        </th>
                        <td className="py-4 px-6 font-medium text-zippcall-neutral">
                          {country.dialCode}
                        </td>
                        <td className="py-4 px-6 text-zippcall-neutral">
                          {country.code}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section moved to bottom */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* FAQ-style featured questions - now collapsible */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-zippcall-light-blue/20">
            <h2 className="text-2xl font-bold text-zippcall-blue mb-6">Frequently Asked Questions</h2>
            
            {faqItems.map((item, index) => (
              <FAQItem 
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openItem === index}
                toggleOpen={() => setOpenItem(openItem === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-10 bg-zippcall-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-zippcall-blue mb-4">Ready to make international calls?</h2>
          <p className="text-zippcall-neutral max-w-2xl mx-auto mb-6">
            Use these country codes with ZippCall to connect with anyone worldwide. No downloads required.
          </p>
          <a 
            href="https://app.zippcall.com" 
            className="inline-block bg-zippcall-blue text-white font-bold py-3 px-8 rounded-md hover:bg-zippcall-blue/80 transition-colors"
          >
            START CALLING NOW
          </a>
        </div>
      </section>
    </main>
  );
} 