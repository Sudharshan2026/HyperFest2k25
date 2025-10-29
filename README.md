# TechnoFest App

A complete, runnable monorepo containing:
- technofest-frontend: Vite + React 19 single-page app with modern UI
- technofest-backend: Express 5 + MySQL2 REST API

## Prerequisites
- Node.js 18+ and npm
- MySQL server (local or remote)

## Environment Variables

Backend (technofest-backend/.env):
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- JWT_SECRET

Frontend (technofest-frontend/.env):
- VITE_API_BASE=http://localhost:5000/api

Note: Never commit real secrets to version control.

## Installation

Dependencies are already present in node_modules, but you can reinstall if needed:
- Frontend: npm --prefix technofest-frontend install
- Backend: npm --prefix technofest-backend install

## Running in Development

Start the backend API:
- npm run backend:start

Start the frontend dev server (in a second terminal):
- npm run frontend:dev

During development, the frontend proxies API requests to http://localhost:5000 (configured in technofest-frontend/vite.config.js), avoiding CORS issues.

## Building the Frontend

- npm run build
- Preview: npm run frontend:preview

The build output is placed under technofest-frontend/dist.

## API

Health check: GET http://localhost:5000/healthz

Main routes (examples; adjust to your schema):
- /api/events [GET, POST, PUT, DELETE]
- /api/auth [...]
- /api/registrations [...]
- /api/admin [...]

## Database schema
A starter schema is provided at technofest-backend/schema.sql.

Apply it to your MySQL database (Windows PowerShell example):
- mysql -u root -p technofest_db < technofest-backend/schema.sql

The schema creates tables: users, events, registrations, payments, certificates and seeds a few events.

## Notes
- The backend uses a MySQL connection pool (config/db.js). Ensure your database is reachable and tables are created.
- JWT-based auth middleware is in middleware/authMiddleware.js.
- The UI uses a consistent design system in src/styles.css and Tailwind (src/index.css).

## Packaging
To create a zip of the entire project folder, run from the parent directory:
- PowerShell: Compress-Archive -Path "technofest-app" -DestinationPath "technofest-app.zip" -Force

