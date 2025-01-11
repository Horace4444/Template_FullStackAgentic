#!/bin/bash

echo "🚀 Initializing Next.js project..."

# Initialize Next.js project
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

echo "📦 Installing dependencies..."

# Install core dependencies
pnpm add @langchain/anthropic@^0.0.9 \
  @langchain/community@^0.0.26 \
  @langchain/core@^0.1.22 \
  # ... rest of dependencies

# Install development dependencies
pnpm add -D @playwright/test@^1.41.1 \
  @testing-library/jest-dom@^6.3.0 \
  # ... rest of dev dependencies

echo "✅ Project initialization complete!" 