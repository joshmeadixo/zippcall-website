'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useRouter } from 'next/navigation';
import enhancedCountryData from '../data/countries.json'; // Adjust path if necessary

// Use a simple map file that at least has country names
const MAP_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Create a mapping from country name to ISO A2 code (common name variations included)
const countryNameToIsoCodeMap: { [key: string]: string } = {
  "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "Andorra": "AD", "Angola": "AO",
  "Antigua and Barbuda": "AG", "Argentina": "AR", "Armenia": "AM", "Australia": "AU", "Austria": "AT",
  "Azerbaijan": "AZ", "Bahamas": "BS", "The Bahamas": "BS", "Bahrain": "BH", "Bangladesh": "BD",
  "Barbados": "BB", "Belarus": "BY", "Belgium": "BE", "Belize": "BZ", "Benin": "BJ",
  "Bhutan": "BT", "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR",
  "Brunei": "BN", "Bulgaria": "BG", "Burkina Faso": "BF", "Burundi": "BI", "Cambodia": "KH",
  "Cameroon": "CM", "Canada": "CA", "Cape Verde": "CV", "Cabo Verde": "CV", "Central African Republic": "CF",
  "CAR": "CF", "Central African Rep.": "CF", "Central African Rep": "CF",
  "Chad": "TD", "Chile": "CL", "China": "CN", "Colombia": "CO", "Comoros": "KM",
  "Congo": "CG", "Republic of Congo": "CG", "Congo, Republic of": "CG",
  "Democratic Republic of the Congo": "CD", "DR Congo": "CD", "Congo, Democratic Republic of": "CD", "DRC": "CD", "Congo-Kinshasa": "CD",
  "Costa Rica": "CR", "Croatia": "HR", "Cuba": "CU",
  "Cyprus": "CY", "Czech Republic": "CZ", "Czechia": "CZ", "Denmark": "DK", "Djibouti": "DJ",
  "Dominica": "DM", "Dominican Republic": "DO", "East Timor": "TL", "Timor-Leste": "TL", "Ecuador": "EC",
  "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Estonia": "EE",
  "Eswatini": "SZ", "Swaziland": "SZ", "Ethiopia": "ET", "Fiji": "FJ", "Finland": "FI",
  "France": "FR", "Gabon": "GA", "Gambia": "GM", "The Gambia": "GM", "Georgia": "GE",
  "Germany": "DE", "Ghana": "GH", "Greece": "GR", "Greenland": "GL", "Kalaallit Nunaat": "GL",
  "Grenada": "GD", "Guatemala": "GT",
  "Guinea": "GN", "Guinea-Bissau": "GW", "Guyana": "GY", "Haiti": "HT", "Honduras": "HN",
  "Hungary": "HU", "Iceland": "IS", "India": "IN", "Indonesia": "ID", "Iran": "IR",
  "Iraq": "IQ", "Ireland": "IE", "Israel": "IL", "Italy": "IT", "Ivory Coast": "CI",
  "Côte d'Ivoire": "CI", "Jamaica": "JM", "Japan": "JP", "Jordan": "JO", "Kazakhstan": "KZ",
  "Kenya": "KE", "Kiribati": "KI", "North Korea": "KP", "South Korea": "KR", "Korea, North": "KP",
  "Korea, South": "KR", "Kosovo": "XK", "Kuwait": "KW", "Kyrgyzstan": "KG", "Laos": "LA",
  "Latvia": "LV", "Lebanon": "LB", "Lesotho": "LS", "Liberia": "LR", "Libya": "LY",
  "Liechtenstein": "LI", "Lithuania": "LT", "Luxembourg": "LU", "Madagascar": "MG", "Malawi": "MW",
  "Malaysia": "MY", "Maldives": "MV", "Mali": "ML", "Malta": "MT", "Marshall Islands": "MH",
  "Mauritania": "MR", "Mauritius": "MU", "Mexico": "MX", "Micronesia": "FM", "Moldova": "MD",
  "Monaco": "MC", "Mongolia": "MN", "Montenegro": "ME", "Morocco": "MA", "Mozambique": "MZ",
  "Myanmar": "MM", "Burma": "MM", "Namibia": "NA", "Nauru": "NR", "Nepal": "NP",
  "Netherlands": "NL", "The Netherlands": "NL", "New Zealand": "NZ", "Nicaragua": "NI", "Niger": "NE",
  "Nigeria": "NG", "North Macedonia": "MK", "Macedonia": "MK", "Norway": "NO", "Oman": "OM", "Pakistan": "PK",
  "Palau": "PW", "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE",
  "Philippines": "PH", "Poland": "PL", "Portugal": "PT", "Qatar": "QA", "Romania": "RO",
  "Russia": "RU", "Russian Federation": "RU", "Rwanda": "RW", "Saint Kitts and Nevis": "KN", "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC", "Samoa": "WS", "San Marino": "SM", "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA", "Senegal": "SN", "Serbia": "RS", "Seychelles": "SC", "Sierra Leone": "SL",
  "Singapore": "SG", "Slovakia": "SK", "Slovenia": "SI", "Solomon Islands": "SB", "Somalia": "SO",
  "Somaliland": "SO",
  "South Africa": "ZA", "South Sudan": "SS", "S. Sudan": "SS",
  "Spain": "ES", "Sri Lanka": "LK", "Sudan": "SD",
  "Suriname": "SR", "Sweden": "SE", "Switzerland": "CH", "Syria": "SY", "Taiwan": "TW",
  "Tajikistan": "TJ", "Tanzania": "TZ", "Thailand": "TH", "Togo": "TG", "Tonga": "TO",
  "Trinidad and Tobago": "TT", "Tunisia": "TN", "Turkey": "TR", "Türkiye": "TR", "Turkmenistan": "TM",
  "Tuvalu": "TV", "Uganda": "UG", "Ukraine": "UA", "United Arab Emirates": "AE", "U.A.E.": "AE",
  "United Kingdom": "GB", "U.K.": "GB", "Great Britain": "GB", "United States": "US", "U.S.A.": "US",
  "United States of America": "US", "Uruguay": "UY", "Uzbekistan": "UZ", "Vanuatu": "VU", "Vatican City": "VA",
  "Holy See": "VA", "Venezuela": "VE", "Vietnam": "VN", "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW"
};

