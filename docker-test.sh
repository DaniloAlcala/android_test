#!/bin/bash

# Docker Test Script
# Ejecuta tests en el emulador Docker que ya está corriendo

set -e

CONTAINER_NAME="android-test-emu"
COLORS_GREEN='\033[0;32m'
COLORS_RED='\033[0;31m'
COLORS_YELLOW='\033[1;33m'
COLORS_NC='\033[0m'

echo -e "${COLORS_YELLOW}================================================${COLORS_NC}"
echo -e "${COLORS_YELLOW}  Android Tests - Docker Execution${COLORS_NC}"
echo -e "${COLORS_YELLOW}================================================${COLORS_NC}\n"

# Verificar que el contenedor está corriendo
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo -e "${COLORS_RED}✗${COLORS_NC} Contenedor no está corriendo"
    echo -e "${COLORS_YELLOW}[!]${COLORS_NC} Inicia con: bash docker-start.sh"
    exit 1
fi

echo -e "${COLORS_GREEN}✓${COLORS_NC} Contenedor está corriendo\n"

# Ejecutar tests dentro del contenedor
echo -e "${COLORS_YELLOW}[*]${COLORS_NC} Ejecutando tests en Docker...\n"

docker exec "$CONTAINER_NAME" bash -c "
    cd /workspace
    echo 'Tests en: /workspace/qa-automation/maestro/'
    
    # Verificar que Maestro está disponible
    if ! command -v maestro &> /dev/null; then
        echo '${COLORS_YELLOW}[!]${COLORS_NC} Instalando Maestro...'
        curl -Ls 'https://get.maestro.mobile.dev' | bash
        export PATH=\$PATH:\$HOME/.maestro/bin
    fi
    
    # Ejecutar tests
    bash qa-automation/scripts/run-tests.sh
" || {
    echo -e "\n${COLORS_RED}✗${COLORS_NC} Error ejecutando tests"
    exit 1
}

echo -e "\n${COLORS_GREEN}✓${COLORS_NC} Tests completados"
