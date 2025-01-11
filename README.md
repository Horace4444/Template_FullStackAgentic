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
src/
├── app/
│   ├── (auth)/          # Auth routes (login, register)
│   │   ├── login/       
│   │   └── register/    
│   ├── (dashboard)/     # Protected routes
│   │   └── dashboard/   
│   └── api/             # API routes
│       ├── agents/      # Agent-related endpoints
│       └── auth/        # Auth-related endpoints
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── shared/         # Shared components
│   └── forms/          # Form components
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
```

## 🛠️ Installation & Setup

### Step 1: Environment Setup

#### Option A: Automatic Setup (Recommended)


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

#### Option B: Manual Project Setup
1. Create Next.js project:
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

2. Install core dependencies:
```bash
pnpm add @langchain/anthropic@latest \
  @langchain/community@latest \
  @langchain/core@latest \
  @langchain/langgraph@latest \
  @langchain/openai@latest \
  @supabase/ssr@latest \
  @supabase/supabase-js@latest \
  @tavily/core@latest \
  class-variance-authority@latest \
  clsx@latest \
  next@latest \
  react@latest \
  react-dom@latest \
  tailwind-merge@latest \
  tailwindcss-animate@latest \
  zod@latest \
  zustand@latest
```

3. Install development dependencies:
```bash
pnpm add -D @playwright/test@latest \
  @testing-library/dom@latest \
  @testing-library/jest-dom@latest \
  @testing-library/react@latest \
  @types/jest@latest \
  @types/node@latest \
  @types/react@latest \
  @types/react-dom@latest \
  @typescript-eslint/eslint-plugin@latest \
  @typescript-eslint/parser@latest \
  autoprefixer@latest \
  eslint@latest \
  eslint-config-next@latest \
  eslint-config-prettier@latest \
  eslint-plugin-react@latest \
  eslint-plugin-react-hooks@latest \
  husky@latest \
  jest@latest \
  jest-environment-jsdom@latest \
  lint-staged@latest \
  postcss@latest \
  prettier@latest \
  prettier-plugin-tailwindcss@latest \
  typescript@latest
```

### Step 3: Project Structure Setup

#### Option A: Automatic Setup

#### Option B: Manual Structure Setup
```bash
# Create project directories (adjusted for Next.js app router)
mkdir -p \
  "src/app/(auth)/login" \
  "src/app/(auth)/register" \
  "src/app/(dashboard)/dashboard" \
  src/app/api/agents \
  src/app/api/auth \
  src/components/ui \
  src/components/shared \
  src/components/forms \
  src/lib/agents \
  src/lib/ai/llms \
  src/lib/ai/memory \
  src/lib/ai/tools \
  src/lib/db/migrations \
  src/lib/db/queries \
  src/lib/db/schema \
  src/lib/db/vectors \
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
touch .env.local
```

2. Configure your `.env.local` with required API keys:
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-nextauth-secret

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# AI Services
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
TAVILY_API_KEY=your-tavily-api-key

# Vector Database
VECTOR_STORE_URL=your-supabase-project-url # Usually same as SUPABASE_URL

# Development
NODE_ENV=development
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

## UI Component Setup

### Initialize shadcn/ui

You can either initialize with prompts or use defaults:

```bash
# With prompts:
pnpm dlx shadcn@latest init
```

If choosing prompts, you'll be asked:
- Which style would you like to use? › Default
- Which color would you like to use as base color? › Neutral
- Do you want to use CSS variables for colors? › yes

This will create a `components.json` configuration file in your project.

### Install Starter Components

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
```

```bash
# Or install multiple components at once
pnpm dlx shadcn@latest add button card separator form input dialog dropdown-menu toast avatar sheet
```


### 4. Initial Package.json Setup

Add these scripts to `package.json` configuration file:

```json

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

## Database Setup

### Verify and Initialize Supabase

```bash
# Verify Supabase CLI installation
supabase -v
```

```bash 
# Initialize and start Supabase
supabase init
supabase start
```

### Synchronize Types

```bash
# Synchronize types with local environment for Typescript alignment
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

