// Script to generate all routes for prerendering
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static routes from App.tsx
const staticRoutes = [
  '/',
  '/properties',
  '/discover-mallacoota',
  '/testimonials',
  '/about',
  '/contact',
  '/mallacoota-holiday-rentals',
  '/things-to-do-mallacoota',
  '/pet-friendly-mallacoota',
  '/luxury-waterfront-mallacoota',
  '/discover-mallacoota/gabo-island'
];

// Property slugs extracted from properties.ts data
const propertyRoutes = [
  '/properties/7-allan-drive',
  '/properties/yollys-cottage',
  '/properties/10-allan-drive',
  '/properties/12-allan-drive',
  '/properties/15-allan-drive',
  '/properties/unit-3-lakeside-lodge',
  '/properties/unit-5-lakeside-lodge',
  '/properties/unit-6-lakeside-lodge',
  '/properties/mallacoota-escape',
  '/properties/mallacoota-inlet-views',
  '/properties/the-boatshed',
  '/properties/the-deck-house',
  '/properties/the-jetty-house',
  '/properties/the-shack'
];

// Blog/discover routes (add more as needed)
const discoverRoutes = [
  // Add more blog routes here based on your blog content
];

// Combine all routes
const allRoutes = [
  ...staticRoutes,
  ...propertyRoutes,
  ...discoverRoutes
];

console.log('All routes to prerender:');
console.log(JSON.stringify(allRoutes, null, 2));

// Save routes to a JSON file for vite config
fs.writeFileSync(
  path.join(__dirname, '..', 'prerender-routes.json'),
  JSON.stringify(allRoutes, null, 2)
);

console.log(`\n✅ Generated ${allRoutes.length} routes for prerendering`);
console.log('📁 Saved to: prerender-routes.json');