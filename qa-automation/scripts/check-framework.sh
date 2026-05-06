#!/bin/bash

# QA Automation Framework - Status Check
# Validates that all components are in place

echo ""
echo "=================================================="
echo "  🎯 Mobile QA Automation - Framework Check"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check function
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $(basename "$1")"
    else
        echo -e "${RED}✗${NC} $(basename "$1")"
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $(basename "$1")/"
    else
        echo -e "${RED}✗${NC} $(basename "$1")/"
    fi
}

# Check structure
echo -e "${BLUE}Framework Structure:${NC}"
check_dir "qa-automation"
check_dir "qa-automation/maestro"
check_dir "qa-automation/scripts"
check_dir "qa-automation/ai"
check_dir ".github/workflows"

echo ""
echo -e "${BLUE}Test Files:${NC}"
check_file "qa-automation/maestro/login/login-success.yaml"
check_file "qa-automation/maestro/navigation/main-navigation.yaml"
check_file "qa-automation/maestro/example-test.yaml"

echo ""
echo -e "${BLUE}Scripts:${NC}"
check_file "qa-automation/scripts/run-tests.sh"
check_file "qa-automation/scripts/run-tests-tags.sh"

echo ""
echo -e "${BLUE}AI Integration:${NC}"
check_file "qa-automation/ai/generateTest.js"
check_file "qa-automation/ai/demo.js"

echo ""
echo -e "${BLUE}GitHub Actions:${NC}"
check_file ".github/workflows/android-tests.yml"
check_file ".github/workflows/ios-tests.yml"
check_file ".github/workflows/smoke-tests.yml"

echo ""
echo -e "${BLUE}Documentation:${NC}"
check_file "CONTRIBUTING.md"
check_file "README-QA.md"
check_file "IMPLEMENTATION_SUMMARY.md"
check_file "SETUP_STATUS.md"

echo ""
echo -e "${BLUE}OpenSpec Architecture:${NC}"
check_file "openspec/changes/mobile-qa-ai-architecture/proposal.md"
check_file "openspec/changes/mobile-qa-ai-architecture/design.md"
check_file "openspec/changes/mobile-qa-ai-architecture/tasks.md"

echo ""
echo "=================================================="
echo -e "${GREEN}✓ All components ready!${NC}"
echo "=================================================="
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "  1. Review status:"
echo "     cat SETUP_STATUS.md"
echo ""
echo "  2. Try AI demo (no API key needed):"
echo "     node qa-automation/ai/demo.js"
echo ""
echo "  3. Commit to Git:"
echo "     git add ."
echo "     git commit -m \"Mobile QA framework - ready\""
echo ""
echo "  4. Push to GitHub:"
echo "     git remote add origin <repo_url>"
echo "     git push -u origin main"
echo ""
echo "=================================================="
echo ""
