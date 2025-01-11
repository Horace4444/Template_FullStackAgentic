# Development Environment Setup (MacOS)

## Prerequisites

Before starting, ensure you have:
- MacOS 10.15 or later
- Terminal access
- Administrator privileges

## Installation Priority

We follow this installation priority to minimize system-level package management:
1. pnpm (preferred)
2. npm (fallback)
3. Homebrew (only when necessary)

## Automatic Setup

1. Clone this repository
2. Run the setup script:
```bash
chmod +x scripts/setup-macos.sh
./scripts/setup-macos.sh
```

## Manual Setup (if automatic setup fails)

### 1. Node.js and npm (base requirement)
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc  # or restart terminal

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18
```

### 2. pnpm
```bash
# Install pnpm using npm
npm install -g pnpm

# Verify installation
pnpm --version
```

### 3. Development Tools via pnpm
```bash
# Install global development tools
pnpm add -g typescript @types/node ts-node
```

### 4. Git
```bash
# Check if git is already installed (comes with MacOS)
git --version

# If not installed, then use Homebrew as fallback
if ! command -v git &> /dev/null; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install git
fi
```

### 5. PostgreSQL (requires Homebrew)
```bash
# PostgreSQL requires Homebrew due to system-level requirements
brew install postgresql@15
brew services start postgresql@15

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
```

### 6. Docker
```bash
# Download Docker Desktop for Mac directly from Docker website
open https://www.docker.com/products/docker-desktop

# Or use Homebrew if preferred
brew install --cask docker
```

## Verification

After installation, verify your setup:
```bash
node --version    # Should be v18.x
pnpm --version   # Should be v8.x
npm --version    # Should be v10.x
git --version    # Should be v2.x
psql --version   # Should be v15.x
docker --version # Should be v20.x or higher
```

## Troubleshooting

### Common Issues

1. **Node.js/npm issues**
   - Try reinstalling nvm: `rm -rf ~/.nvm && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
   - Ensure NVM is loaded: `source ~/.nvm/nvm.sh`

2. **pnpm not found**
   - Try installing via npm first: `npm install -g pnpm`
   - Check PATH: `echo $PATH | grep pnpm`
   - Manually add to PATH: `export PNPM_HOME="$HOME/Library/pnpm"`

3. **PostgreSQL connection issues**
   - Ensure the service is running: `brew services list`
   - Start if needed: `brew services start postgresql@15`

4. **Docker not starting**
   - Open Docker Desktop application manually first time
   - Grant necessary permissions when prompted

Need help? Open an issue in the repository.

## Why Homebrew for Some Tools?

While we prefer pnpm/npm, some tools require Homebrew because they:
- Need system-level integration (PostgreSQL)
- Require special permissions (Docker)
- Have complex dependencies (Git, when not pre-installed)

We use Homebrew only when there's no viable npm/pnpm alternative. 