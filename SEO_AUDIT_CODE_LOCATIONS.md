# Hammond Properties - SEO Audit Code Reference Guide

This document maps specific SEO findings to their code locations for implementation.

---

## 1. HEADER HIERARCHY ISSUES - FILE LOCATIONS

### Issue 1: Missing H1 on Homepage
**File:** `D:/projects/mallacoota-luxury-revive/src/pages/Index.tsx`

**Problem Area:** Lines 124-296
```tsx
// Current structure:
<PageTransition>
  <SEOHead ... />
  <div className="min-h-screen">
    <Header />
    <main>
      <HeroSection />  // ❌ No H1 in HeroSection
      <PropertyGrid />
      <section>
        <h2>Signature Properties</h2>  // ✅ H2, but no H1 above
```

**Where to Add:** HeroSection component or in Index.tsx main section before PropertyGrid
**Suggested Fix:** Add explicit H1 in hero or create wrapper section

---

### Issue 2: Blog Page Header Hierarchy Jump (H1→H3)
**File:** `D:/projects/mallacoota-luxury-revive/src/pages/Blog.tsx`

**Problem Area:** Lines 220-313
```tsx
// Current structure:
<h1>Discover Mallacoota</h1>  // Line 221 ✅
<section className="py-8 bg-card border-b">
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-semibold">Category</h3>  // Line 248 ❌ SKIP! No H2
      <h3 className="text-sm font-semibold">Season</h3>     // Line 265 ❌ SKIP!
      <h3 className="text-sm font-semibold">Audience</h3>   // Line 282 ❌ SKIP!
      <h3>Activity Level</h3>                              // Line 299 ❌ SKIP!
```

**Fix:** Either add H2 wrapper "Filter Articles" or change H3→button labels

---

### Issue 3: Missing H1 on Property Detail Pages
**File:** `D:/projects/mallacoota-luxury-revive/src/pages/PropertyDetail.tsx`

**Problem Area:** Around line 200-250 (hero section)
```tsx
// Current: Property details rendered but no H1
// Property title appears in PropertyImageCarousel but not as H1
<h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
  {property.title}  // ❌ This should be visible H1, not in carousel
</h1>
```

**Fix:** Ensure property title is rendered as H1 in main content area (not carousel)

---

## 2. SCHEMA MARKUP - FILE LOCATIONS

### Issue 1: Missing Article Schema for Blog Posts
**File:** `D:/projects/mallacoota-luxury-revive/src/pages/BlogDetail.tsx`

**Problem Area:** No schema markup anywhere in file
```tsx
// Current: Zero schema implementation
// What's needed:
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",  // or "BlogPosting"
  "headline": blogPost.title,
  "description": blogPost.excerpt,
  "datePublished": blogPost.datePublished,
  "dateModified": blogPost.dateModified,
  "author": { "@type": "Person", "name": "Amelia Hammond" },
  "image": blogPost.image
}
```

**Fix Location:** Add in useEffect hook, similar to PropertyDetail.tsx (lines 61-200)

---

### Issue 2: Missing FAQPage Schema
**File:** `D:/projects/mallacoota-luxury-revive/src/components/FAQSection.tsx`

**Problem Area:** Lines 21-73 (entire component)
```tsx
// Current: Just renders accordion, no schema
const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = "Frequently Asked Questions"
}) => {
  // Need to add:
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    // Add to document.head
  }, [faqs]);
```

**Fix Location:** Add useEffect hook in FAQSection.tsx

---

### Issue 3: Missing Review Schema
**Files:**
- `D:/projects/mallacoota-luxury-revive/src/pages/PropertyDetail.tsx` (reviews section)
- `D:/projects/mallacoota-luxury-revive/src/pages/Testimonials.tsx`

**Problem Area:** PropertyDetail.tsx shows reviews but no schema
```tsx
// Current review display around line 400-500:
// Shows star ratings and text but no schema

// What's needed:
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "500",
  "bestRating": "5"
}

// And individual reviews:
{
  "@type": "Review",
  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
  "reviewBody": "Excellent property...",
  "author": { "@type": "Person", "name": "Guest Name" },
  "datePublished": "2025-01-01"
}
```

