#!/bin/bash

# Docker Full Script
# Levanta emulador + ejecuta tests automáticamente

set -e

COLORS_GREEN='\033[0;32m'
COLORS_YELLOW='\033[1;33m'
COLORS_NC='\033[0m'

echo -e "${COLORS_YELLOW}================================================${COLORS_NC}"
echo -e "${COLORS_YELLOW}  Android Tests - Full Automation${COLORS_NC}"
echo -e "${COLORS_YELLOW}================================================${COLORS_NC}\n"

echo -e "${COLORS_YELLOW}[1/2]${COLORS_NC} Levantando emulador...\n"
bash docker-start.sh

echo -e "\n${COLORS_YELLOW}[2/2]${COLORS_NC} Ejecutando tests...\n"
bash docker-test.sh

echo -e "\n${COLORS_GREEN}✓${COLORS_NC} Ciclo completo terminado"
echo -e "\n${COLORS_YELLOW}Próximos pasos:${COLORS_NC}"
echo "  docker-compose down      # Detener contenedor"
echo "  docker-compose logs      # Ver logs"
