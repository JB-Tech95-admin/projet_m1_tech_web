# Gestion des Images - SUN CO.

## 📁 Structure des Dossiers

\`\`\`
backend/
├── public/
│   └── images/
│       └── products/
│           ├── adidas-blanc.png
│           ├── adidas-noir.png
│           ├── nike-marron.png
│           ├── nike-or.png
│           ├── nike-bleu.png
│           ├── nike-vert.png
│           └── placeholder-*.png
└── scripts/
    └── download-images.js
\`\`\`

## 🚀 Installation des Images

### 1. Téléchargement Automatique
\`\`\`bash
cd backend
npm run download-images
\`\`\`

### 2. Configuration Complète
\`\`\`bash
cd backend
npm run setup-images  # Télécharge + seed
\`\`\`

### 3. Manuel
Placez vos images dans \`backend/public/images/products/\`

## 🌐 URLs des Images

### Format Local
\`\`\`
http://localhost:3001/images/products/adidas-blanc.png
http://localhost:3001/images/products/nike-marron.png
\`\`\`

### API Images
\`\`\`
GET /api/images  # Liste toutes les images disponibles
GET /images/products/:filename  # Accès direct à une image
\`\`\`

## 📝 Conventions de Nommage

- **Format**: \`marque-couleur.extension\`
- **Exemples**: 
  - \`adidas-blanc.png\`
  - \`nike-marron.png\`
  - \`nike-bleu.png\`

## 🔧 Configuration

### Variables d'Environnement
\`\`\`env
BASE_URL=http://localhost:3001  # URL de base pour les images
\`\`\`

### Express Static
\`\`\`js
app.use('/images', express.static(path.join(__dirname, 'public/images')))
\`\`\`

## 📊 Avantages

- ✅ **Performance**: Images servies localement
- ✅ **Contrôle**: Gestion complète des assets
- ✅ **Offline**: Fonctionne sans internet
- ✅ **Sécurité**: Pas de dépendance externe
- ✅ **SEO**: URLs propres et stables

## 🔄 Mise à Jour

Pour ajouter de nouvelles images :

1. Placez l'image dans \`backend/public/images/products/\`
2. Mettez à jour \`seeds/seed.js\` avec la nouvelle URL
3. Relancez \`npm run seed\`

## 🐛 Dépannage

### Image non trouvée
- Vérifiez le chemin dans \`public/images/products/\`
- Vérifiez l'URL dans la base de données
- Redémarrez le serveur

### Permissions
\`\`\`bash
chmod 755 backend/public/images/products/
\`\`\`
