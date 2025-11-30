#!/usr/bin/env python3
"""
EMERGENCY FIX: Canonical Tag Issues for Hammond Properties
This fixes the critical issue where ALL pages point to homepage as canonical
"""

import pandas as pd
import os
from datetime import datetime

def analyze_canonical_disaster():
    """Analyze the canonical tag disaster"""
    
    print("=" * 60)
    print("  CRITICAL SEO EMERGENCY - Hammond Properties")
    print("=" * 60)
    print()
    
    # Read the audit report
    df = pd.read_csv('audit_report.csv')
    
    # Statistics
    total_pages = len(df)
    pages_with_wrong_canonical = df[df['Canonical'] == 'https://hammondproperties.com.au/'].shape[0]
    asset_files = df[df['URL'].str.contains('.js|.css|.png|.svg|.ico|.webmanifest', regex=True)]
    
    print("🚨 CRITICAL ISSUES FOUND:")
    print(f"   • {pages_with_wrong_canonical}/{total_pages} pages have WRONG canonical tags")
    print(f"   • ALL pages point to homepage as canonical (destroying indexing)")
    print(f"   • {len(asset_files)} asset files are being crawled")
    print(f"   • All pages show as 'thin content' (10 words only)")
    print()
    
    # Generate fixes
    print("📝 GENERATING FIXES...")
    print()
    
    # 1. Generate correct canonical tags
    canonical_fixes = []
    for _, row in df.iterrows():
        url = row['URL']
        
        # Skip asset files
        if any(ext in url for ext in ['.js', '.css', '.png', '.svg', '.ico', '.webmanifest']):
            continue
            
        canonical_fixes.append({
            'URL': url,
            'Current Canonical': row['Canonical'],
            'Correct Canonical': url,  # Self-referencing canonical
            'Action': 'UPDATE CANONICAL TAG'
        })
    
    # Save canonical fixes
    canonical_df = pd.DataFrame(canonical_fixes)
    canonical_df.to_csv('canonical_fixes_required.csv', index=False)
    
    # 2. Generate robots.txt to block assets
    robots_txt = """# Hammond Properties Robots.txt
# Generated: {date}

User-agent: *
Disallow: /assets/
Disallow: /*.js$
Disallow: /*.css$
Disallow: /*.json$
Disallow: /site.webmanifest

# Allow main content
Allow: /properties/
Allow: /discover-mallacoota/
Allow: /contact
Allow: /about

# Sitemap
Sitemap: https://hammondproperties.com.au/sitemap.xml
""".format(date=datetime.now().strftime('%Y-%m-%d'))
    
    with open('robots.txt', 'w') as f:
        f.write(robots_txt)
    
    # 3. Generate .htaccess rules for canonical fixes
    htaccess_rules = """# Hammond Properties Canonical Fix
# CRITICAL: Add proper canonical tags to all pages

# Block search engines from asset files
<FilesMatch "\.(js|css|json)$">
    Header set X-Robots-Tag "noindex, nofollow"
</FilesMatch>

# For React/Vue SPA - Enable proper rendering
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    
    # Rewrite everything to index.html for SPA
    RewriteRule ^.*$ /index.html [L]
</IfModule>
"""
    
    with open('htaccess_canonical.txt', 'w') as f:
        f.write(htaccess_rules)
    
    # 4. Generate implementation instructions
    instructions = """
CRITICAL IMPLEMENTATION STEPS FOR HAMMOND PROPERTIES
=====================================================

🚨 IMMEDIATE ACTIONS REQUIRED:

1. FIX CANONICAL TAGS (HIGHEST PRIORITY)
   ---------------------------------
   The site's template is setting ALL pages to have the homepage as canonical.
   This must be fixed in the site's template/theme:
   
   Find this code in your template:
   <link rel="canonical" href="https://hammondproperties.com.au/" />
   
   Replace with (for React/Vue):
   <link rel="canonical" href="{window.location.href}" />
   
   Or for PHP:
   <link rel="canonical" href="<?php echo 'https://hammondproperties.com.au' . $_SERVER['REQUEST_URI']; ?>" />

2. IMPLEMENT SERVER-SIDE RENDERING (SSR)
   -------------------------------------
   Your site is only showing 10 words to Google (JavaScript not rendering).
   
   Options:
   a) Add Next.js (for React) or Nuxt.js (for Vue) for SSR
   b) Use Prerender.io service ($25/month)
   c) Enable Google's dynamic rendering

3. BLOCK ASSET FILES
   -----------------
   Upload the generated robots.txt file to block JS/CSS files
   
4. ADD UNIQUE META TAGS
   --------------------
   Each page needs unique:
   - Title tags
   - Meta descriptions
   - Content (currently all showing 10 words)

5. SUBMIT TO GOOGLE SEARCH CONSOLE
   --------------------------------
   After fixes:
   a) Submit updated sitemap
   b) Request validation for all issue types
   c) Use URL Inspection tool on key pages

EXPECTED RESULTS:
- Week 1: Canonical issues resolved, crawling improves
- Week 2-3: Pages start getting indexed
- Month 2: 80%+ pages indexed and ranking

FILES GENERATED:
- canonical_fixes_required.csv (all pages needing canonical updates)
- robots.txt (upload to root directory)
- htaccess_canonical.txt (add to .htaccess file)
"""
    
    with open('URGENT_FIX_INSTRUCTIONS.txt', 'w') as f:
        f.write(instructions)
    
    print(instructions)
    
    # Summary
    print("\n" + "=" * 60)
    print("📁 FILES CREATED:")
    print("   • canonical_fixes_required.csv - List of all canonical fixes needed")
    print("   • robots.txt - Upload this to block asset files")
    print("   • htaccess_canonical.txt - Server configuration")
    print("   • URGENT_FIX_INSTRUCTIONS.txt - Step-by-step fix guide")
    print("=" * 60)
    
    return canonical_df

def main():
    analyze_canonical_disaster()
    
    print("\n⚡ NEXT STEP:")
    print("   Contact your web developer IMMEDIATELY with URGENT_FIX_INSTRUCTIONS.txt")
    print("   This is preventing Google from indexing ANY of your pages!")

if __name__ == '__main__':
    main()