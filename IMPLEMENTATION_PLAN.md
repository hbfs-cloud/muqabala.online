# Plan d'Implémentation - SPA Vue 3 Complète

## 🎯 Objectif
Créer une SPA Vue 3 complète avec tous les écrans (Admin, Modérateur, Candidat) en parallèle de l'application PHP existante.

## 📊 Architecture

### Mode Dual
```
┌─────────────────────────────────────────────────────┐
│                   Muqabala Platform                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────┐      ┌──────────────────┐   │
│  │   PHP Classic    │      │   Vue 3 SPA      │   │
│  │   (Existant)     │      │   (Nouveau)      │   │
│  ├──────────────────┤      ├──────────────────┤   │
│  │ • SSR Twig       │      │ • CSR Vue 3      │   │
│  │ • Sessions PHP   │      │ • Pinia Store    │   │
│  │ • Direct DB      │      │ • API REST       │   │
│  │ • PWA Ready      │      │ • PWA Ready      │   │
│  └────────┬─────────┘      └────────┬─────────┘   │
│           │                         │              │
│           └─────────┬───────────────┘              │
│                     │                              │
│              ┌──────▼──────┐                       │
│              │  Backend    │                       │
│              │  PHP API    │                       │
│              │  + Database │                       │
│              └─────────────┘                       │
└─────────────────────────────────────────────────────┘
```

### URLs
- **PHP Classic**: `https://demo.muqabala.online/`
- **Vue 3 SPA**: `https://[username].github.io/muqabala.online/`

## 📋 Phases d'Implémentation

### ✅ Phase 1 - Fondations (FAIT)
- [x] Landing page
- [x] Login Google OAuth
- [x] Auth Store (Pinia)
- [x] Router configuration
- [x] CI/CD GitHub Actions
- [x] Design system

### 🔄 Phase 2 - API REST Backend (3-5 jours)
**Priorité : HAUTE**

#### 2.1 Architecture API
- [ ] Structure RESTful
- [ ] Authentification JWT
- [ ] Middleware CORS
- [ ] Rate limiting
- [ ] Error handling standardisé

#### 2.2 Endpoints Candidat
```
GET    /api/candidate/profile          # Profil utilisateur
PUT    /api/candidate/profile          # Mise à jour profil
GET    /api/candidate/candidates       # Liste candidats
GET    /api/candidate/candidates/:id   # Détail candidat
POST   /api/candidate/requests         # Créer demande
GET    /api/candidate/requests         # Mes demandes
PUT    /api/candidate/requests/:id     # Mettre à jour demande
GET    /api/candidate/favorites        # Mes favoris
POST   /api/candidate/favorites        # Ajouter favori
DELETE /api/candidate/favorites/:id    # Retirer favori
GET    /api/candidate/dashboard        # Stats dashboard
GET    /api/candidate/photos           # Mes photos
POST   /api/candidate/photos           # Upload photo
DELETE /api/candidate/photos/:id       # Supprimer photo
```

#### 2.3 Endpoints Modérateur
```
GET    /api/moderator/candidates       # Liste candidats à modérer
GET    /api/moderator/candidates/:id   # Détail candidat
PUT    /api/moderator/candidates/:id   # Valider/Rejeter
GET    /api/moderator/requests         # Demandes à modérer
PUT    /api/moderator/requests/:id     # Valider/Rejeter demande
GET    /api/moderator/photos           # Photos à modérer
PUT    /api/moderator/photos/:id       # Valider/Rejeter photo
GET    /api/moderator/stats            # Statistiques
```

#### 2.4 Endpoints Admin
```
GET    /api/admin/users                # Liste utilisateurs
GET    /api/admin/users/:id            # Détail utilisateur
PUT    /api/admin/users/:id            # Modifier utilisateur
DELETE /api/admin/users/:id            # Supprimer utilisateur
GET    /api/admin/stats                # Statistiques globales
GET    /api/admin/settings             # Paramètres système
PUT    /api/admin/settings             # Modifier paramètres
GET    /api/admin/logs                 # Logs système
```

#### 2.5 Endpoints Communs
```
POST   /api/auth/google                # Login Google
POST   /api/auth/logout                # Logout
GET    /api/auth/me                    # User info
POST   /api/notifications/mark-read    # Marquer lu
GET    /api/notifications              # Liste notifications
```

