# 🚀 Guide de Déploiement - SPA Vue 3 (Submodule Git)

## 📋 Structure Git

La SPA Vue 3 est dans un **submodule Git séparé** :

```
freescout/                          # Repo principal (PHP)
├── freescout/                      # Application PHP
│   └── php/html/                   # Code PHP
└── muqabala-online/                # Submodule Git (SPA Vue 3)
    ├── .git/                       # Repo Git séparé
    ├── src/                        # Code Vue 3
    ├── public/                     # Assets statiques
    └── dist/                       # Build de production
```

## 🔧 Configuration du Submodule

### Vérifier le submodule

```bash
cd /Users/marketwatchxyz/IdeaProjects/freescout
git submodule status
```

### Initialiser le submodule (si nécessaire)

```bash
git submodule update --init --recursive
```

## 📦 Déploiement de la SPA

### Étape 1 : Commit dans le submodule

```bash
cd /Users/marketwatchxyz/IdeaProjects/freescout/muqabala-online

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "feat: Complete Vue 3 SPA with PWA and API integration"

# Push vers le repo du submodule
git push origin main
```

### Étape 2 : Mettre à jour le repo principal

```bash
cd /Users/marketwatchxyz/IdeaProjects/freescout

# Le repo principal doit pointer vers le nouveau commit du submodule
git add muqabala-online

# Commit
git commit -m "chore: Update muqabala-online submodule"

# Push
git push origin main
```

## 🌐 Déploiement GitHub Pages

### Configuration GitHub Pages

1. **Aller dans le repo du submodule** sur GitHub
2. **Settings** → **Pages**
3. **Source** : GitHub Actions
4. Le workflow `.github/workflows/deploy.yml` se déclenchera automatiquement

### Workflow CI/CD

Le fichier `.github/workflows/deploy.yml` est déjà configuré :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

### URL de déploiement

Une fois déployé, l'application sera accessible à :
```
https://[votre-username].github.io/muqabala.online/
```

## ✅ Checklist de Déploiement

### Avant le déploiement

- [x] Favicons copiés depuis PHP
- [x] Manifest.json configuré
- [x] Service Worker créé
- [x] Build testé localement
- [x] API backend accessible
- [x] Google OAuth configuré

### Déploiement

- [ ] Commit submodule
- [ ] Push submodule
- [ ] Mettre à jour repo principal
- [ ] Vérifier GitHub Actions
- [ ] Tester l'URL de production

### Post-déploiement

- [ ] Configurer Google OAuth (ajouter URL prod)
- [ ] Tester login Google
- [ ] Tester PWA (installation)
- [ ] Tester offline mode
- [ ] Vérifier API CORS

## 🔐 Configuration Google OAuth

### Ajouter l'URL de production

1. **Google Cloud Console** → **APIs & Services** → **Credentials**
2. **OAuth 2.0 Client IDs** → Votre client
3. **Authorized JavaScript origins** :
   - Ajouter : `https://[username].github.io`

4. **Authorized redirect URIs** :
   - Ajouter : `https://[username].github.io/muqabala.online/`

## 🐛 Troubleshooting

### Le build échoue

```bash
# Nettoyer et réinstaller
cd muqabala-online
rm -rf node_modules dist
npm install
npm run build
```

### Les favicons ne s'affichent pas

```bash
# Vérifier que les favicons sont bien copiés
ls -la public/favicon*

# Si manquants, recopier depuis PHP
cp ../freescout/php/html/public/favicon* public/
```

### CORS errors

Vérifier que le backend API autorise l'origine GitHub Pages :

```php
// src/Api/V1/routes.php
$allowedOrigins = [
    'http://localhost:5173',
    'https://[username].github.io'
];
```

### Service Worker ne s'enregistre pas

Le SW ne s'enregistre qu'en **production** (`import.meta.env.PROD`).

Pour tester localement :
```bash
npm run build
npm run preview
```

## 📝 Commandes Utiles

### Développement local

```bash
cd muqabala-online
npm run dev
```

### Build de production

```bash
npm run build
```

### Prévisualiser le build

```bash
npm run preview
```

### Vérifier le statut Git

```bash
git status
git log --oneline -5
```

### Mettre à jour les submodules

```bash
# Depuis le repo principal
git submodule update --remote --merge
```

## 🎯 Prochaines Étapes

1. **Déployer** : Suivre les étapes ci-dessus
2. **Tester** : Vérifier toutes les fonctionnalités
3. **Configurer** : Google OAuth avec URL prod
4. **Monitorer** : Vérifier les logs GitHub Actions
5. **Itérer** : Enrichir les pages placeholders

---

**La SPA est prête pour le déploiement ! 🚀**

Tous les favicons sont identiques au PHP, le submodule est configuré, et le CI/CD est prêt.
