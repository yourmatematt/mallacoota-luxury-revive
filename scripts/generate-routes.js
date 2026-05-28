#!/usr/bin/env node
// Generate the full route list for prerendering by pulling live property + blog
// slugs from Supabase. Output: prerender-routes.json at repo root.
//
// Reuses the anon key from fetch-property-data.js (already public on prod).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://iqdmesndmfphlevakgqe.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZG1lc25kbWZwaGxldmFrZ3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NzkwNTksImV4cCI6MjA2OTE1NTA1OX0.T_P1jKxpXp0RPZeJJN4vzJEwDPdqM9WvIQTELbz2Ato';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Static routes mirror the wired routes in src/App.tsx — keep in sync.
const STATIC_ROUTES = [
  '/',
  '/properties',
  '/discover-mallacoota',
  '/testimonials',
  '/about',
  '/contact',
  '/mallacoota-holiday-rentals',
  '/things-to-do-mallacoota',
  '/pet-friendly-mallacoota',
  // 5 topic landing pages — previously missing from prerender output (FE audit flag).
  '/mallacoota-fishing-accommodation',
  '/mallacoota-kayaking-holidays',
  '/mallacoota-family-holidays',
  '/mallacoota-summer-holidays',
  '/mallacoota-winter-getaway',
  // Redirect-target route (keeps the inbound link warm).
  '/luxury-waterfront-mallacoota',
  // Gabo Island is a dedicated route nested under /discover-mallacoota.
  '/discover-mallacoota/gabo-island',
];

async function fetchPropertySlugs() {
  const { data, error } = await supabase
    .from('Properties')
    .select('slug')
    .order('slug');
  if (error) {
    throw new Error(`Supabase Properties query failed: ${error.message}`);
  }
  return (data ?? [])
    .map((row) => row.slug)
    .filter(Boolean);
}

async function fetchBlogSlugs() {
  const { data, error } = await supabase
    .from('Discover Mallacoota Blogs')
    .select('slug, published_date')
    .not('slug', 'is', null)
    .not('published_date', 'is', null)
    .order('published_date', { ascending: false });
  if (error) {
    throw new Error(`Supabase blog query failed: ${error.message}`);
  }
  return (data ?? [])
    .map((row) => row.slug)
    .filter(Boolean);
}

async function main() {
  console.log('🔍 Pulling slugs from Supabase…');

  const [propertySlugs, blogSlugs] = await Promise.all([
    fetchPropertySlugs(),
    fetchBlogSlugs(),
  ]);

  console.log(`  • ${propertySlugs.length} property slugs`);
  console.log(`  • ${blogSlugs.length} blog slugs`);

  const propertyRoutes = propertySlugs.map((s) => `/properties/${s}`);
  const blogRoutes = blogSlugs
    .map((s) => `/discover-mallacoota/${s}`)
    // De-dupe in case the dedicated GaboIsland route is also a blog row.
    .filter((r) => !STATIC_ROUTES.includes(r));

  const allRoutes = Array.from(
    new Set([...STATIC_ROUTES, ...propertyRoutes, ...blogRoutes])
  );

  const outputPath = path.join(__dirname, '..', 'prerender-routes.json');
  fs.writeFileSync(outputPath, JSON.stringify(allRoutes, null, 2) + '\n');

  console.log(`\n✅ Wrote ${allRoutes.length} routes to ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((err) => {
  console.error('💥 generate-routes failed:', err);
  process.exit(1);
});
