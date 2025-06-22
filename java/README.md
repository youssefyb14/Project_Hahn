# Spring Boot Application with Docker

## Prerequisites
- Docker installed

## Building the Docker Image

```bash
docker build -t springboot-app .

```
## Lancement du conteneur

```bash
docker run -p 8080:8080 springboot-app
```

The application will be accessible at http://localhost:8080 