#!/bin/bash

# Hammond Properties SEO Tools - Complete Audit Script
# This script runs a complete SEO audit and fix cycle

set -e  # Exit on any error

# Configuration
DOMAIN="hammondproperties.com.au"
PROJECT_ROOT="../"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="results_${TIMESTAMP}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create results directory
mkdir -p "${RESULTS_DIR}"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Hammond Properties SEO Audit & Fix Toolkit${NC}"
echo -e "${BLUE}============================================${NC}"
echo -e "Domain: ${DOMAIN}"
echo -e "Timestamp: ${TIMESTAMP}"
echo -e "Results Directory: ${RESULTS_DIR}"
echo ""

# Check dependencies
echo -e "${YELLOW}Checking dependencies...${NC}"
if ! python3 -c "import requests, pandas, bs4" 2>/dev/null; then
    echo -e "${RED}Missing dependencies. Installing...${NC}"
    pip install -r requirements.txt
else
    echo -e "${GREEN}Dependencies OK${NC}"
fi
echo ""

# Phase 1: Initial Audit
echo -e "${BLUE}Phase 1: Running Initial Website Audit${NC}"
echo "This may take several minutes depending on site size..."

python3 main_audit.py \
    --domain "${DOMAIN}" \
    --output "${RESULTS_DIR}/audit_report.csv" \
    --delay 1.0

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Audit completed successfully${NC}"

    # Show basic stats
    if [ -f "${RESULTS_DIR}/audit_report.csv" ]; then
        TOTAL_PAGES=$(tail -n +2 "${RESULTS_DIR}/audit_report.csv" | wc -l)
        ERROR_PAGES=$(tail -n +2 "${RESULTS_DIR}/audit_report.csv" | grep -c "404\|500" || true)
        THIN_CONTENT=$(tail -n +2 "${RESULTS_DIR}/audit_report.csv" | awk -F, '$11 < 300 {count++} END {print count+0}')

        echo "  Total pages found: ${TOTAL_PAGES}"
        echo "  Pages with errors: ${ERROR_PAGES}"
        echo "  Pages with thin content: ${THIN_CONTENT}"
    fi
else
    echo -e "${RED}✗ Audit failed${NC}"
    exit 1
fi
echo ""

# Phase 2: Fix 404 Errors (Highest Priority)
echo -e "${BLUE}Phase 2: Fixing 404 Errors and Creating Redirects${NC}"

python3 fix_404s.py \
    --input "${RESULTS_DIR}/audit_report.csv" \
    --output-prefix "${RESULTS_DIR}/404_fix" \
    --min-confidence 0.6 \
    --validate \
    --domain "${DOMAIN}"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 404 error analysis completed${NC}"

    # Check if htaccess file was generated
    if ls "${RESULTS_DIR}"/404_fix_htaccess_*.txt 1> /dev/null 2>&1; then
        echo -e "${YELLOW}  📁 Review generated .htaccess rules before applying to server${NC}"
    fi
else
    echo -e "${RED}✗ 404 error fixing failed${NC}"
fi
echo ""

# Phase 3: Fix Canonical Issues
echo -e "${BLUE}Phase 3: Fixing Canonical Tag Issues${NC}"

# First, run in dry-run mode
echo "Running dry-run to preview changes..."
python3 fix_canonicals.py \
    --input "${RESULTS_DIR}/audit_report.csv" \
    --project-root "${PROJECT_ROOT}" \
    --output "${RESULTS_DIR}/canonical_fix_report.csv" \
    --domain "${DOMAIN}"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Canonical analysis completed (dry-run)${NC}"

    # Ask for confirmation before applying changes
    echo -e "${YELLOW}Review the canonical fix report: ${RESULTS_DIR}/canonical_fix_report.csv${NC}"
    read -p "Apply canonical fixes? (y/N): " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Applying canonical fixes..."
        python3 fix_canonicals.py \
            --input "${RESULTS_DIR}/audit_report.csv" \
            --project-root "${PROJECT_ROOT}" \
            --output "${RESULTS_DIR}/canonical_fix_applied.csv" \
            --domain "${DOMAIN}" \
            --apply

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Canonical fixes applied${NC}"
        else
            echo -e "${RED}✗ Canonical fixing failed${NC}"
        fi
    else
        echo -e "${YELLOW}Canonical fixes skipped (dry-run only)${NC}"
    fi
else
    echo -e "${RED}✗ Canonical analysis failed${NC}"
fi
echo ""

# Phase 4: Content Enhancement
echo -e "${BLUE}Phase 4: Analyzing Content Quality${NC}"

python3 content_enhancer.py \
    --input "${RESULTS_DIR}/audit_report.csv" \
    --output "${RESULTS_DIR}/content_enhancement_report.csv" \
    --domain "${DOMAIN}" \
    --min-words 300

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Content analysis completed${NC}"

    # Check if OpenAI key is available for AI suggestions
    if [ ! -z "${OPENAI_API_KEY}" ]; then
        echo "Running AI-powered content suggestions..."
        python3 content_enhancer.py \
            --input "${RESULTS_DIR}/audit_report.csv" \
            --output "${RESULTS_DIR}/content_enhancement_ai.csv" \
            --domain "${DOMAIN}" \
            --openai-key "${OPENAI_API_KEY}"

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ AI content suggestions generated${NC}"
        fi
    else
        echo -e "${YELLOW}  OpenAI API key not set - skipping AI content generation${NC}"
    fi
