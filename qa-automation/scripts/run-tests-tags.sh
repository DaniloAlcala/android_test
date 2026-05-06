#!/bin/bash

# QA Automation Test Runner with Tags - Phase 5
# Execute tests filtered by tags
# Usage: bash run-tests-tags.sh <tag>
#        bash run-tests-tags.sh smoke
#        bash run-tests-tags.sh regression

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <tag>"
    echo ""
    echo "Examples:"
    echo "  $0 smoke       # Run smoke tests"
    echo "  $0 regression  # Run regression tests"
    echo "  $0 critical    # Run critical tests"
    exit 1
fi

TAG=$1
TEST_DIR="../maestro"
REPORTS_DIR="../reports"
LOG_FILE="$REPORTS_DIR/$(date +%Y-%m-%d_%H-%M-%S)_${TAG}_tests.log"

mkdir -p "$REPORTS_DIR"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Running tests tagged with: ${NC}${TAG}"
echo "================================================"

TEST_COUNT=0
PASS_COUNT=0
FAIL_COUNT=0

# Find tests with the specified tag in metadata
for TEST_FILE in $(find "$TEST_DIR" -name "*.yaml" -type f); do
    # Check if file contains tag (simple grep, replace with YAML parser if needed)
    if grep -q "- $TAG" "$TEST_FILE" 2>/dev/null; then
        TEST_COUNT=$((TEST_COUNT + 1))
        TEST_NAME=$(basename "$TEST_FILE" .yaml)
        
        echo -n "Running: $TEST_NAME... "
        if maestro test "$TEST_FILE" >> "$LOG_FILE" 2>&1; then
            PASS_COUNT=$((PASS_COUNT + 1))
            echo -e "${GREEN}PASS${NC}"
        else
            FAIL_COUNT=$((FAIL_COUNT + 1))
            echo -e "${RED}FAIL${NC}"
        fi
    fi
done

echo "================================================"
echo -e "Tag: ${YELLOW}${TAG}${NC}"
echo -e "Total:  ${YELLOW}$TEST_COUNT${NC}"
echo -e "Passed: ${GREEN}$PASS_COUNT${NC}"
echo -e "Failed: ${RED}$FAIL_COUNT${NC}"

[ $FAIL_COUNT -eq 0 ] && exit 0 || exit 1
