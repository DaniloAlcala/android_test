#!/usr/bin/env node

/**
 * YAML Syntax Validator
 * Validates all YAML test files in the framework
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
};

console.log(`\n${COLORS.cyan}📝 YAML Test Files Validation${COLORS.reset}\n`);

let validCount = 0;
let errorCount = 0;

// Find all YAML test files
const maestroDir = 'qa-automation/maestro';
const testFiles = [];

function findYAMLFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            findYAMLFiles(fullPath);
        } else if (file.name.endsWith('.yaml')) {
            testFiles.push(fullPath);
        }
    });
}

findYAMLFiles(maestroDir);

if (testFiles.length === 0) {
    console.log(`${COLORS.yellow}⚠️  No YAML test files found${COLORS.reset}\n`);
    process.exit(0);
}

testFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    let isValid = true;
    const errors = [];
    
    // Check required fields
    if (!content.includes('appId:')) {
        errors.push('Missing "appId:" field');
        isValid = false;
    }
    
    if (!content.includes('---')) {
        errors.push('Missing "---" separator');
        isValid = false;
    }
    
    // Check for Maestro commands
    const maestroCommands = [
        'launchApp', 'tapOn', 'inputText', 'assertVisible', 'assertNotVisible',
        'swipe', 'scroll', 'wait', 'back', 'openDeepLink',
    ];
    
    const hasCommand = maestroCommands.some(cmd => {
        return content.includes(`- ${cmd}`) || content.includes(`- ${cmd}:`);
    });
    
    if (!hasCommand) {
        errors.push('No Maestro commands found');
        isValid = false;
    }
    
    // Check indentation (basic)
    let lineNum = 0;
    lines.forEach((line, idx) => {
        if (line.match(/^  - [a-zA-Z]/)) {
            // Valid indentation
        } else if (line.match(/^- [a-zA-Z]/)) {
            // Valid indentation
        } else if (line.match(/^[a-zA-Z]/)) {
            // Valid (no indentation needed)
        } else if (line.trim() === '') {
            // Empty line is ok
        } else if (line.match(/^    /)) {
            // Might be too much indentation
            if (!line.trim().startsWith('description') && !line.trim().startsWith('tags')) {
                errors.push(`Line ${idx + 1}: Suspicious indentation`);
            }
        }
    });
    
    // Report
    if (isValid) {
        console.log(`${COLORS.green}✓${COLORS.reset} ${file}`);
        validCount++;
    } else {
        console.log(`${COLORS.red}✗${COLORS.reset} ${file}`);
        errors.forEach(err => {
            console.log(`    ${COLORS.red}→${COLORS.reset} ${err}`);
        });
        errorCount++;
    }
});

console.log(`\n${COLORS.cyan}Summary:${COLORS.reset}`);
console.log(`  ${COLORS.green}✓ Valid: ${validCount}${COLORS.reset}`);
console.log(`  ${COLORS.red}✗ Invalid: ${errorCount}${COLORS.reset}\n`);

if (errorCount > 0) {
    process.exit(1);
}
