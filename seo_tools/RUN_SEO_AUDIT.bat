@echo off
echo ========================================
echo    Hammond Properties SEO Audit Tool
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/4] Starting SEO audit...
echo ----------------------------------------
python main_audit.py --domain hammondproperties.com.au --output audit_report.csv

if errorlevel 1 (
    echo ERROR: Audit failed. Check if main_audit.py exists
    pause
    exit /b 1
)

echo.
echo [2/4] Analyzing 404 errors...
echo ----------------------------------------
python quick_fix_404s.py --input audit_report.csv

echo.
echo [3/4] Opening audit report...
echo ----------------------------------------
if exist audit_report.csv (
    echo Opening audit_report.csv in default application...
    start audit_report.csv
) else (
    echo Warning: audit_report.csv not found
)

echo.
echo ========================================
echo    ✅ SEO Audit Complete!
echo ========================================
echo.
echo Files generated:
echo   - audit_report.csv (full audit results)
echo   - redirects_map.csv (404 redirect suggestions)
echo   - htaccess_rules.txt (redirect rules for .htaccess)
echo.
echo Next steps:
echo   1. Review audit_report.csv for all issues
echo   2. Add redirects from htaccess_rules.txt to your .htaccess
echo   3. Upload to Google Search Console for validation
echo.
pause