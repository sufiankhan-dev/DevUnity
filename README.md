# DevUnity

DevUnity is an open-source developer community platform built with Next.js and TypeScript. Developers can share technical blogs, browse community profiles, and participate in Q&A-style discussions.

<p align="center">
  <kbd>
    <img src="https://github.com/user-attachments/assets/6ed17203-5b81-43db-baf7-eb003c2035b0" alt="DevUnity preview" />
  </kbd>
</p>

## Features

- **Blogs** — Write and read technical posts with a rich-text editor (TipTap). Posts are stored in Neon Postgres via Drizzle ORM.
- **Community profiles** — Create a developer profile with role, bio, GitHub, and LinkedIn links after signing up.
- **Authentication** — Email/password auth powered by [Better Auth](https://www.better-auth.com), with onboarding at `/complete-profile`.
- **Questions** — Q&A UI for browsing and posting questions (currently client-side mock data; persistence coming soon).
- **Modern UI** — Dark theme with [shadcn/ui](https://ui.shadcn.com) components and Tailwind CSS.

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language     | TypeScript                          |
| UI           | React 19, Tailwind CSS v4, shadcn/ui |
| Auth         | [Better Auth](https://www.better-auth.com) |
| Database     | [Neon Postgres](https://neon.tech)  |
| ORM          | [Drizzle ORM](https://orm.drizzle.team) |
| Rich text    | TipTap                              |
| Animations   | Framer Motion, react-confetti       |

## Prerequisites

- [Node.js](https://nodejs.org) 20.9+
- A [Neon](https://neon.tech) Postgres database
- A `BETTER_AUTH_SECRET` (32+ characters)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sufiankhan-dev/DevUnity.git
cd DevUnity
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy [`.env.example`](.env.example) to `.env.local` and fill in your values:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/devunity?sslmode=require
BETTER_AUTH_SECRET=your-32-character-or-longer-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Set up the database

Push the schema to Neon (recommended for development):

```bash
npm run db:push
```

Or apply the included SQL migration manually / via Drizzle Kit:

```bash
npm run db:migrate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Styling

This project uses **Tailwind CSS v4** with CSS-based configuration (no `tailwind.config.ts`). Theme tokens, animations, and shadcn/ui colors are defined in `src/app/globals.css` via `@theme inline`. PostCSS is configured with `@tailwindcss/postcss` per the [Next.js CSS guide](https://nextjs.org/docs/app/getting-started/css).

## Scripts

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `npm run dev`        | Start development server       |
| `npm run build`      | Create production build        |
| `npm run start`      | Run production server          |
| `npm run lint`       | Run ESLint                     |
| `npm run db:push`    | Push Drizzle schema to Neon    |
| `npm run db:generate`| Generate Drizzle migrations    |
| `npm run db:migrate` | Run Drizzle migrations         |
| `npm run db:studio`  | Open Drizzle Studio            |

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Sign in, sign up, complete profile
│   ├── (blog)/          # Blog list, single post, create post
│   ├── api/
│   │   ├── auth/        # Better Auth handler
│   │   ├── blogs/       # Blog CRUD API
│   │   └── users/       # Community profiles API
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── db/
│   ├── index.ts         # Drizzle + Neon client
│   └── schema/          # Auth + app tables
└── lib/
    ├── auth.ts          # Better Auth server config
    ├── auth-client.ts   # Client hooks (useSession, signIn, etc.)
    └── auth-server.ts   # Server session helper
```

## API Routes

| Method | Endpoint           | Auth     | Description              |
| ------ | ------------------ | -------- | ------------------------ |
| *      | `/api/auth/*`      | —        | Better Auth endpoints    |
| GET    | `/api/blogs`       | Public   | List all blog posts      |
| POST   | `/api/blogs`       | Required | Create a new blog post   |
| GET    | `/api/blogs/[id]`  | Public   | Get a single blog post   |
| GET    | `/api/users`       | Public   | List community profiles  |
| POST   | `/api/users`       | Required | Create a community profile |

## Deployment

DevUnity deploys on [Vercel](https://vercel.com). Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` (your production URL) in Vercel environment variables, then run migrations against your Neon database.

## Roadmap

- [ ] Persist questions and answers to the database
- [ ] Blog comments and likes persistence
- [ ] OAuth providers (GitHub, Google) via Better Auth
- [ ] Real-time chat or messaging
- [ ] Legal pages (privacy, terms, cookies)

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, and open a pull request.

## License

MIT — see [LICENSE](LICENSE).

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com)
- [Better Auth](https://www.better-auth.com)
- [Neon](https://neon.tech)
- [Drizzle ORM](https://orm.drizzle.team)
- [TipTap](https://tiptap.dev)