**Fix Location:** Add in PropertyDetail.tsx useEffect, around line 140-200

---

### Issue 4: Organization Schema Duplication
**Files:**
- `D:/projects/mallacoota-luxury-revive/src/pages/Index.tsx` (lines 24-82)
- `D:/projects/mallacoota-luxury-revive/src/pages/Contact.tsx` (lines 39-130)
- `D:/projects/mallacoota-luxury-revive/index.html` (lines 40-91)

**Problem:** Same data in 3 places with inconsistent phone numbers
```
Index.tsx line 33:       "+61401825547"    ✅ Correct
Contact.tsx line 49:     "+61401825547"    ✅ Correct
index.html line 60:      "+61408123456"    ❌ WRONG!
```

**Fix:** Consolidate to index.html only, reference with @id from other files

---

## 3. INTERNAL LINKING - FILE LOCATIONS

### Issue 1: Homepage Missing Key Links
**File:** `D:/projects/mallacoota-luxury-revive/src/pages/Index.tsx`

**Current Links:** Lines 269-285
```tsx
// Currently links to:
- "/properties"
- "/mallacoota-holiday-rentals"
- "/pet-friendly-mallacoota"

// Missing links (should add buttons/sections):
- "/discover-mallacoota"           // Blog hub
- "/things-to-do-mallacoota"       // Activities
- "/about"                         // About us
- "/testimonials"                  // Social proof
```

**Fix Location:** Add sections in Index.tsx around lines 270-290

---

### Issue 2: Property Detail Pages Isolated
**File:** `D:/projects/mallacoota-luxury-revive/src/pages/PropertyDetail.tsx`

**Missing:**
- Links to similar properties
- Links to activity guides
- Links to attractions
- Links to dining/restaurants

**Current:** Lines ~350-400 (property details)
```tsx
// What's there: "Back to properties" link
// What's missing:
- "Other waterfront properties" section
- "Activities near this property" section
- "Local restaurants" section
- "Guest reviews" with review schema
```

**Fix Location:** Add new sections before Footer, around line 400-450

---

### Issue 3: Blog Posts Lacking Cross-Linking
**File:** `D:/projects/mallacoota-luxury-revive/src/pages/BlogDetail.tsx`

**Current:** Lines 30-102 (related blog cards)
```tsx
// Currently shows related blog cards
// Missing: Links to

 relevant properties/experiences

// Add after line 200-ish (after main content):
- "Related properties for this activity" section
- "Plan your visit" CTA links
- "Things to do nearby" links
```

**Fix Location:** Add new sections after BlogHighlights, around line 250-300

---

## 4. BREADCRUMB IMPLEMENTATION - FILE LOCATIONS

### Missing: Breadcrumb Navigation Across All Pages

**Component File:** `D:/projects/mallacoota-luxury-revive/src/components/ui/breadcrumb.tsx`
**Status:** Component EXISTS but NOT USED

**Where Needed:**
1. All pages except homepage
2. Add after Header, before main content
3. Schema: BreadcrumbList in useEffect

**Implementation Template:**
```tsx
// Add to each page file, after <Header />:
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <Link to="/">Home</Link>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <Link to="/current-section">Section</Link>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>Current Page</BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Files to Update:**
- Properties.tsx (after line 193)
- PropertyDetail.tsx (after line 200)
- Blog.tsx (after line 214)
- BlogDetail.tsx (after line 600 approx)
- About.tsx (after line 26)
- Contact.tsx (after line 100 approx)
- All landing pages

---

## 5. URL STRUCTURE CHANGES - FILE LOCATIONS

### Routing Configuration
**File:** `D:/projects/mallacoota-luxury-revive/src/App.tsx`

**Current Routes:** Lines 38-53
```tsx
<Route path="/discover-mallacoota" element={<Discover />} />
<Route path="/discover-mallacoota/:slug" element={<BlogDetail />} />
<Route path="/things-to-do-mallacoota" element={<ThingsToDoMallacoota />} />
<Route path="/mallacoota-holiday-rentals" element={<MallacootaHolidayRentals />} />
<Route path="/pet-friendly-mallacoota" element={<PetFriendlyMallacoota />} />
```

**To Restructure:**
```tsx
// Consolidate under /guides (with 301 redirects from old URLs)
<Route path="/guides" element={<Discover />} />
<Route path="/guides/:slug" element={<BlogDetail />} />
<Route path="/guides/:category/:slug" element={<BlogDetail />} />