### 🔄 Phase 3 - Composants Réutilisables (2-3 jours)

#### 3.1 Composants UI
- [ ] `BaseButton.vue` - Boutons stylisés
- [ ] `BaseCard.vue` - Cartes
- [ ] `BaseInput.vue` - Champs de formulaire
- [ ] `BaseSelect.vue` - Select avec Select2
- [ ] `BaseModal.vue` - Modales
- [ ] `BaseTable.vue` - Tableaux
- [ ] `BasePagination.vue` - Pagination
- [ ] `BaseSpinner.vue` - Loading states
- [ ] `BaseAlert.vue` - Alertes/Toasts
- [ ] `BaseBadge.vue` - Badges

#### 3.2 Composants Métier
- [ ] `CandidateCard.vue` - Carte candidat
- [ ] `CandidateProfile.vue` - Profil détaillé
- [ ] `RequestCard.vue` - Carte demande
- [ ] `PhotoGallery.vue` - Galerie photos
- [ ] `PhotoUploader.vue` - Upload photos
- [ ] `ChatMessage.vue` - Message chat
- [ ] `NotificationItem.vue` - Notification
- [ ] `StatsCard.vue` - Carte statistique
- [ ] `FilterPanel.vue` - Panneau filtres
- [ ] `UserAvatar.vue` - Avatar utilisateur

#### 3.3 Layouts
- [ ] `DefaultLayout.vue` - Layout par défaut
- [ ] `AuthLayout.vue` - Layout authentification
- [ ] `DashboardLayout.vue` - Layout dashboard
- [ ] `Navbar.vue` - Barre de navigation
- [ ] `Sidebar.vue` - Menu latéral
- [ ] `Footer.vue` - Pied de page

### 🔄 Phase 4 - Écrans Candidat (5-7 jours)

#### 4.1 Dashboard
- [ ] Vue d'ensemble
- [ ] Statistiques personnelles
- [ ] Dernières activités
- [ ] Notifications récentes

#### 4.2 Profil
- [ ] Formulaire complet
- [ ] Validation temps réel
- [ ] Upload photos
- [ ] Prévisualisation

#### 4.3 Recherche Candidats
- [ ] Liste avec filtres
- [ ] Carte candidat
- [ ] Détail candidat
- [ ] Système de favoris
- [ ] Envoi de demande

#### 4.4 Mes Demandes
- [ ] Demandes envoyées
- [ ] Demandes reçues
- [ ] Statuts (en attente, accepté, refusé)
- [ ] Actions (accepter, refuser, annuler)

#### 4.5 Messagerie
- [ ] Liste conversations
- [ ] Chat en temps réel
- [ ] Upload fichiers
- [ ] Notifications

#### 4.6 Photos
- [ ] Galerie personnelle
- [ ] Upload/Suppression
- [ ] Gestion visibilité
- [ ] Modération

### 🔄 Phase 5 - Écrans Modérateur (3-4 jours)

#### 5.1 Dashboard Modérateur
- [ ] Statistiques modération
- [ ] Files d'attente
- [ ] Alertes

#### 5.2 Validation Profils
- [ ] Liste profils à valider
- [ ] Détail profil
- [ ] Accepter/Refuser
- [ ] Commentaires

#### 5.3 Validation Demandes
- [ ] Liste demandes
- [ ] Détails
- [ ] Validation/Rejet
- [ ] Historique

#### 5.4 Validation Photos
- [ ] Liste photos
- [ ] Prévisualisation
- [ ] Validation/Rejet
- [ ] Raisons de rejet

#### 5.5 Gestion Utilisateurs
- [ ] Liste utilisateurs
- [ ] Détails
- [ ] Actions (suspendre, activer)

### 🔄 Phase 6 - Écrans Admin (3-4 jours)

#### 6.1 Dashboard Admin
- [ ] Statistiques globales
- [ ] Graphiques
- [ ] Métriques clés

#### 6.2 Gestion Utilisateurs
- [ ] CRUD complet
- [ ] Rôles et permissions
- [ ] Historique

#### 6.3 Paramètres Système
- [ ] Configuration générale
- [ ] Maintenance mode
- [ ] Email templates
- [ ] Variables système

