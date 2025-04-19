import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import countryData from '../../data/countries.json';
import CountryFAQ from '@/app/components/CountryFAQ';

type CountryData = {
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
};

type PricingDataEntry = {
  finalPrice: number;
  countryName?: string;
  currency?: string;
};

type PageProps = {
  params: Promise<{
    country: string;
  }>;
};

// Generate metadata for each country page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  
  // First try to find enhanced country data from our JSON
  const enhancedCountryData = countryData.find(c => c.id === country) as CountryData | undefined;
  
  if (!enhancedCountryData) {
    return {
      title: 'Country Not Found - ZippCall',
      description: 'The country you are looking for is not supported by ZippCall.',
    };
  }

  return {
    title: enhancedCountryData.meta.title,
    description: enhancedCountryData.meta.description,
    keywords: enhancedCountryData.meta.keywords.join(', '),
    alternates: {
      canonical: `https://zipp-call.com/cheap-calls-to/${country}`,
    },
  };
}

// Generate static params for all countries
export function generateStaticParams() {
  // Combine enhanced and basic country data for routes
  const enhancedCountryIds = countryData.map(country => ({
    country: country.id,
  }));
  
  return enhancedCountryIds;
}

// Function to fetch pricing data from API
async function fetchPricingData(countryCode: string): Promise<number | null> {
  try {
    const response = await fetch(`https://app.zippcall.com/api/pricing/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Record<string, PricingDataEntry> = await response.json();
    
    if (data && data[countryCode] && typeof data[countryCode].finalPrice === 'number') {
      return data[countryCode].finalPrice;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch pricing data:", error);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { country } = await params;
  
  // First try to get enhanced country data
  const enhancedCountryData = countryData.find(c => c.id === country) as CountryData | undefined;
  
  // If the country doesn't exist in either list, show the 404 page
  if (!enhancedCountryData) {
    notFound();
  }
  
  // Use either enhanced or basic data
  const displayData = enhancedCountryData 
    ? enhancedCountryData 
    : {
        name: country,
        flag: '🇺',
        dialCode: '+1',
        // Other fields will be undefined for basic data
      };
  
  // Get the country code to use for fetching the rate
  const countryCode = enhancedCountryData?.code || country || '';
  
  // Fetch the live rate from the API
  const liveRate = await fetchPricingData(countryCode);
  
  // Use the live rate if available, otherwise fallback to null
  const rate = liveRate ? liveRate.toFixed(4) : null;
  const baseUrl = 'https://www.zippcall.com'; // Assuming this is your base URL
  const pageUrl = `${baseUrl}/cheap-calls-to/${country}`;

  // Prepare JSON-LD schema only if a valid rate was fetched
  const offerSchema = rate ? {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": `International Calling Rate to ${displayData.name}`,
    "description": `Low cost pay-as-you-go calling rates to ${displayData.name} with ZippCall.`,
    "url": pageUrl,
    "price": rate, // The fetched and calculated rate
    "priceCurrency": "USD", // Adjust if necessary
    "availability": "https://schema.org/InStock", // Or another appropriate availability
    "seller": {
      "@type": "Organization",
      "name": "ZippCall"
    }
  } : null;

  return (
    <div className="bg-gradient-to-b from-zippcall-light-blue/10 to-white py-16 md:py-24">
      {/* Add JSON-LD Script here if offerSchema is not null */}
      {offerSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
        />
      )}
      
      <div className="container mx-auto px-4">
        {/* Skype Replacement Promotional Bar */}
        <div className="bg-zippcall-yellow/20 border border-zippcall-yellow text-zippcall-blue p-3 rounded-lg text-center mb-12">
          <p className="font-medium">
            <span className="font-bold">Skype is closing down in May!</span> ZippCall is the perfect Skype replacement to call {displayData.name}
          </p>
        </div>
        
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-zippcall-light-blue/10 text-zippcall-blue rounded-full mb-4 font-medium text-sm">
            International Calling
          </span>
          <div className="text-5xl mb-4">{displayData.flag}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-zippcall-blue mb-6">
            Cheap Calls to <span className="text-zippcall-light-blue">{displayData.name}</span>
          </h1>
          <p className="text-lg text-zippcall-neutral max-w-2xl mx-auto mb-8">
            {enhancedCountryData?.description || 
              `Connect with friends, family, and businesses in ${displayData.name} at the lowest rates.
              No downloads required — just sign up and start calling.`
            }
          </p>
          
          <div className="mt-8 mb-8">
            <Link href="https://app.zippcall.com" className="bg-zippcall-blue hover:bg-zippcall-blue/80 text-white font-bold py-3 px-8 rounded-lg transition text-lg inline-flex items-center">
              Start Calling Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <p className="text-sm text-zippcall-blue font-medium mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Signup to calling in less than 1 minute
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-zippcall-blue px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Calling Rates for {displayData.name}
              </h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between py-3 border-b">
                <span className="font-medium text-zippcall-neutral">Country Code:</span>
                <span className="font-bold text-zippcall-blue">{displayData.dialCode || 'Contact for details'}</span>
              </div>
              
              {/* Languages section - only for enhanced data */}
              {enhancedCountryData?.languages && (
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium text-zippcall-neutral">Languages:</span>
                  <span className="font-bold text-zippcall-blue text-right">{enhancedCountryData.languages.join(', ')}</span>
                </div>
              )}
              
              {/* Timezones section - only for enhanced data */}
              {enhancedCountryData?.timeZones && (
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium text-zippcall-neutral">Time Zones:</span>
                  <span className="font-bold text-zippcall-blue text-right">{enhancedCountryData.timeZones}</span>
                </div>
              )}
              
              {/* Single rate for all calls */}
              <div className="flex justify-between py-3 border-b">
                <span className="font-medium text-zippcall-neutral">Call Rate:</span>
                {rate ? (
                  <span className="font-bold text-green-600">${rate}/min</span>
                ) : (
                  <span className="font-medium text-zippcall-neutral">Contact for details</span>
                )}
              </div>
              
              <div className="bg-zippcall-yellow/10 border-l-4 border-zippcall-yellow p-3 rounded mt-4">
                <p className="text-sm text-zippcall-blue font-medium">Save up to 90% compared to traditional providers!</p>
              </div>
              <div className="mt-6">
                <Link href="https://app.zippcall.com" className="w-full bg-zippcall-blue hover:bg-zippcall-blue/80 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center text-lg">
                  Start Calling Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <p className="text-sm bg-zippcall-light-blue/10 text-zippcall-blue font-medium mt-3 py-1 px-3 rounded-md border-l-2 border-zippcall-light-blue flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Signup to calling in less than 1 minute
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zippcall-blue mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Why Call {displayData.name} with ZippCall?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl mr-3 flex-shrink-0">💻</div>
                <div>
                  <span className="font-medium text-zippcall-blue">Browser-Based</span>
                  <p className="text-sm text-zippcall-neutral mt-1">Make calls directly from your web browser - no downloads or installations required.</p>
                </div>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl mr-3 flex-shrink-0">💰</div>
                <div>
                  <span className="font-medium text-zippcall-blue">Affordable Rates</span>
                  <p className="text-sm text-zippcall-neutral mt-1">Save up to 90% compared to traditional providers with our competitive international rates.</p>
                </div>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl mr-3 flex-shrink-0">🔊</div>
                <div>
                  <span className="font-medium text-zippcall-blue">Crystal Clear Quality</span>
                  <p className="text-sm text-zippcall-neutral mt-1">Experience HD voice quality for all your international calls.</p>
                </div>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl mr-3 flex-shrink-0">🔒</div>
                <div>
                  <span className="font-medium text-zippcall-blue">Secure & Private</span>
                  <p className="text-sm text-zippcall-neutral mt-1">Your calls are encrypted and your privacy is always protected.</p>
                </div>
              </li>
            </ul>
            
            {/* Business info section - only for enhanced data */}
            {enhancedCountryData?.businessInfo && (
              <div className="mt-6 bg-white p-5 rounded-lg shadow-sm border-l-4 border-zippcall-blue">
                <h3 className="font-medium text-zippcall-blue">Business Information</h3>
                <p className="text-zippcall-neutral text-sm mt-2">{enhancedCountryData.businessInfo}</p>
              </div>
            )}
            
            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border-t-4 border-zippcall-light-blue">
              <h3 className="text-xl font-bold text-zippcall-blue mb-3">Ready to connect with {displayData.name}?</h3>
              <Link href="https://app.zippcall.com" className="bg-zippcall-light-blue hover:bg-zippcall-light-blue/90 text-white font-bold py-3 px-6 rounded-lg transition block text-center">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>

        {/* Calling Tips Section - only for enhanced data */}
        {enhancedCountryData?.callTips && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-zippcall-blue mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Calling Tips for {displayData.name}
            </h2>
            <div className="bg-zippcall-cream rounded-lg p-6">
              <p className="text-zippcall-neutral">{enhancedCountryData.callTips}</p>
            </div>
          </div>
        )}

        {/* Popular Cities Section - only for enhanced data */}
        {enhancedCountryData?.popularCities && enhancedCountryData.popularCities.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-zippcall-blue mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Popular Cities in {displayData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enhancedCountryData.popularCities.map((city, index) => (
                <div key={index} className="bg-zippcall-light-blue/5 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-zippcall-blue">{city.name}</h3>
                  <p className="mt-2 text-zippcall-neutral">{city.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Updated FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-zippcall-blue mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Frequently Asked Questions
          </h2>
          
          <CountryFAQ
            countryData={enhancedCountryData}
            displayName={displayData.name}
            dialCode={displayData.dialCode}
          />
        </div>

        {/* Final CTA Section */}
        <div className="bg-zippcall-blue rounded-xl shadow-lg p-10 mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make Cheap Calls to {displayData.name}?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Start calling {displayData.name} today with ZippCall's crystal-clear connections and unbeatable rates. No downloads required - call directly from your browser.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://app.zippcall.com" className="bg-white hover:bg-gray-100 text-zippcall-blue font-bold py-3 px-8 rounded-lg transition text-lg">
              Start Calling Now
            </Link>
            <Link href="/countries" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition text-lg">
              View All Countries
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/countries" className="inline-flex items-center text-zippcall-blue hover:text-zippcall-light-blue font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            View all countries
          </Link>
        </div>
      </div>
    </div>
  );
} 