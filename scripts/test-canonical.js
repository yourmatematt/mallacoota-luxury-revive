#!/usr/bin/env node

import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:8081';

const testRoutes = [
  '/',
  '/properties',
  '/about',
  '/properties/7-allan-drive'
];

async function testCanonicalTags() {
  console.log('🔍 Testing canonical tags...');

  const browser = await puppeteer.launch({ headless: false }); // Show browser for debugging

  try {
    for (const route of testRoutes) {
      const page = await browser.newPage();
      console.log(`\n📄 Testing: ${route}`);

      // Listen to console logs from the page
      page.on('console', msg => {
        if (msg.text().includes('SEOHead') || msg.text().includes('canonical')) {
          console.log(`🔧 [BROWSER]: ${msg.text()}`);
        }
      });

      try {
        await page.goto(`${BASE_URL}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 10000
        });

        // Wait for React to fully render
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check if canonical tag exists
        const canonical = await page.evaluate(() => {
          const link = document.querySelector('link[rel="canonical"]');
          return {
            exists: !!link,
            href: link?.href || null,
            fullHTML: link?.outerHTML || null
          };
        });

        if (canonical.exists) {
          console.log(`✅ Canonical found: ${canonical.href}`);
          console.log(`   HTML: ${canonical.fullHTML}`);
        } else {
          console.log(`❌ No canonical tag found`);
        }

        // Get page title for verification
        const title = await page.title();
        console.log(`📝 Page title: ${title}`);

      } catch (error) {
        console.error(`❌ Error testing ${route}:`, error.message);
      } finally {
        await page.close();
      }
    }

    console.log('\n🎉 Testing completed!');

  } catch (error) {
    console.error('💥 Testing failed:', error);
  } finally {
    await browser.close();
  }
}

testCanonicalTags();