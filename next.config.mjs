const securityHeaders = [
  // Sets Strict-Transport-Security header
  // Tells browsers to always use HTTPS for the site for the next 2 years
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  // Sets X-Content-Type-Options header
  // Prevents MIME-sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // Sets X-Frame-Options header
  // Prevents clickjacking by blocking framing from other origins
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  // Sets Referrer-Policy header
  // Sends only the origin for cross-origin requests
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  // Sets Permissions-Policy header
  // Disables common potentially sensitive features by default
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  // Example Content-Security-Policy (Needs careful tuning)
  // Allows scripts only from the same origin ('self') and inline scripts (unsafe-inline - often needed for Next.js hydration, but try to remove if possible)
  // Allows styles only from the same origin ('self') and inline styles ('unsafe-inline')
  // Allows images from self and data URIs.
  // Blocks everything else by default.
  // WARNING: This is a basic policy and likely needs adjustment based on your specific needs (CDNs, third-party scripts, etc.)
  // {
  //   key: 'Content-Security-Policy',
  //   value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'; frame-ancestors 'self';"
  // }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};

export default nextConfig; 