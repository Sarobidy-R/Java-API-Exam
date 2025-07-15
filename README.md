# 🎫 Java API Exam - Système de Gestion de Tickets

[![Java CI](https://github.com/Sarobidy-R/Java-API-Exam/actions/workflows/java-ci.yml/badge.svg)](https://github.com/Sarobidy-R/Java-API-Exam/actions/workflows/java-ci.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![Java](https://img.shields.io/badge/Java-21-orange?logo=java)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![API](https://img.shields.io/badge/API-REST-green)](https://restfulapi.net/)
[![Documentation](https://img.shields.io/badge/Docs-Swagger-85EA2D?logo=swagger)](https://swagger.io/)

> 🚀 **Système complet de gestion de tickets** - API REST Java + Interface React moderne avec détection automatique d'environnement

## 📋 Vue d'ensemble

Ce projet est un **système complet de gestion de tickets** comprenant une API REST Java et une interface utilisateur React moderne. Il offre une gestion complète du cycle de vie des tickets avec une expérience utilisateur optimisée.

### ✨ Fonctionnalités principales

**Backend (API Java) :**
- 🆕 **Création de tickets** avec numérotation automatique
- 📞 **Appel de tickets** (transition WAITING → CALLED)
- ✅ **Service de tickets** (transition CALLED → SERVED)
- 📊 **Consultation des tickets** par statut
- 🔄 **File d'attente FIFO** (First In, First Out)
- 📖 **Documentation Swagger** interactive
- 🐳 **Déploiement Docker** simplifié

**Frontend (Interface React) :**
- 🎨 **Interface moderne** avec Tailwind CSS
- 📱 **Design responsive** adapté mobile/desktop
- ⚡ **Mise à jour en temps réel** des données
- 🔄 **Auto-refresh** configurable avec indicateur visuel
- 🌐 **Configuration automatique** d'environnement (dev/prod)
- 📊 **Statistiques visuelles** de la file d'attente
- 🎯 **Actions interactives** sur les tickets

## 🌐 Démo en ligne

🚀 **API Backend :** [https://java-api-exam-latest.onrender.com](https://java-api-exam-latest.onrender.com)

🎨 **Interface Frontend :** [https://java-api-front.netlify.app](https://java-api-front.netlify.app)

📖 **Documentation interactive :** [https://java-api-exam-latest.onrender.com/swagger](https://java-api-exam-latest.onrender.com/swagger)

## 🛠️ Technologies utilisées

### Backend
- **☕ Java 21** - Langage de programmation
- **🌐 HttpServer** - Serveur HTTP intégré
- **🐳 Docker** - Conteneurisation
- **📖 OpenAPI/Swagger** - Documentation API
- **☁️ Render** - Déploiement cloud

### Frontend
- **⚛️ React 18** - Framework UI moderne
- **📘 TypeScript** - Typage statique
- **⚡ Vite** - Build tool rapide
- **🎨 Tailwind CSS** - Framework CSS
- **🔗 Axios** - Client HTTP
- **🌐 Netlify** - Déploiement frontend

### DevOps
- **⚙️ GitHub Actions** - CI/CD
- **🐳 Docker Compose** - Orchestration des services

## 🚀 Démarrage rapide

### 🐳 Avec Docker Compose (Recommandé)

#### Prérequis
- [Docker](https://docs.docker.com/get-docker/) installé
- [Docker Compose](https://docs.docker.com/compose/install/) installé

#### Lancement complet (Backend + Frontend)
```bash
# Cloner le repository
git clone https://github.com/Sarobidy-R/Java-API-Exam.git
cd Java-API-Exam

# Lancer tous les services avec Docker Compose
docker compose up --build

# Ou en arrière-plan
docker compose up --build -d
```

#### 🎯 **Services disponibles :**
- 🚀 **API Backend** : [http://localhost:8080](http://localhost:8080)
- 🎨 **Interface Frontend** : [http://localhost:3000](http://localhost:3000)
- 📖 **Documentation Swagger** : [http://localhost:8080/swagger](http://localhost:8080/swagger)
- 📄 **OpenAPI Spec** : [http://localhost:8080/swagger.yaml](http://localhost:8080/swagger.yaml)

#### 🔍 **Vérification du statut :**
```bash
# Voir les conteneurs en cours
docker compose ps

# Voir les logs
docker compose logs

# Logs d'un service spécifique
docker compose logs java-app
docker compose logs frontend
```

#### 🛑 **Arrêt des services :**
```bash
# Arrêt simple
docker compose down

# Arrêt avec suppression des volumes
docker compose down -v

# Arrêt avec suppression des images
docker compose down --rmi all
```

#### ⚡ **Lancement backend uniquement :**
```bash
# Si vous voulez seulement l'API Java
docker compose up java-app --build
```

### 💻 Installation locale (sans Docker)

#### Backend Java
**Prérequis :**
- Java 21 ou supérieur
- Git

**Étapes :**
```bash
# Cloner le repository
git clone https://github.com/Sarobidy-R/Java-API-Exam.git
cd Java-API-Exam

# Compiler l'API Java
javac -d API/bin API/src/*.java

# Lancer l'API
java -cp API/bin App
```

#### Frontend React
**Prérequis :**
- Node.js 18+ et npm

**Étapes :**
```bash
# Dans un nouveau terminal, naviguer vers le frontend
cd frontend

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

#### 🎯 **Accès en local :**
- 🚀 **API Backend** : [http://localhost:8080](http://localhost:8080)
- 🎨 **Interface Frontend** : [http://localhost:5173](http://localhost:5173)
- 📖 **Documentation Swagger** : [http://localhost:8080/swagger](http://localhost:8080/swagger)

> 💡 **Note :** Le frontend détecte automatiquement l'API locale et s'y connecte.

## 🐳 Architecture Docker

### 📁 Structure des conteneurs

Le projet utilise une approche **multi-conteneurs** avec Docker Compose :

```
📦 Java-API-Exam
├── 🐳 api.Dockerfile        # Conteneur Backend Java
├── 🐳 frontend.Dockerfile   # Conteneur Frontend React  
├── 🐳 docker-compose.yml    # Orchestration des services
├── 📁 API/                  # Code source Backend
│   ├── src/                 # Sources Java
│   └── ...
└── 📁 frontend/             # Code source Frontend
    ├── src/                 # Sources React/TypeScript
    └── ...
```

### ⚙️ Services Docker

| Service | Port | Description | Dockerfile |
|---------|------|-------------|------------|
| `java-app` | 8080 | API REST Java | `api.Dockerfile` |
| `frontend` | 3000 | Interface React | `frontend.Dockerfile` |

### 🔗 Communication inter-conteneurs

- **Frontend** → **Backend** : Via réseau Docker `app-network`
- **Configuration automatique** : Le frontend détecte l'environnement
- **Variable d'environnement** : `VITE_API_URL=http://localhost:8080`

### 🛠️ Commandes Docker utiles

```bash
# Rebuild complet
docker compose build --no-cache

# Logs en temps réel
docker compose logs -f

# Restart d'un service
docker compose restart frontend

# Accès au conteneur
docker compose exec java-app sh
docker compose exec frontend sh

# Nettoyage complet
docker compose down -v --rmi all
docker system prune -af
```

## 🎨 Frontend (Interface Web)

### 🎯 **Démo en ligne**
**👉 [Testez l'interface maintenant](https://java-api-front.netlify.app) 👈**

*Interface prête à l'emploi avec détection automatique d'environnement*

### ✨ Configuration automatique

Le frontend **détecte automatiquement** l'environnement et configure l'API appropriée :

- **🏠 Développement local** : `http://localhost:8080` (si disponible)
- **🌐 Production** : `https://java-api-exam-latest.onrender.com`
- **🔄 Fallback intelligent** : Bascule vers production si API locale indisponible

### 🚀 Lancement du frontend

#### Prérequis
- Node.js 18+ et npm

#### Installation et lancement
```bash
# Naviguer vers le dossier frontend
cd frontend

# Installer les dépendances  
npm install

# Lancer en mode développement
npm run dev
```

**✅ Aucune configuration manuelle requise !** L'interface s'adapte automatiquement selon l'environnement détecté.

### 🔧 Configuration manuelle (optionnelle)

Pour forcer une URL d'API spécifique, modifiez `frontend/.env` :

```bash
# Forcer l'API locale
VITE_API_URL=http://localhost:8080

# Forcer l'API de production  
VITE_API_URL=https://java-api-exam-latest.onrender.com
```

### 🎨 Fonctionnalités de l'interface

- **📊 Dashboard principal** avec vue d'ensemble des tickets
- **🎯 Actions interactives** : Créer, appeler, servir des tickets
- **📈 Statistiques en temps réel** de la file d'attente
- **🔄 Auto-refresh configurable** avec indicateur visuel
- **🌐 Indicateur d'environnement** (Local/Production)
- **📱 Design responsive** adapté mobile et desktop
- **🎨 Interface moderne** avec codes couleur :
  - 🟡 **Jaune** : Tickets en attente (WAITING)
  - 🔵 **Bleu** : Tickets appelés (CALLED)  
  - 🟢 **Vert** : Tickets servis (SERVED)

### 🏗️ Architecture frontend

```
frontend/src/
├── components/          # Composants React réutilisables
│   ├── TicketCard.tsx   # Affichage des tickets
│   ├── QueueStats.tsx   # Statistiques de la file
│   ├── ControlPanel.tsx # Panneau de contrôle
│   └── ApiEnvironmentDisplay.tsx # Indicateur d'environnement
├── hooks/              # Hooks personnalisés
│   └── useApi.ts       # Gestion des appels API
├── services/           # Services
│   └── apiService.ts   # Client API REST avec auto-config
├── config/             # Configuration
│   └── apiConfig.ts    # Détection automatique d'environnement
├── types/              # Types TypeScript
│   └── api.ts          # Types pour l'API
└── App.tsx             # Composant principal
```

## 🎯 Exemple d'utilisation

### 🖱️ Via l'interface web (Frontend)

**En ligne :**
1. **Accéder au frontend** : [https://java-api-front.netlify.app](https://java-api-front.netlify.app)

**En local avec Docker :**
1. **Accéder au frontend** : [http://localhost:3000](http://localhost:3000)

**En local sans Docker :**
1. **Accéder au frontend** : [http://localhost:5173](http://localhost:5173)

**Utilisation :**
2. **Créer un ticket** : Cliquer sur "Nouveau Ticket"
3. **Voir la file d'attente** : Les tickets s'affichent automatiquement
4. **Appeler un ticket** : Cliquer sur "Appeler" sur un ticket
5. **Servir un ticket** : Cliquer sur "Servir" sur un ticket appelé

### 📡 Via l'API (Backend)

#### Créer un ticket
```bash
curl -X POST http://localhost:8080/api/tickets
```

**Réponse :**
```json
{
  "ticketNumber": 1,
  "status": "WAITING",
  "creationDate": "2025-07-14T10:30:00Z",
  "calledDate": null,
  "servedDate": null
}
```

#### Appeler un ticket
```bash
curl -X POST http://localhost:8080/api/tickets/call \
  -H "Content-Type: text/plain" \
  -d "1"
```

#### Voir les tickets en attente
```bash
curl http://localhost:8080/api/tickets
```

### 🔄 Flux complet

1. **Backend** : Créer et gérer les tickets via API REST
2. **Frontend** : Interface utilisateur pour interaction intuitive  
3. **Intégration** : Le frontend communique avec le backend en temps réel
4. **Documentation** : Swagger UI pour explorer l'API

## 🛠️ Commandes disponibles

### 🐳 Docker (Recommandé)
```bash
# Lancement complet (Backend + Frontend)
docker compose up --build

# Lancement en arrière-plan
docker compose up -d --build

# Backend uniquement
docker compose up java-app --build

# Frontend uniquement  
docker compose up frontend --build

# Arrêt des services
docker compose down

# Rebuild complet
docker compose build --no-cache

# Logs en temps réel
docker compose logs -f
```

### Backend (Java) - Installation locale
```bash
# Compilation (depuis la racine du projet)
javac -d API/bin API/src/*.java

# Lancement
java -cp API/bin App

# Ou depuis le dossier API
cd API
javac -d bin src/*.java
java -cp bin App
```

### Frontend (React/Vite) - Installation locale
```bash
# Depuis le dossier frontend
cd frontend

# Installation des dépendances
npm install

# Développement avec hot reload
npm run dev

# Build de production
npm run build

# Aperçu du build
npm run preview

# Vérification ESLint
npm run lint
```

## 📖 Documentation API

### 🎯 Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Message d'accueil |
| `GET` | `/health` | Health check de l'API |
| `POST` | `/api/tickets` | Créer un nouveau ticket |
| `GET` | `/api/tickets` | Lister les tickets en attente |
| `POST` | `/api/tickets/call` | Appeler un ticket |
| `POST` | `/api/tickets/serve` | Servir un ticket |
| `GET` | `/api/tickets/called` | Lister les tickets appelés |
| `GET` | `/api/tickets/served` | Lister les tickets servis |

### 📋 Endpoints de file d'attente

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/queue/enqueue` | Ajouter un ticket à la file |
| `POST` | `/api/queue/dequeue` | Retirer le ticket en tête |
| `GET` | `/api/queue/peek` | Voir le prochain ticket |
| `GET` | `/api/queue/isEmpty` | Vérifier si la file est vide |
| `GET` | `/api/queue/size` | Taille de la file |

### 📊 Statuts des tickets

| Statut | Description | Actions disponibles |
|--------|-------------|-------------------|
| `WAITING` | En attente d'être appelé | Peut être appelé |
| `CALLED` | Appelé, en cours de traitement | Peut être servi |
| `SERVED` | Traitement terminé | Aucune action |

## 🏗️ Architecture

### Backend (Java)
```
src/
├── App.java              # Point d'entrée principal
├── TicketHandler.java     # Handlers HTTP pour les tickets
├── QueueHandler.java      # Handlers HTTP pour la file d'attente
├── TicketService.java     # Service de gestion des tickets
├── QueueService.java      # Service générique de file d'attente
├── Ticket.java           # Modèle de données
└── HttpUtils.java        # Utilitaires HTTP (CORS, réponses)
```

### 🎯 Principe de fonctionnement

1. **🆕 Création** : Un ticket est créé avec un numéro unique et ajouté à la file d'attente (`WAITING`)
2. **📞 Appel** : Le ticket passe du statut `WAITING` à `CALLED`
3. **✅ Service** : Le ticket passe du statut `CALLED` à `SERVED`
4. **📊 Suivi** : Consultation possible à chaque étape

## 🚀 Déploiement

### 🖥️ Backend (Render)
- **Service Type** : Web Service avec Docker
- **Repository** : Déploiement automatique depuis GitHub
- **URL de production** : https://java-api-exam-latest.onrender.com
- **Health Check** : `/health` endpoint

### 🌐 Frontend (Netlify)
- **Service Type** : Static Site
- **Build Command** : `cd frontend && npm ci && npm run build`
- **Publish Directory** : `frontend/dist`
- **URL de production** : https://java-api-front.netlify.app
- **Configuration automatique** : Détection d'environnement intégrée

### 🔗 URLs de production
- **API Backend** : https://java-api-exam-latest.onrender.com
- **Interface Frontend** : https://java-api-front.netlify.app
- **Documentation Swagger** : https://java-api-exam-latest.onrender.com/swagger

## 🔄 CI/CD

Le projet utilise GitHub Actions pour :
- ✅ **Build automatique** à chaque push
- 🧪 **Tests** de compilation
- 🐳 **Build Docker** et push vers le registry
- 🚀 **Déploiement automatique** sur Render

## 📝 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Sarobidy-R**
- GitHub: [@Sarobidy-R](https://github.com/Sarobidy-R)
- Repository: [Java-API-Exam](https://github.com/Sarobidy-R/Java-API-Exam)

---

🎯 **Projet full-stack moderne : Backend Java + Frontend React déployé sur Render + Netlify**
| `GET` | `/api/tickets/served` | Lister les tickets servis |

### 📋 Endpoints de file d'attente

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/queue/enqueue` | Ajouter un ticket à la file |
| `POST` | `/api/queue/dequeue` | Retirer le ticket en tête |
| `GET` | `/api/queue/peek` | Voir le prochain ticket |
| `GET` | `/api/queue/isEmpty` | Vérifier si la file est vide |
| `GET` | `/api/queue/size` | Taille de la file |


## 🎨 Exemple d'utilisation

### Créer un ticket
```bash
curl -X POST http://localhost:8080/api/tickets
```

Réponse :
```json
{
  "ticketNumber": 1,
  "status": "WAITING",
  "creationDate": "2025-07-12T10:30:00Z",
  "calledDate": null,
  "servedDate": null
}
```

### Appeler un ticket
```bash
curl -X POST http://localhost:8080/api/tickets/call \
  -H "Content-Type: text/plain" \
  -d "1"
```

### Consulter les tickets en attente
```bash
curl http://localhost:8080/api/tickets
```

## 🏗️ Architecture

```
src/
├── App.java              # Point d'entrée principal
├── TicketHandler.java     # Handlers HTTP pour les tickets
├── QueueHandler.java      # Handlers HTTP pour la file d'attente
├── TicketService.java     # Service de gestion des tickets
├── QueueService.java      # Service générique de file d'attente
├── Ticket.java           # Modèle de données
└── HttpUtils.java        # Utilitaires HTTP (CORS, réponses)
```

### 🎯 Principe de fonctionnement

1. **🆕 Création** : Un ticket est créé avec un numéro unique et ajouté à la file d'attente (`WAITING`)
2. **📞 Appel** : Le ticket passe du statut `WAITING` à `CALLED`
3. **✅ Service** : Le ticket passe du statut `CALLED` à `SERVED`
4. **📊 Suivi** : Consultation possible à chaque étape

## 🔄 CI/CD

Le projet utilise GitHub Actions pour :
- ✅ **Build automatique** à chaque push
- 🧪 **Tests** de compilation
- 🐳 **Build Docker** et push vers le registry
- 🚀 **Déploiement automatique** sur Render

## 🐳 Docker

### Build manuel
```bash
# Build de l'image
docker build -t java-api-exam .

# Lancement du conteneur
docker run -p 8080:8080 java-api-exam
```

### Multi-stage build
Le Dockerfile utilise un build multi-stage pour optimiser la taille de l'image finale :
1. **Stage 1** : Compilation avec JDK complet
2. **Stage 2** : Exécution avec JRE optimisé

## 📊 Statuts des tickets

| Statut | Description | Actions disponibles |
|--------|-------------|-------------------|
| `WAITING` | En attente d'être appelé | Peut être appelé |
| `CALLED` | Appelé, en cours de traitement | Peut être servi |
| `SERVED` | Traitement terminé | Aucune action |

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Sarobidy-R**
- GitHub: [@Sarobidy-R](https://github.com/Sarobidy-R)
- Repository: [Java-API-Exam](https://github.com/Sarobidy-R/Java-API-Exam)


---