// Helper to normalize country names for better matching
const normalizeCountryName = (name: string): string => {
  return name.toLowerCase()
    .replace(/\./g, '')  // remove periods
    .replace(/\bthe\s+/i, '')  // remove "the" prefix
    .replace(/\s+/g, ' ')  // normalize whitespace
    .replace(/\bdem(\.|ocratic)?\s+rep(\.|ublic)?\s+/i, '') // handle variations of "Democratic Republic"
    .replace(/\bcentral\s+african\s+rep(\.|ublic)?\s+/i, 'central african republic') // normalize CAR
    .trim();
};

// Create a normalized version of the map for lookup
const normalizedCountryNameToIsoCodeMap = Object.entries(countryNameToIsoCodeMap).reduce((acc, [key, value]) => {
  acc[normalizeCountryName(key)] = value;
  return acc;
}, {} as { [key: string]: string });

// Helper to create a mapping from ISO A2 code to our internal slug
const countryCodeToSlugMap = enhancedCountryData.reduce((acc, country) => {
  // Ensure both code and id exist and are strings before adding
  if (country.code && typeof country.code === 'string' && country.id && typeof country.id === 'string') {
    acc[country.code.toUpperCase()] = country.id;
  } else {
    // Log if a country in the data is missing expected fields
    console.warn(`Country data item missing code or id: ${JSON.stringify(country)}`);
  }
  return acc;
}, {} as { [key: string]: string });

// Log all country names from map for debugging
const loggedCountryNames = new Set<string>();

