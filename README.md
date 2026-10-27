# shrtlnk

Minimal URL shortener that converts long links into clean, shareable URLs.

## Features

- **Clean user experience** – clear and easy to use dashboard and tools.
- **One-click link creation** – paste any URL, customize the slug, set expirations, and share instantly.
- **Insight-rich dashboard** – visualize clicks, referrers, geography, and device mix in real time inside `/app/dashboard`.
- **Bring-your-own domain** – assign custom domains/subdomains so every short link matches your brand guidelines.
- **Secure accounts** – credential auth with hashed passwords, protected server actions, and gated `/app` routes.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Actions, Route Handlers)
- **UI**: React 19, Tailwind CSS 4, shadcn/ui, lucide-react icons
- **Auth**: NextAuth 5 credentials provider, bcrypt
- **Data**: Prisma ORM, PostgreSQL
- **Tooling**: TypeScript 5, ESLint 9

## Prerequisites

- Node.js 24.11 LTS recommended
- PostgreSQL database

## Deployment

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Create `.env` (or set variables in your platform) with the values listed below.

3. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

4. **Provision and migrate the database**

   ```bash
   npx prisma migrate deploy
   ```

   If this is the first time the database is created and no migrations exist yet, run `npx prisma db push` once to sync the schema, then create a baseline migration with `npx prisma migrate dev --name init` so future deploys can continue using `migrate deploy`.

5. **Build and start**

   ```bash
   npm run build
   npm run start
   ```

   Your production server will respond on the port configured by your host (locally that defaults to `http://localhost:3000`).

### Docker

Copy `.env.example` to `.env`, set `AUTH_SECRET`, then run the full stack (Postgres, schema sync, app):

```bash
docker compose up --build
```

### Google Cloud Run

Point Cloud Build (via Developer Connect) at the `Dockerfile`; its default target is the production image. On the Cloud Run service:

- Secret Manager: `AUTH_SECRET` (and `DATABASE_URL` once a database is attached)
- Env vars: `AUTH_URL=https://shrtlnk.ch`

`PORT` is provided by Cloud Run and `AUTH_TRUST_HOST=true` is baked into the image. When proxying through Cloudflare, use SSL mode **Full (strict)**.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `AUTH_SECRET` | ✅ | Secret used by NextAuth. Generate with `openssl rand -base64 32` or `npx auth secret`. |
| `AUTH_URL` | ⚠️ (prod) | Public base URL of your deployment. Needed when deploying NextAuth (e.g. `https://shrtlnk.example.com`). |
| `DATABASE_URL` | ✅ | Primary Postgres connection string used by Prisma. Example: `postgresql://USER:PASSWORD@HOST:5432/DB?schema=public`. |
| `DIRECT_URL` | ⚠️ | Optional direct connection (e.g. for connection pooling providers such as Prisma Accelerate or Supabase). Set it if your host supplies a different “direct” URL. |
| `AUTH_TRUST_HOST` | — | Trust the host forwarded by a reverse proxy. Set to `true` in the Docker image. |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` / `APP_PORT` | — | `docker compose` only; defaults to `shrtlnk` and port `3000`. |

See `.env.example` for a template.

Restart `npm run dev` after changing secrets so Next.js picks them up.

## npm Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Compiles the production bundle. Run before deploying. |
| `npm start` | Serves the production build (after `npm run build`). |
| `npm run lint` | Runs ESLint across the project. |

## Project Structure

```txt
├─ app/                # App Router routes (marketing pages, /app workspace, API routes)
├─ components/         # UI primitives, forms, sidebar/header, navigation, etc.
├─ lib/                # Prisma client singleton plus server actions
├─ prisma/schema.prisma# Database schema for Prisma
├─ public/             # Static assets
└─ auth*.ts            # NextAuth config and route handlers
```

## Development Notes

- To experiment with protected routes, set public routes in `auth.config.ts` middleware already gates everything that is not in the array.

## License

Distributed under the MIT License. See `LICENSE` for details.
