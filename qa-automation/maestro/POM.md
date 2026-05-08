# Maestro QA - Page Object Model (POM)

## Estructura del Proyecto

```
qa-automation/maestro/
├── config.yaml              # Configuración global
├── shared/                  # Flujos reutilizables
│   ├── login-flow.yaml      # Login común
│   ├── logout-flow.yaml     # Logout común
│   └── common-actions.yaml  # Gestos reutilizables
├── login/                   # Tests de login
│   ├── login-success.yaml
│   ├── login-invalid-credentials.yaml
│   └── login-remember-me.yaml
├── dashboard/               # Tests de dashboard
│   ├── dashboard-load.yaml
│   └── dashboard-navigation.yaml
└── account/                 # Tests de cuenta
    ├── profile-update.yaml
    └── settings.yaml
```

## Patrón POM en Maestro

### 1. Flujos Reutilizables (`shared/`)

Los flujos compartidos encapsulan acciones repetidas:

```yaml
# shared/login-flow.yaml
appId: ar.com.camuzzigas.oficinavirtual
---
- assertVisible: "mail@ejemplo.com"
- tapOn: "mail@ejemplo.com"
- inputText: "daniloalcala@gmail.com"
- tapOn: "Contraseña"
- inputText: "123Camuzzi"
- tapOn: "Iniciar Sesión"
- waitForAnimationToEnd
```

### 2. Reutilizar en Tests

Usar `runFlow` para llamar flujos:

```yaml
# login/login-success.yaml
appId: ar.com.camuzzigas.oficinavirtual
---
- launchApp:
    clearState: true
- waitForAnimationToEnd

# Reutilizar flujo de login
- runFlow: ../shared/login-flow.yaml

# Validar estado
- assertVisible: "Camuzzi Gas"

# Reutilizar logout
- runFlow: ../shared/logout-flow.yaml
```

### 3. Config Global (`config.yaml`)

Configurar comportamientos por defecto para todos los flows:

```yaml
appId: ar.com.camuzzigas.oficinavirtual

platform:
  android:
    disableAnimations: false

# Opcional: ejecutar login antes de cada test
# onFlowStart:
#   - runFlow: shared/login-flow.yaml
```

## Ventajas del Patrón

✅ **Reutilización**: Una vez defines `login-flow.yaml`, úsalo en múltiples tests  
✅ **Mantenibilidad**: Cambios en un lugar (ej: nuevo campo de login) se aplican a todos los tests  
✅ **Organización**: Estructura clara por feature/página  
✅ **Escalabilidad**: Fácil agregar nuevos tests sin duplicar código  

## Ejecución

```bash
# Ejecutar todos los tests
maestro test qa-automation/maestro/

# Ejecutar solo login
maestro test qa-automation/maestro/login/

# Ejecutar un test específico
maestro test qa-automation/maestro/login/login-success.yaml
```