// The main component
const InteractiveMap: React.FC = () => {
  const router = useRouter();
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const loggedPropertiesRef = useRef(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  
  // Add state for map position and zoom
  const [position, setPosition] = useState<[number, number]>([0, 20]);
  const [zoom, setZoom] = useState(1);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Set mobile-optimized position and zoom when device is mobile
      if (isMobileView) {
        setZoom(1.5); // Higher default zoom for mobile
        setPosition([10, 10]); // Position adjusted for better mobile view (focuses more on Europe/Africa/Asia)
      } else {
        // Reset to desktop defaults if resizing from mobile to desktop
        if (zoom === 1.5) {
          setZoom(1);
          setPosition([0, 20]);
        }
      }
      
      // Update map dimensions for responsive scaling
      if (mapContainerRef.current) {
        setMapDimensions({
          width: mapContainerRef.current.offsetWidth,
          height: mapContainerRef.current.offsetHeight
        });
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [zoom]); // Include zoom in dependencies to prevent infinite loop while still checking its value

  // Function to handle zooming in with a simpler approach
  const handleZoomIn = () => {
    console.log("Zooming in from", zoom);
    if (zoom < 5) {
      const newZoom = Math.min(zoom + 0.5, 5);
      setZoom(newZoom);
    }
  };

  // Function to handle zooming out with a simpler approach
  const handleZoomOut = () => {
    console.log("Zooming out from", zoom);
    if (zoom > 1) {
      const newZoom = Math.max(zoom - 0.5, 1);
      setZoom(newZoom);
    }
  };

  // Function to handle map movement
  const handleMoveMap = (direction: 'up' | 'down' | 'left' | 'right') => {
    const moveDistance = 20 / zoom; // Move less when zoomed in
    setPosition(prevPosition => {
      const [x, y] = prevPosition;
      switch (direction) {
        case 'up':
          return [x, y + moveDistance]; // Moving up increases y (moving north)
        case 'down':
          return [x, y - moveDistance]; // Moving down decreases y (moving south)
        case 'left':
          return [x - moveDistance, y]; // Moving left decreases x
        case 'right':
          return [x + moveDistance, y]; // Moving right increases x
        default:
          return prevPosition;
      }
    });
  };

  // Function to reset map view
  const handleResetView = () => {
    if (isMobile) {
      setPosition([10, 10]);
      setZoom(1.5);
    } else {
      setPosition([0, 20]);
      setZoom(1);
    }
  };

  // Function to get ISO code from a country name using our mapping
  const getIsoCodeFromName = (name: string): string | null => {
    if (!name) return null;
    
    // Add this country name to our debug set if it's one of the problem countries
    const lowerName = name.toLowerCase();
    if (
      lowerName.includes('green') || 
      lowerName.includes('congo') || 
      lowerName.includes('sudan') || 
      lowerName.includes('central') ||
      lowerName.includes('somali')
    ) {
      if (!loggedCountryNames.has(name)) {
        console.log(`Debug - Country name from map: "${name}"`);
        loggedCountryNames.add(name);
      }
    }
    
    // Try direct lookup first
    if (countryNameToIsoCodeMap[name]) {
      return countryNameToIsoCodeMap[name];
    }
    
    // Try normalized lookup
    const normalizedName = normalizeCountryName(name);
    if (normalizedCountryNameToIsoCodeMap[normalizedName]) {
      return normalizedCountryNameToIsoCodeMap[normalizedName];
    }
    
    // No match found
    return null;
  };

  const handleCountryClick = (geo: any) => {
    // Get the country name from the map data
    const countryName = geo.properties.name || geo.properties.NAME || "";
    
    if (!countryName) {
      console.warn("No country name found in map data:", geo.properties);
      return;
    }
    
    // Convert country name to ISO A2 code using our mapping
    const countryCode = getIsoCodeFromName(countryName);
    
    if (!countryCode) {
      console.warn(`Could not find ISO code for country: ${countryName}`);
      return;
    }
    
    // Look up the slug using the ISO code
    const slug = countryCodeToSlugMap[countryCode];
    
    if (slug) {
      router.push(`/cheap-calls-to/${slug}`);
    } else {
      console.warn(`No slug found for ISO code: ${countryCode}`);
    }
  };

  return (
    <div 
      ref={mapContainerRef}
      className="relative w-full border border-gray-200 rounded-xl overflow-hidden shadow-md bg-gradient-to-b from-zippcall-light-blue/10 to-white" 
      style={{ height: isMobile ? '400px' : '600px' }}
    >
      <ComposableMap 
        data-tip="" 
        projectionConfig={{ scale: isMobile ? 150 : 160 }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ZoomableGroup 
          center={position} 
          zoom={zoom}
          minZoom={1}
          maxZoom={5}
          translateExtent={[
            [-(isMobile ? 300 : 600), -(isMobile ? 300 : 600)],
            [(isMobile ? 300 : 600), (isMobile ? 300 : 600)]
          ]}
          onMoveStart={(_: any, event: any) => {
            // Prevent default browser behavior which might interfere with dragging
            if (event && event.type === 'mousedown' && event.preventDefault) {
              event.preventDefault();
            }
          }}
          onMoveEnd={(evt: any) => {
            // Keep our position state in sync with the map
            if (evt && evt.coordinates) {
              console.log("Setting position from event", evt.coordinates);
              setPosition(evt.coordinates as [number, number]);
            }
          }}
        >
          <Geographies geography={MAP_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                if (!loggedPropertiesRef.current) {
                    loggedPropertiesRef.current = true;
                }

                // Get the country name from the map data
                const countryName = geo.properties.name || geo.properties.NAME || "";
                
                // Determine if we have data for this country
                const isoCode = getIsoCodeFromName(countryName);
                const hasData = isoCode ? !!countryCodeToSlugMap[isoCode] : false;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={hasData ? () => handleCountryClick(geo) : undefined}
                    onMouseEnter={(evt) => {
                      const { pageX, pageY } = evt;
                      setTooltipPosition({ 
                        x: pageX, 
                        y: pageY 
                      });
                      setTooltipContent(countryName);
                    }}
                    onTouchStart={(evt) => {
                      if (hasData) {
                        const touch = evt.touches[0];
                        setTooltipPosition({ 
                          x: touch.pageX, 
                          y: touch.pageY 
                        });
                        setTooltipContent(countryName);
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: hasData ? "#C5E4FF" : "#EAEDF2", // More visible blue for clickable countries
                        outline: "none",
                        stroke: "#94B0C9", // More visible border color
                        strokeWidth: 0.75, // Thicker borders
                      },
                      hover: {
                        fill: hasData ? "#7DBEFF" : "#EAEDF2", // Strong highlight color for clickable
                        outline: "none",
                        cursor: hasData ? "pointer" : "default",
                        stroke: hasData ? "#4A98E9" : "#94B0C9", // Blue border for hover
                        strokeWidth: hasData ? 1.5 : 0.75, // Thicker border on hover
                      },
                      pressed: {
                        fill: hasData ? "#4A98E9" : "#EAEDF2",
                        outline: "none",
                        stroke: hasData ? "#2E86DE" : "#94B0C9",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Dynamic Tooltip Display */}
      {tooltipContent && (
        <div 
          className="fixed z-10 bg-zippcall-blue text-white px-3 py-2 rounded-md shadow-lg text-sm font-medium transform -translate-x-1/2 -translate-y-full pointer-events-none"
          style={{ 
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10
          }}
        >
          {tooltipContent}
        </div>
      )}
      
      {/* Map instructions */}
      <div className="absolute top-3 left-0 right-0 mx-auto w-auto max-w-sm bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md text-sm font-medium text-zippcall-blue border border-zippcall-light-blue/20 text-center shadow-md">
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tap a country to view calling rates
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute bottom-3 right-3 flex flex-col space-y-2">
        {/* Zoom Controls */}
        <button 
          onClick={handleZoomIn}
          className="bg-white/90 rounded-full h-10 w-10 flex items-center justify-center text-zippcall-blue shadow-md border border-zippcall-light-blue/20 hover:bg-zippcall-light-blue/10 transition-colors"
          aria-label="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-white/90 rounded-full h-10 w-10 flex items-center justify-center text-zippcall-blue shadow-md border border-zippcall-light-blue/20 hover:bg-zippcall-light-blue/10 transition-colors"
          aria-label="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-3 left-3 flex flex-col space-y-2">
        <div className="flex justify-center">
          <button 
            onClick={() => handleMoveMap('up')}
            className="bg-white/90 rounded-full h-10 w-10 flex items-center justify-center text-zippcall-blue shadow-md border border-zippcall-light-blue/20 hover:bg-zippcall-light-blue/10 transition-colors"
            aria-label="Move up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between">
          <button 
            onClick={() => handleMoveMap('left')}
            className="bg-white/90 rounded-full h-10 w-10 flex items-center justify-center text-zippcall-blue shadow-md border border-zippcall-light-blue/20 hover:bg-zippcall-light-blue/10 transition-colors"
            aria-label="Move left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleResetView}
            className="bg-white/90 rounded-full h-10 w-10 flex items-center justify-center text-zippcall-blue shadow-md border border-zippcall-light-blue/20 hover:bg-zippcall-light-blue/10 transition-colors mx-1"
            aria-label="Reset view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          </button>
          <button 
            onClick={() => handleMoveMap('right')}
            className="bg-white/90 rounded-full h-10 w-10 flex items-center justify-center text-zippcall-blue shadow-md border border-zippcall-light-blue/20 hover:bg-zippcall-light-blue/10 transition-colors"
            aria-label="Move right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={() => handleMoveMap('down')}
            className="bg-white/90 rounded-full h-10 w-10 flex items-center justify-center text-zippcall-blue shadow-md border border-zippcall-light-blue/20 hover:bg-zippcall-light-blue/10 transition-colors"
            aria-label="Move down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;