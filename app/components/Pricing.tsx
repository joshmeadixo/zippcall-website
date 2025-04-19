"use client";

import { useState, useEffect, useMemo, useRef } from 'react';

// --- Helper Data --- 
// Static data (still used for fallback names/rates)
const staticPricingData = {
  popular: [
    { country: "United States", code: "US", flag: "🇺🇸", rate: "0.01" },
    { country: "United Kingdom", code: "GB", flag: "🇬🇧", rate: "0.02" },
    { country: "Canada", code: "CA", flag: "🇨🇦", rate: "0.01" },
    { country: "Australia", code: "AU", flag: "🇦🇺", rate: "0.03" },
    { country: "Germany", code: "DE", flag: "🇩🇪", rate: "0.02" },
    { country: "France", code: "FR", flag: "🇫🇷", rate: "0.02" },
  ],
  asia: [
    { country: "China", code: "CN", flag: "🇨🇳", rate: "0.02" },
    { country: "India", code: "IN", flag: "🇮🇳", rate: "0.03" },
    { country: "Japan", code: "JP", flag: "🇯🇵", rate: "0.04" },
    { country: "South Korea", code: "KR", flag: "🇰🇷", rate: "0.03" },
    { country: "Singapore", code: "SG", flag: "🇸🇬", rate: "0.02" },
    { country: "Thailand", code: "TH", flag: "🇹🇭", rate: "0.04" },
  ],
  africa: [
    { country: "South Africa", code: "ZA", flag: "🇿🇦", rate: "0.07" },
    { country: "Nigeria", code: "NG", flag: "🇳🇬", rate: "0.09" },
    { country: "Egypt", code: "EG", flag: "🇪🇬", rate: "0.08" },
    { country: "Kenya", code: "KE", flag: "🇰🇪", rate: "0.10" },
    { country: "Morocco", code: "MA", flag: "🇲🇦", rate: "0.06" },
    { country: "Ghana", code: "GH", flag: "🇬🇭", rate: "0.10" },
  ]
};

// Countries that Twilio doesn't support calling to
const unsupportedCountries = ["China", "Iran"];

// Comprehensive Country Code -> Flag Emoji Mapping
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

// Static data combined for fallback name/rate lookup
const allStaticCountries = [
  ...staticPricingData.popular,
  ...staticPricingData.asia,
  ...staticPricingData.africa
];

// Map code to static info (mainly for fallback name)
const codeToStaticNameMap: { [key: string]: string } = 
  allStaticCountries.reduce((acc, curr) => {
    acc[curr.code] = curr.country;
    return acc;
  }, {} as { [key: string]: string });

// --- Component --- 
interface CountryOption {
  code: string;
  name: string;
  flag?: string;
}

interface PricingDataEntry {
    finalPrice: number;
    countryName?: string; // Optional name from API
    currency?: string;
}

