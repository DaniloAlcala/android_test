# Docker Setup for QA Automation

Ejecuta tests automatizados en Android usando Docker.

## 📋 Requisitos

- Docker Desktop instalado y corriendo
- Maestro CLI (se instala automáticamente en el contenedor)
- Git Bash (recomendado para scripts)

---

## 🚀 3 Comandos Disponibles

### 1️⃣ **Levantar emulador solo** (para codificar tests)

```bash
bash docker-start.sh
```

**Qué hace:**
- ✅ Levanta contenedor Android
- ✅ Conecta ADB
- ✅ Espera a que esté listo
- ✅ No ejecuta tests

**Cuándo usarlo:**
- Cuando quieres escribir/codificar tests
- Antes de ejecutar `docker-test.sh`

**Verificar que está corriendo:**
```bash
docker ps
# Deberías ver: android-test-emu
```

---

### 2️⃣ **Ejecutar tests** (asume emulador corriendo)

```bash
bash docker-test.sh
```

**Qué hace:**
- ✅ Verifica que emulador está corriendo
- ✅ Instala Maestro (si no existe)
- ✅ Ejecuta todos los tests en `qa-automation/maestro/`
- ✅ Muestra resultados

**Cuándo usarlo:**
- Después de `docker-start.sh`
- Cuando quieres ejecutar tests rápidamente
- Para testing iterativo

**Requisito:**
```bash
# Primero levanta el emulador
bash docker-start.sh
```

---

### 3️⃣ **Ciclo completo** (automático)

```bash
bash docker-full.sh
```

**Qué hace:**
- ✅ Levanta emulador (docker-start.sh)
- ✅ Ejecuta tests (docker-test.sh)
- ✅ Muestra resultados

**Cuándo usarlo:**
- Testing rápido end-to-end
- CI/CD (en GitHub Actions)
- Verificación antes de commit

---

## 🛑 Detener Docker

```bash
# Detener contenedor (sin borrar datos)
docker-compose down

# Detener y limpiar todo
docker-compose down -v

# Ver logs
docker-compose logs -f
```

---

## 📂 Estructura Docker

```
docker-compose.yml       # Configuración del servicio
docker-start.sh          # Script 1: Solo levantar
docker-test.sh           # Script 2: Ejecutar tests
docker-full.sh           # Script 3: Automático
.dockerignore            # Qué ignorar en Docker
```

---

## 🔧 Troubleshooting

**Contenedor no inicia:**
```bash
docker logs android-test-emu
```

**ADB no conecta:**
```bash
docker exec android-test-emu adb devices
```

**Limpiar todo y empezar:**
```bash
docker-compose down -v
docker system prune -a
bash docker-full.sh
```

---

## 💡 Tips

- ✅ Los scripts detectan automáticamente si el contenedor ya está corriendo
- ✅ No necesitas levantar Docker Desktop manualmente (`.bat` scripts lo hacen)
- ✅ Los tests se ejecutan en `/workspace/qa-automation/`
- ✅ Los reportes se guardan en `/workspace/qa-automation/reports/`

---

## 📊 Flujo Recomendado

```
Desarrollo:
bash docker-start.sh      # Levanta 1 sola vez
bash docker-test.sh       # Ejecuta cada vez que cambias tests
bash docker-test.sh       # Ejecuta de nuevo...

CI/CD (GitHub Actions):
bash docker-full.sh       # One-liner automático
```

