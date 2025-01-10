# Full-Stack AI Development Template Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

### Required Tools
```bash
# 1. Node.js (v18.17 or higher)
node --version
# If needed, install via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# 2. pnpm (v8.x or higher)
# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
# Verify installation
pnpm --version

# 3. Git
git --version
# If needed, install Git:
# On macOS:
brew install git
# On Ubuntu:
sudo apt-get update && sudo apt-get install git
# On Windows: Download from https://git-scm.com/download/win

# 4. PostgreSQL (v15 or higher - needed for Supabase local development)
psql --version
# On macOS:
brew install postgresql@15
# On Ubuntu:
sudo apt-get install postgresql-15

# 5. Docker (for Supabase local development)
docker --version
# Install from https://docs.docker.com/get-docker/
```

### Environment Setup

1. Create a new directory for your project:
```bash
mkdir my-ai-project
cd my-ai-project
```

2. Initialize new Next.js project:
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

3. Clean up default files:
```bash
rm -rf app/page.tsx app/globals.css
rm -rf public/*
```

## Package Installation

### 1. Core Dependencies

```bash
pnpm add @langchain/anthropic@^0.0.9 \
  @langchain/community@^0.0.26 \
  @langchain/core@^0.1.22 \
  @langchain/langgraph@^0.0.6 \
  @langchain/openai@^0.0.14 \
  @supabase/auth-helpers-nextjs@^0.8.7 \
  @supabase/ssr@^0.0.10 \
  @supabase/supabase-js@^2.39.3 \
  @tavily/js@^0.2.0 \
  class-variance-authority@^0.7.0 \
  clsx@^2.1.0 \
  tailwind-merge@^2.2.0 \
  tailwindcss-animate@^1.0.7 \
  zod@^3.22.4 \
  zustand@^4.5.0
```

### 2. Development Dependencies

```bash
pnpm add -D @playwright/test@^1.41.1 \
  @testing-library/jest-dom@^6.3.0 \
  @testing-library/react@^14.1.2 \
  @types/jest@^29.5.11 \
  @types/node@^20.11.5 \
  @types/react@^18.2.48 \
  @types/react-dom@^18.2.18 \
  @typescript-eslint/eslint-plugin@^6.19.1 \
  @typescript-eslint/parser@^6.19.1 \
  autoprefixer@^10.4.17 \
  eslint@^8.56.0 \
  eslint-config-next@14.1.0 \
  eslint-config-prettier@^9.1.0 \
  eslint-plugin-react@^7.33.2 \
  eslint-plugin-react-hooks@^4.6.0 \
  husky@^8.0.3 \
  jest@^29.7.0 \
  jest-environment-jsdom@^29.7.0 \
  lint-staged@^15.2.0 \
  postcss@^8.4.33 \
  prettier@^3.2.4 \
  prettier-plugin-tailwindcss@^0.5.11 \
  supabase@^1.136.3 \
  tailwindcss@^3.4.1 \
  typescript@^5.3.3
```

## UI Component Setup

### 1. Initialize shadcn/ui

You can either initialize with prompts or use defaults:

```bash
# With prompts:
pnpm dlx shadcn@latest init

# Or with defaults (New York style, Zinc color, CSS variables):
pnpm dlx shadcn@latest init -d
```

If choosing prompts, you'll be asked:
- Which style would you like to use? › New York
- Which color would you like to use as base color? › Zinc
- Do you want to use CSS variables for colors? › yes

This will create a `components.json` configuration file in your project.

### 2. Install Required Components

```bash
# Install components one at a time
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add separator
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add toast
pnpm dlx shadcn@latest add avatar
pnpm dlx shadcn@latest add sheet

# Or install multiple components at once
pnpm dlx shadcn@latest add button card separator form input dialog dropdown-menu toast avatar sheet
```

## Configuration Files

### 1. Environment Setup

Create `.env.example`:
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# Tavily
TAVILY_API_KEY=
```

Then create your local environment:
```bash
cp .env.example .env.local
```

### 2. TypeScript Configuration

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. ESLint Configuration

Create `.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "react-hooks"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 4. Prettier Configuration

Create `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Database Setup

### 1. Install Supabase CLI

```bash
pnpm add -g supabase
```

### 2. Initialize Supabase

```bash
# Initialize Supabase
supabase init

# Start Supabase services
supabase start

# Generate database types
supabase gen types typescript --local > types/supabase.ts
```

### 3. Database Schema Setup

Create initial migration:

```bash
mkdir -p supabase/migrations
```

Create `supabase/migrations/00000000000000_init.sql`:
```sql
-- Enable extensions
create extension if not exists "vector";
create extension if not exists "pg_graphql";
create extension if not exists "pg_stat_statements";

-- Create basic tables
create table public.documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(1536)
);

-- Create vector similarity search function
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Set up row level security
alter table public.documents enable row level security;
```

Apply the migration:
```bash
supabase db reset
```

## Git Setup

### 1. Initialize Repository

```bash
# Initialize git
git init

# Add .gitignore
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Supabase
/supabase/.branches
/supabase/.temp
EOL

# Initial commit
git add .
git commit -m "Initial commit"
```

### 2. Setup Git Hooks

```bash
# Initialize Husky
pnpm dlx husky-init && pnpm install

# Add pre-commit hook
pnpm dlx husky add .husky/pre-commit "pnpm lint-staged"
```

Create `.lintstagedrc.js`:
```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
};
```

## Project Structure

Create the required directories:

```bash
mkdir -p \
  app/(auth) \
  app/(dashboard) \
  app/api \
  components/ui \
  components/shared \
  components/forms \
  lib/agents \
  lib/ai/{llms,memory,tools} \
  lib/db/{migrations,queries,schema,vectors} \
  lib/graph \
  lib/utils \
  types \
  config
```

## Verification

Run these commands to verify your setup:

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Test Supabase connection
supabase status

# Start development server
pnpm dev
```

## Troubleshooting

### Common Issues

1. If Supabase fails to start:
```bash
supabase stop
docker system prune -a
supabase start
```

2. If pnpm install fails:
```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

3. If TypeScript errors occur:
```bash
rm -rf .next
rm -rf tsconfig.tsbuildinfo
pnpm type-check
```

4. If shadcn/ui components fail to install:
```bash
rm -rf components/ui
pnpm dlx shadcn-ui@latest init
```

### Next Steps

1. Add your API keys to `.env.local`
2. Create your first AI agent in `lib/agents`
3. Set up your database schema
4. Start building your application!

For additional help:
- Join our Discord community
- Check the GitHub issues
- Consult the documentation

---

Remember to star the repository if you find it helpful!
