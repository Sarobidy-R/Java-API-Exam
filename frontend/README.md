# 🎫 Java API Exam Frontend

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

> 🚀 **Interface frontend moderne** pour tester et interagir avec l'API REST Java de gestion de tickets

## 🎯 **Démo en ligne** 
**👉 [Testez l'interface maintenant sur Netlify](https://java-api-front.netlify.app/) 👈**

*Aucune installation requise - Interface prête à l'emploi avec l'API déployée sur Render*

## 📋 Vue d'ensemble

Cette application React TypeScript avec Vite fournit une interface utilisateur moderne et intuitive pour tester toutes les fonctionnalités de l'API Java de gestion de tickets. Elle permet de créer, appeler, servir des tickets et de gérer la file d'attente en temps réel.

### ✨ Fonctionnalités

- 🎨 **Interface moderne** avec Tailwind CSS
- 📱 **Design responsive** adapté mobile/desktop
- ⚡ **Mise à jour en temps réel** des données
- 🔄 **Auto-refresh** configurable
- 📊 **Statistiques visuelles** de la file d'attente
- 🎯 **Actions interactives** sur les tickets
- 🛠️ **Panneau de contrôle** complet
- 🌐 **Configuration API** flexible (dev/prod)

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ et npm
- ✅ **Aucune API locale requise** - Utilise l'API déployée sur Render

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd java-api-exam-front

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

### Configuration
L'application est préconfigurée pour utiliser l'API déployée sur Render :
```env
# API déployée (par défaut)
VITE_API_URL=https://java-api-exam-latest.onrender.com
```

> 💡 **Note** : L'API est hébergée sur Render et peut prendre quelques secondes à démarrer lors de la première requête (cold start).

### ⏱️ **Expérience utilisateur avec Render**
- **Premier accès** : 10-30 secondes de chargement (cold start normal)
- **Utilisation continue** : Réponses rapides et fluides
- **Indicateur de statut** : Affichage en temps réel de l'état de l'API
- **Auto-refresh intelligent** : Optimisé pour éviter les clignotements

## 🌐 Accès

- **🌐 Version déployée** : https://java-api-front.netlify.app/
- **Interface locale** : http://localhost:5173
- **API utilisée** : https://java-api-exam-latest.onrender.com
- **Documentation API** : https://java-api-exam-latest.onrender.com/swagger

## 🏗️ Architecture

```
src/
├── components/          # Composants React réutilisables
│   ├── TicketCard.tsx   # Affichage des tickets
│   ├── QueueStats.tsx   # Statistiques de la file
│   └── ControlPanel.tsx # Panneau de contrôle
├── hooks/              # Hooks personnalisés
│   └── useApi.ts       # Gestion des appels API
├── services/           # Services
│   └── apiService.ts   # Client API REST
├── types/              # Types TypeScript
│   └── api.ts          # Types pour l'API
└── App.tsx             # Composant principal
```

## 🎯 Fonctionnalités détaillées

### 📊 Dashboard principal
- Vue d'ensemble des tickets par statut
- Statistiques en temps réel
- Actions rapides sur les tickets

### 🎫 Gestion des tickets
- ➕ **Création** de nouveaux tickets
- 📞 **Appel** de tickets (WAITING → CALLED)
- ✅ **Service** de tickets (CALLED → SERVED)
- 📋 **Consultation** par statut

### 📋 File d'attente
- ➕ **Enqueue** : Ajouter un ticket à la file
- ➖ **Dequeue** : Retirer le premier ticket
- 👀 **Peek** : Voir le prochain ticket
- 📏 **Size** : Taille de la file
- ❓ **IsEmpty** : Vérifier si vide

### ⚙️ Configuration
- 🌐 **URL API** modifiable à chaud
- 🔄 **Auto-refresh** activable/désactivable
- 📱 **Interface responsive**

## 🛠️ Commandes disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run lint         # Vérification ESLint
```

## 📦 Technologies utilisées

- **⚛️ React 18** - Framework UI
- **📘 TypeScript** - Typage statique
- **⚡ Vite** - Build tool moderne
- **🎨 Tailwind CSS** - Framework CSS
- **🔗 Axios** - Client HTTP
- **🎯 Lucide React** - Icônes modernes

## 🎨 Interface utilisateur

### Layout principal
```
┌─────────────────────────────────────────┐
│ Header (titre, contrôles, auto-refresh) │
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────────┐ │
│ │ Contrôl │ │ Tickets │ │ Tickets     │ │
│ │ Panel   │ │ Waiting │ │ Called +    │ │
│ │ +       │ │         │ │ Served      │ │
│ │ Stats   │ │         │ │             │ │
│ └─────────┘ └─────────┘ └─────────────┘ │
└─────────────────────────────────────────┘
```

### Codes couleurs
- 🟡 **Jaune** : Tickets en attente (WAITING)
- 🔵 **Bleu** : Tickets appelés (CALLED)  
- 🟢 **Vert** : Tickets servis (SERVED)

## 🔧 Configuration avancée

### Variables d'environnement
```env
VITE_API_URL=https://java-api-exam-latest.onrender.com    # API déployée (par défaut)
```

> ⚠️ **Important** : L'API sur Render peut avoir un délai de démarrage (cold start) de 10-30 secondes lors de la première requête après une période d'inactivité.

### Proxy de développement (optionnel)
Modifiez `vite.config.ts` pour ajouter un proxy :
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

## 🧪 Tests et développement

### Structure de test
- Tests unitaires avec Vitest (à ajouter)
- Tests d'intégration avec Testing Library (à ajouter)
- Tests E2E avec Playwright (à ajouter)

### Développement
```bash
# Mode développement avec hot reload
npm run dev

# Build et test
npm run build && npm run preview
```

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement statique
Le dossier `dist/` contient les fichiers pour déploiement sur :
**✅ Netlify** : https://java-api-front.netlify.app/


## 🤝 API Backend

Cette interface est conçue pour fonctionner avec l'API Java :
- **Repository** : [Java-API-Exam](https://github.com/Sarobidy-R/Java-API-Exam)
- **API locale** : http://localhost:8080
- **API déployée** : https://java-api-exam-latest.onrender.com
- **Documentation** : `/swagger` endpoint

## 📝 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Frontend développé pour tester l'API Java API Exam**
- Backend Repository: [Java-API-Exam](https://github.com/Sarobidy-R/Java-API-Exam)

---

⭐ **Interface moderne pour une API moderne !**
 