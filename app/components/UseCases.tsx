import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function UseCases() {
  const useCases = [
    {
      title: "Business Calls",
      description: "Connect with international clients, suppliers, and partners without the high costs. Perfect for small businesses and entrepreneurs who need reliable global communication.",
      icon: "💼",
      feature: "Call any business landline or mobile worldwide"
    },
    {
      title: "Staying Connected with Family",
      description: "Keep in touch with loved ones abroad with crystal-clear calls at a fraction of traditional costs. Ideal for families spread across different countries.",
      icon: "👨‍👩‍👧‍👦",
      feature: "No download required for recipients"
    },
    {
      title: "Calling Banks & Services",
      description: "Need to contact your bank, insurance, or other services while traveling? Make secure calls to service numbers without international roaming fees.",
      icon: "🏦",
      feature: "Secure, encrypted connections"
    }
  ];

  const userTypes = [
    { text: "Remote Workers", size: "text-lg", color: "text-zippcall-blue", animDelay: "0s" },
    { text: "Business Owners", size: "text-xl", color: "text-zippcall-blue font-bold", animDelay: "0.3s" },
    { text: "Digital Nomads", size: "text-lg", color: "text-zippcall-light-blue", animDelay: "0.1s" },
    { text: "International Students", size: "text-xl", color: "text-zippcall-blue", animDelay: "0.5s" },
    { text: "Frequent Travelers", size: "text-2xl", color: "text-zippcall-blue font-bold", animDelay: "0.2s" },
    { text: "Expats", size: "text-lg", color: "text-zippcall-light-blue", animDelay: "0.4s" },
    { text: "Global Entrepreneurs", size: "text-xl", color: "text-zippcall-blue", animDelay: "0.6s" },
    { text: "Immigrant Families", size: "text-lg", color: "text-zippcall-light-blue", animDelay: "0.3s" },
    { text: "Corporate Teams", size: "text-lg", color: "text-zippcall-blue", animDelay: "0.5s" },
    { text: "Consultants", size: "text-xl", color: "text-zippcall-light-blue", animDelay: "0.4s" },
    { text: "Global Shoppers", size: "text-lg", color: "text-zippcall-blue", animDelay: "0.2s" },
    { text: "International Support Teams", size: "text-xl", color: "text-zippcall-blue font-bold", animDelay: "0.7s" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">
            How People Use ZippCall
          </h2>
          <p className="text-lg text-zippcall-neutral max-w-3xl mx-auto">
            Our browser-based calling solution works for all kinds of international communication needs. Call any landline or mobile phone in any country directly from your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md border border-zippcall-light-blue/20 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-6">{useCase.icon}</div>
              <h3 className="text-xl font-bold text-zippcall-blue mb-3">{useCase.title}</h3>
              <p className="text-zippcall-neutral mb-6">{useCase.description}</p>
              <div className="border-t pt-4 text-zippcall-light-blue flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{useCase.feature}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Animated user types cloud */}
        <div className="py-10 mb-16 bg-zippcall-light-blue/5 rounded-xl">
          <h3 className="text-center text-2xl font-bold text-zippcall-blue mb-8">Who Uses ZippCall?</h3>
          <div className="flex flex-wrap justify-center gap-4 px-4 relative">
            {userTypes.map((type, index) => (
              <div 
                key={index}
                className={`px-4 py-2 rounded-full ${type.color} ${type.size} animate-float`}
                style={{ 
                  animationDelay: type.animDelay,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                {type.text}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-zippcall-cream rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-zippcall-blue mb-4">Ready to try ZippCall for your needs?</h3>
            <p className="text-zippcall-neutral mb-6">
              Start making international calls to any landline or mobile phone from your browser today. No downloads, no complicated setup.
            </p>
            <a 
              href="https://app.zippcall.com" 
              className="btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80 inline-flex items-center justify-center text-lg px-8 py-3"
            >
              Start calling now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 