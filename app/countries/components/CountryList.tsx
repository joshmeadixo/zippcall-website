'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

type Country = {
  name: string;
  slug: string;
  code: string;
  flagEmoji: string;
  continent: string;
};

type CountryListProps = {
  countries: Country[];
};

export default function CountryList({ countries }: CountryListProps) {
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [selectedLetter, setSelectedLetter] = useState('All');
  
  // Get unique continents for the filter
  const continents = ['All', ...Array.from(new Set(countries.map(country => country.continent)))];
  
  // Get all available first letters for filtering
  const alphabet = useMemo(() => {
    const letters = new Set(countries.map(country => country.name.charAt(0).toUpperCase()));
    return ['All', ...Array.from(letters).sort()];
  }, [countries]);
  
  // Filter countries based on selected continent and letter
  const filteredCountries = useMemo(() => {
    let filtered = countries;
    
    if (selectedContinent !== 'All') {
      filtered = filtered.filter(country => country.continent === selectedContinent);
    }
    
    if (selectedLetter !== 'All') {
      filtered = filtered.filter(country => country.name.charAt(0).toUpperCase() === selectedLetter);
    }
    
    return filtered;
  }, [countries, selectedContinent, selectedLetter]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8">
        <h2 className="text-2xl font-bold text-zippcall-blue mb-4 md:mb-0">Select Your Destination</h2>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="bg-zippcall-light-blue/5 rounded-lg p-1 border border-zippcall-light-blue/10 flex flex-wrap justify-center">
            {continents.map(continent => (
              <button
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors mx-1 my-1
                  ${selectedContinent === continent 
                    ? 'bg-zippcall-blue text-white shadow-sm' 
                    : 'text-zippcall-blue hover:bg-zippcall-light-blue/20'}`}
              >
                {continent}
              </button>
            ))}
          </div>
          <div className="text-zippcall-light-blue text-sm font-medium bg-zippcall-light-blue/10 py-1 px-3 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Starting from $0.15/min
          </div>
        </div>
      </div>
      
      {/* A-Z Filter */}
      <div className="mb-6 overflow-x-auto">
        <div className="bg-zippcall-light-blue/5 rounded-lg p-1 border border-zippcall-light-blue/10 flex flex-nowrap min-w-full whitespace-nowrap">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors mx-1
                ${selectedLetter === letter 
                  ? 'bg-zippcall-blue text-white shadow-sm' 
                  : 'text-zippcall-blue hover:bg-zippcall-light-blue/20'}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
      
      {filteredCountries.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-zippcall-neutral">No countries found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
          {filteredCountries.map((country) => (
            <Link 
              key={country.code} 
              href={`/cheap-calls-to/${country.slug}`}
              className="group bg-white border border-gray-100 hover:border-zippcall-light-blue rounded-xl p-4 sm:p-5 transition-all hover:shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-zippcall-light-blue/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl sm:text-3xl">{country.flagEmoji}</span>
                  <h3 className="font-medium text-gray-900 group-hover:text-zippcall-blue transition-colors">
                    {country.name}
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{country.continent}</span>
                  <div className="flex items-center text-sm text-zippcall-blue font-medium">
                    <span className="bg-zippcall-light-blue/10 py-1 px-2 rounded-md">View Rates</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 