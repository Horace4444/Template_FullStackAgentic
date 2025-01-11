# Template: Fullstack Agentic
A template for full stack development of applications with agentic workflows 

# Advanced Full-Stack AI Development Template

A production-ready template for building AI-powered applications with robust database patterns and vector search capabilities. Features Next.js 14, TypeScript, Tailwind CSS, Supabase (traditional DB + vector store), LangGraph for agent orchestration, and Tavily for AI-optimized web search.

## 🎯 Core Features

### Framework & UI
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand + TanStack Query
- **Form Handling**: React Hook Form + Zod validation

### Database & Search
- **Primary Database**: Supabase PostgreSQL
- **Vector Store**: Supabase pgvector
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Search**: 
  - Vector similarity search with pgvector
  - Full-text search with PostgreSQL

### AI Integration
- **Agent Framework**: LangGraph.js for agent orchestration
- **Web Search**: Tavily AI-optimized search
- **LLM Integration**: OpenAI & Anthropic
- **Vector Operations**: pgvector for embeddings
- **RAG Pipeline**: Built-in support for document ingestion and retrieval
- **Memory Systems**: Conversation history & long-term memory
- **Streaming**: Full streaming support for all AI interactions

## 📁 Project Structure

```bash
├── app/
│   ├── (auth)/          # Auth routes
│   ├── (dashboard)/     # Protected routes
│   ├── api/             # API routes
│   └── agents/          # AI Agent routes
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── shared/         # Shared components
│   └── agents/         # Agent-specific components
├── lib/
│   ├── agents/         # Agent definitions & tools
│   ├── ai/             # AI service integrations
│   │   ├── llms/       # LLM configurations
│   │   ├── memory/     # Memory systems
│   │   └── tools/      # Agent tools
│   ├── db/             # Database operations
│   │   ├── migrations/ # Database migrations
│   │   ├── queries/    # SQL queries
│   │   ├── schema/     # Database schema
│   │   └── vectors/    # Vector store operations
│   ├── graph/          # LangGraph configurations
│   └── utils/          # Utility functions
├── types/              # TypeScript types
├── config/            # Configuration files
├── docs/              # Documentation files
└── scripts/           # Setup and utility scripts
    ├── setup-env.sh
    ├── init-project.sh
    └── setup-structure.sh
```

## 🛠️ Installation & Setup

### Step 1: Environment Setup

#### Option A: Automatic Setup (Recommended)
```bash
git clone https://github.com/your-username/your-project-name
cd your-project-name
chmod +x scripts/setup-env.sh
./scripts/setup-env.sh
```

#### Option B: Manual Environment Setup
```bash
# Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc  # or restart terminal
nvm install 18
nvm use 18

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install PostgreSQL & Docker
brew install postgresql@15 
brew services start postgresql@15
brew install --cask docker
```

### Step 2: Project Initialization

#### Option A: Automatic Setup
```bash
chmod +x scripts/init-project.sh
./scripts/init-project.sh
```

#### Option B: Manual Project Setup
1. Create Next.js project:
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

2. Install core dependencies:
```bash
pnpm add @langchain/anthropic@^0.0.9 \
  @langchain/community@^0.0.26 \
  @langchain/core@^0.1.22 \
  @langchain/langgraph@^0.0.6 \
  @langchain/openai@^0.0.14 \
  @supabase/auth-helpers-nextjs@^0.8.7 \
  @supabase/ssr@^0.0.10 \
  @supabase/supabase-js@^2.39.3 \
  @tavily/core@^0.0.2 \
  class-variance-authority@^0.7.0 \
  clsx@^2.1.0 \
  tailwind-merge@^2.2.0 \
  tailwindcss-animate@^1.0.7 \
  zod@^3.22.4 \
  zustand@^4.5.0
```

3. Install development dependencies:
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

### Step 3: Project Structure Setup

#### Option A: Automatic Setup
```bash
chmod +x scripts/setup-structure.sh
./scripts/setup-structure.sh
```

#### Option B: Manual Structure Setup
```bash
# Create project directories
mkdir -p \
  src/app/(auth) \
  src/app/(dashboard) \
  src/app/api \
  src/components/ui \
  src/components/shared \
  src/components/forms \
  src/lib/agents \
  src/lib/ai/{llms,memory,tools} \
  src/lib/db/{migrations,queries,schema,vectors} \
  src/lib/graph \
  src/lib/utils \
  src/types \
  src/config \
  scripts \
  docs
```

### Step 4: Configuration

1. Set up environment variables:
```bash
cp .env.example .env.local
```

2. Configure your `.env.local` with required API keys:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# ... other environment variables
```

### Verification

After completing all steps, verify your setup:
```bash
# Verify core tools
node --version     # Should be v18.x
pnpm --version    # Should be v8.x
git --version     # Should be v2.x
psql --version    # Should be v15.x
docker --version  # Should be v20.x or higher

# Verify project setup
pnpm run dev      # Should start Next.js development server
pnpm run lint     # Should run ESLint
pnpm run test     # Should run tests
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

### 4. Initial Package.json Setup

Create a base `package.json` with our recommended configuration:

```json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "db:types": "supabase gen types typescript --linked > types/supabase.ts",
    "db:pull": "supabase db pull",
    "db:push": "supabase db push",
    "db:studio": "supabase studio",
    "db:reset": "supabase db reset",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@langchain/anthropic": "^0.0.9",
    "@langchain/community": "^0.0.26",
    "@langchain/core": "^0.1.22",
    "@langchain/langgraph": "^0.0.6",
    "@langchain/openai": "^0.0.14",
    "@radix-ui/react-icons": "^1.3.0",
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/ssr": "^0.0.10",
    "@supabase/supabase-js": "^2.39.3",
    "@tavily/js": "^0.2.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.1",
    "@testing-library/jest-dom": "^6.3.0",
    "@testing-library/react": "^14.1.2",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@typescript-eslint/eslint-plugin": "^6.19.1",
    "@typescript-eslint/parser": "^6.19.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "husky": "^8.0.3",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "lint-staged": "^15.2.0",
    "postcss": "^8.4.33",
    "prettier": "^3.2.4",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "supabase": "^1.136.3",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
```

### 5. Prettier Configuration

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

### 6. Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installations
npm list @langchain/core
npm list @supabase/supabase-js
npm list @tavily/js
```

### 7. Configuration Files

Create the following configuration files:

**.env.example**:
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

**tailwind.config.js**:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
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

## 🚀 Getting Started

1. Clone and install:
```bash
git clone https://github.com/your-username/your-project-name
cd your-project-name
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Required variables:
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
TAVILY_API_KEY=your_tavily_key
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [LangGraph Documentation](https://js.langchain.com/docs/langgraph)
- [Tavily Documentation](https://docs.tavily.com)

## 📝 License

MIT License - see LICENSE.md




### Next Steps

1. Add your API keys to `.env.local`
2. Create your first AI agent in `lib/agents`
3. Set up your database schema
4. Start building your application!

