#!/usr/bin/env python3
"""
Quick Fix for 404 Errors - Hammond Properties
Generates redirect recommendations for broken pages
"""

import pandas as pd
import argparse
from urllib.parse import urlparse
import os

def generate_redirects(audit_file='audit_report.csv'):
    """Generate redirect recommendations for 404 pages"""
    
    print("🔧 Analyzing 404 errors and generating redirect recommendations...")
    
    # Read audit report
    try:
        df = pd.read_csv(audit_file)
    except FileNotFoundError:
        print(f"❌ Error: {audit_file} not found. Run main_audit.py first!")
        return
    
    # Filter for 404 errors
    errors_404 = df[df['Status Code'] == 404]
    
    if errors_404.empty:
        print("✓ No 404 errors found!")
        return
    
    print(f"Found {len(errors_404)} pages with 404 errors")
    
    # Generate redirect recommendations
    redirects = []
    
    for _, row in errors_404.iterrows():
        url = row['URL']
        path = urlparse(url).path
        
        # Smart redirect logic based on URL patterns
        redirect_to = None
        
        if 'property' in path or 'listing' in path:
            redirect_to = 'https://hammondproperties.com.au/properties/'
        elif 'contact' in path:
            redirect_to = 'https://hammondproperties.com.au/contact/'
        elif 'about' in path:
            redirect_to = 'https://hammondproperties.com.au/about/'
        elif 'blog' in path or 'news' in path:
            redirect_to = 'https://hammondproperties.com.au/blog/'
        else:
            redirect_to = 'https://hammondproperties.com.au/'
        
        redirects.append({
            'Old URL': url,
            'Redirect To': redirect_to,
            'Type': '301',
            'Rule': f'Redirect 301 {path} {redirect_to}'
        })
    
    # Save redirects
    redirects_df = pd.DataFrame(redirects)
    redirects_df.to_csv('redirects_map.csv', index=False)
    
    # Generate .htaccess rules
    with open('htaccess_rules.txt', 'w') as f:
        f.write("# 404 Redirect Rules for Hammond Properties\n")
        f.write("# Add these to your .htaccess file\n\n")
        
        for _, redirect in redirects_df.iterrows():
            f.write(f"{redirect['Rule']}\n")
    
    print(f"✅ Generated {len(redirects)} redirect rules")
    print("📄 Files created:")
    print("   - redirects_map.csv (redirect mapping)")
    print("   - htaccess_rules.txt (ready to add to .htaccess)")
    
    # Print summary
    print("\n📋 Redirect Summary:")
    for i, redirect in enumerate(redirects[:5], 1):
        print(f"{i}. {redirect['Old URL']} → {redirect['Redirect To']}")
    
    if len(redirects) > 5:
        print(f"   ... and {len(redirects) - 5} more")

def main():
    parser = argparse.ArgumentParser(description='Fix 404 errors for Hammond Properties')
    parser.add_argument('--input', default='audit_report.csv', help='Input audit report')
    parser.add_argument('--generate-redirects', action='store_true', default=True, help='Generate redirect map')
    
    args = parser.parse_args()
    
    generate_redirects(args.input)

if __name__ == '__main__':
    main()