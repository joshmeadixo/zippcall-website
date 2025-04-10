import Link from 'next/link';
import { Metadata } from 'next';
import CountryList from './components/CountryList';
import enhancedCountryData from '../data/countries.json';

// Transform the enhanced country data to match the format expected by CountryList
const countriesForList = enhancedCountryData.map(country => ({
  name: country.name,
  slug: country.id,
  code: country.code,
  flagEmoji: country.flag,
  continent: country.continent,
  dialCode: country.dialCode
}));

export const metadata: Metadata = {
  title: 'ZippCall - International Calling to All Countries',
  description: 'Make cheap international calls to any country with ZippCall. Find your destination and start saving today.',
  keywords: 'international calls, cheap calls, ZippCall countries',
};

export default function CountriesPage() {
  return (
    <div className="bg-gradient-to-b from-zippcall-light-blue/10 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-zippcall-light-blue/10 text-zippcall-blue rounded-full mb-4 font-medium text-sm">
            Global Coverage
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zippcall-blue mb-6">
            Call Any Country with <span className="text-zippcall-light-blue">ZippCall</span>
          </h1>
          <p className="text-lg text-zippcall-neutral max-w-2xl mx-auto mb-8">
            Make cheap international calls to friends, family, and businesses worldwide. 
            No downloads required, call straight from your browser.
          </p>
          <div className="flex flex-col items-center mb-12">
            <Link 
              href="https://app.zippcall.com" 
              className="btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80 text-lg px-8 py-3 rounded-md shadow-md inline-flex items-center"
            >
              Start Calling Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <p className="text-sm bg-zippcall-light-blue/10 text-zippcall-blue font-medium mt-3 py-1 px-3 rounded-md border-l-2 border-zippcall-light-blue flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Signup to calling in less than 1 minute
            </p>
          </div>
        </div>
        
        <CountryList countries={countriesForList} />
      </div>
    </div>
  );
} 