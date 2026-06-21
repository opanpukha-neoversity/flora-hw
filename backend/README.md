# Flora Backend

Express + PostgreSQL + Sequelize REST API for the Flora final project.

## Links to fill in before submission

Backend repository: add your GitHub backend repository link here.  
Live backend: add your Render service link here.  
Swagger UI: add your Render `/api-docs` link here.  
Frontend repository: add your frontend repository link here.  
Live frontend: add your GitHub Pages link here.

## Stack

- Node.js LTS
- Express
- PostgreSQL
- Sequelize
- Joi
- Multer
- Swagger UI

## Project structure

```text
src/
  app.js
  server.js
  config/
  controllers/
  data/
  helpers/
  middlewares/
  models/
  routes/
  schemas/
  services/
  swagger/
public/photos/
temp/
```

## Environment variables

Create `.env` locally:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/flora
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:3000
DB_SSL=false
SEED_ON_START=true
```

For Render, set:

```env
NODE_ENV=production
DATABASE_URL=<Render PostgreSQL External Database URL>
FRONTEND_URL=https://your-github-pages-url.github.io
BASE_URL=https://your-render-backend.onrender.com
DB_SSL=true
SEED_ON_START=true
```

## Local start

```bash
npm install
npm run dev
```

Swagger UI:

```text
http://localhost:3000/api-docs
```

API base URL:

```text
http://localhost:3000/api
```

## REST endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/bouquets` | Get bouquets list |
| GET | `/api/bouquets/:id` | Get one bouquet |
| POST | `/api/bouquets` | Create bouquet |
| PUT | `/api/bouquets/:id` | Update bouquet fields |
| DELETE | `/api/bouquets/:id` | Delete bouquet |
| PATCH | `/api/bouquets/:id/favorite` | Update favorite status |
| PATCH | `/api/bouquets/:id/photo` | Upload bouquet photo through `multipart/form-data` field `photo` |

## Quick API checks

```bash
curl http://localhost:3000/api/bouquets
curl http://localhost:3000/api/bouquets/1
curl -X POST http://localhost:3000/api/bouquets \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Bouquet","description":"Fresh test bouquet","price":42,"category":"spring"}'
curl -X PATCH http://localhost:3000/api/bouquets/1/favorite \
  -H "Content-Type: application/json" \
  -d '{"favorite":true}'
```
