import { MetadataRoute } from 'next';

// Define the base URL for your site
const baseUrl = 'https://www.zippcall.com'; // <-- Replace with your actual production URL

// Define the allowed change frequency types explicitly from MetadataRoute
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[0]['changeFrequency']>;

export default function sitemap(): MetadataRoute.Sitemap {
  // Add static routes here
  const staticRoutes = [
    '/', // Homepage
    // Add other static pages here as they are created, e.g.:
    // '/about',
    // '/pricing',
    // '/contact'
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(), // Use current date, or a specific date for truly static content
    // Cast the specific string literals to the defined ChangeFrequency type
    changeFrequency: (route === '/' ? 'weekly' : 'monthly') as ChangeFrequency,
    priority: route === '/' ? 1.0 : 0.8, // Example: Homepage is highest priority
  }));

  // TODO: Add dynamic routes here (e.g., blog posts) if applicable
  const dynamicEntries: MetadataRoute.Sitemap = []; // Initialize as empty array

  return [
    ...staticEntries,
    ...dynamicEntries,
  ];
} 