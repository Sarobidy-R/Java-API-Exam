## Lancement local avec Docker Compose

Pour exécuter ce projet localement à l'aide de Docker Compose, suivez les étapes ci-dessous :

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) installé
- [Docker Compose](https://docs.docker.com/compose/install/) installé

### Étapes

#### Lancez les services avec Docker Compose :
```bash
    docker compose up --build
    docker compose up --build -d # lancement en arrière-plan
```


#### L'application sera accessible via l'url : [localhost:8080](http://localhost:8080).

### Arrêter les services

Pour arrêter les services, utilisez :
```bash
docker-compose down
```

