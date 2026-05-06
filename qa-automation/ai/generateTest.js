#!/usr/bin/env node

/**
 * QA Automation - AI Test Generator (Phase 2)
 * Generates Maestro YAML test files using OpenAI GPT
 * 
 * Usage: node generateTest.js "Login with valid credentials and verify home page"
 * Output: Saves to ../maestro/<feature>/<scenario>.yaml
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MAESTRO_DIR = path.join(__dirname, '../maestro');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Maestro commands for prompt context
const MAESTRO_SYNTAX = `
Maestro YAML Syntax Reference:
- launchApp: Launch the application
- tapOn: "text" - Tap on element with text
- inputText: "value" - Input text into focused field
- assertVisible: "text" - Verify element is visible
- assertNotVisible: "text" - Verify element is not visible
- swipe: "up|down|left|right" - Swipe in direction
- scroll: "up|down" - Scroll in direction
- wait: 1000 - Wait in milliseconds
- back: Go back
- openDeepLink: "deeplink" - Open deep link

Example test structure:
appId: com.example.app
---
- launchApp
- assertVisible: "Login"
- tapOn: "Email Field"
- inputText: "test@example.com"
- tapOn: "Password Field"
- inputText: "password123"
- tapOn: "Sign In"
- assertVisible: "Dashboard"
`;

async function generateTest(testDescription) {
    if (!OPENAI_API_KEY) {
        console.error('ERROR: OPENAI_API_KEY environment variable not set');
        console.error('Set it with: export OPENAI_API_KEY="sk-..."');
        process.exit(1);
    }

    if (!testDescription) {
        console.error('Usage: node generateTest.js "test description"');
        console.error('Example: node generateTest.js "Login with valid email and verify dashboard"');
        process.exit(1);
    }

    console.log('\n🤖 Generating Maestro test with AI...\n');
    console.log(`📝 Description: ${testDescription}\n`);

    const prompt = `
You are an expert QA automation engineer. Generate a Maestro YAML test based on this description:

Description: ${testDescription}

${MAESTRO_SYNTAX}

IMPORTANT:
1. Generate ONLY valid Maestro YAML (no markdown, no explanation)
2. Include appId field
3. Start steps with "---"
4. Use appropriate Maestro commands for the test flow
5. Include assertions to verify expected behavior
6. Make tests realistic and user-focused

Generate the test now:
`;

    try {
        // Using fetch for OpenAI API call (Node.js 18+)
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a Maestro test generation expert. Generate only valid YAML test files.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API Error:', error.error.message);
            process.exit(1);
        }

        const data = await response.json();
        const yamlContent = data.choices[0].message.content.trim();

        // Validate YAML structure
        if (!yamlContent.includes('appId:') || !yamlContent.includes('---')) {
            console.warn('⚠️  Generated YAML may be invalid. Review before committing.\n');
        }

        console.log('✅ Generated YAML:\n');
        console.log('---');
        console.log(yamlContent);
        console.log('---\n');

        // Extract feature and scenario name from description
        const words = testDescription.split(' ').slice(0, 3).join('-').toLowerCase();
        const featureName = words.replace(/[^a-z0-9-]/g, '');
        const scenarioName = testDescription
            .replace(/[^a-z0-9\s]/gi, '')
            .split(/\s+/)
            .slice(0, 4)
            .join('-')
            .toLowerCase();

        const featureDir = path.join(MAESTRO_DIR, featureName);
        const testFile = path.join(featureDir, `${scenarioName}.yaml`);

        // Create feature directory if it doesn't exist
        if (!fs.existsSync(featureDir)) {
            fs.mkdirSync(featureDir, { recursive: true });
            console.log(`📁 Created directory: ${featureDir}`);
        }

        // Write test file
        fs.writeFileSync(testFile, yamlContent);
        console.log(`\n📄 Test saved to: ${testFile}`);
        console.log('\n⚠️  IMPORTANT: Review the generated test before running:');
        console.log(`   cat ${testFile}`);
        console.log('\n💡 To run the test:');
        console.log(`   npx maestro test ${testFile}`);
        console.log('\n🧪 To run all tests:');
        console.log('   bash ../scripts/run-tests.sh\n');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Parse command line arguments
const testDescription = process.argv.slice(2).join(' ');
generateTest(testDescription);
