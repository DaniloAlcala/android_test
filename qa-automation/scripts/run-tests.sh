#!/bin/bash

# QA Automation Test Runner - Phase 1
# Execute all Maestro tests with Android emulator
# Usage: bash run-tests.sh

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AVD_NAME="qa_device"
EMULATOR_TIMEOUT=300
TEST_DIR="$SCRIPT_DIR/../maestro"
REPORTS_DIR="$SCRIPT_DIR/../reports"
LOG_FILE="$REPORTS_DIR/$(date +%Y-%m-%d_%H-%M-%S)_test_run.log"

# Create reports directory if it doesn't exist
mkdir -p "$REPORTS_DIR"

echo -e "${YELLOW}================================================${NC}"
echo -e "${YELLOW}  QA Automation Test Runner - Phase 1${NC}"
echo -e "${YELLOW}================================================${NC}"

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting test execution..."
log "Android emulator: $AVD_NAME"
log "Test directory: $TEST_DIR"
log "Report: $LOG_FILE"

# Step 1: Check if Android emulator is already running
echo -e "\n${YELLOW}[1/5] Checking Android emulator...${NC}"
if adb devices | grep -q "emulator\|device$"; then
    log "Device already connected, skipping emulator start"
else
    log "Starting emulator: $AVD_NAME"
    emulator -avd "$AVD_NAME" -no-snapshot -no-audio -no-boot-anim &
    EMULATOR_PID=$!
    
    # Wait for device to be ready
    log "Waiting for emulator to boot (max ${EMULATOR_TIMEOUT}s)..."
    ELAPSED=0
    while ! adb shell getprop sys.boot_completed | grep -q "1"; do
        if [ $ELAPSED -ge $EMULATOR_TIMEOUT ]; then
            log "ERROR: Emulator failed to boot within ${EMULATOR_TIMEOUT} seconds"
            kill $EMULATOR_PID 2>/dev/null || true
            exit 1
        fi
        sleep 5
        ELAPSED=$((ELAPSED + 5))
        echo -n "."
    done
    log "Emulator ready!"
fi

# Step 2: Wait for device
echo -e "\n${YELLOW}[2/5] Waiting for device...${NC}"
adb wait-for-device
log "Device connected"

# Step 3: Deploy app (if APK exists)
echo -e "\n${YELLOW}[3/5] Preparing app...${NC}"
# TODO: Add app deployment when app is ready
# adb install app.apk
log "App ready"

# Step 4: Run Maestro tests
echo -e "\n${YELLOW}[4/5] Running Maestro tests...${NC}"
TEST_COUNT=0
PASS_COUNT=0
FAIL_COUNT=0

if [ ! -d "$TEST_DIR" ]; then
    log "ERROR: Test directory not found: $TEST_DIR"
    exit 1
fi

# Find all test files
TESTS=$(find "$TEST_DIR" -name "*.yaml" -type f)

if [ -z "$TESTS" ]; then
    log "WARNING: No test files found in $TEST_DIR"
else
    for TEST_FILE in $TESTS; do
        TEST_COUNT=$((TEST_COUNT + 1))
        TEST_NAME=$(basename "$TEST_FILE" .yaml)
        
        log "Running test: $TEST_NAME"
        if maestro test "$TEST_FILE" >> "$LOG_FILE" 2>&1; then
            PASS_COUNT=$((PASS_COUNT + 1))
            echo -e "  ${GREEN}✓ PASS${NC}: $TEST_NAME"
        else
            FAIL_COUNT=$((FAIL_COUNT + 1))
            echo -e "  ${RED}✗ FAIL${NC}: $TEST_NAME"
        fi
    done
fi

# Step 5: Report results
echo -e "\n${YELLOW}[5/5] Test Results${NC}"
echo "================================================"
echo -e "Total:  ${YELLOW}$TEST_COUNT${NC}"
echo -e "Passed: ${GREEN}$PASS_COUNT${NC}"
echo -e "Failed: ${RED}$FAIL_COUNT${NC}"
echo "================================================"

log "Test execution completed"
log "Report: $LOG_FILE"

# Exit with appropriate code
if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "\n${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "\n${RED}✗ Some tests failed. See log for details.${NC}"
    exit 1
fi
