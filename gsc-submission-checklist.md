# Google Search Console Submission Checklist
## Hammond Properties - hammondproperties.com.au

### 🔐 1. Site Verification
Choose ONE of these verification methods:

#### Option A: HTML Meta Tag (Recommended)
☐ Go to Google Search Console → Add Property
☐ Enter: `https://hammondproperties.com.au`
☐ Copy the meta verification tag provided
☐ Add to SEOHead component or homepage `<head>` section:
```html
<meta name="google-site-verification" content="[YOUR-CODE-HERE]" />
```
☐ Click "Verify" in GSC

#### Option B: HTML File Upload
☐ Download the verification file from GSC
☐ Upload to: `public/google[code].html`
☐ Ensure file is accessible at: `https://hammondproperties.com.au/google[code].html`
☐ Click "Verify" in GSC

#### Option C: Google Analytics (if GA already installed)
☐ Verify via existing Google Analytics tracking code

---

### 🗺️ 2. Submit Sitemap
**Priority: HIGH - Do This First**

☐ Go to GSC → Sitemaps (left sidebar)
☐ Enter sitemap URL: `https://hammondproperties.com.au/sitemap.xml`
☐ Click "Submit"
☐ Wait for "Success" status (may take 24-48 hours)

**Expected Results:**
- 50+ URLs should be submitted
- Monitor "Coverage" report for indexing status

---

### ⚡ 3. Request Manual Indexing - Priority Pages
**Important: Do these immediately after sitemap submission**

#### Tier 1 - Critical Business Pages ⏰ DO TODAY
☐ Homepage: `https://hammondproperties.com.au/`
☐ Properties: `https://hammondproperties.com.au/properties`
☐ Holiday Rentals: `https://hammondproperties.com.au/mallacoota-holiday-rentals`
☐ Things to Do: `https://hammondproperties.com.au/things-to-do-mallacoota`

#### Tier 2 - High-Value Property Pages ⏰ THIS WEEK
☐ `/properties/7-allan-drive` (Premium 4BR)
☐ `/properties/south-gateway` (Large 6BR)
☐ `/properties/blue-bird` (Popular 4BR)
☐ `/properties/bella-views` (Waterfront 3BR)
☐ `/properties/gabo-views` (Sea views 3BR)

#### Tier 3 - Landing Pages ⏰ NEXT 2 WEEKS
☐ `/luxury-waterfront-mallacoota`
☐ `/pet-friendly-mallacoota`
☐ `/gabo-island`
☐ `/best-time-to-visit-mallacoota`
☐ `/mallacoota-vs-lakes-entrance`

**How to Request Indexing:**
1. Go to GSC → URL Inspection (top search bar)
2. Paste the full URL
3. Click "Request Indexing" if not indexed
4. Wait 24-72 hours and check status

---

### 📊 4. Monitor Coverage Report
**Check weekly for first month**

☐ Go to GSC → Coverage
☐ Review "Valid" pages (target: 45+ pages)
☐ Check "Excluded" pages and resolve issues:
   - Fix "Duplicate without user-selected canonical"
   - Resolve "Crawled - currently not indexed"
   - Address any "Server error (5xx)" issues

☐ Monitor "Error" section for critical issues
☐ Set up email alerts for coverage issues

---

### ✨ 5. Test Rich Results
**Structured Data Validation**

#### Property Pages Testing
☐ Go to [Rich Results Test](https://search.google.com/test/rich-results)
☐ Test 3-5 property URLs:
   - `https://hammondproperties.com.au/properties/7-allan-drive`
   - `https://hammondproperties.com.au/properties/bella-views`
   - `https://hammondproperties.com.au/properties/blue-bird`

**Expected Rich Results:**
- ✅ LodgingBusiness schema
- ✅ AggregateRating (star ratings)
- ✅ GeoCoordinates (location data)
- ✅ NearbyAttraction (distance information)

#### Blog Posts Testing
☐ Test blog URLs for Article schema:
   - `https://hammondproperties.com.au/discover-mallacoota/gabo-island`
   - `https://hammondproperties.com.au/discover-mallacoota/complete-restaurant-guide`

☐ Fix any schema errors found
☐ Re-request indexing for pages with schema fixes

---

### 🌏 6. Configure International Targeting
☐ Go to GSC → Legacy tools and reports → International Targeting
☐ Set target country: **Australia**
☐ Confirm geographic targeting is appropriate

---

### 📈 7. Performance Baseline Setup
**Track these metrics from Day 1:**

☐ Go to GSC → Performance
☐ Note baseline metrics:
   - Total impressions: ______
   - Total clicks: ______
   - Average CTR: ______%
   - Average position: ______

☐ Set date range to "Last 28 days"
☐ Export initial data for comparison

**Key Queries to Monitor:**
- "mallacoota accommodation"
- "mallacoota holiday rentals"
- "things to do mallacoota"
- "luxury accommodation mallacoota"
- "pet friendly mallacoota"

---

### 🔍 8. Week 1 Monitoring Checklist

#### Day 1-2 After Submission
☐ Verify sitemap processing started
☐ Check no critical crawl errors
☐ Confirm verification still active

#### Day 3-5
☐ Check Coverage report for indexing progress
☐ Monitor for first organic impressions
☐ Review Performance data for early signals

#### Day 7
☐ Full coverage report review
☐ Performance analysis
☐ Address any emerging issues
☐ Request indexing for any missed pages

---

### 🚨 Red Flag Alerts - Contact Support If:
- ❌ Sitemap shows errors after 48 hours
- ❌ Zero pages indexed after 1 week
- ❌ Coverage report shows major errors
- ❌ Manual indexing requests consistently fail
- ❌ Structured data errors in Rich Results Test

---

### 📱 9. Additional Setup (Optional but Recommended)

#### Core Web Vitals
☐ Monitor Page Experience signals
☐ Address any mobile usability issues
☐ Check Core Web Vitals scores

#### Enhanced Features
☐ Submit logo for Google Knowledge Panel
☐ Set up Google My Business integration
☐ Configure Google Analytics 4 linking

---

### 🎯 Success Metrics - 30 Day Goals

**Week 1 Targets:**
- ✅ 80% of sitemap URLs indexed
- ✅ First organic impressions appearing
- ✅ No critical coverage errors

**Week 2 Targets:**
- ✅ 90%+ sitemap coverage
- ✅ 50+ organic impressions daily
- ✅ Property pages showing in search

**Week 4 Targets:**
- ✅ 500+ organic impressions daily
- ✅ 20+ organic clicks daily
- ✅ Top 20 rankings for primary keywords
- ✅ Rich results appearing in SERPs

---

### 📞 Support Resources
- **Google Search Console Help:** https://support.google.com/webmasters
- **Rich Results Testing:** https://search.google.com/test/rich-results
- **Schema.org Documentation:** https://schema.org/LodgingBusiness

---

## Quick Start Summary (15 minutes)

1. **Verify site in GSC** (5 min)
2. **Submit sitemap.xml** (2 min)
3. **Request indexing for homepage and /properties** (3 min)
4. **Test one property page in Rich Results Test** (3 min)
5. **Set performance baseline** (2 min)

**Then schedule weekly 30-minute review sessions to monitor progress and address any issues.**