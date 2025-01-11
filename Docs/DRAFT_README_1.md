# Template_FullStackAgentic
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
└── config/            # Configuration files
```

## 🗄️ Database Setup

### 1. Supabase Configuration
```bash
# Initialize Supabase
npx supabase init

# Start Supabase services
npx supabase start

# Apply initial migrations
npx supabase db push
```

### 2. Vector Store Setup
```sql
-- Enable vector extension
create extension vector;

-- Create documents table with vector support
create table documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(1536)
);

-- Create function for similarity search
create function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
) returns table (
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
  order by similarity desc
  limit match_count;
end;
$$;
```

### 3. Database Client Setup
```typescript
// lib/db/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
```

## 🔍 Vector Search Integration

### 1. Vector Store Operations
```typescript
// lib/db/vectors/store.ts
import { OpenAIEmbeddings } from '@langchain/openai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';

export async function createVectorStore() {
  const embeddings = new OpenAIEmbeddings();
  return new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: 'documents',
    queryName: 'match_documents',
  });
}
```

### 2. RAG Implementation
```typescript
// lib/ai/rag/retriever.ts
import { createVectorStore } from '@/lib/db/vectors/store';

export async function createRetriever() {
  const vectorStore = await createVectorStore();
  return vectorStore.asRetriever({
    searchKwargs: {
      k: 3,
      fetchK: 10,
      filter: (doc) => doc.metadata.status === 'active',
    }
  });
}
```

## 🤖 AI Agent Setup

### 1. Tavily Search Integration
```typescript
// lib/ai/tools/search.ts
import { tavily } from "@tavily/core";

export const searchClient = tavily({ 
  apiKey: process.env.TAVILY_API_KEY 
});

export async function searchWeb(query: string) {
  return await searchClient.searchContext(query, {
    maxTokens: 4000,
  });
}
```

### 2. LangGraph Agent Configuration
```typescript
// lib/agents/search-agent.ts
import { StateGraph } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { searchWeb } from "@/lib/ai/tools/search";

export function createSearchAgent() {
  const workflow = new StateGraph({
    channels: {
      messages: [],
      context: "",
    },
  });

  // Add nodes and configure agent...
  
  return workflow.compile();
}
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

3. Initialize database:
```bash
npm run db:setup
```

4. Start development:
```bash
npm run dev
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [LangGraph Documentation](https://js.langchain.com/docs/langgraph)
- [Tavily Documentation](https://docs.tavily.com)

## 📝 License

MIT License - see LICENSE.md

---

Built with ❤️ using Next.js, Supabase, LangGraph, and Tavily



# Detailed Setup Guide

## Prerequisites Verification

First, verify your development environment:

```bash
# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version
npm --version

# Check git version
git --version

# Check PostgreSQL version (needed for Supabase local development)
psql --version
```

## Initial Project Setup

### 1. Create Project from Template

```bash
# Clone the template repository
git clone https://github.com/your-username/nextjs-ai-template my-project
cd my-project

# Remove existing git history and initialize new repository
rm -rf .git
git init
git branch -M main

# Create new remote repository (if using GitHub CLI)
gh repo create my-project --private
git remote add origin https://github.com/your-username/my-project.git
```

### 2. Initialize Project

```bash
# Create Next.js project with our configuration
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

# Remove default content
rm -rf app/page.tsx app/globals.css
rm -rf public/*
```

### 3. Initial Package.json Setup

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

### 4. Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installations
npm list @langchain/core
npm list @supabase/supabase-js
npm list @tavily/js
```

### 5. Configuration Files

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

**tsconfig.json**:
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

**.eslintrc.json**:
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

**.prettierrc**:
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

### 6. Initialize Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Start Supabase
supabase init
supabase start

# Save database types
supabase gen types typescript --local > types/supabase.ts
```

### 7. Setup Git Hooks

```bash
# Initialize Husky
npx husky install
npm pkg set scripts.prepare="husky install"

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

Create `.lintstagedrc.js`:
```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
};
```

### 8. Initialize shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Install base components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
```

### 9. Verify Setup

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Start development server
npm run dev
```

## Project Structure Initialization

Create the following directory structure:

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

## Next Steps

1. Copy your `.env.example` to `.env.local` and fill in your API keys
2. Setup your database schema in `lib/db/schema`
3. Create your first migration
4. Initialize your AI agents in `lib/agents`
5. Start building your application!

## Common Issues and Solutions

### Supabase Local Development
If you encounter issues with Supabase local development:
```bash
# Reset Supabase instance
supabase stop
supabase start

# Check status
supabase status
```

### Package Conflicts
If you encounter package conflicts:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Issues
If you encounter TypeScript errors:
```bash
# Remove TypeScript cache
rm -rf .next
rm -rf tsconfig.tsbuildinfo

# Regenerate types
npm run type-check
```
