<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

<xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:template match="/">
  <html>
    <head>
      <title>ZippCall Sitemap</title>
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
            <span><xsl:value-of select="count(//sitemap:url)"/></span>
            <span>Total URLs</span>
          </div>
          
          <div class="summary-item">
            <span><xsl:value-of select="count(//sitemap:url[contains(sitemap:loc, '/cheap-calls-to/')])"/></span>
            <span>Country Pages</span>
          </div>
          
          <div class="summary-item">
            <span><xsl:value-of select="count(//sitemap:url[sitemap:priority >= 0.8])"/></span>
            <span>High Priority Pages</span>
          </div>
          
          <div class="summary-item">
            <span><xsl:value-of select="substring(//sitemap:url[1]/sitemap:lastmod, 1, 10)"/></span>
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
          <xsl:for-each select="//sitemap:url[sitemap:priority = 1.0]">
            <tr>
              <td class="url">
                <a href="{sitemap:loc}">
                  <xsl:value-of select="substring-after(sitemap:loc, 'https://www.zippcall.com')"/>
                </a>
              </td>
              <td class="last-mod"><xsl:value-of select="sitemap:lastmod"/></td>
              <td class="change"><xsl:value-of select="sitemap:changefreq"/></td>
              <td class="priority high-priority"><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
          
          <!-- Directory Pages -->
          <tr>
            <td colspan="4" class="category-header">Directory Pages</td>
          </tr>
          <xsl:for-each select="//sitemap:url[sitemap:priority = 0.9]">
            <tr>
              <td class="url">
                <a href="{sitemap:loc}">
                  <xsl:value-of select="substring-after(sitemap:loc, 'https://www.zippcall.com')"/>
                </a>
              </td>
              <td class="last-mod"><xsl:value-of select="sitemap:lastmod"/></td>
              <td class="change"><xsl:value-of select="sitemap:changefreq"/></td>
              <td class="priority high-priority"><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
          
          <!-- Country Pages -->
          <xsl:variable name="countryPages" select="//sitemap:url[sitemap:priority = 0.8]"/>
          <xsl:variable name="continents">
            <continent>Europe</continent>
            <continent>Asia</continent>
            <continent>Africa</continent>
            <continent>Oceania</continent>
            <continent>North America</continent>
            <continent>South America</continent>
          </xsl:variable>
          
          <tr>
            <td colspan="4" class="category-header">Country Pages</td>
          </tr>
          
          <xsl:for-each select="$continents/continent">
            <xsl:variable name="continent" select="."/>
            <xsl:variable name="continentLabel" select="$continent"/>
            
            <!-- Europe -->
            <tr>
              <td colspan="4" style="padding-left: 30px; background: #f5f7fa; color: #4a5568; font-weight: 500;">
                <xsl:value-of select="$continentLabel"/>
              </td>
            </tr>
            
            <xsl:for-each select="$countryPages[contains(preceding-sibling::comment()[1], $continentLabel)]">
              <tr>
                <td class="url">
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="substring-after(sitemap:loc, 'https://www.zippcall.com/cheap-calls-to/')"/>
                  </a>
                </td>
                <td class="last-mod"><xsl:value-of select="sitemap:lastmod"/></td>
                <td class="change"><xsl:value-of select="sitemap:changefreq"/></td>
                <td class="priority high-priority"><xsl:value-of select="sitemap:priority"/></td>
              </tr>
            </xsl:for-each>
          </xsl:for-each>
          
          <!-- Legal Pages -->
          <tr>
            <td colspan="4" class="category-header">Legal Pages</td>
          </tr>
          <xsl:for-each select="//sitemap:url[sitemap:priority = 0.5]">
            <tr>
              <td class="url">
                <a href="{sitemap:loc}">
                  <xsl:value-of select="substring-after(sitemap:loc, 'https://www.zippcall.com')"/>
                </a>
              </td>
              <td class="last-mod"><xsl:value-of select="sitemap:lastmod"/></td>
              <td class="change"><xsl:value-of select="sitemap:changefreq"/></td>
              <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
        
        <footer>
          <p>Generated by ZippCall | <a href="https://www.zippcall.com">Back to Homepage</a></p>
        </footer>
      </div>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet> 