import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Simple sitemap route executing...');
    
    const baseUrl = 'https://www.zippcall.com';
    const today = new Date().toISOString().split('T')[0];
    
    // Create a very simple XML without stylesheet reference
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/countries</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
    
    console.log('Simple XML generated successfully');
    
    // Return the XML with proper content type
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  } catch (error) {
    console.error('Error generating simple sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 