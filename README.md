# TaskNova

Secure full-stack task productivity platform built with React, Express, TypeScript, Prisma, and PostgreSQL.

## Run locally

```bash
cp .env.example server/.env
npm install
npm run prisma:generate -w server
npm run dev
```

The API serves on port 4000 and the Vite client on port 5173. Create an account with `POST /api/v1/auth/signup`, then use the returned token in the client.

## API

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `GET|POST /api/v1/tasks`
- `PATCH|DELETE /api/v1/tasks/:id`

The API has strict Zod validation, bcrypt password hashing, short-lived JWTs, Helmet, CORS, compression, and rate limiting.
