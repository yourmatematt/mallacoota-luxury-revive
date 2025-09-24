#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:4173'; // Vite preview server
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

// All routes to prerender
const routes = [
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
  '/discover-mallacoota/gabo-island',
  // Property routes
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

async function prerender() {
  console.log('🚀 Starting prerendering...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      console.log(`⏳ Prerendering (${i + 1}/${routes.length}): ${route}`);

      const page = await browser.newPage();

      // Set viewport
      await page.setViewport({ width: 1200, height: 800 });

      try {
        // Navigate to the route
        await page.goto(`${BASE_URL}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        // Wait for React to render
        await page.waitForFunction(
          () => document.querySelector('main') !== null,
          { timeout: 5000 }
        ).catch(() => {
          console.log(`⚠️  Timeout waiting for content on ${route}, continuing...`);
        });

        // Additional wait for dynamic content
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the HTML
        const html = await page.content();

        // Create directory structure
        const routePath = route === '/' ? '/index' : route;
        const filePath = path.join(DIST_DIR, routePath, 'index.html');
        const dirPath = path.dirname(filePath);

        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        // Clean up HTML
        const cleanHtml = html
          .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();

        // Write the HTML file
        fs.writeFileSync(filePath, cleanHtml);

        console.log(`✅ Prerendered: ${route} -> ${filePath}`);

      } catch (error) {
        console.error(`❌ Failed to prerender ${route}:`, error.message);
      } finally {
        await page.close();
      }
    }

    console.log('🎉 Prerendering completed!');

  } catch (error) {
    console.error('💥 Prerendering failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

prerender();