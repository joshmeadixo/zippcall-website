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

export async function GET(request: Request) {
  try {
    console.log('Sitemap.xml route handler executing...');
    
    // Check if the request prefers HTML (browser) or XML (bots/tools)
    const acceptHeader = request.headers.get('accept') || '';
    console.log(`Received Accept header: ${acceptHeader}`);
    const preferHtml = acceptHeader.includes('text/html') && !request.url.includes('noxsl');
    console.log(`Prefer HTML evaluated to: ${preferHtml}`);
    
    const baseUrl = 'https://www.zippcall.com'; // Update with your production URL
    const lastMod = formatDate(new Date());
    
    // Group countries by continent
    const countriesByContinent = groupCountriesByContinent();
    console.log('Grouped countries by continent');
    
    // If the client prefers HTML (browser request), serve a styled HTML page
    if (preferHtml) {
      console.log('HTML version requested, generating complex styled sitemap...');
      
      // *** Restore Original Complex HTML Generation with added logging ***
      console.log('Calculating page counts...');
      const pageCounts = countPagesByType(countriesByContinent);
      console.log(`Page counts calculated: ${JSON.stringify(pageCounts)}`);

      let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>ZippCall Sitemap</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      color: #333;
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      background: linear-gradient(to right, #0062cc, #258cfb);
      color: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 500;
    }
    
    .subtitle {
      margin-top: 5px;
      font-size: 16px;
      opacity: 0.9;
    }
    
    .summary {
      background: #f8f9fa;
      border-radius: 6px;
      padding: 15px 20px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    }
    
    .summary-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .summary-item span:first-child {
      font-size: 22px;
      font-weight: 500;
      color: #0062cc;
    }
    
    .summary-item span:last-child {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    
    th {
      background: #f1f3f5;
      padding: 12px 15px;
      text-align: left;
      font-weight: 500;
      font-size: 15px;
      color: #444;
    }
    
    td {
      padding: 12px 15px;
      border-top: 1px solid #eee;
      font-size: 14px;
    }
    
    tr:hover td {
      background: #f8f9fa;
    }
    
    .url {
      width: 60%;
      word-break: break-all;
    }
    
    .url a {
      color: #0062cc;
      text-decoration: none;
    }
    
    .url a:hover {
      text-decoration: underline;
    }
    
    .priority, .change, .last-mod {
      width: 10%;
      text-align: center;
    }
    
    .priority {
      color: #666;
    }
    
    .high-priority {
      font-weight: 500;
      color: #0062cc;
    }
    
    .category-header {
      background: #edf2f7;
      padding: 10px 15px;
      font-weight: 500;
      color: #334155;
      font-size: 16px;
      border-top: 1px solid #ddd;
    }
    
    .continent-header {
      padding-left: 30px;
      background: #f5f7fa;
      color: #4a5568;
      font-weight: 500;
    }
    
    footer {
      text-align: center;
      margin-top: 30px;
      padding: 15px;
      color: #666;
      font-size: 14px;
    }
    
    footer a {
      color: #0062cc;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      .summary {
        flex-direction: column;
        gap: 10px;
      }
      .summary-item {
        padding: 5px 0;
      }
      .last-mod, .change {
        display: none;
      }
      .url {
        width: 70%;
      }
      .priority {
        width: 30%;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>ZippCall Sitemap</h1>
      <div class="subtitle">Sitemap for the ZippCall website</div>
    </div>
  </header>
  
  <div class="container">
    <div class="summary">
      <div class="summary-item">
        <span>${pageCounts.total}</span>
        <span>Total URLs</span>
      </div>
      
      <div class="summary-item">
        <span>${pageCounts.countryPages}</span>
        <span>Country Pages</span>
      </div>
      
      <div class="summary-item">
        <span>${pageCounts.highPriorityPages}</span>
        <span>High Priority Pages</span>
      </div>
      
      <div class="summary-item">
        <span>${lastMod}</span>
        <span>Last Updated</span>
      </div>
    </div>
    
    <table>
      <tr>
        <th class="url">URL</th>
        <th class="last-mod">Last Modified</th>
        <th class="change">Change Freq</th>
        <th class="priority">Priority</th>
      </tr>
      
      <!-- Main Pages -->
      <tr>
        <td colspan="4" class="category-header">Main Pages</td>
      </tr>
      <tr>
        <td class="url">
          <a href="${baseUrl}/">/</a>
        </td>
        <td class="last-mod">${lastMod}</td>
        <td class="change">weekly</td>
        <td class="priority high-priority">1.0</td>
      </tr>
      
      <!-- Directory Pages -->
      <tr>
        <td colspan="4" class="category-header">Directory Pages</td>
      </tr>
      <tr>
        <td class="url">
          <a href="${baseUrl}/countries">/countries</a>
        </td>
        <td class="last-mod">${lastMod}</td>
        <td class="change">weekly</td>
        <td class="priority high-priority">0.9</td>
      </tr>
      
      <!-- Country Pages By Continent -->
      <tr>
        <td colspan="4" class="category-header">Country Pages</td>
      </tr>`;

      console.log('Starting continent loop...');
      // Add country pages grouped by continent
      for (const [continent, countries] of Object.entries(countriesByContinent)) {
        console.log(`Processing continent: ${continent}`);
        htmlContent += `
      <tr>
        <td colspan="4" class="continent-header">${continent}</td>
      </tr>`;
        
        for (const country of countries) {
          // console.log(`  Adding country: ${country.id}`); // Optional: log each country if needed
          htmlContent += `
      <tr>
        <td class="url">
          <a href="${baseUrl}/cheap-calls-to/${country.id}">/cheap-calls-to/${country.id}</a>
        </td>
        <td class="last-mod">${lastMod}</td>
        <td class="change">monthly</td>
        <td class="priority high-priority">0.8</td>
      </tr>`;
        }
      }
      console.log('Finished continent loop.');
      
      // Add legal pages
      console.log('Adding legal pages...');
      htmlContent += `
      
      <!-- Legal Pages -->
      <tr>
        <td colspan="4" class="category-header">Legal Pages</td>
      </tr>
      <tr>
        <td class="url">
          <a href="${baseUrl}/terms-of-service">/terms-of-service</a>
        </td>
        <td class="last-mod">${lastMod}</td>
        <td class="change">yearly</td>
        <td class="priority">0.5</td>
      </tr>
      <tr>
        <td class="url">
          <a href="${baseUrl}/privacy-policy">/privacy-policy</a>
        </td>
        <td class="last-mod">${lastMod}</td>
        <td class="change">yearly</td>
        <td class="priority">0.5</td>
      </tr>
      <tr>
        <td class="url">
          <a href="${baseUrl}/legal">/legal</a>
        </td>
        <td class="last-mod">${lastMod}</td>
        <td class="change">yearly</td>
        <td class="priority">0.5</td>
      </tr>
    </table>
    
    <footer>
      <p>Generated by ZippCall | <a href="https://www.zippcall.com">Back to Homepage</a> | <a href="${request.url}?noxsl">View XML Version</a></p>
    </footer>
  </div>
</body>
</html>`;

      console.log('Complex HTML sitemap generated successfully');
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400'
        }
      });
    }
    
    // Otherwise, create the standard XML sitemap
    console.log('XML version requested or browser check failed');
    // Create XML with proper indentation and comments
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
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
    
    console.log('XML generated successfully');
    
    // Return the XML with proper content type
    const response = new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400' // Cache for 24 hours
      }
    });
    
    console.log('Response created, returning XML...');
    return response;
  } catch (error: any) {
    console.error('Error generating sitemap:', error);
    
    // Return a simple XML response in case of error
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.zippcall.com/</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`, {
      headers: {
        'Content-Type': 'application/xml',
      }
    });
  }
}

// Helper function to count the number of pages by type
function countPagesByType(countriesByContinent: Record<string, Array<any>>) {
  // Count country pages
  let countryPages = 0;
  for (const countries of Object.values(countriesByContinent)) {
    countryPages += countries.length;
  }
  
  // Count other pages
  const mainPages = 1; // Homepage
  const directoryPages = 1; // Countries page
  const legalPages = 3; // Terms, Privacy, Legal
  
  // Calculate high priority pages (priority >= 0.8)
  const highPriorityPages = mainPages + directoryPages + countryPages;
  
  // Calculate total pages
  const total = mainPages + directoryPages + countryPages + legalPages;
  
  return {
    countryPages,
    highPriorityPages,
    total
  };
} 