#!/usr/bin/env node

/**
 * QA Automation Framework - Local Validation
 * Validates all components work correctly without external dependencies
 * 
 * Usage: node validate-framework.js
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m',
};

let passCount = 0;
let failCount = 0;

function pass(message) {
    console.log(`${COLORS.green}✓${COLORS.reset} ${message}`);
    passCount++;
}

function fail(message) {
    console.log(`${COLORS.red}✗${COLORS.reset} ${message}`);
    failCount++;
}

function section(title) {
    console.log(`\n${COLORS.cyan}${COLORS.bold}${title}${COLORS.reset}`);
    console.log('─'.repeat(60));
}

function header() {
    console.log(`\n${COLORS.cyan}${COLORS.bold}`);
    console.log('╔═══════════════════════════════════════════════════════════╗');
    console.log('║  🧪 QA Automation Framework - Local Validation           ║');
    console.log('╚═══════════════════════════════════════════════════════════╝');
    console.log(`${COLORS.reset}`);
}

function footer() {
    console.log(`\n${COLORS.cyan}${COLORS.bold}═══════════════════════════════════════════════════════════${COLORS.reset}`);
    console.log(`${COLORS.bold}Test Summary:${COLORS.reset}`);
    console.log(`  ${COLORS.green}✓ Passed: ${passCount}${COLORS.reset}`);
    console.log(`  ${COLORS.red}✗ Failed: ${failCount}${COLORS.reset}`);
    
    const total = passCount + failCount;
    const percentage = ((passCount / total) * 100).toFixed(1);
    
    if (failCount === 0) {
        console.log(`\n${COLORS.green}${COLORS.bold}✓ All validations passed! (${percentage}%)${COLORS.reset}`);
        console.log(`\n${COLORS.yellow}Next Steps:${COLORS.reset}`);
        console.log('  1. npm test          (validate tests)');
        console.log('  2. git add .         (stage changes)');
        console.log('  3. git commit        (commit)');
        console.log('  4. git push          (push to GitHub - CI/CD runs automatically)\n');
    } else {
        console.log(`\n${COLORS.red}${COLORS.bold}✗ Some validations failed (${percentage}%)${COLORS.reset}`);
        console.log('Fix errors above before proceeding.\n');
        process.exit(1);
    }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

function validateDirectoryStructure() {
    section('1. Directory Structure');
    
    const requiredDirs = [
        'qa-automation',
        'qa-automation/maestro',
        'qa-automation/scripts',
        'qa-automation/ai',
        'qa-automation/reports',
        'openspec/changes/mobile-qa-ai-architecture',
        '.github/workflows',
    ];
    
    requiredDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            pass(`Directory exists: ${dir}`);
        } else {
            fail(`Directory missing: ${dir}`);
        }
    });
}

function validateFiles() {
    section('2. Required Files');
    
    const requiredFiles = [
        // Tests
        'qa-automation/maestro/login/login-success.yaml',
        'qa-automation/maestro/navigation/main-navigation.yaml',
        'qa-automation/maestro/example-test.yaml',
        
        // Scripts
        'qa-automation/scripts/run-tests.sh',
        'qa-automation/scripts/run-tests-tags.sh',
        'qa-automation/scripts/check-framework.sh',
        
        // AI
        'qa-automation/ai/generateTest.js',
        'qa-automation/ai/demo.js',
        'qa-automation/ai/README.md',
        
        // Workflows
        '.github/workflows/android-tests.yml',
        '.github/workflows/ios-tests.yml',
        '.github/workflows/smoke-tests.yml',
        
        // Documentation
        'CONTRIBUTING.md',
        'README-QA.md',
        'SETUP_STATUS.md',
        'IMPLEMENTATION_SUMMARY.md',
        
        // OpenSpec
        'openspec/changes/mobile-qa-ai-architecture/proposal.md',
        'openspec/changes/mobile-qa-ai-architecture/design.md',
        'openspec/changes/mobile-qa-ai-architecture/tasks.md',
    ];
    
    requiredFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const size = fs.statSync(file).size;
            pass(`File exists: ${file} (${size} bytes)`);
        } else {
            fail(`File missing: ${file}`);
        }
    });
}

function validateYAMLSyntax() {
    section('3. YAML Test Files Syntax');
    
    const testFiles = [
        'qa-automation/maestro/login/login-success.yaml',
        'qa-automation/maestro/navigation/main-navigation.yaml',
        'qa-automation/maestro/example-test.yaml',
    ];
    
    testFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            fail(`Test file not found: ${file}`);
            return;
        }
        
        const content = fs.readFileSync(file, 'utf8');
        
        // Basic YAML validation
        if (!content.includes('appId:')) {
            fail(`${file} - Missing appId field`);
            return;
        }
        
        if (!content.includes('---')) {
            fail(`${file} - Missing test separator (---)`);
            return;
        }
        
        // Check for at least one Maestro command
        const maestroCommands = ['launchApp', 'tapOn', 'inputText', 'assertVisible', 'assertNotVisible'];
        const hasCommand = maestroCommands.some(cmd => content.includes(`- ${cmd}`) || content.includes(`- ${cmd}:`));
        
        if (!hasCommand) {
            fail(`${file} - No Maestro commands found`);
            return;
        }
        
        pass(`YAML valid: ${file}`);
    });
}

function validateJavaScript() {
    section('4. JavaScript Files Syntax');
    
    const jsFiles = [
        'qa-automation/ai/generateTest.js',
        'qa-automation/ai/demo.js',
    ];
    
    jsFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            fail(`JS file not found: ${file}`);
            return;
        }
        
        try {
            const content = fs.readFileSync(file, 'utf8');
            // Try to detect syntax errors with basic checks
            if (!content.includes('function') && !content.includes('=>') && !content.includes('const ')) {
                fail(`${file} - Suspicious JS syntax`);
                return;
            }
            pass(`JavaScript valid: ${file}`);
        } catch (error) {
            fail(`${file} - Error reading file: ${error.message}`);
        }
    });
}

function validateGitHubWorkflows() {
    section('5. GitHub Actions Workflows');
    
    const workflows = [
        '.github/workflows/android-tests.yml',
        '.github/workflows/ios-tests.yml',
        '.github/workflows/smoke-tests.yml',
    ];
    
    workflows.forEach(file => {
        if (!fs.existsSync(file)) {
            fail(`Workflow not found: ${file}`);
            return;
        }
        
        const content = fs.readFileSync(file, 'utf8');
        
        // Basic YAML structure validation
        if (!content.includes('name:')) {
            fail(`${file} - Missing 'name' field`);
            return;
        }
        
        if (!content.includes('on:')) {
            fail(`${file} - Missing 'on' (trigger) field`);
            return;
        }
        
        if (!content.includes('jobs:')) {
            fail(`${file} - Missing 'jobs' field`);
            return;
        }
        
        pass(`Workflow valid: ${file}`);
    });
}

function validateDocumentation() {
    section('6. Documentation');
    
    const docs = [
        { file: 'CONTRIBUTING.md', minSize: 1000, desc: 'Contributing Guide' },
        { file: 'README-QA.md', minSize: 500, desc: 'QA README' },
        { file: 'SETUP_STATUS.md', minSize: 500, desc: 'Setup Status' },
        { file: 'IMPLEMENTATION_SUMMARY.md', minSize: 1000, desc: 'Implementation Summary' },
    ];
    
    docs.forEach(doc => {
        if (!fs.existsSync(doc.file)) {
            fail(`Documentation missing: ${doc.file}`);
            return;
        }
        
        const size = fs.statSync(doc.file).size;
        if (size < doc.minSize) {
            fail(`${doc.file} - Too small (${size} bytes, expected > ${doc.minSize})`);
            return;
        }
        
        pass(`Documentation valid: ${doc.desc} (${size} bytes)`);
    });
}

function validateOpenSpec() {
    section('7. OpenSpec Architecture');
    
    const specs = [
        'openspec/changes/mobile-qa-ai-architecture/proposal.md',
        'openspec/changes/mobile-qa-ai-architecture/design.md',
        'openspec/changes/mobile-qa-ai-architecture/tasks.md',
    ];
    
    specs.forEach(file => {
        if (!fs.existsSync(file)) {
            fail(`OpenSpec file missing: ${file}`);
            return;
        }
        
        const size = fs.statSync(file).size;
        if (size < 100) {
            fail(`${file} - File too small (${size} bytes)`);
            return;
        }
        
        pass(`OpenSpec file valid: ${path.basename(file)} (${size} bytes)`);
    });
    
    // Check for capability specs
    const specsDir = 'openspec/changes/mobile-qa-ai-architecture/specs';
    if (fs.existsSync(specsDir)) {
        const specs = fs.readdirSync(specsDir);
        if (specs.length > 0) {
            pass(`Found ${specs.length} capability specifications`);
        } else {
            fail('No capability specifications found');
        }
    }
}

function validateConsistency() {
    section('8. Content Consistency');
    
    // Check that proposal mentions the right number of capabilities
    const proposal = fs.readFileSync('openspec/changes/mobile-qa-ai-architecture/proposal.md', 'utf8');
    const capabilities = proposal.match(/^- `[\w-]+`:/gm) || [];
    
    if (capabilities.length >= 6) {
        pass(`Proposal defines ${capabilities.length} capabilities`);
    } else {
        fail(`Proposal should define 6+ capabilities, found ${capabilities.length}`);
    }
    
    // Check that README mentions phases
    const readme = fs.readFileSync('README-QA.md', 'utf8');
    const phases = readme.match(/Phase \d/g) || [];
    
    if (phases.length >= 5) {
        pass(`README-QA mentions ${phases.length} phases`);
    } else {
        fail(`README-QA should mention 5+ phases, found ${phases.length}`);
    }
    
    // Check that CONTRIBUTING has maestro examples
    const contrib = fs.readFileSync('CONTRIBUTING.md', 'utf8');
    if (contrib.includes('appId:') && contrib.includes('launchApp')) {
        pass('CONTRIBUTING has Maestro examples');
    } else {
        fail('CONTRIBUTING missing Maestro examples');
    }
}

function runDemoTest() {
    section('9. Demo Test Execution');
    
    try {
        require('./qa-automation/ai/demo.js');
        pass('Demo test executed successfully');
    } catch (error) {
        fail(`Demo test failed: ${error.message}`);
    }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

header();

try {
    validateDirectoryStructure();
    validateFiles();
    validateYAMLSyntax();
    validateJavaScript();
    validateGitHubWorkflows();
    validateDocumentation();
    validateOpenSpec();
    validateConsistency();
    runDemoTest();
} catch (error) {
    fail(`Unexpected error: ${error.message}`);
}

footer();
