#!/usr/bin/env node

/**
 * GitHub Actions Workflow Validator
 * Validates YAML structure of workflow files
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

console.log(`\n${COLORS.cyan}⚙️  GitHub Actions Workflow Validation${COLORS.reset}\n`);

const workflowDir = '.github/workflows';
const requiredFields = ['name', 'on', 'jobs'];
let validCount = 0;
let errorCount = 0;

if (!fs.existsSync(workflowDir)) {
    console.log(`${COLORS.yellow}⚠️  Workflows directory not found${COLORS.reset}\n`);
    process.exit(0);
}

const files = fs.readdirSync(workflowDir).filter(f => f.endsWith('.yml'));

files.forEach(file => {
    const filePath = path.join(workflowDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    let isValid = true;
    const errors = [];
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!content.includes(`${field}:`)) {
            errors.push(`Missing required field: "${field}:"`);
            isValid = false;
        }
    });
    
    // Check for reasonable content
    if (content.length < 200) {
        errors.push('Workflow file appears to be empty or too small');
        isValid = false;
    }
    
    // Check for valid YAML structure (basic)
    const lines = content.split('\n');
    let yamlValid = true;
    let prevIndent = 0;
    
    lines.forEach((line, idx) => {
        // Skip empty lines and comments
        if (!line.trim() || line.trim().startsWith('#')) return;
        
        // Count leading spaces
        const indent = line.search(/\S/);
        
        // Basic check: indent should be multiple of 2
        if (indent > 0 && indent % 2 !== 0) {
            errors.push(`Line ${idx + 1}: Invalid indentation (not multiple of 2)`);
            yamlValid = false;
        }
    });
    
    // Report
    if (isValid && yamlValid) {
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
