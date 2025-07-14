# 🎫 Java API Exam - Système de Gestion de Tickets

[![Java CI](https://github.com/Sarobidy-R/Java-API-Exam/actions/workflows/java-ci.yml/badge.svg)](https://github.com/Sarobidy-R/Java-API-Exam/actions/workflows/java-ci.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![Java](https://img.shields.io/badge/Java-21-orange?logo=java)](https://www.oracle.com/java/)
[![API](https://img.shields.io/badge/API-REST-green)](https://restfulapi.net/)
[![Documentation](https://img.shields.io/badge/Docs-Swagger-85EA2D?logo=swagger)](https://swagger.io/)

> 🚀 **API REST Java** pour la gestion de tickets avec file d'attente FIFO, développée avec Java 21 et déployée avec Docker.

## 📋 Vue d'ensemble

Cette API REST permet de gérer un système de tickets avec file d'attente. Elle offre une gestion complète du cycle de vie des tickets, de la création au service final, en passant par l'appel et le suivi des statuts.

### ✨ Fonctionnalités principales

- 🆕 **Création de tickets** avec numérotation automatique
- 📞 **Appel de tickets** (transition WAITING → CALLED)
- ✅ **Service de tickets** (transition CALLED → SERVED)
- 📊 **Consultation des tickets** par statut
- 🔄 **File d'attente FIFO** (First In, First Out)
- 📖 **Documentation Swagger** interactive
- 🐳 **Déploiement Docker** simplifié
- 🔄 **CI/CD** avec GitHub Actions

## 🌐 Démo en ligne

🚀 **Version déployée disponible :** [https://java-api-exam-latest.onrender.com](https://java-api-exam-latest.onrender.com)

📖 **Documentation interactive :** [https://java-api-exam-latest.onrender.com/swagger](https://java-api-exam-latest.onrender.com/swagger)

## 🛠️ Technologies utilisées

- **☕ Java 21** - Langage de programmation
- **🌐 HttpServer** - Serveur HTTP intégré
- **🐳 Docker** - Conteneurisation
- **📖 OpenAPI/Swagger** - Documentation API
- **⚙️ GitHub Actions** - CI/CD
- **☁️ Render** - Déploiement cloud

## 🚀 Démarrage rapide

### 🐳 Avec Docker Compose (Recommandé)

#### Prérequis
- [Docker](https://docs.docker.com/get-docker/) installé
- [Docker Compose](https://docs.docker.com/compose/install/) installé

#### Lancement
```bash
# Cloner le repository
git clone https://github.com/Sarobidy-R/Java-API-Exam.git
cd Java-API-Exam

# Lancer avec Docker Compose
docker compose up --build

# Ou en arrière-plan
docker compose up --build -d
```

#### Accès
- 🌐 **API** : [http://localhost:8080](http://localhost:8080)
- 📖 **Documentation Swagger** : [http://localhost:8080/swagger](http://localhost:8080/swagger)
- 📄 **OpenAPI Spec** : [http://localhost:8080/swagger.yaml](http://localhost:8080/swagger.yaml)

#### Arrêt
```bash
docker compose down
```

### 💻 Installation locale

#### Prérequis
- Java 21 ou supérieur
- Git

#### Étapes
```bash
# Cloner le repository
git clone https://github.com/Sarobidy-R/Java-API-Exam.git
cd Java-API-Exam

# Compiler
javac -d bin src/*.java

# Lancer
java -cp bin App
```

## 📖 Documentation API

### 🎯 Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Message d'accueil |
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

