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


# Backend API E-commerce - SUN CO.

API REST structurée pour l'application e-commerce avec PostgreSQL.

## Architecture

\`\`\`
backend/
├── config/
│   └── database.js          # Configuration PostgreSQL
├── controllers/
│   ├── productController.js # Logique métier produits
│   └── cartController.js    # Logique métier panier
├── models/
│   ├── Product.js          # Modèle produit
│   └── Cart.js             # Modèle panier
├── routes/
│   ├── productRoutes.js    # Routes produits
│   └── cartRoutes.js       # Routes panier
├── middleware/
│   ├── errorHandler.js     # Gestion d'erreurs
│   └── validation.js       # Validation des données
├── utils/
│   └── helpers.js          # Fonctions utilitaires
├── migrations/
│   ├── migrate.js          # Script de migration
│   └── 001_create_tables.sql
├── seeds/
│   └── seed.js             # Données de test
├── server.js               # Point d'entrée
└── package.json
\`\`\`

##  Démarrage

\`\`\`bash
# Installation
npm install

# Variables d'environnement
cp .env.example .env

# Migration de la base
npm run migrate

# Données de test
npm run seed

# Développement
npm run dev

# Production
npm start
\`\`\`

##  API Endpoints

### Produits (Lecture seule)
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détail d'un produit

### Panier (CRUD complet)
- `GET /api/cart/:cartId` - Récupérer un panier
- `POST /api/cart/:cartId/items` - Ajouter au panier
- `PUT /api/cart/:cartId/items/:productId` - Modifier quantité
- `DELETE /api/cart/:cartId/items/:productId` - Supprimer du panier
- `DELETE /api/cart/:cartId` - Vider le panier

##  Documentation

- **Swagger UI** : http://localhost:3001/api-docs
- **Health Check** : http://localhost:3001/health

##  Fonctionnalités

### Produits
- Récupération avec filtres (catégorie, marque)
- Pagination (limit, offset)
- Gestion des images multiples
- Caractéristiques produit
- Prix et réductions

### Panier
- Création automatique
- Calcul automatique des totaux
- Gestion des quantités
- Frais de port et taxes
- Réductions automatiques

### Architecture
- Séparation des responsabilités (MVC)
- Gestion d'erreurs centralisée
- Validation des données
- Helpers utilitaires
- Documentation Swagger