export default function Pricing() {
  const [selectedCountryName, setSelectedCountryName] = useState("United Kingdom");
  const [minutes, setMinutes] = useState(10);
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [calculatedCost, setCalculatedCost] = useState<string | null>(null);
  const [isUnsupportedCountry, setIsUnsupportedCountry] = useState(false);
  
  const [allPricingData, setAllPricingData] = useState<Record<string, PricingDataEntry> | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [countryListForDropdown, setCountryListForDropdown] = useState<CountryOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all pricing data on mount
  useEffect(() => {
    const fetchAllPricing = async () => {
      setIsInitialLoading(true);
      setInitialError(null);
      try {
        const response = await fetch(`https://app.zippcall.com/api/pricing/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Record<string, PricingDataEntry> = await response.json();
        if (typeof data === 'object' && data !== null) {
            setAllPricingData(data);
            const countries: CountryOption[] = Object.keys(data)
              .map(code => ({
                code: code,
                name: data[code].countryName || codeToStaticNameMap[code] || code, 
                flag: countryCodeToFlagMap[code]
              }))
              .sort((a, b) => a.name.localeCompare(b.name));
            setCountryListForDropdown(countries);
            if (!countries.some(c => c.name === selectedCountryName)) {
              setSelectedCountryName(countries[0]?.name || "");
            }
        } else {
            throw new Error("Invalid data format received from API.");
        }
      } catch (e: any) {
        console.error("Failed to fetch all pricing:", e);
        setInitialError("Could not load live pricing data. Using estimates.");
        const staticCountries = allStaticCountries
            .map(c => ({ 
                code: c.code, 
                name: c.country, 
                flag: countryCodeToFlagMap[c.code]
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
        setCountryListForDropdown(staticCountries);
        if (!staticCountries.some(c => c.name === selectedCountryName)) {
            setSelectedCountryName(staticCountries[0]?.name || "");
        }
      }
      setIsInitialLoading(false);
    };
    fetchAllPricing();
  }, []);

  // Update rate when country changes or allPricingData loads
  useEffect(() => {
    // Check if the selected country is in the unsupported list
    if (unsupportedCountries.includes(selectedCountryName)) {
      setIsUnsupportedCountry(true);
      setCurrentRate(null);
      return;
    }
    
    setIsUnsupportedCountry(false);
    let wholesaleRate: number | null = null;
    const selectedCountryCode = countryListForDropdown.find(c => c.name === selectedCountryName)?.code;
    if (allPricingData && selectedCountryCode) {
        const liveEntry = allPricingData[selectedCountryCode];
        if (liveEntry?.finalPrice !== undefined && typeof liveEntry.finalPrice === 'number') {
            wholesaleRate = liveEntry.finalPrice;
        } 
    }
    if (wholesaleRate === null && !isInitialLoading) { 
        const staticCountry = allStaticCountries.find(c => c.country === selectedCountryName);
        if (staticCountry?.rate) {
            wholesaleRate = parseFloat(staticCountry.rate);
        }
    }
    let finalRate: number | null = null;
    if (wholesaleRate !== null) {
      finalRate = wholesaleRate;
    }
    setCurrentRate(finalRate);
  }, [selectedCountryName, allPricingData, isInitialLoading, countryListForDropdown]);

  // Calculate cost when rate or minutes change
  useEffect(() => {
    if (currentRate !== null) {
      const cost = (currentRate * minutes).toFixed(2);
      setCalculatedCost(cost);
    } else {
      setCalculatedCost(null);
    }
  }, [currentRate, minutes]);

  // Filter countries for dropdown based on search term
  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return countryListForDropdown;
    }
    return countryListForDropdown.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, countryListForDropdown]);

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountryName(countryName);
    setSearchTerm("");
    
    // Try blurring the currently focused element to close the dropdown
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Keep the attribute removal as a potential fallback/cleanup
    const elem = dropdownRef.current;
    if (elem) {
        elem.removeAttribute('open'); 
    }
  };

  const currentSelectedCountry = countryListForDropdown.find(c => c.name === selectedCountryName);

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">
            Transparent, Affordable Pricing
          </h2>
          <p className="text-lg text-zippcall-neutral max-w-3xl mx-auto">
            Make international calls at a fraction of the cost of traditional providers. 
            No hidden fees, no subscriptions, just pay for what you use.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-zippcall-light-blue/20 overflow-visible max-w-4xl mx-auto p-8">
          <h3 className="text-2xl font-bold text-zippcall-blue mb-6 text-center">Estimate Your Call Cost</h3>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="w-full md:w-1/2 relative">
              <label htmlFor="country-select-btn" className="block text-sm font-medium text-zippcall-neutral mb-1">Select Country:</label>
              <div className="dropdown w-full static" ref={dropdownRef}>
                <button tabIndex={0} id="country-select-btn" className="btn btn-outline border-zippcall-light-blue/30 text-zippcall-blue bg-white w-full justify-start font-normal hover:border-zippcall-blue/40">
                  {currentSelectedCountry?.flag && <span className="mr-2 text-lg">{currentSelectedCountry.flag}</span>}
                  {currentSelectedCountry?.name || "Select Country..."}
                  <span className="ml-auto">▼</span>
                </button>
                <ul tabIndex={0} className="dropdown-content z-[999] menu p-0 shadow bg-base-100 rounded-box w-full mt-1 max-h-[300px] overflow-y-auto flex-nowrap absolute">
                  <li className="sticky top-0 z-10 bg-base-100 px-2 pt-2 pb-1 border-b border-base-200">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      className="input input-bordered input-sm w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </li>
                  <div className="p-2">
                    {isInitialLoading && <li><span className="loading loading-dots loading-sm mx-auto"></span></li>}
                    {!isInitialLoading && filteredCountries.length === 0 && <li className="px-4 py-2"><a>No countries found</a></li>}
                    {!isInitialLoading && filteredCountries.map(country => (
                      <li key={country.code}>
                        <a onClick={() => handleCountrySelect(country.name)} className={`${selectedCountryName === country.name ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"} flex items-center`}>
                          {country.flag && <span className="mr-2 text-lg">{country.flag}</span>}
                          {country.name}
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="minutes-slider" className="block text-sm font-medium text-zippcall-neutral mb-1">Select Minutes: {minutes}</label>
              <input
                id="minutes-slider"
                type="range"
                min="1"
                max="120"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="range range-primary bg-zippcall-light-blue/20 accent-zippcall-blue w-full h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-8 text-center p-6 bg-zippcall-cream rounded-lg border border-zippcall-blue/10 shadow-inner min-h-[100px] flex items-center justify-center">
            {isInitialLoading && (
              <div className="text-zippcall-neutral">Loading live rates... <span className="loading loading-spinner loading-sm"></span></div>
            )}
            {initialError && !isInitialLoading && (
              <div className="text-orange-600 font-medium text-sm">Error: {initialError}</div>
            )}
            {!isInitialLoading && isUnsupportedCountry && (
              <div className="text-orange-600 font-medium">
                <p>ZippCall does not currently support calls to {selectedCountryName}, we are working to add this soon.</p>
              </div>
            )}
            {!isInitialLoading && !isUnsupportedCountry && currentRate !== null && calculatedCost !== null && (
              <div>
                {initialError && <p className="text-xs text-orange-500 mb-2">Could not load live rate, showing estimate.</p>}
                <p className="text-lg text-zippcall-neutral">
                  Rate for <span className="font-bold text-zippcall-blue">{selectedCountryName}</span>: <span className="font-bold text-zippcall-blue">${currentRate.toFixed(2)}</span>/minute
                </p>
                <p className="text-3xl font-bold text-zippcall-blue mt-2">
                  Estimated cost for {minutes} minutes: <span className="text-zippcall-light-blue">${calculatedCost}</span>
                </p>
              </div>
            )}
            {!isInitialLoading && !isUnsupportedCountry && !initialError && currentRate === null && (
              <div className="text-zippcall-neutral">Rate not available for {selectedCountryName}.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 