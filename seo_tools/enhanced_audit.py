#!/usr/bin/env python3
"""
Enhanced SEO Audit Script for Hammond Properties
Crawls sitemap and discovers all pages for comprehensive audit
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
from urllib.parse import urlparse, urljoin
import time
import xml.etree.ElementTree as ET
from collections import defaultdict
import re

class EnhancedSEOAuditor:
    def __init__(self, domain):
        self.domain = domain.rstrip('/')
        if not self.domain.startswith('http'):
            self.domain = f'https://{self.domain}'
        
        self.all_urls = set()
        self.visited_urls = set()
        self.issues = defaultdict(list)
        self.pages_data = []
        
    def discover_all_urls(self):
        """Discover all URLs from multiple sources"""
        print(f"🔍 Discovering all URLs for {self.domain}")
        
        # 1. Try sitemap first
        self.get_urls_from_sitemap()
        
        # 2. Crawl homepage for links
        self.crawl_for_links(self.domain)
        
        # 3. Try common property/listing patterns
        self.try_common_patterns()
        
        print(f"✓ Discovered {len(self.all_urls)} total URLs to audit")
        
    def get_urls_from_sitemap(self):
        """Extract all URLs from sitemap"""
        sitemap_urls = [
            f"{self.domain}/sitemap.xml",
            f"{self.domain}/sitemap_index.xml",
            f"{self.domain}/wp-sitemap.xml",
            f"{self.domain}/property-sitemap.xml"
        ]
        
        for sitemap_url in sitemap_urls:
            try:
                print(f"Checking sitemap: {sitemap_url}")
                response = requests.get(sitemap_url, timeout=10)
                if response.status_code == 200:
                    # Parse XML
                    root = ET.fromstring(response.content)
                    
                    # Handle both sitemap index and regular sitemaps
                    for elem in root.iter():
                        if 'loc' in elem.tag:
                            url = elem.text.strip()
                            if url.startswith(self.domain):
                                self.all_urls.add(url)
                    
                    print(f"  Found {len(self.all_urls)} URLs in sitemap")
                    break
            except Exception as e:
                print(f"  No sitemap at {sitemap_url}")
                continue
    
    def crawl_for_links(self, start_url, max_depth=3):
        """Crawl website for internal links"""
        to_visit = [(start_url, 0)]
        
        while to_visit and len(self.all_urls) < 500:
            url, depth = to_visit.pop(0)
            
            if depth > max_depth or url in self.visited_urls:
                continue
            
            try:
                response = requests.get(url, timeout=10, allow_redirects=True)
                self.visited_urls.add(url)
                self.all_urls.add(url)
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # Find all links
                    for tag in soup.find_all(['a', 'link']):
                        href = tag.get('href')
                        if href:
                            absolute_url = urljoin(url, href)
                            if absolute_url.startswith(self.domain) and absolute_url not in self.all_urls:
                                self.all_urls.add(absolute_url)
                                if depth < max_depth:
                                    to_visit.append((absolute_url, depth + 1))
                    
                    # Look for property listings specifically
                    for link in soup.find_all('a', href=re.compile(r'(property|listing|accommodation|room)', re.I)):
                        href = link.get('href')
                        if href:
                            absolute_url = urljoin(url, href)
                            if absolute_url.startswith(self.domain):
                                self.all_urls.add(absolute_url)
                
                time.sleep(0.5)  # Be polite
                
            except Exception as e:
                print(f"  Error crawling {url}: {e}")
    
    def try_common_patterns(self):
        """Try common URL patterns for property sites"""
        patterns = [
            '/properties/',
            '/property/',
            '/listings/',
            '/listing/',
            '/accommodation/',
            '/rooms/',
            '/about/',
            '/contact/',
            '/blog/',
            '/news/',
            '/gallery/',
            '/location/',
            '/amenities/',
            '/rates/',
            '/booking/',
            '/availability/'
        ]
        
        for pattern in patterns:
            test_url = self.domain + pattern
            try:
                response = requests.head(test_url, timeout=5, allow_redirects=True)
                if response.status_code == 200:
                    self.all_urls.add(test_url)
            except:
                pass
    
    def audit_all_pages(self):
        """Audit all discovered pages"""
        print(f"\n📊 Auditing {len(self.all_urls)} pages...")
        
        for i, url in enumerate(self.all_urls, 1):
            if i % 10 == 0:
                print(f"  Progress: {i}/{len(self.all_urls)} pages audited")
            
            try:
                response = requests.get(url, timeout=10, allow_redirects=False)
                page_data = self.analyze_page(url, response)
                self.pages_data.append(page_data)
                time.sleep(0.5)  # Be polite
                
            except Exception as e:
                self.pages_data.append({
                    'url': url,
                    'status_code': 'Error',
                    'issues': [f'Could not fetch: {str(e)}'],
                    'error': str(e)
                })
        
        print(f"✓ Audit complete for {len(self.pages_data)} pages")
    
    def analyze_page(self, url, response):
        """Analyze a single page for SEO issues"""
        page_data = {
            'url': url,
            'status_code': response.status_code,
            'issues': [],
            'issue_category': []
        }
        
        # Check status codes
        if response.status_code == 404:
            self.issues['404_errors'].append(url)
            page_data['issues'].append('404 Not Found')
            page_data['issue_category'].append('Not found (404)')
            
        elif response.status_code in [301, 302, 307, 308]:
            self.issues['redirects'].append(url)
            page_data['issues'].append(f'{response.status_code} Redirect')
            page_data['issue_category'].append('Page with redirect')
            page_data['redirect_to'] = response.headers.get('Location', '')
            
        elif response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Check for canonical tag
            canonical = soup.find('link', {'rel': 'canonical'})
            if not canonical:
                self.issues['missing_canonical'].append(url)
                page_data['issues'].append('Missing canonical tag')
                page_data['issue_category'].append('Duplicate without user-selected canonical')
            else:
                canonical_url = canonical.get('href', '')
                page_data['canonical'] = canonical_url
                if canonical_url and canonical_url != url:
                    page_data['issue_category'].append('Alternate page with proper canonical tag')
            
            # Check for noindex
            meta_robots = soup.find('meta', {'name': 'robots'})
            if meta_robots and 'noindex' in meta_robots.get('content', '').lower():
                self.issues['noindex'].append(url)
                page_data['issues'].append('Has noindex tag')
                page_data['issue_category'].append("Excluded by 'noindex' tag")
            
            # Check content length (soft 404 detection)
            text_content = ' '.join(soup.stripped_strings)
            word_count = len(text_content.split())
            page_data['word_count'] = word_count
            
            if word_count < 100:
                self.issues['soft_404'].append(url)
                page_data['issues'].append('Possible soft 404 (thin content)')
                page_data['issue_category'].append('Soft 404')
            elif word_count < 300:
                self.issues['thin_content'].append(url)
                page_data['issues'].append('Thin content (may not be indexed)')
                page_data['issue_category'].append('Crawled - currently not indexed')
            
            # Check title
            title = soup.find('title')
            if not title or not title.text.strip():
                self.issues['missing_title'].append(url)
                page_data['issues'].append('Missing title tag')
            else:
                page_data['title'] = title.text.strip()
                # Check for duplicate titles
                if len(page_data['title']) < 20:
                    page_data['issues'].append('Title too short')
            
            # Check meta description
            meta_desc = soup.find('meta', {'name': 'description'})
            if not meta_desc or not meta_desc.get('content', '').strip():
                self.issues['missing_description'].append(url)
                page_data['issues'].append('Missing meta description')
                if word_count < 500:
                    page_data['issue_category'].append('Discovered - currently not indexed')
            else:
                page_data['meta_description'] = meta_desc.get('content', '')[:160]
        
        # Set primary issue category
        if page_data['issue_category']:
            page_data['primary_issue'] = page_data['issue_category'][0]
        else:
            page_data['primary_issue'] = 'No issues'
        
        return page_data
    
    def generate_report(self, output_file):
        """Generate comprehensive CSV report"""
        print("\n📈 Generating comprehensive report...")
        
        # Create detailed report
        report_data = []
        for page in self.pages_data:
            report_data.append({
                'URL': page['url'],
                'Status Code': page.get('status_code', 'Unknown'),
                'Primary Issue': page.get('primary_issue', 'No issues'),
                'All Issues': ', '.join(page.get('issues', ['No issues'])),
                'Word Count': page.get('word_count', 0),
                'Title': page.get('title', 'Missing'),
                'Meta Description': page.get('meta_description', 'Missing'),
                'Canonical': page.get('canonical', 'Missing'),
                'Redirect To': page.get('redirect_to', '')
            })
        
        df = pd.DataFrame(report_data)
        df.to_csv(output_file, index=False)
        print(f"✓ Report saved to {output_file}")
        
        # Generate issue summary matching GSC categories
        print("\n📋 Issues Summary (GSC Categories):")
        gsc_categories = {
            'Duplicate without user-selected canonical': 0,
            'Crawled - currently not indexed': 0,
            'Soft 404': 0,
            'Discovered - currently not indexed': 0,
            'Not found (404)': 0,
            'Page with redirect': 0,
            "Excluded by 'noindex' tag": 0,
            'Alternate page with proper canonical tag': 0
        }
        
        for page in self.pages_data:
            primary = page.get('primary_issue')
            if primary in gsc_categories:
                gsc_categories[primary] += 1
        
        total = 0
        for issue, count in gsc_categories.items():
            if count > 0:
                print(f"  - {issue}: {count} pages")
                total += count
        
        print(f"\nTotal pages with issues: {total}")
        print(f"Total pages audited: {len(self.pages_data)}")
        
        # Create summary CSV
        summary_df = pd.DataFrame([
            {'Issue Type': issue, 'Count': count}
            for issue, count in gsc_categories.items()
            if count > 0
        ])
        summary_df.to_csv('issue_summary.csv', index=False)
        print(f"✓ Issue summary saved to issue_summary.csv")
        
        return df

def main():
    print("=" * 50)
    print("  ENHANCED SEO AUDIT - Hammond Properties")
    print("=" * 50)
    
    domain = 'hammondproperties.com.au'
    output = 'audit_report.csv'
    
    # Create auditor
    auditor = EnhancedSEOAuditor(domain)
    
    # Discover all URLs
    auditor.discover_all_urls()
    
    # Audit all pages
    auditor.audit_all_pages()
    
    # Generate report
    auditor.generate_report(output)
    
    print("\n✅ Enhanced audit complete!")
    print("\n📁 Files generated:")
    print("  - audit_report.csv (detailed page-by-page analysis)")
    print("  - issue_summary.csv (GSC-style issue summary)")
    print("\nNext steps:")
    print("  1. Review audit_report.csv for all issues")
    print("  2. Run quick_fix_404s.py to fix broken pages")
    print("  3. Compare issue_summary.csv with your GSC report")

if __name__ == '__main__':
    main()