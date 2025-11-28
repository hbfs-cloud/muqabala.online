# Configuration Google OAuth pour Muqabala SPA

## 📋 Informations de Configuration

### Client ID Google
```
222055895903-j0inv85m7qi7lt5l5nbvljoimr0tsb9k.apps.googleusercontent.com
```

### URLs de Redirection Autorisées

Vous devez ajouter ces URLs dans la **Google Cloud Console** :

1. **Production (GitHub Pages)** :
   ```
   https://[votre-username].github.io/muqabala.online/
   ```

2. **Développement local** :
   ```
   http://localhost:5173
   http://localhost:5173/
   ```

## 🔧 Configuration dans Google Cloud Console

### Étapes :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionnez votre projet
3. Naviguez vers **APIs & Services** → **Credentials**
4. Cliquez sur votre **OAuth 2.0 Client ID**
5. Dans **Authorized JavaScript origins**, ajoutez :
   - `https://[votre-username].github.io`
   - `http://localhost:5173` (pour dev)

6. Dans **Authorized redirect URIs**, ajoutez :
   - `https://[votre-username].github.io/muqabala.online/`
   - `http://localhost:5173/` (pour dev)

7. Cliquez sur **Save**

## 🔐 Sécurité

### Client Secret : NON REQUIS ❌

Pour une SPA (Single Page Application) :
- ✅ **Client ID** : Public, peut être dans le code source
- ❌ **Client Secret** : NE DOIT PAS être exposé côté client

### Pourquoi pas de Client Secret ?

1. **Architecture Frontend** : Le code JavaScript est visible par tous
2. **OAuth 2.0 Implicit Flow** : Conçu pour les applications sans backend
3. **Google One Tap** : Utilise uniquement le Client ID
4. **Sécurité** : Le token JWT est signé par Google et vérifié côté backend

### Flux d'Authentification

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │         │    Google    │         │   Backend   │
│    (SPA)    │         │    OAuth     │         │  (PHP API)  │
└──────┬──────┘         └──────┬───────┘         └──────┬──────┘
       │                       │                        │
       │  1. Initiate Login    │                        │
       ├──────────────────────>│                        │
       │                       │                        │
       │  2. User Authenticates│                        │
       │     & Consents        │                        │
       │<──────────────────────┤                        │
       │                       │                        │
       │  3. Receive JWT Token │                        │
       │<──────────────────────┤                        │
       │                       │                        │
       │  4. Send Token to Backend                     │
       ├──────────────────────────────────────────────>│
       │                       │                        │
       │                       │  5. Verify Token       │
       │                       │<───────────────────────┤
       │                       │                        │
       │  6. Create Session & Return User Info         │
       │<──────────────────────────────────────────────┤
       │                       │                        │
```

## 🚀 Fonctionnalités Implémentées

### 1. Google One Tap
- ✅ Auto-login si l'utilisateur s'est déjà connecté
- ✅ Prompt automatique au chargement de la page
- ✅ Bouton "Sign in with Google" personnalisé

### 2. Gestion de Session
- ✅ Stockage local du token (localStorage)
- ✅ Vérification de l'expiration du token
- ✅ Auto-redirection si déjà connecté
- ✅ Déconnexion propre

### 3. Store Pinia (Auth)
- ✅ État centralisé de l'authentification
- ✅ Persistance de la session
- ✅ Gestion des erreurs

## 📁 Fichiers Créés/Modifiés

### Configuration
- ✅ `src/config/auth.js` - Configuration OAuth

### Store
- ✅ `src/stores/auth.js` - Store Pinia pour l'authentification

### Views
- ✅ `src/views/LoginView.vue` - Page de connexion avec Google One Tap

## 🔄 Intégration Backend (TODO)

Pour une sécurité complète, le backend PHP doit :

### 1. Vérifier le Token JWT

```php
// Endpoint: POST /api/auth/google
public function handleGoogleAuth(Request $request) {
    $credential = $request->getParsedBody()['credential'];
    
    // Verify the JWT token with Google
    $client = new Google_Client(['client_id' => GOOGLE_CLIENT_ID]);
    $payload = $client->verifyIdToken($credential);
    
    if ($payload) {
        $userId = $payload['sub'];
        $email = $payload['email'];
        $name = $payload['name'];
        $picture = $payload['picture'];
        
        // Create or update user in database
        $user = $this->findOrCreateUser($userId, $email, $name, $picture);
        
        // Create session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];
        
        return $response->withJson([
            'success' => true,
            'user' => $user
        ]);
    }
    
    return $response->withStatus(401)->withJson([
        'success' => false,
        'error' => 'Invalid token'
    ]);
}
```

### 2. Dépendances PHP Requises

```bash
composer require google/apiclient
```

### 3. Variables d'Environnement

```env
GOOGLE_CLIENT_ID=222055895903-j0inv85m7qi7lt5l5nbvljoimr0tsb9k.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<votre-secret-ici>  # Pour la vérification backend
```

## 🧪 Test en Local

### 1. Lancer le serveur de développement

```bash
cd /Users/marketwatchxyz/IdeaProjects/freescout/muqabala-online
npm run dev
```

### 2. Ouvrir dans le navigateur

```
http://localhost:5173
```

### 3. Tester la connexion

1. Cliquer sur "Se connecter"
2. Cliquer sur "Sign in with Google"
3. Sélectionner un compte Google
4. Vérifier la redirection vers `/dashboard`

## 📊 Données Stockées

### LocalStorage

```javascript
{
  "muqabala_access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
  "muqabala_user_info": {
    "id": "1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/...",
    "emailVerified": true
  },
  "muqabala_expires_at": "1701234567890"
}
```

## 🔒 Bonnes Pratiques de Sécurité

### ✅ Ce qui est fait

1. **HTTPS Obligatoire** : GitHub Pages force HTTPS
2. **Token Expiration** : Vérification de l'expiration côté client
3. **Auto-logout** : Si le token expire
4. **Pas de Client Secret** : Côté frontend

### 🔄 À faire côté Backend

1. **Vérifier le JWT** : Avec la bibliothèque Google
2. **CSRF Protection** : Tokens CSRF pour les requêtes API
3. **Rate Limiting** : Limiter les tentatives de connexion
4. **Session Sécurisée** : HttpOnly cookies
5. **CORS** : Configurer les origines autorisées

## 📝 Variables d'Environnement (Optionnel)

Pour une configuration plus flexible, créez un fichier `.env` :

```env
VITE_GOOGLE_CLIENT_ID=222055895903-j0inv85m7qi7lt5l5nbvljoimr0tsb9k.apps.googleusercontent.com
VITE_API_URL=https://demo.muqabala.online
VITE_APP_URL=https://[username].github.io/muqabala.online/
```

Puis dans `src/config/auth.js` :

```javascript
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const API_BASE_URL = import.meta.env.VITE_API_URL
```

## 🚨 Troubleshooting

### Erreur: "Invalid Client ID"
- Vérifiez que le Client ID est correct
- Vérifiez que l'origine est autorisée dans Google Cloud Console

### Erreur: "Popup blocked"
- Autorisez les popups pour le site
- Utilisez Google One Tap au lieu du popup

### Token expiré
- Le token Google expire après 1 heure
- Implémentez un refresh token côté backend

### CORS Error
- Configurez les headers CORS côté backend
- Ajoutez l'origine dans Google Cloud Console

## 📚 Ressources

- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Google Sign-In JavaScript Client Reference](https://developers.google.com/identity/gsi/web/reference/js-reference)

---

**Configuration complète ! ✅**

Prochaine étape : Implémenter la vérification du token côté backend PHP.
