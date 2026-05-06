# Maestro Tests 📱

Directorio para almacenar tests en formato Maestro YAML.

## 📋 Estructura de Naming

```
/maestro
  ├── login/
  │   ├── login-success.yaml
  │   ├── login-invalid-email.yaml
  │   └── login-wrong-password.yaml
  ├── checkout/
  │   ├── checkout-complete.yaml
  │   └── checkout-with-coupon.yaml
  └── navigation/
      └── navigation-basic.yaml
```

## 🎯 Naming Convention

- **Feature folder**: `<feature-name>/` (e.g., `login/`, `checkout/`)
- **Test file**: `<feature>-<scenario>.yaml` (e.g., `login-success.yaml`)

## 📝 Test Template

```yaml
appId: com.example.app
---
- launchApp
- tapOn: "Login Button"
- inputText: "test@example.com"
- tapOn: "Password Field"
- inputText: "password123"
- tapOn: "Sign In"
- assertVisible: "Home Screen"
```

## ✅ Execution

Run all tests:
```bash
bash ../scripts/run-tests.sh
```

Run specific test:
```bash
maestro test login/login-success.yaml
```

## 🏷️ Tags (Phase 5)

Tests can be tagged for selective execution:
```yaml
# metadata
tags:
  - smoke
  - login
  - critical
---
# test steps...
```
