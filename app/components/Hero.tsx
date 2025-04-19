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
  const [currentRate, setCurrentRate] = useState<number | null>(0.15);
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
  const [phoneNumber, setPhoneNumber] = useState("+1 8009632111");

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
        setSearchTerm("");
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
      return;
    }
    
    setIsUnsupportedCountry(false);
    
    // Find country code
    const selectedCountry = countryListForDropdown.find(c => c.name === countryName);
    if (!selectedCountry) {
      console.error("Country not found:", countryName);
      return;
    }
    
    // Get rate from pricing data
    if (data && selectedCountry.code) {
      const entry = data[selectedCountry.code];
      if (entry?.basePrice !== undefined && typeof entry.basePrice === 'number') {
        const markupRate = entry.basePrice * 2;
        const finalRate = Math.max(markupRate, 0.15);
        setCurrentRate(finalRate);
        console.log("Rate updated for", countryName, "to", finalRate);
        return;
      }
    }
    
    // Fallback to default rate
    console.log("Using fallback rate for", countryName);
    setCurrentRate(0.15);
  };

  // Handle country selection
  const handleCountrySelect = (countryName: string) => {
    setSelectedCountryName(countryName);
    setSearchTerm("");
    setShowDropdown(false);
    updateCountryRate(countryName);
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

  // Update this function to not depend on the animation state
  const handleFirstInteraction = () => {
    // setIsPhoneBouncing(false);
  };

  // Render the dial pad UI for the mockups (make it look like the actual app)
  const renderDialPadUI = (isPhoneVersion = true) => {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header: Only shown in desktop version */}
        {!isPhoneVersion && (
          <div className="flex justify-between items-center py-2 px-3 bg-white border-b border-gray-100 mb-2">
            <div className="flex items-center">
              <Image 
                src="/images/zippcall-icon.png" 
                alt="ZippCall" 
                width={24} 
                height={24} 
                className="mr-2"
              />
              <span className="text-zippcall-blue font-medium text-sm">ZippCall</span>
            </div>
            <button className="text-sm text-white bg-blue-500 px-3 py-1 rounded-md">
              Sign Out
            </button>
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 p-3 flex flex-col">
          {/* Phone/Balance Tab Headers (for desktop) */}
          {!isPhoneVersion && (
            <div className="flex border-b mb-3">
              <div className="px-4 py-2 text-sm font-medium text-zippcall-blue border-b-2 border-zippcall-blue">
                Phone
              </div>
              <div className="px-4 py-2 text-sm font-medium text-gray-500">
                Balance
              </div>
            </div>
          )}
          
          {/* Country Selector */}
          <div className="mb-3">
            <div className="bg-green-50 rounded-lg p-2 border border-green-100 mb-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Selected Country</span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Selected
                </span>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 mt-1 p-2 flex items-center">
                <span className="text-lg mr-2">🇺🇸</span>
                <span className="font-medium">UNITED STATES</span>
                <span className="text-gray-500 ml-1">+1</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Phone Number Display */}
          <div className="mb-4 relative">
            <div className="bg-white rounded-lg border border-gray-200 py-3 px-4 text-xl font-medium text-zippcall-blue flex justify-between items-center">
              {phoneNumber}
              <button className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Dial Pad */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
              <button 
                key={digit} 
                className="aspect-square rounded-full bg-blue-50 flex flex-col items-center justify-center"
              >
                <span className="text-2xl font-medium text-zippcall-blue">
                  {digit}
                </span>
                <span className="text-[10px] text-blue-400 mt-[-2px]">
                  {digit === 0 ? '+' : 
                   digit === 7 ? 'PQRS' : 
                   digit === 8 ? 'TUV' : 
                   digit === 9 ? 'WXYZ' :
                   digit === 2 ? 'ABC' :
                   digit === 3 ? 'DEF' :
                   digit === 4 ? 'GHI' :
                   digit === 5 ? 'JKL' :
                   digit === 6 ? 'MNO' : ''}
                </span>
              </button>
            ))}
          </div>
          
          {/* Rate & Call Button */}
          <div className="mt-auto">
            <div className="text-center mb-4 text-gray-700">
              Rate: <span className="font-medium">${currentRate?.toFixed(4)}</span> / min
            </div>
            <button className="w-full py-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call
            </button>
          </div>
        </div>
        
        {/* For desktop, show balance on the side */}
        {!isPhoneVersion && (
          <div className="absolute right-[-230px] top-0 w-[220px] bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium mb-3">Balance</h3>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Available Balance</div>
              <div className="text-3xl font-bold text-zippcall-blue">$9.70</div>
            </div>
            <button className="w-full bg-blue-500 text-white rounded-lg py-2 mt-3">
              Add Funds
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render the pricing calculator UI
  const renderCalculator = () => {
    return (
      <div className="bg-gray-50 p-4 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-zippcall-blue mb-4">
          Where do you want to call?
        </h3>
        
        {/* Country Selector Dropdown */}
        <div className="mb-4 relative" ref={dropdownRef}>
          <label className="text-sm text-gray-500 block mb-1">
            Destination Country:
          </label>
          
          <button 
            onClick={() => { 
              setShowDropdown(!showDropdown);
              handleFirstInteraction();
            }}
            className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-base relative overflow-hidden group"
          >
            <div className="flex items-center">
              {currentSelectedCountry?.flag && (
                <span className="mr-2 text-xl">
                  {currentSelectedCountry.flag}
                </span>
              )}
              <span>{selectedCountryName}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-zippcall-blue mr-1">
                Click to select
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Add ripple effect on hover */}
            <div className="absolute inset-0 w-full h-full scale-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-zippcall-blue/5"></div>
          </button>
          
          {/* Dropdown menu */}
          {showDropdown && (
            <>
              {/* Backdrop on mobile only */}
              <div className="fixed inset-0 bg-black/50 z-[90] lg:hidden" onClick={() => setShowDropdown(false)}></div>
              
              {/* Dropdown */}
              <div className="fixed left-4 right-4 top-1/4 lg:absolute lg:left-auto lg:right-auto lg:top-auto lg:mt-1 lg:w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[100] overflow-hidden max-h-[50vh] lg:max-h-[300px]">
                {/* Close button for mobile only */}
                <div className="sticky top-0 flex items-center justify-between bg-white border-b border-gray-100 p-2 lg:hidden">
                  <span className="text-sm font-medium">Select Country</span>
                  <button 
                    onClick={() => setShowDropdown(false)}
                    className="text-gray-500 p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Search box */}
                <div className="sticky top-0 lg:top-0 p-2 bg-white border-b border-gray-100 z-10">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                    autoFocus
                  />
                </div>
                
                {/* Country list */}
                <div className="p-1 overflow-y-auto" style={{ maxHeight: 'calc(50vh - 110px)' }}>
                  {isLoading ? (
                    <div className="flex justify-center py-2">
                      <svg className="animate-spin h-5 w-5 text-zippcall-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : filteredCountries.length === 0 ? (
                    <div className="text-sm text-gray-500 text-center py-2">No countries found</div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-500 text-center pb-1">{filteredCountries.length} countries available</div>
                      {filteredCountries.map(country => (
                        <button
                          key={country.code}
                          onClick={() => handleCountrySelect(country.name)}
                          className={`flex items-center w-full px-3 py-2 text-sm ${
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
            </>
          )}
        </div>
        
        {/* Price Information - Display only rate per minute */}
        <div className="py-4 px-3 bg-white rounded-lg border border-gray-200 text-center mb-6">
          {isLoading ? (
            <span className="text-sm text-gray-500">Loading rates...</span>
          ) : isUnsupportedCountry ? (
            <span className="text-sm text-orange-500">Sorry, calls to {selectedCountryName} are not supported yet.</span>
          ) : (
            <div>
              <span className="text-sm text-gray-600 block mb-1">Rate to {selectedCountryName}:</span>
              <span className="text-2xl font-bold text-zippcall-blue">${currentRate?.toFixed(4)}</span>
              <span className="text-sm text-gray-600 ml-1">per min</span>
            </div>
          )}
        </div>
        
        {/* Call Button */}
        <Link 
          href="https://app.zippcall.com" 
          className="w-full btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80 flex items-center justify-center rounded-lg relative overflow-hidden group py-0 h-14"
          onClick={handleFirstInteraction}
        >
          {/* Using absolute positioning to ensure perfect centering */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.54 1.06l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-lg font-medium">START CALLING NOW</span>
          </div>
          
          {/* Add ripple effect */}
          <div className="absolute inset-0 w-full h-full scale-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
        </Link>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-zippcall-light-blue/10 to-white py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Centered Content Layout */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zippcall-blue mb-6">
            Call landlines and mobiles <span className="text-zippcall-light-blue">anywhere in the world</span> at <span className="text-zippcall-light-blue">great low rates.</span>
          </h1>
          <p className="text-lg text-zippcall-neutral mb-8">
            Cheap international calls to family, friends, and businesses in over 200 countries worldwide. Call directly from your browser with no downloads, subscriptions, or hidden fees.
          </p>
        </div>

        {/* Two-column Layout: Hero Image + Calculator */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12 max-w-6xl mx-auto">
          {/* Left side: Hero Image */}
          <div className="lg:w-1/2 flex justify-center mb-12 lg:mb-0 relative">
            <div className="relative w-full">
              <Image
                src="/images/hero-cropped.svg"
                alt="ZippCall on multiple devices"
                width={650}
                height={650}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          
          {/* Right side: Calculator */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-zippcall-blue mb-4">Try it now</h2>
              <p className="text-zippcall-neutral mb-6">Check your rate and start calling in seconds</p>
              
              {/* Calculator for interaction */}
              {renderCalculator()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}