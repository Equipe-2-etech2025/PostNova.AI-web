# PostNova.AI-web

Frontend web React propulsé par Vite pour la plateforme SaaS **PostNova.AI** — Transformez un simple prompt en campagne de contenu complète avec l'IA.

## 🚀 Fonctionnalités

- **Interface intuitive** : Création et gestion facile des campagnes
- **Connexion sécurisée** : Authentification avec token (via API Laravel Sanctum)
- **Aperçus dynamiques** : Contenus générés (vidéos, posts, landing pages)
- **Tableau de bord** : Suivi des campagnes, contenus et abonnements
- **Thème responsive** : Interface adaptable pour tous les écrans
- **Intégration API REST** : Communication fluide avec le backend Laravel

## 🛠️ Technologies

- **Framework** : React 19 + Vite
- **Langage** : JavaScript
- **Styling** : TailwindCSS
- **Routing** : React Router

- **Formatting** : Prettier
- **Linting** : EsLint
  
## 📁 Structure du Projet
```
PostNova.AI-web/
├── .dockerignore
├── .gitignore
├── CONFIG.md
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── index.html
├── Makefile
├── netlfly.toml
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
├── yarn.lock
├── public/                # Assets statiques
├── src/
│   ├── app/
│   │   ├── Routes.jsx     # Configuration du routing
│   │   ├── pages/         # Composants de page
│   │                            
│   ├── assets/            # Images, polices, etc.
│   ├── components/        # Composants UI réutilisables
│   ├── configs/           # Configurations de l'app
│   ├── forms/             # Formulaires et logique
│   ├── hooks/             # Hooks React personnalisés          
│   ├── services/          # Services API
│   ├── shared/            # Utilitaires partagés
│   ├── App.jsx            # Composant principal
│   ├── index.css          # Styles globaux
│   └── main.jsx           # Point d'entrée
└── tests/                 # Tests
```

### Prérequis
```
- Node.js 22+
- npm ou yarn
```
### Installation rapide

```
# Clone
git clone https://github.com/Equipe-2-etech2025/PostNova.AI-web.git
cd PostNova.AI-web

# Install
npm install
# or
yarn

# Start
npm run dev
# or
yarn dev
```
## 🐳 Configuration Docker
### Développement
```
# Construire et démarrer les containers
# linux/ MAC:
make build
make up
make start
# windows
docker compose build
docker compose up

# Accéder à l'application sur
http://localhost:5173
```
## 🔧 Configuration
```
Éditer le fichier .env :
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=PostNova.AI
VITE_APP_ENV=development
```
## 🚀 Déploiement
```
Vercel
https://deploy-preview-12--dev-postnova-web.netlify.app
```


Développé avec ❤️ par l'Équipe 2 - ETech 2025
