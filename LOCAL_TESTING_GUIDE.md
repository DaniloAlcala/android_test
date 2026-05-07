# � Local Testing with Docker

**Quick Reference for Running Tests Locally**

---

## **3 Modes - Pick Your Style**

### **Mode 1: Automated Full Cycle** (Fastest)
```bash
bash docker-full.sh
```
✅ Starts emulator  
✅ Installs Maestro (if needed)  
✅ Runs all tests  
✅ Shows results  

**Use when:** Quick validation before commit

---

### **Mode 2: Manual Control** (Best for Development)
```bash
# Terminal 1: Start once
bash docker-start.sh

# Terminal 2: Code/test loop
# Edit tests...
bash docker-test.sh   # Run
# Edit more...
bash docker-test.sh   # Run again
```
✅ Emulator stays running  
✅ Faster iterations  
✅ Easy debugging  

**Use when:** Writing/debugging tests

---

### **Mode 3: Step by Step** (Max Control)
```bash
# Start container
docker-compose up -d

# Connect to it
docker exec -it android-test-emu bash

# Inside container, run tests
cd /workspace
maestro test qa-automation/maestro/mytest.yaml
```
✅ Full container access  
✅ Debug manually  
✅ Install tools as needed  

**Use when:** Troubleshooting specific issues

---

## **📝 Write Your First Test**

1. **Create test file:**
```bash
mkdir -p qa-automation/maestro/myapp
cat > qa-automation/maestro/myapp/login.yaml << 'EOF'
appId: com.example.myapp
---
- launchApp
- assertVisible: "Login Screen"
- tapOn: "Email"
- inputText: "test@example.com"
- tapOn: "Password"
- inputText: "password123"
- tapOn: "Sign In"
- assertVisible: "Dashboard"
EOF
```

2. **Run it:**
```bash
bash docker-full.sh
```

3. **View results:**
```bash
cat qa-automation/reports/*/test_run.log
```

---

## **🔍 Common Commands**

```bash
# Start emulator
bash docker-start.sh

# Run all tests
bash docker-test.sh

# Run specific test
docker exec android-test-emu maestro test qa-automation/maestro/myapp/login.yaml

# View container logs
docker logs android-test-emu

# Access container shell
docker exec -it android-test-emu bash

# Stop emulator
docker-compose down

# See what's running
docker ps
```

---

## **⚡ npm Scripts** (Alternative)

```bash
npm run docker:start   # bash docker-start.sh
npm run docker:test    # bash docker-test.sh
npm run docker:full    # bash docker-full.sh
```

---

## **🛑 Stop When Done**

```bash
# Stop container (keep data)
docker-compose down

# Stop and clean everything
docker-compose down -v
```

---

## **📊 Typical Workflow**

```
Day 1:
  1. bash docker-start.sh        (start once)
  2. Create qa-automation/maestro/myapp/signup.yaml
  3. bash docker-test.sh         (test it)
  4. See failure → Edit test
  5. bash docker-test.sh         (test again)
  6. Repeat 4-5 until pass
  7. docker-compose down         (stop)

Day 2:
  1. bash docker-start.sh        (start again)
  2. Create more tests...
  3. bash docker-test.sh
  ... etc
```

---

## **❓ Help**

```bash
# Not starting?
docker ps            # Check if running
docker logs -f android-test-emu  # See errors

# Tests failing?
docker exec android-test-emu maestro --version  # Check Maestro

# Need to restart?
docker-compose down
docker-compose up -d

# Need shell access?
docker exec -it android-test-emu bash
# Then: maestro test ...yaml, adb shell, etc
```

---

## **📚 Next:**

