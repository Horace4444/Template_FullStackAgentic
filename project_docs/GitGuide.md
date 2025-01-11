# Git Operations Guide

Let's be honest: every developer, regardless of experience level, regularly needs to look up Git commands. Whether you're a seasoned professional juggling multiple codebases or new to development, Git's complexity means we all sometimes forget specific commands or workflows. This guide is designed to be your comprehensive reference, organized to be both human-readable and optimized for AI assistance. We've structured it specifically so it can be included in LLM context windows, enabling chatbots to provide accurate, contextual Git help. This means you can use it both as a traditional reference and as a knowledge base for AI-powered development tools. No more searching through scattered documentation or piecing together Stack Overflow answers – everything you need is right here.

## Understanding Git

Git emerged from the Linux kernel development community in 2005, created by Linus Torvalds to address the need for a fast, efficient, and distributed version control system. Unlike previous systems that tracked changes as file-based differences, Git takes "snapshots" of your entire project at each commit, storing references to files that haven't changed and new copies of those that have.

### How Git Works

Git operates as a distributed version control system, meaning every developer's working copy of the code is also a repository that can contain the full history of all changes. Here's the key structure:

1. **Working Directory**: Where you modify files
2. **Staging Area (Index)**: Where you prepare changes for committing
3. **Local Repository**: Where Git stores your project's complete history
4. **Remote Repository**: The shared server version of your project

When you commit changes, Git:
1. Creates a checksum for each file (SHA-1 hash)
2. Stores project snapshots
3. Creates a pointer to that snapshot (the commit)

### Branches and Workflows

Git maintains three main trees:
- **HEAD**: Points to the last commit in your current branch
- **Index**: Proposed next commit (staging area)
- **Working Directory**: Your actual files

Branches in Git are lightweight movable pointers to commits. When you create a branch, Git simply creates a new pointer to the current commit. The "main" (or "master") branch is just a convention – there's nothing special about it to Git.

Key concepts:
- **Local Branches**: Exist only on your computer
- **Remote Branches**: Exist on the remote repository
- **Remote-Tracking Branches**: Local copies of remote branches
- **Upstream Branch**: The remote branch your local branch is tracking

This distributed nature means you can:
- Work offline with full history
- Maintain multiple independent lines of development
- Collaborate without blocking others' work
- Maintain different versions of your project

## Core Operations

### Repository Management

```bash
# Clone with specific branch
git clone -b develop https://github.com/username/repo.git

# Clone specific folder only
git clone --filter=blob:none --sparse https://github.com/username/repo.git
cd repo
git sparse-checkout set path/to/folder
```

### Branch Operations

```bash
# List branches with details
git branch -vv

# Create branch from specific commit
git checkout -b feature/new-feature commit-hash

# Delete remote branch
git push origin --delete feature/old-feature
```

### Commit Management

```bash
# Stage parts of files
git add -p

# Commit with detailed message
git commit -m "feat: add user authentication" -m "- Add OAuth2 integration
- Implement JWT handling
- Add secure session management"

# Fix last commit
git commit --amend --no-edit
```

## Working with .gitignore

### Basic Setup

```bash
# Create .gitignore
touch .gitignore

# Common patterns
node_modules/
.env
.env.local
*.log
dist/
build/
.DS_Store
```

### Language-Specific Patterns

```bash
# Python
__pycache__/
*.py[cod]
*.so
env/
venv/

# Node.js
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Java
*.class
*.jar
target/
.gradle/

# React/Next.js
.next/
out/
build/
.env*.local
```

## Common Questions

### Project and Branch Management

**Q: How do I rename a project or branch?**

```bash
# Rename local branch
git branch -m old-name new-name

# Rename current branch
git branch -m new-name

# Rename remote branch
# 1. Rename locally
git branch -m old-name new-name
# 2. Delete old remote branch
git push origin :old-name
# 3. Push new branch
git push origin new-name
```

**Q: How do I roll back changes without losing work?**

```bash
# Create a backup branch first
git branch backup-branch

# Soft reset (keep changes staged)
git reset --soft HEAD~1

# Mixed reset (keep changes unstaged)
git reset HEAD~1

# Revert commit (create new commit undoing changes)
git revert HEAD
```

**Q: How do I safely switch branches?**

```bash
# Check current branch
git branch --show-current

# List all branches with latest commits
git branch -vv

# Stash changes before switching
git stash save "work in progress"
git checkout other-branch
```

**Q: How do I get detailed repository information?**

```bash
# Show all branches and their commits
git show-branch

# View detailed log with graph
git log --graph --oneline --decorate --all

# See detailed status including untracked files
git status -uall

# View commit history with changes
git log -p
```

## Best Practices

### Commit Messages

Follow Conventional Commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

### Branch Naming

Format:
```
<type>/<description>
```

Examples:
- `feature/user-authentication`
- `bugfix/login-validation`
- `hotfix/security-patch`
- `release/v1.0.0`
- `docs/api-guide`

## Additional Resources

- [Official Git Documentation](https://git-scm.com/docs)
- [GitHub Documentation](https://docs.github.com/en)
- [Oh Shit, Git!?!](https://ohshitgit.com/)
- [Git Cheat Sheet (PDF)](https://education.github.com/git-cheat-sheet-education.pdf)

Additional helpful resources:

Git Flight Rules - Detailed guide for what to do when things go wrong
Learn Git Branching - Interactive Git tutorial
Conventional Commits - Specification for commit message format
Git Explorer - Find the right commands you need without memorization
GitHub Skills - Interactive courses for learning Git and GitHub

Note: Links are regularly maintained but you may want to check for the most recent documentation versions.

---

**Note**: This guide is optimized for both human reference and AI assistance. Each section is clearly demarcated with consistent formatting and explicit command examples to ensure accurate interpretation by language models. For interactive help, you can feed relevant sections to your preferred AI assistant.
