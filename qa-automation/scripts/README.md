# Scripts Directory 🔧

Bash/PowerShell scripts para automatizar ejecución de tests.

## 📜 Available Scripts

### `run-tests.sh` (Phase 1)
Main script to execute all Maestro tests locally.

**Usage:**
```bash
bash run-tests.sh
```

**Features:**
- Starts Android emulator (AVD: qa_device)
- Waits for device ready
- Deploys app
- Runs all Maestro tests
- Reports results

### `run-tests-tags.sh` (Phase 5)
Run tests filtered by tags.

**Usage:**
```bash
bash run-tests-tags.sh smoke
bash run-tests-tags.sh regression
```

## 🔧 Requirements

- Maestro CLI installed
- Android SDK
- AVD emulator configured (qa_device)

## 📝 Development

Each script should:
1. Be executable: `chmod +x script-name.sh`
2. Have clear error handling
3. Log output to console and file
4. Return proper exit codes (0=success, 1=failure)

## 📊 Logs

Test execution logs are stored in `../reports/` directory.
