import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    console.log('Sitemap test route executing...');
    
    // Test if we can read the XSL file
    let xslContent;
    try {
      // Try to read the XSL file from the public directory
      const xslPath = path.join(process.cwd(), 'public', 'sitemap.xsl');
      console.log('Looking for XSL file at:', xslPath);
      
      if (fs.existsSync(xslPath)) {
        xslContent = fs.readFileSync(xslPath, 'utf8');
        console.log('XSL file found and read successfully');
      } else {
        console.log('XSL file not found at path');
        xslContent = 'XSL file not found';
      }
    } catch (err: any) {
      console.error('Error reading XSL file:', err);
      xslContent = `Error reading XSL file: ${err.message}`;
    }
    
    const response = `
    <html>
      <head>
        <title>Sitemap Diagnostics</title>
      </head>
      <body>
        <h1>Sitemap Diagnostics</h1>
        <p>This page is for troubleshooting the sitemap.xml issues.</p>
        
        <h2>XSL File Content Check</h2>
        <pre>${xslContent ? 'XSL file found (first 200 chars): ' + xslContent.substring(0, 200) : 'XSL file not found'}</pre>
        
        <h2>Environment Info</h2>
        <pre>
Node Version: ${process.version}
Current Working Directory: ${process.cwd()}
Is Production: ${process.env.NODE_ENV === 'production'}
        </pre>
      </body>
    </html>
    `;
    
    return new NextResponse(response, {
      headers: {
        'Content-Type': 'text/html',
      }
    });
  } catch (error: any) {
    console.error('Error in test route:', error);
    return new NextResponse('Error in test route: ' + error.message, { status: 500 });
  }
} 