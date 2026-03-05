# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

shrtlnk is a URL shortener built with Next.js 16 (App Router), React 19, TypeScript, Prisma (PostgreSQL), and NextAuth v5.

## Git Conventions

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
<type>[optional scope]: <description>
```

Common types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`, `ci`

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npx prisma generate` — Regenerate Prisma client after schema changes
- `npx prisma db push` — Push schema changes to database
- `npx prisma migrate dev` — Create and apply a migration

## Environment Setup

Required env vars (see `.env`):

- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — NextAuth secret (`openssl rand -base64 32`)
- `DIRECT_URL` — Optional direct DB connection for pooling (e.g., Supabase)

## Architecture

### Routing

- `/` — Marketing homepage
- `/login`, `/signup` — Auth pages (public)
- `/app/*` — Protected workspace (dashboard, links, account, settings)
- `/api/auth/[...nextauth]` — NextAuth API route
- `/signout` — Logout route handler (GET)
- `/[slug]` — Short link redirect handler (not yet implemented)

Auth middleware in `proxy.ts` protects `/app/*` routes. Public routes are listed in `auth.config.ts`.

### Key Files

- `auth.ts` — NextAuth config with credentials provider (bcrypt + Prisma)
- `auth.config.ts` — Route protection rules (public vs protected)
- `proxy.ts` — Next.js middleware (re-exports NextAuth middleware)
- `lib/prisma.ts` — Prisma client singleton
- `lib/actions/auth.ts` — Login server action
- `lib/actions/signup.ts` — Signup server action with Zod validation
- `prisma/schema.prisma` — Database schema (currently only User model)

### Patterns

- **Server Components by default** — Client components only where needed (`"use client"`)
- **Server Actions** for form handling (login, signup)
- **Zod** for input validation in server actions
- **shadcn/ui** components in `components/ui/` (configured in `components.json`, style: new-york)
- **Tailwind CSS 4** with CSS variable theming in `app/globals.css`
- **Path alias**: `@/*` maps to project root
- **Fonts**: Noto Sans (sans) and Noto Sans Mono (mono) via `next/font/google`

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```
