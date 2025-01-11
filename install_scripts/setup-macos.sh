#!/bin/bash

echo "🚀 Setting up development environment..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js via nvm
echo "📦 Setting up Node.js..."
if ! command -v nvm &> /dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    # Load nvm immediately
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Install pnpm
echo "📦 Installing pnpm..."
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install Git via Homebrew
echo "📦 Installing Git..."
brew install git

# Install PostgreSQL 15
echo "📦 Installing PostgreSQL 15..."
brew install postgresql@15
# Add PostgreSQL to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc

# Start PostgreSQL service
brew services start postgresql@15

# Install Docker Desktop for Mac
echo "📦 Installing Docker..."
brew install --cask docker

# Print versions for verification
echo "✅ Verifying installations..."
echo "Node: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "Git: $(git --version)"
echo "PostgreSQL: $(psql --version)"
echo "Docker: $(docker --version)"

echo "🎉 Setup complete! Please restart your terminal." 