# Application Spring Boot avec Docker

## Prérequis
- Docker installé

## Construction de l'image Docker

```bash
docker build -t springboot-app .
```

## Lancement du conteneur

```bash
docker run -p 8080:8080 springboot-app
```

L'application sera accessible sur http://localhost:8080 