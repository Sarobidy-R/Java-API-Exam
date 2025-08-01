# 🎫 Java API Exam - Système de Gestion de Tickets

[![Java CI](https://github.com/Sarobidy-R/Java-API-Exam/actions/workflows/java-ci.yml/badge.svg)](https://github.com/Sarobidy-R/Java-API-Exam/actions/workflows/java-ci.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![Traefik](https://img.shields.io/badge/Traefik-Load%20Balancer-24a1c1?logo=traefik)](https://traefik.io/)
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
- 📞 **Appel automatique FIFO** (premier en attente → appelé - transition WAITING → CALLED)
- ✅ **Service automatique FIFO** (premier appelé → servi - transition CALLED → SERVED)
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

🚀 **API Backend :** [https://java-api.rasendra.app/](https://java-api.rasendra.app/)

🎨 **Interface Frontend :** [https://java-api-front.rasendra.app](https://java-api-front.rasendra.app)

📖 **Documentation interactive :** [https://java-api.rasendra.app/swagger](https://java-api.rasendra.app/swagger)

## 🛠️ Technologies utilisées

### Backend
- **☕ Java 21** - Langage de programmation
- **🌐 HttpServer** - Serveur HTTP intégré
- **🐳 Docker** - Conteneurisation
- **📖 OpenAPI/Swagger** - Documentation API

### Frontend
- **⚛️ React 18** - Framework UI moderne
- **📘 TypeScript** - Typage statique
- **⚡ Vite** - Build tool rapide
- **🎨 Tailwind CSS** - Framework CSS
- **🔗 Axios** - Client HTTP

### DevOps
- **⚙️ GitHub Actions** - CI/CD
- **🐳 Docker Compose** - Orchestration des services
- **☁️ DigitalOcean** - Serveur cloud Ubuntu
- **🔀 Traefik** - Load balancer et reverse proxy
- **🌍 Name.com** - Gestion de domaine

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
- 🚀 **API Backend** : [http://localhost:8008](http://localhost:8008)
- 🎨 **Interface Frontend** : [http://localhost:3000](http://localhost:3000)
- 📖 **Documentation Swagger** : [http://localhost:8008/swagger](http://localhost:8008/swagger)
- 📄 **OpenAPI Spec** : [http://localhost:8008/swagger.yaml](http://localhost:8008/swagger.yaml)

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
- 🚀 **API Backend** : [http://localhost:8008](http://localhost:8008)
- 🎨 **Interface Frontend** : [http://localhost:5173](http://localhost:5173)
- 📖 **Documentation Swagger** : [http://localhost:8008/swagger](http://localhost:8008/swagger)

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
| `java-app` | 8008 | API REST Java | `api.Dockerfile` |
| `frontend` | 3000 | Interface React | `frontend.Dockerfile` |

### 🔗 Communication inter-conteneurs

- **Frontend** → **Backend** : Via réseau Docker `app-network`
- **Configuration automatique** : Le frontend détecte l'environnement
- **Variable d'environnement** : `VITE_API_URL=http://localhost:8008`

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
**👉 [Testez l'interface maintenant](https://java-api-front.rasendra.app) 👈**

*Interface prête à l'emploi avec détection automatique d'environnement*

### ✨ Configuration automatique

Le frontend **détecte automatiquement** l'environnement et configure l'API appropriée :

- **🏠 Développement local** : `http://localhost:8008` (si disponible)
- **🌐 Production** : `https://java-api.rasendra.app/`

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
VITE_API_URL=http://localhost:8008

# Forcer l'API de production  
VITE_API_URL=https://java-api.rasendra.app/
```

### 🎨 Fonctionnalités de l'interface

- **📊 Dashboard principal** avec vue d'ensemble des tickets
- **🎯 Actions interactives** : Créer, appeler, servir des tickets
- **📈 Statistiques en temps réel** de la file d'attente
- **🔄 Auto-refresh configurable** avec indicateur visuel
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
1. **Accéder au frontend** : [https://java-api-front.rasendra.app](https://java-api-front.rasendra.app)

**En local avec Docker :**
1. **Accéder au frontend** : [http://localhost:3000](http://localhost:3000)

**En local sans Docker :**
1. **Accéder au frontend** : [http://localhost:5173](http://localhost:5173)

**Utilisation :**
2. **Créer un ticket** : Cliquer sur "Nouveau Ticket"
3. **Voir la file d'attente** : Les tickets s'affichent automatiquement
4. **Appeler le prochain ticket** : Cliquer sur "Appeler" dans l'en-tête de la file d'attente
5. **Servir le prochain ticket** : Cliquer sur "Servir" dans l'en-tête des tickets appelés

### 📡 Via l'API (Backend)

#### Créer un ticket
```bash
curl -X POST http://localhost:8008/api/tickets
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

#### Appeler le prochain ticket (FIFO)
```bash
curl -X POST http://localhost:8008/api/tickets/call
```

#### Voir les tickets en attente
```bash
curl http://localhost:8008/api/tickets
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
| `POST` | `/api/tickets/call` | Appeler le prochain ticket FIFO |
| `POST` | `/api/tickets/serve` | Servir le prochain ticket FIFO |
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

### 🌐 Infrastructure Cloud (DigitalOcean + Name.com)

Le projet est déployé sur une infrastructure moderne avec :

- **☁️ Serveur DigitalOcean** : Droplet Ubuntu 22.04
- **🌍 Domaine personnalisé** : Géré via Name.com
- **🔀 Traefik** : Load balancer et reverse proxy automatique
- **🐳 Docker** : Conteneurisation complète
- **🔒 SSL/TLS** : Certificats Let's Encrypt automatiques
- **📊 Monitoring** : Health checks intégrés

### �️ Architecture de déploiement

```
🌍 Internet
    ↓
🔀 Traefik (Load Balancer + SSL)
    ↓
🐳 Docker Network
    ├── 🚀 Backend API (java-api.rasendra.app)
    └── 🎨 Frontend React (java-api-front.rasendra.app)
```

### 🖥️ Configuration serveur

**Serveur Ubuntu DigitalOcean :**
- **OS** : Ubuntu 22.04 LTS
- **Services** : Docker + Docker Compose + Traefik
- **Domaine** : `rasendra.app` (Name.com)
- **SSL** : Let's Encrypt automatique via Traefik

**URLs de production :**
- **🚀 API Backend** : https://java-api.rasendra.app/
- **🎨 Frontend** : https://java-api-front.rasendra.app
- **📖 Documentation** : https://java-api.rasendra.app/swagger

## 🔄 CI/CD

Le projet utilise GitHub Actions pour :
- ✅ **Build automatique** à chaque push
- 🧪 **Tests** de compilation et Docker
- 🐳 **Build & Push** des images vers GitHub Container Registry
- 🚀 **Déploiement automatique** sur serveur DigitalOcean via SSH
- 🔄 **Mise à jour** des services avec Traefik

## 📝 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Sarobidy-R**
- GitHub: [@Sarobidy-R](https://github.com/Sarobidy-R)
- Repository: [Java-API-Exam](https://github.com/Sarobidy-R/Java-API-Exam)

---

🎯 **Projet full-stack moderne : Backend Java + Frontend React déployé sur DigitalOcean avec Traefik**
