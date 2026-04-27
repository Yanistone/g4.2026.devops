# TP DevOps ING1 — Conteneurisation Docker

API Node/TypeScript minimale à conteneuriser. Tu vas écrire ton propre `Dockerfile`, le builder, le lancer, et chercher à minimiser la taille de l'image.

## L'application

Une API Express en TypeScript avec 3 endpoints :

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/` | Message d'accueil |
| `GET` | `/health` | Healthcheck (status + uptime) |
| `GET` | `/students` | Liste de promo (mock) |

## Lancer en local (sans Docker)

```bash
npm install
npm run build
npm start
# puis http://localhost:3000
```

Ou en mode dev avec hot-reload :

```bash
npm run dev
```

---

## Étape 1 — Dockerfile naïf (25 min)

**Objectif** : faire tourner l'app dans un conteneur, sans chercher à optimiser.

1. Crée un fichier `Dockerfile` à la racine
2. Pars d'une image `node:20`
3. Copie le code, installe les dépendances, compile le TS
4. Lance `node dist/server.js` au démarrage
5. Build et run :

```bash
docker build -t mon-api:v1 .
docker run -d -p 3000:3000 --name mon-api mon-api:v1
curl http://localhost:3000/health
```

6. **Note la taille de ton image** :

```bash
docker images mon-api
```

---

## Étape 2 — Multi-stage + .dockerignore (25 min)

**Objectif** : diviser la taille de l'image par au moins 5.

1. Crée un fichier `.dockerignore` (`node_modules`, `.git`, `dist`, `.env`...)
2. Réécris ton `Dockerfile` en **multi-stage** :
   - Stage `builder` : install + build
   - Stage final : image légère + uniquement les artefacts compilés
3. Rebuild :

```bash
docker build -t mon-api:v2 .
```

4. Compare les tailles :

```bash
docker images mon-api
```

**Bonus** :
- Passer en `node:20-alpine`
- Ajouter un utilisateur non-root
- Ajouter un `HEALTHCHECK`

---

## Commandes Docker utiles

```bash
# Voir les conteneurs actifs
docker ps

# Voir tous les conteneurs (y compris arrêtés)
docker ps -a

# Logs d'un conteneur
docker logs -f mon-api

# Entrer dans un conteneur
docker exec -it mon-api sh

# Arrêter et supprimer
docker stop mon-api
docker rm mon-api

# Faire le ménage
docker container prune
docker image prune
```
