#!/usr/bin/env python3
"""
SEO Audit Script for Hammond Properties
Identifies and reports all indexing issues from Google Search Console
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
from urllib.parse import urlparse, urljoin
import time
import argparse
from collections import defaultdict
import re
import os

class SEOAuditor:
    def __init__(self, domain):
        self.domain = domain.rstrip('/')
        if not self.domain.startswith('http'):
            self.domain = f'https://{self.domain}'
        
        self.visited_urls = set()
        self.issues = defaultdict(list)
        self.pages_data = []
        
    def crawl_site(self):
        """Crawl the website and collect all pages"""
        print(f"🔍 Starting crawl of {self.domain}")
        to_visit = [self.domain]
        
        while to_visit and len(self.visited_urls) < 500:  # Limit to 500 pages
            url = to_visit.pop(0)
            
            if url in self.visited_urls:
                continue
                
            try:
                print(f"Crawling: {url}")
                response = requests.get(url, timeout=10)
                self.visited_urls.add(url)
                
                # Analyze page
                page_data = self.analyze_page(url, response)
                self.pages_data.append(page_data)
                
                # Find more URLs
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    for link in soup.find_all('a', href=True):
                        absolute_url = urljoin(url, link['href'])
                        if absolute_url.startswith(self.domain) and absolute_url not in self.visited_urls:
                            to_visit.append(absolute_url)
                
                time.sleep(1)  # Be polite
                
            except Exception as e:
                print(f"Error crawling {url}: {e}")
                self.issues['crawl_errors'].append({'url': url, 'error': str(e)})
        
        print(f"✓ Crawled {len(self.visited_urls)} pages")
        
    def analyze_page(self, url, response):
        """Analyze a single page for SEO issues"""
        page_data = {
            'url': url,
            'status_code': response.status_code,
            'issues': []
        }
        
        if response.status_code == 404:
            self.issues['404_errors'].append(url)
            page_data['issues'].append('404 Not Found')
            
        elif response.status_code in [301, 302]:
            self.issues['redirects'].append(url)
            page_data['issues'].append(f'{response.status_code} Redirect')
            
        elif response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Check for canonical tag
            canonical = soup.find('link', {'rel': 'canonical'})
            if not canonical:
                self.issues['missing_canonical'].append(url)
                page_data['issues'].append('Missing canonical tag')
            else:
                page_data['canonical'] = canonical.get('href')
                
            # Check for noindex
            meta_robots = soup.find('meta', {'name': 'robots'})
            if meta_robots and 'noindex' in meta_robots.get('content', ''):
                self.issues['noindex'].append(url)
                page_data['issues'].append('Has noindex tag')
                
            # Check content length (soft 404 detection)
            text_content = soup.get_text().strip()
            word_count = len(text_content.split())
            page_data['word_count'] = word_count
            
            if word_count < 100:
                self.issues['soft_404'].append(url)
                page_data['issues'].append('Possible soft 404 (thin content)')
                
            # Check title
            title = soup.find('title')
            if not title or not title.text.strip():
                self.issues['missing_title'].append(url)
                page_data['issues'].append('Missing title tag')
            else:
                page_data['title'] = title.text.strip()
                
            # Check meta description
            meta_desc = soup.find('meta', {'name': 'description'})
            if not meta_desc or not meta_desc.get('content', '').strip():
                self.issues['missing_description'].append(url)
                page_data['issues'].append('Missing meta description')
                
        return page_data
    
    def match_gsc_issues(self):
        """Map found issues to GSC issue types"""
        gsc_mapping = {
            'Duplicate without user-selected canonical': len(self.issues['missing_canonical']),
            'Soft 404': len(self.issues['soft_404']),
            'Not found (404)': len(self.issues['404_errors']),
            'Page with redirect': len(self.issues['redirects']),
            'Excluded by noindex tag': len(self.issues['noindex']),
            'Crawled - currently not indexed': 0,  # Will be determined by content quality
            'Discovered - currently not indexed': 0
        }
        
        # Estimate indexing issues based on thin content
        for page in self.pages_data:
            if page.get('word_count', 0) < 300 and '404' not in str(page.get('issues', [])):
                gsc_mapping['Crawled - currently not indexed'] += 1
                
        return gsc_mapping
    
    def generate_report(self, output_file):
        """Generate CSV report of all issues"""
        print("📊 Generating audit report...")
        
        # Create detailed report
        report_data = []
        for page in self.pages_data:
            report_data.append({
                'URL': page['url'],
                'Status Code': page.get('status_code', 'Unknown'),
                'Issues': ', '.join(page.get('issues', ['No issues'])),
                'Word Count': page.get('word_count', 0),
                'Title': page.get('title', 'Missing'),
                'Canonical': page.get('canonical', 'Missing')
            })
        
        df = pd.DataFrame(report_data)
        df.to_csv(output_file, index=False)
        print(f"✓ Report saved to {output_file}")
        
        # Print summary
        print("\n📋 Issues Summary:")
        gsc_issues = self.match_gsc_issues()
        for issue_type, count in gsc_issues.items():
            if count > 0:
                print(f"  - {issue_type}: {count} pages")
        
        print(f"\nTotal issues found: {sum(gsc_issues.values())} pages")
        
        return df

def main():
    parser = argparse.ArgumentParser(description='SEO Audit for Hammond Properties')
    parser.add_argument('--domain', default='hammondproperties.com.au', help='Domain to audit')
    parser.add_argument('--output', default='audit_report.csv', help='Output CSV file')
    
    args = parser.parse_args()
    
    # Create auditor and run
    auditor = SEOAuditor(args.domain)
    auditor.crawl_site()
    auditor.generate_report(args.output)
    
    print("\n✅ Audit complete! Next steps:")
    print("1. Review audit_report.csv")
    print("2. Run fix_404s.py to resolve broken pages")
    print("3. Run fix_canonicals.py to fix duplicate content")
    print("4. Run generate_sitemap.py to create optimized sitemap")

if __name__ == '__main__':
    main()