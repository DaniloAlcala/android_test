# Contributing to QA Automation

## 📖 Guide for QA Engineers

This document explains how to create, run, and contribute Maestro tests.

---

## 🏗️ Project Structure

```
qa-automation/
├── maestro/              # Maestro YAML test files
│   ├── login/
│   ├── signup/
│   └── navigation/
├── scripts/
│   ├── run-tests.sh      # Run all tests
│   └── run-tests-tags.sh # Run tests by tag
├── ai/
│   └── generateTest.js   # AI test generator (Phase 2)
└── reports/              # Test execution reports
```

---

## 🚀 Getting Started

### Prerequisites

1. **Android SDK** installed (for emulator)
2. **Node.js** v20+ (for Maestro & test generation)
3. **Maestro CLI** installed

### Install Maestro

```bash
# Using npm
npm install -g maestro-cli

# Or using npx (recommended)
npx maestro --version
```

---

## ✍️ Writing Tests

### Test Naming Convention

- **Feature folder**: `maestro/<feature-name>/`
- **Test file**: `<feature-name>-<scenario>.yaml`

Examples:
```
maestro/login/login-success.yaml
maestro/login/login-invalid-email.yaml
maestro/checkout/checkout-complete.yaml
maestro/navigation/main-navigation.yaml
```

### Test Template

```yaml
appId: com.example.myapp
---
- launchApp
- assertVisible: "Login Button"
- tapOn: "Email Field"
- inputText: "user@example.com"
- tapOn: "Sign In"
- wait: 2000
- assertVisible: "Dashboard"
```

### Common Maestro Commands

| Command | Usage | Example |
|---------|-------|---------|
| `launchApp` | Start the app | `- launchApp` |
| `tapOn: "text"` | Tap element | `- tapOn: "Login"` |
| `inputText: "value"` | Input text | `- inputText: "email@test.com"` |
| `assertVisible: "text"` | Verify visible | `- assertVisible: "Dashboard"` |
| `assertNotVisible: "text"` | Verify not visible | `- assertNotVisible: "Error"` |
| `swipe: "direction"` | Swipe | `- swipe: "up"` |
| `scroll: "direction"` | Scroll | `- scroll: "down"` |
| `wait: milliseconds` | Wait | `- wait: 1000` |
| `back` | Go back | `- back` |

See [Maestro Docs](https://maestro.mobile.dev) for complete reference.

---

## 🧪 Running Tests

### Run All Tests Locally

```bash
cd qa-automation
bash scripts/run-tests.sh
```

**What happens:**
1. Starts Android emulator (if not running)
2. Waits for device ready
3. Deploys app
4. Executes all Maestro tests
5. Generates report in `reports/`

### Run Specific Test

```bash
npx maestro test maestro/login/login-success.yaml
```

### Run Tests by Tag (Phase 5)

```bash
bash scripts/run-tests-tags.sh smoke
bash scripts/run-tests-tags.sh regression
```

---

## 🤖 AI Test Generation (Phase 2)

### Setup OpenAI API

1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Set environment variable:

```bash
export OPENAI_API_KEY="sk-..."
```

### Generate Test with AI

```bash
cd qa-automation/ai
node generateTest.js "Login with valid email and password, then verify dashboard"
```

**Output:**
- Generates YAML test
- Saves to `../maestro/<feature>/<scenario>.yaml`
- Prints test for review

### Important: Review Generated Tests

AI-generated tests should be reviewed before committing:

```bash
# View generated test
cat maestro/login/login-valid-credentials.yaml

# Run to verify
npx maestro test maestro/login/login-valid-credentials.yaml

# Commit if passes
git add maestro/login/login-valid-credentials.yaml
git commit -m "Add AI-generated login test"
```

---

## 🏷️ Test Tags (Phase 5)

Tags help organize and filter tests:

```yaml
appId: com.example.myapp
# metadata
tags:
  - smoke        # Fast, critical path tests
  - login        # Feature-specific
  - critical     # Must-pass before release
  - regression   # Full coverage
---
- launchApp
- assertVisible: "Login"
```

### Run by Tag

```bash
bash scripts/run-tests-tags.sh smoke          # Quick validation
bash scripts/run-tests-tags.sh regression     # Full suite
bash scripts/run-tests-tags.sh critical       # Must-pass
```

---

## 📊 CI/CD Integration

### GitHub Actions Workflows

Tests run automatically on:
- **Push** to `main` or `develop`
- **Pull Request** to `main` or `develop`

### Workflows

1. **android-tests.yml** — Full Android test suite (Phase 3)
2. **ios-tests.yml** — iOS tests (Phase 4)
3. **smoke-tests.yml** — Quick smoke tests on PRs (Phase 5)

### View Results

1. Go to **Actions** tab in GitHub
2. Click workflow run
3. See test results and logs
4. Download artifact reports

---

## 🐛 Troubleshooting

### Emulator Won't Start

```bash
# Kill existing emulator
adb devices
adb -s <device-id> emu kill

# Start fresh
emulator -avd qa_device -no-snapshot -no-audio -no-boot-anim
```

### Test Fails with "Element Not Found"

1. Add `wait` step before assertion:
```yaml
- wait: 2000
- assertVisible: "Button"
```

2. Check element text matches exactly

3. Use `tapOn` for interactive elements

### Maestro Not Found

```bash
# Install via npm
npm install -g maestro-cli

# Or use npx
npx maestro --version
```

---

## 📝 Best Practices

1. **One concern per test** — Test a single user journey
2. **Use wait steps** — Add delays for loading
3. **Clear assertions** — Verify key UI elements
4. **Meaningful names** — Use descriptive file names
5. **Keep tests fast** — Avoid unnecessary steps
6. **Test data** — Use test accounts, not production data
7. **Tag tests** — Organize for easy filtering
8. **Review AI tests** — Don't auto-commit generated tests

---

## 🔄 Workflow Example

```bash
# 1. Create test directory
mkdir -p qa-automation/maestro/my-feature

# 2. Write test
cat > qa-automation/maestro/my-feature/feature-scenario.yaml << 'EOF'
appId: com.example.myapp
---
- launchApp
- assertVisible: "Home"
EOF

# 3. Test locally
npx maestro test qa-automation/maestro/my-feature/feature-scenario.yaml

# 4. Commit
git add qa-automation/maestro/
git commit -m "Add my-feature tests"

# 5. Push (triggers CI/CD)
git push origin feature-branch

# 6. View results in Actions tab
```

---

## 📚 Resources

- [Maestro Documentation](https://maestro.mobile.dev)
- [GitHub Actions](https://docs.github.com/actions)
- [OpenAI API](https://platform.openai.com/docs)

---

## 🤝 Questions?

Ask team lead or refer to README.md