- Read [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed docs
- Read [CONTRIBUTING.md](CONTRIBUTING.md) for test syntax
- See [README-QA.md](README-QA.md) for project overview

---

## ⚡ Quick Start (5 min)

```bash
# 1️⃣ Validate all test files
npm run validate

# 2️⃣ Preview test flows (visual simulation)
node qa-automation/scripts/simulate-tests.js

# 3️⃣ Simulate test execution (mock mode)
bash qa-automation/scripts/run-tests-mock.sh

# 4️⃣ See what's broken
npm test
```

---

## 📋 Available Local Commands

### **1. Framework Validation**
```bash
npm run validate
```
- ✅ Checks directory structure
- ✅ Validates YAML syntax
- ✅ Validates GitHub workflows
- ✅ Verifies documentation

**Use when:** Starting development, after adding new files

---

### **2. Test Preview (Visual Simulation)**
```bash
node qa-automation/scripts/simulate-tests.js
```

**Output example:**
```
🎬 Maestro Test Simulator

Found 3 test file(s)

1. qa-automation/maestro/login/login-success.yaml
   📱 App ID: com.example.myapp
   Steps:
    1. 🚀 Launch Application
    2. 👆 Tap on element: "Login"
    3. ⌨️  Type text: "user@example.com"
    4. 👁️  Verify element visible: "Dashboard"
```

**Use when:** Understanding what each test does, planning new tests

---

### **3. Mock Test Execution**
```bash
bash qa-automation/scripts/run-tests-mock.sh
```

**Output example:**
```
================================================
  QA Automation Test Runner - Mock Mode
  (Simulation without Maestro/Emulator)
================================================

  ✓ PASS: login/login-success [4 steps] (2s)
  ✓ PASS: navigation/main-navigation [5 steps] (3s)
  ✓ PASS: example-test [2 steps] (1s)

================================================
  Test Summary
================================================

  Total:  3 tests
  Passed: 3
  Failed: 0

✓ All tests simulated successfully!
```

**Use when:** Quick feedback before GitHub Actions

---

## 🔄 Development Workflow

### **Create New Test**

```bash
# 1️⃣ Create test file
mkdir -p qa-automation/maestro/your-feature
cat > qa-automation/maestro/your-feature/test-name.yaml << 'EOF'
appId: com.example.myapp
---
- launchApp
- assertVisible: "Home"
- tapOn: "Button"
- assertVisible: "Result"
EOF

# 2️⃣ Preview it
node qa-automation/scripts/simulate-tests.js

# 3️⃣ Generate with AI (optional)
export OPENAI_API_KEY="sk-..."
node qa-automation/ai/generateTest.js "Your test description"

# 4️⃣ Mock execute
bash qa-automation/scripts/run-tests-mock.sh

# 5️⃣ Commit and push
git add qa-automation/maestro/
git commit -m "Add new test: test-name"
git push origin config_test_android
```

---

## 🎯 With Actual Maestro (Optional Setup)

If you want to run **real tests** locally (not mock), you need Maestro CLI:

### **Option A: Install Maestro (macOS/Linux)**

```bash
# 1️⃣ Install Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# 2️⃣ Verify installation
maestro --version

# 3️⃣ Boot Android emulator (requires Android SDK)
# OR use Android Studio GUI

# 4️⃣ Run tests
bash qa-automation/scripts/run-tests.sh
```

### **Option B: Use Android Studio (GUI)**

```bash
# 1️⃣ Open Android Studio
# 2️⃣ Device Manager → Create Device (API 33)
# 3️⃣ Boot device
# 4️⃣ In terminal:
bash qa-automation/scripts/run-tests.sh
```

### **Option C: Use GitHub Actions**

```bash
# Just push to GitHub - tests run automatically
git push origin config_test_android

# View results:
# https://github.com/DaniloAlcala/android_test/actions
```

---

## 📊 Local Test Results

Mock results are saved to:
```
qa-automation/reports/YYYY-MM-DD_HH-MM-SS_mock_run.log
```

View recent results:
```bash
ls -lt qa-automation/reports/
tail -50 qa-automation/reports/latest.log
```

---

## 🚨 Debugging Tests

### **Check YAML Syntax**
```bash
# Validates all YAML files
npm run test:syntax
```

### **See What Each Test Does**
```bash
node qa-automation/scripts/simulate-tests.js
```

### **Check File Structure**
```bash
npm run validate
```

---

## 📝 Test File Format

```yaml
appId: com.example.myapp
---
- launchApp
- assertVisible: "Login Screen"
- tapOn: "Email Field"
- inputText: "user@example.com"
- tapOn: "Password Field"
- inputText: "password123"
- tapOn: "Sign In Button"
- wait: 2000
- assertVisible: "Dashboard"
```

**Commands:**
- 🚀 `launchApp` - Start the app
- 👆 `tapOn: "text"` - Tap button/element
- ⌨️ `inputText: "text"` - Type text
- 👁️ `assertVisible: "text"` - Verify visible
- ❌ `assertNotVisible: "text"` - Verify NOT visible
- ↔️ `swipe: "direction"` - Swipe left/right
- ↕️ `scroll: "direction"` - Scroll up/down
- ⏱️ `wait: 2000` - Wait milliseconds
- ⬅️ `back` - Back button
- 🔗 `openDeepLink: "url"` - Open deep link

---

## ✅ Before Pushing to GitHub

```bash
# 1️⃣ Validate structure
npm run validate

# 2️⃣ Check YAML syntax
npm run test:syntax

# 3️⃣ Preview tests
node qa-automation/scripts/simulate-tests.js

# 4️⃣ Mock execute
bash qa-automation/scripts/run-tests-mock.sh

# 5️⃣ Then push
git add .
git commit -m "Add/update tests"
git push origin config_test_android
```

---

## 🎓 Quick Tips

| Task | Command |
|------|---------|
| Validate all | `npm run validate` |
| Preview tests | `node qa-automation/scripts/simulate-tests.js` |
| Mock execute | `bash qa-automation/scripts/run-tests-mock.sh` |
| Check syntax | `npm run test:syntax` |
| See test logs | `ls -lt qa-automation/reports/` |
| Run real tests | `bash qa-automation/scripts/run-tests.sh` (needs Maestro) |
| Push to CI/CD | `git push origin config_test_android` |

---

## 🔗 Related Documentation

- [README-QA.md](README-QA.md) - Framework overview
- [CONTRIBUTING.md](CONTRIBUTING.md) - Test writing guide
- [SETUP_STATUS.md](SETUP_STATUS.md) - Setup alternatives
- [GitHub Actions](https://github.com/DaniloAlcala/android_test/actions) - CI/CD results

---

## ❓ FAQ

**Q: Can I run tests without Maestro/Emulator?**
A: Yes! Use `bash qa-automation/scripts/run-tests-mock.sh` for simulation

**Q: How do I see what each test does?**
A: Run `node qa-automation/scripts/simulate-tests.js`

**Q: Where are test results saved?**
A: In `qa-automation/reports/` directory

**Q: Can I run real tests locally?**
A: Yes, but you need Maestro CLI + Android SDK. See "With Actual Maestro" section

**Q: Should I test locally before pushing?**
A: Recommended! Use mock mode first, then push to GitHub for real execution

---

Happy testing! 🚀
