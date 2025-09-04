# Makefile

# Variables
DOCKER_COMPOSE = docker compose
DOCKER = docker
NPM = $(DOCKER_COMPOSE) exec web npm

.PHONY: help build up down start stop restart logs clean

help:
	@echo "Commandes disponibles:"
	@echo "  make build       - Construit les images Docker"
	@echo "  make up          - Démarre les conteneurs en mode détaché"
	@echo "  make down        - Arrête et supprime les conteneurs"
	@echo "  make start       - Démarre l'application (alias de up)"
	@echo "  make stop        - Arrête les conteneurs (alias de down)"
	@echo "  make restart     - Redémarre les conteneurs"
	@echo "  make logs        - Affiche les logs des conteneurs"
	@echo "  make clean       - Nettoie les conteneurs et images inutilisés"
	@echo "  make npm-install - Installe une dépendance (ex: make npm-install pkg=lodash)"
	@echo "  make shell       - Ouvre un shell dans le conteneur"
	@echo "  make dev         - Lance le serveur de développement"

build:
	$(DOCKER_COMPOSE) build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

start: up

stop: down

restart: down up

logs:
	$(DOCKER_COMPOSE) logs -f

clean:
	$(DOCKER) system prune -f

npm-install:
	$(NPM) install $(pkg)

shell:
	$(DOCKER_COMPOSE) exec web sh

dev:
	$(DOCKER_COMPOSE) up