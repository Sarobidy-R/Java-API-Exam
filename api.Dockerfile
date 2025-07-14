
# Stage 1: Build de l'application Java
#Utilisation de l'image de base Eclipse Temurin pour Java 21 en raison de vulnérabilité dans openjdk:21
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /src

# Copy des fichiers Java dans le conteneur
COPY ./API/src ./

# Compilation des fichiers Java
RUN javac *.java


# Stage 2: Run de l'application Java
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copie des fichiers compilés depuis le stage de build
COPY --from=build /src/*.class /app/

# Copie du fichier swagger.yaml pour la documentation
COPY ./API/swagger.yaml /app/

# Expose le port 8080 pour l'application Java
EXPOSE 8080

# Run de l'application Java
CMD ["java", "App"]