// Make category pages explicit
<Route path="/properties/waterfront" element={<WaterfrontProperties />} />
<Route path="/properties/pet-friendly" element={<PetFriendlyProperties />} />
```

**Add 301 Redirects:** Use Redirect.tsx component (lines 1-20)

---

## 6. SEOHead COMPONENT - FILE LOCATIONS

**File:** `D:/projects/mallacoota-luxury-revive/src/components/SEOHead.tsx`

**Strengths:** Lines 1-109
- ✅ Dynamic meta tags
- ✅ Canonical URL management
- ✅ Open Graph tags
- ✅ Twitter cards

**Enhancement Needed:**
- Add per-page image handling (line 15: generic OG image)
- Add robots meta tag option
- Add no-index option for private pages
- Add structured data wrapper support

---

## 7. METADATA BY PAGE - LOCATIONS & STATUS

| Page File | Location | Title | Meta Description | H1 | Schema | Grade |
|---|---|---|---|---|---|---|
| Index.tsx | homepage | SEOHead (line 126) | ✅ | ❌ | LodgingBusiness | 6/10 |
| Properties.tsx | /properties | SEOHead (line 188) | ✅ | ✅ | CollectionPage | 7/10 |
| PropertyDetail.tsx | /properties/[slug] | Dynamic (line 64) | ✅ | ❌ | LodgingBusiness | 5/10 |
| Blog.tsx | /discover-mallacoota | None | ❌ | ✅ | None | 3/10 |
| BlogDetail.tsx | /discover-mallacoota/[slug] | Dynamic | ✅ | ✅ | ❌ | 4/10 |
| About.tsx | /about | SEOHead (line 21) | ✅ | ✅ | None | 6/10 |
| Contact.tsx | /contact | Helmet (line 12) | ✅ | ✅ | LocalBusiness | 7/10 |
| MallacootaHolidayRentals.tsx | /mallacoota-holiday-rentals | Dynamic | ✅ | ✅ | None | 5/10 |

---

## 8. COMPONENT HIERARCHY - DEPENDENCIES

### Components with SEO Implementation:
```
Header.tsx
├─ Navigation links (good structure)
└─ No breadcrumbs (❌ missing)

SEOHead.tsx (utility component)
├─ Used by: Index, Properties, PropertyDetail, About, Contact
├─ Status: ✅ Working well
└─ Enhancement: Add image option parameter

FAQSection.tsx
├─ Used by: Contact, BlogDetail
├─ Status: ❌ Missing schema
└─ Fix: Add FAQPage JSON-LD

Footer.tsx
├─ Links structure
└─ Review: Check for internal links

PropertyCard.tsx
├─ Property listing UI
├─ Status: Links work
└─ Enhancement: Add rich snippets

