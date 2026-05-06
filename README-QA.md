# Mobile QA Automation with AI 🤖📱

Automated testing framework for Android & iOS using Maestro, OpenAI, and GitHub Actions.

## 📋 Status

```
✅ Phase 0: Local Validation (READY)
✅ Phase 1: Automation Scripts (READY)
⏳ Phase 2: AI Test Generation (READY)
⏳ Phase 3: GitHub Actions CI/CD (READY)
⏳ Phase 4: iOS Support (READY)
⏳ Phase 5: Test Scaling (READY)
```

## 🚀 Quick Start

### Run All Tests Locally

```bash
cd qa-automation
bash scripts/run-tests.sh
```

**Requirements:**
- Android SDK & emulator (`qa_device`)
- Node.js 20+
- Maestro CLI

### Generate Tests with AI (Phase 2)

```bash
export OPENAI_API_KEY="sk-..."
cd qa-automation/ai
node generateTest.js "Login with valid email and verify dashboard"
```

### Run Smoke Tests Only (Phase 5)

```bash
bash qa-automation/scripts/run-tests-tags.sh smoke
```

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── android-tests.yml      # Phase 3: Android CI/CD
│       ├── ios-tests.yml          # Phase 4: iOS CI/CD
│       └── smoke-tests.yml        # Phase 5: Quick validation
├── qa-automation/
│   ├── maestro/                   # Phase 0-1: Test files (YAML)
│   │   ├── login/
│   │   ├── signup/
│   │   └── navigation/
│   ├── scripts/
│   │   ├── run-tests.sh          # Phase 1: Run all tests
│   │   └── run-tests-tags.sh     # Phase 5: Run tests by tag
│   ├── ai/
│   │   └── generateTest.js       # Phase 2: AI test generation
│   └── reports/                   # Test execution logs
├── openspec/
│   └── changes/
│       └── mobile-qa-ai-architecture/  # Spec-driven docs
├── CONTRIBUTING.md                # How to write tests
└── README.md                       # This file
```

## 🧪 Test Examples

### Basic Login Test

```yaml
appId: com.example.myapp
---
- launchApp
- assertVisible: "Login"
- tapOn: "Email Field"
- inputText: "test@example.com"
- tapOn: "Password"
- inputText: "password123"
- tapOn: "Sign In"
- wait: 2000
- assertVisible: "Dashboard"
```

### Test with Tags (Phase 5)

```yaml
appId: com.example.myapp
# metadata
tags:
  - smoke
  - login
  - critical
---
- launchApp
- assertVisible: "Login"
```

## 🤖 AI Test Generation

Generate tests automatically from descriptions:

```bash
node generateTest.js "User can search products and add to cart"
```

AI generates valid Maestro YAML based on:
- Test description
- Maestro syntax
- Best practices

**Review before committing!**

## 🔄 GitHub Actions

Three automated workflows:

### 1. Android Tests (Phase 3)
```
Trigger: push/PR to main or develop
Matrix: API levels 30, 33, 34
Output: Test logs, screenshots on failure
```

### 2. iOS Tests (Phase 4)
```
Trigger: push/PR to main or develop
Runner: macOS
Output: Test logs, simulator artifacts
```

### 3. Smoke Tests (Phase 5)
```
Trigger: PR to main or develop
Duration: <2 minutes
Purpose: Quick validation before review
```

## 📖 Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — How to write and run tests
- **[qa-automation/README.md](./qa-automation/README.md)** — Framework overview
- **[qa-automation/maestro/TESTS.md](./qa-automation/maestro/TESTS.md)** — Test structure
- **[Maestro Docs](https://maestro.mobile.dev)** — Official reference

## 🎯 Phases Overview

### Phase 0: Local Validation ✅
- Maestro CLI setup
- Android emulator configuration
- First test execution

### Phase 1: Automation Scripts ✅
- Standardized directory structure
- `run-tests.sh` script
- Repeatable execution

### Phase 2: AI Test Generation ⏳
- OpenAI API integration
- `generateTest.js` script
- Automatic YAML generation

### Phase 3: GitHub Actions Android ⏳
- `.github/workflows/android-tests.yml`
- Automated runs on push/PR
- Multi-API-level matrix

### Phase 4: iOS Support ⏳
- `.github/workflows/ios-tests.yml`
- macOS runner setup
- Parallel Android+iOS execution

### Phase 5: Scaling ⏳
- Test tagging system
- `run-tests-tags.sh` script
- Parallel job execution

## 🔧 Requirements

- **Node.js** 20+
- **Maestro CLI** (latest)
- **Android SDK** (for emulator)
- **OpenAI API Key** (for Phase 2)

## 📊 Test Metrics

```
Total Tests: 3 (starting)
Execution Time: ~5 minutes per full suite
Coverage: Features tested via Maestro assertions
CI Runs: Automated on every push/PR
```

## 🐛 Troubleshooting

### Emulator Issues
```bash
# Kill stuck emulator
adb emu kill

# Start fresh
emulator -avd qa_device -no-snapshot -no-audio -no-boot-anim
```

### Maestro Not Found
```bash
npm install -g maestro-cli
npx maestro --version
```

### AI Generation Fails
```bash
# Check API key
echo $OPENAI_API_KEY

# Set if missing
export OPENAI_API_KEY="sk-..."
```

## 🚀 Next Steps

1. **Phase 0**: Install Maestro, boot emulator, run first test
2. **Phase 1**: Use `run-tests.sh` for all test execution
3. **Phase 2**: Generate tests with AI for new features
4. **Phase 3**: Push code, watch CI/CD run tests automatically
5. **Phase 4**: Add iOS tests for parity
6. **Phase 5**: Optimize with tags and parallel execution

## 📞 Support

- See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guide
- Check [openspec/](./openspec/) for architecture decisions
- Review test logs in [qa-automation/reports/](./qa-automation/reports/)

## 📄 License

Part of Mobile QA Architecture initiative

---

**Progress:** 4/6 phases ready for implementation 🎉
