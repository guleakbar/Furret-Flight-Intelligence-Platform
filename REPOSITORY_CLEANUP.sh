#!/bin/bash

# Furret Flight Intelligence Platform - Repository Cleanup Script
# This script fixes the repository structure by:
# 1. Removing all misplaced node_modules files from the root
# 2. Moving project files from furret-deploy/ to root
# 3. Cleaning up the repository for proper deployment

echo "========================================"
echo "Furret Repository Cleanup Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -d "furret-deploy" ]; then
    echo "Error: furret-deploy directory not found!"
    echo "Please run this script from the repository root."
    exit 1
fi

echo "Step 1: Creating backup branch..."
git checkout -b cleanup-backup
git push origin cleanup-backup
echo "✓ Backup branch created"
echo ""

echo "Step 2: Switching to main branch..."
git checkout main
echo ""

echo "Step 3: Removing misplaced dependency files..."
# Remove all lodash files
find . -maxdepth 1 -name '*.d.mts' -o -name '*.d.ts' -o -name '*.mjs' -o -name '*.js' | grep -v 'node_modules' | xargs rm -f

# Remove lodash category folders
rm -rf Objects error eventemitter3 fdir framer-motion function map math object promise set src string util

# Remove specific misplaced files
rm -f *.mjs.map

echo "✓ Removed hundreds of misplaced dependency files"
echo ""

echo "Step 4: Moving furret-deploy contents to root..."
# Move all files from furret-deploy to root
mv furret-deploy/* .
mv furret-deploy/.* . 2>/dev/null || true

# Remove empty furret-deploy directory
rmdir furret-deploy

echo "✓ Project files moved to root"
echo ""

echo "Step 5: Verifying structure..."
if [ -f "package.json" ] && [ -f "vite.config.ts" ] && [ -d "src" ]; then
    echo "✓ Repository structure is correct!"
    echo ""
    echo "Files in root:"
    ls -la | head -20
else
    echo "❌ Warning: Some expected files are missing"
    exit 1
fi

echo ""
echo "Step 6: Committing changes..."
git add -A
git commit -m "Fix repository structure: move project to root and remove misplaced files

- Removed hundreds of misplaced node_modules files from root
- Moved all project files from furret-deploy/ to root directory
- Repository now ready for Vercel deployment
- .gitignore added to prevent future node_modules commits"

echo "✓ Changes committed"
echo ""

echo "Step 7: Pushing to GitHub..."
echo "Run: git push origin main"
echo ""

echo "========================================"
echo "Cleanup Complete! "
echo "========================================"
echo ""
echo "Your repository is now properly structured:"
echo "  - All project files are in the root"
echo "  - Misplaced dependencies removed"
echo "  - Ready for Vercel deployment"
echo ""
echo "Next steps:"
echo "  1. Review the changes: git status"
echo "  2. Push to GitHub: git push origin main"
echo "  3. Deploy to Vercel"
echo ""
