import { NextResponse } from 'next/server';
import countryData from '../data/countries.json';

// Group countries by continent
const groupCountriesByContinent = () => {
  const grouped: Record<string, Array<typeof countryData[0]>> = {};
  
  for (const country of countryData) {
    if (!grouped[country.continent]) {
      grouped[country.continent] = [];
    }
    grouped[country.continent].push(country);
  }
  
  return grouped;
};

// Format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export async function GET() {
  const baseUrl = 'https://www.zippcall.com'; // Update with your production URL
  const lastMod = formatDate(new Date());
  
  // Group countries by continent
  const countriesByContinent = groupCountriesByContinent();
  
  // Create XML with proper indentation, comments, and stylesheet reference
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Directory Pages -->
  <url>
    <loc>${baseUrl}/countries</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Country Pages By Continent -->`;

  // Add country pages grouped by continent
  for (const [continent, countries] of Object.entries(countriesByContinent)) {
    xml += `\n  
  <!-- ${continent} -->`;
    
    for (const country of countries) {
      xml += `
  <url>
    <loc>${baseUrl}/cheap-calls-to/${country.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }
  
  // Add legal pages
  xml += `
  
  <!-- Legal Pages -->
  <url>
    <loc>${baseUrl}/terms-of-service</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/legal</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
  
  // Return the XML with proper content type
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400' // Cache for 24 hours
    }
  });
} 