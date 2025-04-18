"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';

// Helper data (copied from Pricing component)
// Countries that are not supported
const unsupportedCountries = ["China", "Iran"];

// Country code to flag mapping
const countryCodeToFlagMap: { [key: string]: string } = {
  AF: "🇦🇫", AD: "🇦🇩", AE: "🇦🇪", AG: "🇦🇬", AI: "🇦🇮", AL: "🇦🇱", AM: "🇦🇲", AO: "🇦🇴", AQ: "🇦🇶", AR: "🇦🇷", AS: "🇦🇸", AT: "🇦🇹", AU: "🇦🇺", AW: "🇦🇼", AX: "🇦🇽", AZ: "🇦🇿",
  BA: "🇧🇦", BB: "🇧🇧", BD: "🇧🇩", BE: "🇧🇪", BF: "🇧🇫", BG: "🇧🇬", BH: "🇧🇭", BI: "🇧🇮", BJ: "🇧🇯", BL: "🇧🇱", BM: "🇧🇲", BN: "🇧🇳", BO: "🇧🇴", BQ: "🇧🇶", BR: "🇧🇷", BS: "🇧🇸", BT: "🇧🇹", BV: "🇧🇻", BW: "🇧🇼", BY: "🇧🇾", BZ: "🇧🇿",
  CA: "🇨🇦", CC: "🇨🇨", CD: "🇨🇩", CF: "🇨🇫", CG: "🇨🇬", CH: "🇨🇭", CI: "🇨🇮", CK: "🇨🇰", CL: "🇨🇱", CM: "🇨🇲", CN: "🇨🇳", CO: "🇨🇴", CR: "🇨🇷", CU: "🇨🇺", CV: "🇨🇻", CW: "🇨🇼", CX: "🇨🇽", CY: "🇨🇾", CZ: "🇨🇿",
  DE: "🇩🇪", DJ: "🇩🇯", DK: "🇩🇰", DM: "🇩🇲", DO: "🇩🇴", DZ: "🇩🇿",
  EC: "🇪🇨", EE: "🇪🇪", EG: "🇪🇬", EH: "🇪🇭", ER: "🇪🇷", ES: "🇪🇸", ET: "🇪🇹", FI: "🇫🇮", FJ: "🇫🇯", FK: "🇫🇰", FM: "🇫🇲", FO: "🇫🇴", FR: "🇫🇷",
  GA: "🇬🇦", GB: "🇬🇧", GD: "🇬🇩", GE: "🇬🇪", GF: "🇬🇫", GG: "🇬🇬", GH: "🇬🇭", GI: "🇬🇮", GL: "🇬🇱", GM: "🇬🇲", GN: "🇬🇳", GP: "🇬🇵", GQ: "🇬🇶", GR: "🇬🇷", GS: "🇬🇸", GT: "🇬🇹", GU: "🇬🇺", GW: "🇬🇼", GY: "🇬🇾",
  HK: "🇭🇰", HM: "🇭🇲", HN: "🇭🇳", HR: "🇭🇷", HT: "🇭🇹", HU: "🇭🇺",
  ID: "🇮🇩", IE: "🇮🇪", IL: "🇮🇱", IM: "🇮🇲", IN: "🇮🇳", IO: "🇮🇴", IQ: "🇮🇶", IR: "🇮🇷", IS: "🇮🇸", IT: "🇮🇹",
  JE: "🇯🇪", JM: "🇯🇲", JO: "🇯🇴", JP: "🇯🇵",
  KE: "🇰🇪", KG: "🇰🇬", KH: "🇰🇭", KI: "🇰🇮", KM: "🇰🇲", KN: "🇰🇳", KP: "🇰🇵", KR: "🇰🇷", KW: "🇰🇼", KY: "🇰🇾", KZ: "🇰🇿",
  LA: "🇱🇦", LB: "🇱🇧", LC: "🇱🇨", LI: "🇱🇮", LK: "🇱🇰", LR: "🇱🇷", LS: "🇱🇸", LT: "🇱🇹", LU: "🇱🇺", LV: "🇱🇻", LY: "🇱🇾",
  MA: "🇲🇦", MC: "🇲🇨", MD: "🇲🇩", ME: "🇲🇪", MF: "🇲🇫", MG: "🇲🇬", MH: "🇲🇭", MK: "🇲🇰", ML: "🇲🇱", MM: "🇲🇲", MN: "🇲🇳", MO: "🇲🇴", MP: "🇲🇵", MQ: "🇲🇶", MR: "🇲🇷", MS: "🇲🇸", MT: "🇲🇹", MU: "🇲🇺", MV: "🇲🇻", MW: "🇲🇼", MX: "🇲🇽", MY: "🇲🇾", MZ: "🇲🇿",
  NA: "🇳🇦", NC: "🇳🇨", NE: "🇳🇪", NF: "🇳🇫", NG: "🇳🇬", NI: "🇳🇮", NL: "🇳🇱", NO: "🇳🇴", NP: "🇳🇵", NR: "🇳🇷", NU: "🇳🇺", NZ: "🇳🇿",
  OM: "🇴🇲",
  PA: "🇵🇦", PE: "🇵🇪", PF: "🇵🇫", PG: "🇵🇬", PH: "🇵🇭", PK: "🇵🇰", PL: "🇵🇱", PM: "🇵🇲", PN: "🇵🇳", PR: "🇵🇷", PS: "🇵🇸", PT: "🇵🇹", PW: "🇵🇼", PY: "🇵🇾",
  QA: "🇶🇦",
  RE: "🇷🇪", RO: "🇷🇴", RS: "🇷🇸", RU: "🇷🇺", RW: "🇷🇼",
  SA: "🇸🇦", SB: "🇸🇧", SC: "🇸🇨", SD: "🇸🇩", SE: "🇸🇪", SG: "🇸🇬", SH: "🇸🇭", SI: "🇸🇮", SJ: "🇸🇯", SK: "🇸🇰", SL: "🇸🇱", SM: "🇸🇲", SN: "🇸🇳", SO: "🇸🇴", SR: "🇸🇷", SS: "🇸🇸", ST: "🇸🇹", SV: "🇸🇻", SX: "🇸🇽", SY: "🇸🇾", SZ: "🇸🇿",
  TC: "🇹🇨", TD: "🇹🇩", TF: "🇹🇫", TG: "🇹🇬", TH: "🇹🇭", TJ: "🇹🇯", TK: "🇹🇰", TL: "🇹🇱", TM: "🇹🇲", TN: "🇹🇳", TO: "🇹🇴", TR: "🇹🇷", TT: "🇹🇹", TV: "🇹🇻", TW: "🇹🇼", TZ: "🇹🇿",
  UA: "🇺🇦", UG: "🇺🇬", UM: "🇺🇲", US: "🇺🇸", UY: "🇺🇾", UZ: "🇺🇿",
  VA: "🇻🇦", VC: "🇻🇨", VE: "🇻🇪", VG: "🇻🇬", VI: "🇻🇮", VN: "🇻🇳", VU: "🇻🇺",
  WF: "🇼🇫", WS: "🇼🇸",
  YE: "🇾🇪", YT: "🇾🇹",
  ZA: "🇿🇦", ZM: "🇿🇲", ZW: "🇿🇼"
};