BlogCard.tsx
├─ Blog post card UI
├─ Status: Links work
└─ Enhancement: Add date/category schema
```

---

## 9. IMPLEMENTATION CHECKLIST WITH FILE REFERENCES

### PHASE 1: Critical Fixes

- [ ] **Add H1 to Homepage**
  - [ ] File: `src/pages/Index.tsx`
  - [ ] Add: `<h1>Luxury Holiday Rentals in Mallacoota</h1>`
  - [ ] Location: HeroSection or main section (before PropertyGrid)

- [ ] **Add H1 to Property Details**
  - [ ] File: `src/pages/PropertyDetail.tsx`
  - [ ] Add: H1 with property name and location
  - [ ] Location: Around line 200 in hero section

- [ ] **Fix Blog Header Hierarchy**
  - [ ] File: `src/pages/Blog.tsx`
  - [ ] Add: H2 between H1 (line 221) and H3s (lines 248, 265, 282, 299)
  - [ ] Change: H3 filter labels to buttons or paragraph tags

- [ ] **Add FAQPage Schema**
  - [ ] File: `src/components/FAQSection.tsx`
  - [ ] Add: useEffect hook with FAQPage JSON-LD schema
  - [ ] Location: Insert after line 24 (after interface definitions)

- [ ] **Add Article Schema to Blog Posts**
  - [ ] File: `src/pages/BlogDetail.tsx`
  - [ ] Add: NewsArticle or BlogPosting schema in useEffect
  - [ ] Location: Similar pattern to PropertyDetail.tsx (lines 61-200)

- [ ] **Consolidate Organization Schema**
  - [ ] Files: `index.html`, `Index.tsx`, `Contact.tsx`
  - [ ] Action: Keep only in `index.html`, reference via @id
  - [ ] Fix: Phone number consistency

### PHASE 2: Schema & Linking Enhancements

- [ ] **Add Review/AggregateRating Schema**
  - [ ] File: `src/pages/PropertyDetail.tsx`
  - [ ] Add: In useEffect around line 140-200
  - [ ] Include: Star ratings, review count, individual reviews

- [ ] **Add Offer Schema (Pricing)**
  - [ ] File: `src/pages/PropertyDetail.tsx`
  - [ ] Add: Offer type with price information
  - [ ] Include: Currency, availability dates

- [ ] **Implement Breadcrumb Navigation**
  - [ ] Files: All pages except homepage
  - [ ] Component: Use `src/components/ui/breadcrumb.tsx`
  - [ ] Add: After Header, before main content
  - [ ] Include: BreadcrumbList schema in useEffect

- [ ] **Add Related Properties Section**
  - [ ] File: `src/pages/PropertyDetail.tsx`
  - [ ] Add: Section with 3-4 similar properties
  - [ ] Location: Before footer (around line 400-450)

- [ ] **Add Related Guides to Property Pages**
  - [ ] File: `src/pages/PropertyDetail.tsx`
  - [ ] Add: Links to relevant activity guides
  - [ ] Example: "Fishing gear" property → Link to "Fishing Guide"

### PHASE 3: Navigation & Structure

- [ ] **Restructure Blog URLs**
  - [ ] File: `src/App.tsx` (routes 38-53)
  - [ ] Change: `/discover-mallacoota/[slug]` → `/guides/[slug]`
  - [ ] Action: Add 301 redirects for old URLs

- [ ] **Create Category Landing Pages**
  - [ ] Files: Create new or repurpose existing
  - [ ] Examples: `/properties/waterfront`, `/properties/pet-friendly`
  - [ ] Include: Category-specific copy and schema

- [ ] **Implement Dynamic Sitemap Generation**
  - [ ] File: Build or configure tool (not in current codebase)
  - [ ] Replace: Static `public/sitemap.xml`
  - [ ] Include: Dynamic update on content changes

---

## 10. QUICK REFERENCE: GREP COMMANDS TO FIND ISSUES

```bash
# Find all pages without H1 in main content
grep -r "className.*h1" src/pages/*.tsx | grep -v "test\|spec"

# Find all pages using SEOHead (good)
grep -r "SEOHead" src/pages/*.tsx

# Find all useEffect hooks with schema setup
grep -r "useEffect.*structured\|useEffect.*schema" src/pages/*.tsx

# Find all internal links
grep -r "Link to=" src/pages/*.tsx | wc -l

# Find property detail pages
grep -r "PropertyDetail\|propertySlug" src/pages/*.tsx

# Find FAQ sections without schema
grep -r "FAQSection" src/pages/*.tsx
```

---

**This reference guide should be used alongside the main audit report for implementation.**
**Update this document as changes are made.**
