#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:4173'; // Vite preview server
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const ROUTES_FILE = path.resolve(__dirname, '..', 'prerender-routes.json');

function loadRoutes() {
  if (!fs.existsSync(ROUTES_FILE)) {
    console.error(
      `❌ ${path.relative(process.cwd(), ROUTES_FILE)} not found. Run "npm run generate-routes" first.`
    );
    process.exit(1);
  }
  const raw = fs.readFileSync(ROUTES_FILE, 'utf8');
  let routes;
  try {
    routes = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to parse ${ROUTES_FILE}:`, err.message);
    process.exit(1);
  }
  if (!Array.isArray(routes) || routes.length === 0) {
    console.error(`❌ ${ROUTES_FILE} is empty or not an array.`);
    process.exit(1);
  }
  return routes;
}

async function prerender() {
  const routes = loadRoutes();
  console.log(`🚀 Prerendering ${routes.length} routes from prerender-routes.json…`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      console.log(`⏳ Prerendering (${i + 1}/${routes.length}): ${route}`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });

      try {
        await page.goto(`${BASE_URL}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        });

        await page
          .waitForFunction(() => document.querySelector('main') !== null, { timeout: 5000 })
          .catch(() => {
            console.log(`⚠️  Timeout waiting for content on ${route}, continuing…`);
          });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const html = await page.content();

        const routePath = route === '/' ? '/index' : route;
        const filePath = path.join(DIST_DIR, routePath, 'index.html');
        const dirPath = path.dirname(filePath);

        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        const cleanHtml = html
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        fs.writeFileSync(filePath, cleanHtml);

        console.log(`✅ Prerendered: ${route} -> ${path.relative(process.cwd(), filePath)}`);
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

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

prerender();
