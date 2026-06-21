# Flora — Frontend

## Links

Repository: add your GitHub repository link here.  
Live page: add your GitHub Pages link here.  
Backend API: add your Render backend link here.  
Swagger UI: add your `/api-docs` link here.

## What is implemented

- Vite frontend for the Flora landing page.
- Dynamic bestsellers, bouquets and feedbacks loaded from the real Express API.
- Axios requests with `async/await` and user-friendly error messages.
- Bouquet filtering by category.
- Load more pagination without duplicated items.
- Product detail modal and order form modal.
- Footer subscription form with semantic labels and custom SVG checkbox.

## Environment variables

Create `.env.local` for local development:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

For GitHub Pages deployment, add a repository variable:

```text
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
```

## How to run locally

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

The backend must be running separately on the URL from `VITE_API_BASE_URL`.
