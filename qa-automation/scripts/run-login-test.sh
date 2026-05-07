#!/bin/bash

# Script: Run Maestro tests
# Usage: 
#   bash qa-automation/scripts/run-login-test.sh                        # Run all tests
#   bash qa-automation/scripts/run-login-test.sh login/login-success.yaml # Run specific test

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Determine what to test
if [ -z "$1" ]; then
    TEST_TARGET="qa-automation/maestro/"
    TEST_LABEL="All Tests"
else
    TEST_TARGET="qa-automation/maestro/$1"
    TEST_LABEL="Test: $1"
fi

echo "================================================"
echo "  Running Maestro $TEST_LABEL"
echo "================================================"
echo ""

cd "$PROJECT_ROOT"

~/.maestro/bin/maestro test "$TEST_TARGET"
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]; then
    echo "✅ Tests PASSED"
    exit 0
else
    echo "❌ Tests FAILED"
    exit 1
fi
