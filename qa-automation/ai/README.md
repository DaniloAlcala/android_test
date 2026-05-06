# AI Test Generation 🤖

Automatically generate Maestro tests using OpenAI GPT.

## 📝 Files

### `generateTest.js` (Phase 2)
Node.js script to generate Maestro YAML tests from descriptions.

**Usage:**
```javascript
node generateTest.js "Login with valid credentials and verify home page"
```

**Output:**
Generated YAML file saved to `/maestro/<feature>/<scenario>.yaml`

## 🔑 Setup

1. Install OpenAI SDK:
```bash
npm install openai
```

2. Set API key:
```bash
export OPENAI_API_KEY="sk-..."
```

3. Run generation:
```bash
node generateTest.js "Test description"
```

## 🎯 Prompt Structure

The script includes:
- Test description from user
- Maestro YAML syntax examples
- Best practices for test structure
- App context and capabilities

## ✅ Validation

Generated tests must:
1. Have valid YAML syntax
2. Use recognized Maestro commands (launchApp, tapOn, inputText, etc.)
3. Include assertions
4. Be executable locally before commit

## 📖 Maestro Commands Reference

- `launchApp` - Start the application
- `tapOn: "text"` - Tap on element with text
- `inputText: "value"` - Input text into focused field
- `assertVisible: "text"` - Verify element is visible
- `swipe: "direction"` - Swipe (up, down, left, right)
- `scroll: "direction"` - Scroll in direction

See [Maestro Docs](https://maestro.mobile.dev) for complete reference.
