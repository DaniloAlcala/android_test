#!/bin/bash

# Docker Start Script
# Levanta el contenedor Android emulator sin ejecutar tests

set -e

CONTAINER_NAME="android-test-emu"
COLORS_GREEN='\033[0;32m'
COLORS_YELLOW='\033[1;33m'
COLORS_NC='\033[0m'

echo -e "${COLORS_YELLOW}================================================${COLORS_NC}"
echo -e "${COLORS_YELLOW}  Android Emulator - Docker Start${COLORS_NC}"
echo -e "${COLORS_YELLOW}================================================${COLORS_NC}\n"

# Verificar si el contenedor ya está corriendo
if docker ps | grep -q "$CONTAINER_NAME"; then
    echo -e "${COLORS_GREEN}✓${COLORS_NC} Contenedor ya está corriendo: $CONTAINER_NAME"
    docker exec "$CONTAINER_NAME" adb shell echo "OK" > /dev/null 2>&1 && \
        echo -e "${COLORS_GREEN}✓${COLORS_NC} ADB conectado y listo"
    exit 0
fi

# Verificar si existe pero no está corriendo
if docker ps -a | grep -q "$CONTAINER_NAME"; then
    echo -e "${COLORS_YELLOW}[*]${COLORS_NC} Contenedor existe pero no está corriendo, iniciando..."
    docker start "$CONTAINER_NAME"
else
    echo -e "${COLORS_YELLOW}[*]${COLORS_NC} Levantando contenedor con docker-compose..."
    docker-compose up -d
fi

# Esperar a que el contenedor esté listo
echo -e "${COLORS_YELLOW}[*]${COLORS_NC} Esperando a que el emulador esté listo..."
sleep 5

# Verificar conectividad ADB
MAX_RETRIES=30
RETRY=0
while [ $RETRY -lt $MAX_RETRIES ]; do
    if docker exec "$CONTAINER_NAME" adb shell echo "OK" > /dev/null 2>&1; then
        echo -e "${COLORS_GREEN}✓${COLORS_NC} Emulador listo"
        break
    fi
    echo -n "."
    sleep 2
    RETRY=$((RETRY + 1))
done

if [ $RETRY -eq $MAX_RETRIES ]; then
    echo -e "\n${COLORS_RED}✗${COLORS_NC} Timeout esperando emulador"
    exit 1
fi

echo -e "\n${COLORS_GREEN}✓${COLORS_NC} Contenedor Docker levantado y listo"
echo -e "\n${COLORS_YELLOW}Próximos pasos:${COLORS_NC}"
echo "  bash docker-test.sh      # Ejecutar tests"
echo "  docker-compose down      # Detener contenedor"
