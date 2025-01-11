#!/bin/bash

echo "🚀 Setting up project structure..."

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

# Copy configuration files
cp .env.example .env.local

echo "✅ Project structure setup complete!" 