// Types for countries and pricing data
interface CountryOption {
  code: string;
  name: string;
  flag?: string;
}

interface PricingDataEntry {
  basePrice: number;
  countryName?: string;
  currency?: string;
}

// Simplified pricing calculator for the hero section
export default function Hero() {
  const [selectedCountryName, setSelectedCountryName] = useState("United Kingdom");
  const [minutes, setMinutes] = useState(5);
  const [currentRate, setCurrentRate] = useState<number | null>(0.15);
  const [calculatedCost, setCalculatedCost] = useState<string | null>("0.75");
  const [isLoading, setIsLoading] = useState(true);
  const [isUnsupportedCountry, setIsUnsupportedCountry] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [allPricingData, setAllPricingData] = useState<Record<string, PricingDataEntry> | null>(null);
  const [countryListForDropdown, setCountryListForDropdown] = useState<CountryOption[]>([
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "IN", name: "India", flag: "🇮🇳" },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isPhoneBouncing, setIsPhoneBouncing] = useState(true);

  // Fetch pricing data
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch('https://app.zippcall.com/api/pricing/all');
        if (response.ok) {
          const data: Record<string, PricingDataEntry> = await response.json();
          
          setAllPricingData(data);
          
          // Create country list from API data
          if (typeof data === 'object' && data !== null) {
            // Debug info
            console.log("API returned data for", Object.keys(data).length, "countries");
            
            const countries: CountryOption[] = Object.keys(data)
              .map(code => ({
                code: code,
                name: data[code].countryName || code,
                flag: countryCodeToFlagMap[code]
              }))
              .sort((a, b) => a.name.localeCompare(b.name));
            
            // Ensure we have data
            if (countries.length > 0) {
              console.log("Processed", countries.length, "countries");
              setCountryListForDropdown(countries);
            } else {
              console.error("No countries processed from API data");
            }
          }
          
          // Update current selection with real rates
          updateCountryRate(selectedCountryName, data);
        } else {
          console.error("API response not OK:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPricing();
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to update rate when country changes
  const updateCountryRate = (countryName: string, pricingData?: Record<string, PricingDataEntry>) => {
    const data = pricingData || allPricingData;
    
    // Check if country is unsupported
    if (unsupportedCountries.includes(countryName)) {
      setIsUnsupportedCountry(true);
      setCurrentRate(null);
      setCalculatedCost(null);
      return;
    }
    
    setIsUnsupportedCountry(false);
    
    // Find country code
    const selectedCountry = countryListForDropdown.find(c => c.name === countryName);
    if (!selectedCountry) return;
    
    // Get rate from pricing data
    if (data && selectedCountry.code) {
      const entry = data[selectedCountry.code];
      if (entry?.basePrice !== undefined && typeof entry.basePrice === 'number') {
        const markupRate = entry.basePrice * 2;
        const finalRate = Math.max(markupRate, 0.15);
        setCurrentRate(finalRate);
        setCalculatedCost((finalRate * minutes).toFixed(2));
        return;
      }
    }
    
    // Fallback to default rate
    setCurrentRate(0.15);
    setCalculatedCost((0.15 * minutes).toFixed(2));
  };

  // Handle country selection
  const handleCountrySelect = (countryName: string) => {
    setSelectedCountryName(countryName);
    setSearchTerm("");
    setShowDropdown(false);
    updateCountryRate(countryName);
  };

  // Handle minutes change
  const handleMinutesChange = (newMinutes: number) => {
    setMinutes(newMinutes);
    if (currentRate !== null) {
      setCalculatedCost((currentRate * newMinutes).toFixed(2));
    }
  };
  
  // Filter countries for dropdown based on search term
  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return countryListForDropdown;
    }
    return countryListForDropdown.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, countryListForDropdown]);
  
  // Get current selected country
  const currentSelectedCountry = countryListForDropdown.find(c => c.name === selectedCountryName);

  // Stop bouncing animation when user interacts with the calculator
  const handleFirstInteraction = () => {
    setIsPhoneBouncing(false);
  };

  return (
    <section className="bg-gradient-to-b from-zippcall-light-blue/10 to-white py-16 md:py-24 relative overflow-hidden">
      {/* Mobile Product Hunt Badge */}
      <div className="md:hidden absolute top-2 right-2 z-10">
        <a 
          href="https://www.producthunt.com/posts/zippcall?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-zippcall" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block rotate-6 shadow-lg rounded-lg overflow-hidden hover:rotate-0 transition-all duration-300"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=949544&theme=light&t=1743815067332" 
            alt="ZippCall on Product Hunt" 
            className="w-36 h-auto" 
          />
        </a>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Centered Content Layout */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zippcall-blue mb-6">
            Call landlines and mobiles <span className="text-zippcall-light-blue">anywhere in the world</span> at <span className="text-zippcall-light-blue">great low rates.</span>
          </h1>
          <p className="text-lg text-zippcall-neutral mb-8">
            Cheap international calls directly from your Browser. No downloads, no hassle. <span className="font-medium text-zippcall-blue">Check your rate and make a call instantly below!</span>
          </p>
        </div>

        {/* Centered Phone Mockup Area */}
        <div className="relative">
          {/* Phone UI with Pricing Calculator - Apply pulse-glow animation */}
          <div 
            className={`relative mx-auto ${isPhoneBouncing ? 'animate-bounce-subtle animate-pulse-glow' : ''}`}
            style={{ maxWidth: "320px" }}
          >
            {/* Phone Frame */}
            <div className="bg-gray-900 rounded-[40px] p-3 shadow-2xl border-4 border-gray-800">
              {/* Screen */}
              <div className="bg-white rounded-[32px] overflow-hidden h-[550px] relative">
                {/* App Content */}
                <div className="p-5">
                  {/* App Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <Image 
                        src="/images/zippcall-icon.png" 
                        alt="ZippCall" 
                        width={28} 
                        height={28} 
                      />
                    </div>
                    <div className="text-xs text-zippcall-blue font-medium">
                      Balance: $10.00
                    </div>
                  </div>
                  
                  {/* Calculator */}
                  <div className="bg-gray-50 p-4 rounded-xl shadow-inner mb-5">
                    <h3 className="text-sm font-semibold text-zippcall-blue mb-4">Where do you want to call?</h3>
                    
                    {/* Country Selector Dropdown */}
                    <div className="mb-4 relative" ref={dropdownRef}>
                      <label className="text-xs text-gray-500 block mb-1">Destination Country:</label>
                      
                      {/* Selected country button - add pulse animation */}
                      <button 
                        onClick={() => { 
                          setShowDropdown(!showDropdown);
                          handleFirstInteraction();
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm relative overflow-hidden group"
                      >
                        <div className="flex items-center">
                          {currentSelectedCountry?.flag && (
                            <span className="mr-2 text-base">{currentSelectedCountry.flag}</span>
                          )}
                          <span>{selectedCountryName}</span>
                        </div>
                        <div className="flex items-center">
                          <span className={`text-xs text-zippcall-blue mr-1 ${isPhoneBouncing ? 'animate-pulse' : ''}`}>
                            Click to select
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        
                        {/* Add ripple effect on hover */}
                        <div className="absolute inset-0 w-full h-full scale-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-zippcall-blue/5"></div>
                      </button>
                      
                      {/* Dropdown menu */}
                      {showDropdown && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
                          {/* Search box */}
                          <div className="sticky top-0 p-2 bg-white border-b border-gray-100 z-10">
                            <input
                              type="text"
                              placeholder="Search countries..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-gray-200 rounded"
                            />
                          </div>
                          
                          {/* Country list */}
                          <div className="p-1">
                            {isLoading ? (
                              <div className="flex justify-center py-2">
                                <svg className="animate-spin h-4 w-4 text-zippcall-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </div>
                            ) : filteredCountries.length === 0 ? (
                              <div className="text-xs text-gray-500 text-center py-2">No countries found</div>
                            ) : (
                              <>
                                <div className="text-xs text-gray-500 text-center pb-1">{filteredCountries.length} countries available</div>
                                {filteredCountries.map(country => (
                                  <button
                                    key={country.code}
                                    onClick={() => handleCountrySelect(country.name)}
                                    className={`flex items-center w-full px-3 py-2 text-xs ${
                                      selectedCountryName === country.name 
                                        ? "bg-zippcall-blue/10 text-zippcall-blue" 
                                        : "hover:bg-gray-50"
                                    } rounded-lg`}
                                  >
                                    {country.flag && <span className="mr-2">{country.flag}</span>}
                                    {country.name}
                                  </button>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Price Information */}
                    <div className="mb-3 bg-white p-2 rounded-lg border border-gray-200 text-center">
                      {isLoading ? (
                        <span className="text-xs text-gray-500">Loading rates...</span>
                      ) : isUnsupportedCountry ? (
                        <span className="text-xs text-orange-500">Sorry, calls to {selectedCountryName} are not supported yet.</span>
                      ) : (
                        <div>
                          <span className="text-xs text-gray-500 block">Rate:</span>
                          <span className="text-zippcall-blue font-medium">${currentRate?.toFixed(4)}/min</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Minutes Selector */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-gray-500">Minutes: {minutes}</label>
                        <span className="text-xs font-medium text-zippcall-blue">
                          {isLoading ? "Loading..." : isUnsupportedCountry ? "-" : `$${calculatedCost}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleMinutesChange(Math.max(1, minutes - 1))}
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                        >-</button>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={minutes}
                          onChange={(e) => handleMinutesChange(Number(e.target.value))}
                          className="flex-1 range range-primary h-2 bg-zippcall-light-blue/20 accent-zippcall-blue rounded-lg"
                        />
                        <button 
                          onClick={() => handleMinutesChange(Math.min(30, minutes + 1))}
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                        >+</button>
                      </div>
                    </div>
                    
                    {/* Call Button - Restore this */}
                    <Link 
                      href="https://app.zippcall.com" 
                      className="w-full btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80 flex items-center justify-center gap-2 py-3 rounded-lg relative overflow-hidden group"
                      onClick={handleFirstInteraction}
                    >
                      <div className={`flex items-center justify-center gap-2 ${isPhoneBouncing ? 'animate-wobble' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Start Calling Now
                      </div>
                      
                      {/* Add ripple effect */}
                      <div className="absolute inset-0 w-full h-full scale-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phone Bottom */}
            <div className="bg-gray-800 h-1 w-24 rounded-full mx-auto mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}