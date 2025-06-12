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
