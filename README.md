# Weightlifting Analysis System — Starter

A split frontend/backend starter for the weightlifting pose-analysis project.

- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend:** Node.js + Express 5
- **Database:** MySQL using `mysql2/promise`
- **Configuration:** environment variables (`.env` files are ignored by Git)

## Requirements

- Node.js 20.19+ (Node.js 22.12+ is also supported by current Vite requirements)
- npm
- A local MySQL server

## 1. Create local environment files (PowerShell)

Run these commands from the project root:

```powershell
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
```

Edit `backend/.env` and set the MySQL username/password for your local MySQL server. Never commit real `.env` files or credentials.

The frontend `.env` contains only a public API URL. Never put database passwords, API secrets, or other private credentials in variables prefixed with `VITE_` because those values are exposed to browser code.

## 2. Create the MySQL database

Start your local MySQL server, then run this SQL in MySQL Workbench or your MySQL client:

```sql
CREATE DATABASE weightlifting_ai
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

The starter does not create application tables yet; it only checks whether the database connection works. Create migrations/schema as the project features are added.

## 3. Install and start the backend

Open a terminal at the project root:

```powershell
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

Test these endpoints in a browser:

- `http://localhost:5000/api/health`
- `http://localhost:5000/api/health/database`

The database endpoint returns whether `SELECT 1` succeeds. Do not expose detailed database errors publicly in production.

## 4. Install and start the frontend

Open a **second** terminal at the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Project structure

```text
weightlifting-analysis-starter/
├── .gitignore
├── README.md
├── frontend/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── backend/
    ├── .env.example
    ├── package.json
    └── src/
        ├── app.js
        ├── server.js
        ├── config/database.js
        ├── controllers/health.controller.js
        └── routes/health.routes.js
```

## Git initialisation

From the project root:

```powershell
git init
git add .
git status
git commit -m "chore: initialize React and Express project"
```

Before committing, make sure the real `.env` files are not listed in `git status` as files to be committed. The `.env.example` files are safe templates and should be committed.
