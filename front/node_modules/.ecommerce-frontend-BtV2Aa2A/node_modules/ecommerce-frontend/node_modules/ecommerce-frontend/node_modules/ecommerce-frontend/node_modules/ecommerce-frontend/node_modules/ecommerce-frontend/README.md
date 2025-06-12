# Application E-commerce Complète - SUN CO.

Application e-commerce moderne avec React (frontend)
## Installation Rapide

### Prérequis
- Node.js (v16+)
- npm ou yarn

### Installation Manuelle

\`\`\`bash
# 1. Installation des dépendances
npm install

# 2. Lancement en mode developpement
npm run dev
\`\`\`

## Structure du Projet

\`\`\`
ecommerce-app/
├── frontend/                 # Application React
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── package.json
├── backend/                  # API Node.js
│   ├── config/              # Configuration DB
│   ├── controllers/         # Logique métier
│   ├── models/             # Modèles de données
│   ├── routes/             # Routes API
│   ├── middleware/         # Middlewares
│   ├── utils/              # Utilitaires
│   ├── migrations/         # Migrations DB
│   ├── seeds/              # Données de test
│   ├── scripts/            # Scripts utilitaires
│   ├── public/             # Images statiques
│   │   └── images/
│   │       └── products/   # Images produits
│   ├── .env.example
│   └── package.json
├── package.json             # Scripts globaux
└── README.md
\`\`\`

## Scripts Disponibles


### Scripts Frontend
\`\`\`bash
cd frontend
npm run dev             # Serveur de développement (port 3000)
npm run build           # Build de production
\`\`\`

## Accès aux Services

- **Frontend** : http://localhost:5173

## Fonctionnalités

### Frontend
-  Interface moderne avec React + TypeScript
-  Design responsive avec Tailwind CSS
-  Routing avec React Router
-  Gestion d'état avec Context API
-  Panier fonctionnel avec sidebar
-  Images optimisées et locales


## Technologies Utilisées

### Frontend
- React 18 + TypeScript
- Vite + Tailwind CSS
- React Router + Context API

## Déploiement

### Frontend
\`\`\`bash
cd frontend
npm run build
# Déployer le dossier dist/
\`\`\`

---