#### 6.4 Logs et Monitoring
- [ ] Logs système
- [ ] Logs erreurs
- [ ] Activité utilisateurs

### 🔄 Phase 7 - PWA (1-2 jours)

#### 7.1 Configuration
- [ ] Manifest.json
- [ ] Service Worker
- [ ] Stratégies de cache
- [ ] Offline mode

#### 7.2 Fonctionnalités
- [ ] Installation app
- [ ] Notifications push
- [ ] Sync en arrière-plan
- [ ] Icônes et splash screens

### 🔄 Phase 8 - Features Avancées (3-5 jours)

#### 8.1 Temps Réel
- [ ] WebSocket/SSE
- [ ] Chat en direct
- [ ] Notifications live
- [ ] Présence utilisateurs

#### 8.2 Optimisations
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Image optimization
- [ ] Caching stratégique

#### 8.3 Tests
- [ ] Tests unitaires (Vitest)
- [ ] Tests E2E (Playwright)
- [ ] Tests d'intégration

## 🛠️ Stack Technique

### Frontend
- **Framework**: Vue 3 (Composition API)
- **State**: Pinia
- **Router**: Vue Router
- **HTTP**: Axios
- **UI**: Bootstrap 5 + Custom components
- **Icons**: Remix Icon
- **Forms**: VeeValidate + Yup
- **Date**: Day.js
- **Charts**: Chart.js / ApexCharts
- **Upload**: vue-upload-component
- **Rich Text**: TipTap
- **Notifications**: vue-toastification
- **PWA**: Vite PWA Plugin

### Backend
- **API**: PHP 8+ (Slim Framework)
- **Auth**: JWT (firebase/php-jwt)
- **Validation**: respect/validation
- **CORS**: tuupola/cors-middleware
- **Rate Limit**: Custom middleware
- **Database**: MySQL (Medoo)

### DevOps
- **Build**: Vite
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages (SPA) + VPS (API)
- **Monitoring**: Sentry (optionnel)

## 📊 Estimation Temps

| Phase | Tâche | Temps Estimé |
|-------|-------|--------------|
| 1 | Fondations | ✅ FAIT |
| 2 | API REST Backend | 3-5 jours |
| 3 | Composants Réutilisables | 2-3 jours |
| 4 | Écrans Candidat | 5-7 jours |
| 5 | Écrans Modérateur | 3-4 jours |
| 6 | Écrans Admin | 3-4 jours |
| 7 | PWA | 1-2 jours |
| 8 | Features Avancées | 3-5 jours |
| **TOTAL** | | **20-30 jours** |

## 🎯 Priorités

### Sprint 1 (Semaine 1)
1. API REST Backend (Endpoints Candidat)
2. Composants UI de base
3. Dashboard Candidat
4. Profil Candidat

### Sprint 2 (Semaine 2)
1. Recherche Candidats
2. Système de demandes
3. API Modérateur
4. Dashboard Modérateur

### Sprint 3 (Semaine 3)
1. Validation (Modérateur)
2. API Admin
3. Dashboard Admin
4. Gestion utilisateurs

### Sprint 4 (Semaine 4)
1. PWA
2. Messagerie temps réel
3. Optimisations
4. Tests

## 🔄 Migration Progressive

### Stratégie
1. **Développement parallèle** : SPA et PHP coexistent
2. **Feature flags** : Activer/désactiver SPA par utilisateur
3. **A/B Testing** : Tester la SPA avec un groupe
4. **Migration graduelle** : Basculer progressivement les utilisateurs
5. **Rollback facile** : Garder PHP comme fallback

### Avantages
- ✅ Pas d'interruption de service
- ✅ Test en production réelle
- ✅ Feedback utilisateurs
- ✅ Migration sans risque
- ✅ Deux modes disponibles

## 📝 Prochaines Étapes Immédiates

### À faire maintenant
1. **Créer l'API REST** (Phase 2)
   - Structure de base
   - Authentification JWT
   - Premiers endpoints

2. **Composants de base** (Phase 3)
   - Layout principal
   - Composants UI réutilisables

3. **Dashboard Candidat** (Phase 4.1)
   - Vue d'ensemble
   - Intégration API

**Voulez-vous que je commence par la Phase 2 (API REST) ou préférez-vous que je commence directement par les composants et écrans (Phase 3-4) ?**
