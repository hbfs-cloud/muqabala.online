# Muqabala - Frontend SPA (Vue 3)

Application Vue 3 moderne pour la plateforme Muqabala, déployée automatiquement sur GitHub Pages.

## 🚀 Technologies

- **Vue 3** - Framework JavaScript progressif
- **Vite** - Build tool ultra-rapide
- **Vue Router** - Routing officiel pour Vue.js
- **Pinia** - State management
- **Axios** - Client HTTP
- **Bootstrap 5** - Framework CSS
- **Remix Icon** - Icônes modernes
- **Google Fonts (Inter)** - Typographie premium

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 🎨 Structure du Projet

```
muqabala-online/
├── public/              # Assets statiques
│   └── logo.svg        # Logo de l'application
├── src/
│   ├── api/            # Services API
│   ├── assets/         # Assets (images, styles)
│   ├── components/     # Composants réutilisables
│   ├── router/         # Configuration du routing
│   ├── stores/         # State management (Pinia)
│   ├── views/          # Pages/Vues
│   │   ├── LandingPage.vue    # Page d'accueil
│   │   ├── LoginView.vue      # Page de connexion
│   │   └── DashboardView.vue  # Tableau de bord
│   ├── App.vue         # Composant racine
│   ├── main.js         # Point d'entrée
│   └── style.css       # Styles globaux
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD GitHub Actions
├── index.html          # Template HTML
├── vite.config.js      # Configuration Vite
└── package.json        # Dépendances et scripts
```

## 🌐 Déploiement

Le projet est configuré pour un déploiement automatique sur GitHub Pages via GitHub Actions.

### Configuration Requise

1. **Activer GitHub Pages** dans les paramètres du repository :
   - Settings → Pages
   - Source: GitHub Actions

2. **Push sur la branche main** :
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Le workflow se déclenche automatiquement** et déploie sur :
   - URL: `https://[username].github.io/muqabala.online/`

### Workflow CI/CD

Le fichier `.github/workflows/deploy.yml` gère :
- ✅ Installation des dépendances
- ✅ Build de production
- ✅ Déploiement sur GitHub Pages
- ✅ Optimisation des assets

## 🎯 Fonctionnalités

### Landing Page
- ✅ Hero section avec CTA
- ✅ Processus en 5 étapes
- ✅ Section valeurs
- ✅ Call-to-action
- ✅ Footer

### Authentification
- 🔄 Page de connexion (Google OAuth)
- 🔄 Gestion de session

### Dashboard
- 🔄 Vue d'ensemble
- 🔄 Profils compatibles
- 🔄 Messagerie

## 🎨 Design System

### Palette de Couleurs

```css
--bs-primary: #6366f1;        /* Indigo vibrant */
--bs-primary-dark: #4f46e5;   /* Indigo foncé */
--bs-success: #10b981;        /* Vert émeraude */
--bs-danger: #ef4444;         /* Rouge vif */
--bs-warning: #f59e0b;        /* Ambre */
--bs-info: #06b6d4;           /* Cyan */
```

### Typographie

- **Font Family**: Inter (300, 400, 500, 600, 700, 800)
- **Headings**: Font-weight 700, letter-spacing -0.02em
- **Body**: Font-size 0.9375rem, line-height 1.6

### Composants

- **Buttons**: Gradient backgrounds, hover effects, shadows
- **Cards**: Rounded corners (0.75rem), hover lift effect
- **Navbar**: Glassmorphism, fixed position
- **Forms**: Focus states, validation

## 🔧 Configuration

### Vite Config (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [vue()],
  base: '/muqabala.online/',  // Base path pour GitHub Pages
})
```

### Router Config (`src/router/index.js`)

```javascript
history: createWebHashHistory('/muqabala.online/')  // Hash mode pour GitHub Pages
```

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de dev (http://localhost:5173)

# Production
npm run build        # Build optimisé pour production
npm run preview      # Prévisualise le build de production

# Linting (si configuré)
npm run lint         # Vérifie le code
```

## 🔗 Intégration Backend

L'application communique avec le backend PHP via l'API REST :

```javascript
// Configuration API (src/api/client.js)
const API_BASE_URL = 'https://demo.muqabala.online/api'

// Exemple d'appel
import axios from 'axios'
const response = await axios.get(`${API_BASE_URL}/candidates`)
```

## 🚧 Roadmap

- [x] Landing page
- [x] CI/CD GitHub Pages
- [ ] Authentification Google OAuth
- [ ] Dashboard candidat
- [ ] Recherche de profils
- [ ] Système de matching
- [ ] Messagerie en temps réel
- [ ] Notifications push

## 📄 License

© 2024 Muqabala - Mosquée de Vauréal. Tous droits réservés.

## 👥 Support

Pour toute question ou problème :
- 📧 Email: support@muqabala.online
- 🐛 Issues: [GitHub Issues](https://github.com/[username]/muqabala.online/issues)
