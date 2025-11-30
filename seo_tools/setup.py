#!/usr/bin/env python3
"""
Hammond Properties SEO Tools Setup Script
Quick setup and basic tool runner
"""

import os
import sys
import subprocess
import requests
import json
from urllib.parse import urlparse
import csv

def install_dependencies():
    """Install required dependencies"""
    print("Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("✗ Failed to install dependencies")
        return False

def basic_audit(domain, output_file="basic_audit.csv"):
    """Run a basic SEO audit"""
    print(f"Running basic audit for {domain}...")

    # Common pages to check
    base_url = f"https://{domain}"
    test_urls = [
        f"{base_url}/",
        f"{base_url}/about",
        f"{base_url}/contact",
        f"{base_url}/properties",
        f"{base_url}/discover-mallacoota",
    ]

    results = []

    for url in test_urls:
        try:
            response = requests.get(url, timeout=10)

            # Basic analysis
            result = {
                'url': url,
                'status_code': response.status_code,
                'content_length': len(response.content),
                'title': '',
                'meta_description': '',
                'canonical': '',
                'issues': []
            }

            if response.status_code == 200:
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(response.content, 'html.parser')

                # Extract basic SEO elements
                title_tag = soup.find('title')
                result['title'] = title_tag.get_text(strip=True) if title_tag else ''

                meta_desc = soup.find('meta', attrs={'name': 'description'})
                result['meta_description'] = meta_desc.get('content', '') if meta_desc else ''

                canonical_tag = soup.find('link', attrs={'rel': 'canonical'})
                result['canonical'] = canonical_tag.get('href', '') if canonical_tag else ''

                # Check for basic issues
                if not result['title']:
                    result['issues'].append('missing_title')
                if not result['meta_description']:
                    result['issues'].append('missing_meta_description')
                if not result['canonical']:
                    result['issues'].append('missing_canonical')

            else:
                result['issues'].append(f'http_error_{response.status_code}')

            results.append(result)
            print(f"  ✓ {url} - Status: {response.status_code}")

        except Exception as e:
            print(f"  ✗ {url} - Error: {e}")
            results.append({
                'url': url,
                'status_code': 'ERROR',
                'content_length': 0,
                'title': '',
                'meta_description': '',
                'canonical': '',
                'issues': [f'request_error: {str(e)}']
            })

    # Save results
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        if results:
            writer = csv.DictWriter(f, fieldnames=results[0].keys())
            writer.writeheader()
            for result in results:
                # Convert issues list to string
                result['issues'] = '; '.join(result['issues']) if isinstance(result['issues'], list) else result['issues']
                writer.writerow(result)

    print(f"✓ Basic audit complete. Results saved to {output_file}")
    return results

def generate_quick_fixes(audit_results):
    """Generate quick fix recommendations"""
    print("\n=== Quick Fix Recommendations ===")

    for result in audit_results:
        url = result['url']
        issues = result['issues'].split('; ') if result['issues'] else []

        if issues:
            print(f"\n{url}:")
            for issue in issues:
                if issue == 'missing_title':
                    print("  • Add a descriptive title tag (50-60 characters)")
                elif issue == 'missing_meta_description':
                    print("  • Add a compelling meta description (150-160 characters)")
                elif issue == 'missing_canonical':
                    print("  • Add canonical tag pointing to this URL")
                elif issue.startswith('http_error_'):
                    status = issue.split('_')[-1]
                    if status == '404':
                        print("  • Fix broken link or redirect to relevant page")
                    elif status.startswith('5'):
                        print("  • Fix server error")
                    else:
                        print(f"  • Resolve HTTP {status} error")

def main():
    """Main setup and audit runner"""
    print("Hammond Properties SEO Tools - Quick Setup")
    print("=" * 50)

    # Check if we're in the right directory
    if not os.path.exists('requirements.txt'):
        print("Error: requirements.txt not found. Make sure you're in the seo_tools directory.")
        return

    # Install dependencies
    if not install_dependencies():
        print("Please install dependencies manually: pip install -r requirements.txt")
        return

    # Get domain
    domain = input("Enter domain to audit (default: hammondproperties.com.au): ").strip()
    if not domain:
        domain = "hammondproperties.com.au"

    # Run basic audit
    results = basic_audit(domain)

    # Generate recommendations
    generate_quick_fixes(results)

    print(f"\n✓ Quick audit complete!")
    print(f"Next steps:")
    print(f"1. Review the issues identified above")
    print(f"2. Run full audit with: python main_audit.py --domain {domain}")
    print(f"3. Use individual tools to fix specific issues")
    print(f"4. Monitor progress with the monitoring tool")

if __name__ == "__main__":
    main()