else
    echo -e "${RED}✗ Content analysis failed${NC}"
fi
echo ""

# Phase 5: Generate New Sitemap
echo -e "${BLUE}Phase 5: Generating Optimized XML Sitemap${NC}"

python3 generate_sitemap.py \
    --input "${RESULTS_DIR}/audit_report.csv" \
    --domain "${DOMAIN}" \
    --output "${RESULTS_DIR}/sitemap_report.csv" \
    --compress \
    --split-by-type \
    --validate

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Sitemap generation completed${NC}"

    # Move generated sitemaps to results directory
    if ls sitemap*.xml 1> /dev/null 2>&1; then
        mv sitemap*.xml "${RESULTS_DIR}/"
        echo "  Sitemaps moved to results directory"
    fi

    if ls sitemap*.xml.gz 1> /dev/null 2>&1; then
        mv sitemap*.xml.gz "${RESULTS_DIR}/"
        echo "  Compressed sitemaps moved to results directory"
    fi

    if [ -f "robots_sitemap_entries.txt" ]; then
        mv robots_sitemap_entries.txt "${RESULTS_DIR}/"
        echo -e "${YELLOW}  📁 Add contents of robots_sitemap_entries.txt to your robots.txt${NC}"
    fi
else
    echo -e "${RED}✗ Sitemap generation failed${NC}"
fi
echo ""

# Phase 6: Setup Monitoring
echo -e "${BLUE}Phase 6: Setting Up Monitoring${NC}"

# Create URLs file for monitoring
if [ -f "${RESULTS_DIR}/audit_report.csv" ]; then
    echo "Creating monitoring URL list..."
    tail -n +2 "${RESULTS_DIR}/audit_report.csv" | cut -d',' -f1 | grep -E '^https?://' > "${RESULTS_DIR}/monitor_urls.txt"

    echo "Running initial monitoring setup..."
    python3 monitor_indexing.py \
        --domain "${DOMAIN}" \
        --urls-file "${RESULTS_DIR}/monitor_urls.txt"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Monitoring database initialized${NC}"
        echo -e "${YELLOW}  To start continuous monitoring, run:${NC}"
        echo "  python3 monitor_indexing.py --domain ${DOMAIN} --urls-file ${RESULTS_DIR}/monitor_urls.txt --daemon --interval daily"
    else
        echo -e "${RED}✗ Monitoring setup failed${NC}"
    fi
fi
echo ""

# Generate Summary Report
echo -e "${BLUE}Generating Summary Report${NC}"

SUMMARY_FILE="${RESULTS_DIR}/summary_report.txt"

cat > "${SUMMARY_FILE}" << EOF
Hammond Properties SEO Audit & Fix Summary
==========================================
Audit Date: $(date)
Domain: ${DOMAIN}
Results Directory: ${RESULTS_DIR}

Files Generated:
EOF

# List all generated files
find "${RESULTS_DIR}" -type f | sort | while read file; do
    echo "  ${file}" >> "${SUMMARY_FILE}"
done

cat >> "${SUMMARY_FILE}" << EOF

Next Steps:
1. Review 404 redirect rules in 404_fix_htaccess_*.txt
2. Apply redirects to your web server configuration
3. Review canonical fix report and apply recommended changes
4. Implement content enhancement suggestions
5. Upload new sitemaps to your website root
6. Update robots.txt with sitemap entries
7. Submit updated sitemaps to Google Search Console
8. Set up continuous monitoring for ongoing maintenance

Priority Actions:
1. Fix 404 errors (highest impact on indexing)
2. Resolve canonical issues (prevents duplicate content)
3. Enhance thin content pages (improves indexability)
4. Submit new sitemaps to GSC (speeds up indexing)

Monitor Progress:
- Check Google Search Console weekly for indexing improvements
- Run monitoring reports to track status changes
- Re-run audit monthly to catch new issues

For detailed instructions, see README.md
EOF

echo -e "${GREEN}✓ Summary report generated: ${SUMMARY_FILE}${NC}"
echo ""

# Final Summary
echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}SEO Audit & Fix Cycle Complete!${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""
echo -e "📁 All results saved to: ${YELLOW}${RESULTS_DIR}${NC}"
echo -e "📋 Summary report: ${YELLOW}${SUMMARY_FILE}${NC}"
echo ""
echo -e "${YELLOW}Important Next Steps:${NC}"
echo "1. Review and apply .htaccess redirects for 404 fixes"
echo "2. Upload new sitemaps to website root directory"
echo "3. Update robots.txt with sitemap references"
echo "4. Submit sitemaps to Google Search Console"
echo "5. Monitor indexing improvements over next 2-4 weeks"
echo ""
echo -e "${GREEN}Expected Results:${NC}"
echo "• Reduction in 404 errors within 1-2 weeks"
echo "• Improved indexing of previously blocked pages"
echo "• Better content quality scores"
echo "• Faster discovery of new content by search engines"
echo ""
echo -e "For ongoing monitoring, run:"
echo -e "${BLUE}python3 monitor_indexing.py --domain ${DOMAIN} --urls-file ${RESULTS_DIR}/monitor_urls.txt --daemon --interval daily${NC}"