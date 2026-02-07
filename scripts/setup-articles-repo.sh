#!/bin/bash

# Portfolio Articles Repository Setup Script
# This script creates a new GitHub repository for your articles and seeds it with a template

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         Portfolio Articles Repository Setup                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}✗ GitHub CLI (gh) is not installed${NC}"
    echo -e "${YELLOW}Please install it first:${NC}"
    echo "  macOS:   brew install gh"
    echo "  Linux:   See https://github.com/cli/cli#installation"
    echo "  Windows: See https://github.com/cli/cli#installation"
    exit 1
fi

echo -e "${GREEN}✓ GitHub CLI found${NC}"
echo ""

# Check if user is authenticated with gh
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠ You're not authenticated with GitHub CLI${NC}"
    echo -e "${BLUE}Let's authenticate now...${NC}"
    echo ""
    gh auth login
    echo ""
fi

echo -e "${GREEN}✓ Authenticated with GitHub${NC}"
echo ""

# Get GitHub username
GH_USERNAME=$(gh api user -q .login)
echo -e "${BLUE}GitHub Username: ${GREEN}${GH_USERNAME}${NC}"
echo ""

# Prompt for repository name
echo -e "${YELLOW}What should we name your articles repository?${NC}"
read -p "Repository name (default: articles): " REPO_NAME
REPO_NAME=${REPO_NAME:-articles}

# Check if repository already exists
if gh repo view "${GH_USERNAME}/${REPO_NAME}" &> /dev/null; then
    echo -e "${RED}✗ Repository '${REPO_NAME}' already exists!${NC}"
    echo -e "${YELLOW}Options:${NC}"
    echo "  1. Use a different repository name"
    echo "  2. Delete the existing repository first: gh repo delete ${GH_USERNAME}/${REPO_NAME}"
    exit 1
fi

echo ""
echo -e "${BLUE}Creating repository: ${GREEN}${REPO_NAME}${NC}"

# Prompt for repository visibility
echo -e "${YELLOW}Should the repository be public or private?${NC}"
echo "  (Note: Public is recommended for this use case)"
read -p "Visibility (public/private, default: public): " VISIBILITY
VISIBILITY=${VISIBILITY:-public}

# Create the repository
echo ""
echo -e "${BLUE}Creating GitHub repository...${NC}"

REPO_DESCRIPTION="Blog articles for my portfolio website"

if [ "$VISIBILITY" = "private" ]; then
    gh repo create "${REPO_NAME}" --private --description "${REPO_DESCRIPTION}"
else
    gh repo create "${REPO_NAME}" --public --description "${REPO_DESCRIPTION}"
fi

echo -e "${GREEN}✓ Repository created${NC}"

# Create temporary directory for repo setup
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

echo ""
echo -e "${BLUE}Setting up repository structure...${NC}"

# Initialize git repo
git init
git branch -M main

# Create README
cat > README.md << 'EOF'
# Portfolio Articles

This repository contains blog articles for my portfolio website.

## Structure

Each article is stored in its own directory with the following structure:

```
article-slug/
├── metadata.json    # Article metadata (title, date, tags, authors)
├── index.mdx        # Article content with MDX formatting
└── assets/          # Optional: Images and other media
    └── image.png
```

## Creating a New Article

1. Create a new directory with a descriptive slug (e.g., `my-first-post`)
2. Add `metadata.json` with article metadata
3. Write your article content in `index.mdx`
4. (Optional) Add images to an `assets` folder

## Metadata Format

```json
{
  "title": "Article Title",
  "summary": "Brief description",
  "date": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"],
  "published": true,
  "authors": [
    {
      "name": "Your Name",
      "linkedIn": "https://www.linkedin.com/in/your-profile/"
    }
  ]
}
```

## MDX Features

- Full Markdown support (GitHub Flavored Markdown)
- Math equations: `$E = mc^2$` or `$$...$$`
- Interactive charts: `<CustomBarChart>`, `<CustomLineChart>`, etc.
- Callouts: `<Callout type="info|warning|error|success">`
- Code blocks with syntax highlighting
- Local images: `![Alt](./assets/image.png)`

See the `mdx-reference` article for comprehensive examples of all features!
EOF

# Copy the mdx-reference template article
echo -e "${BLUE}Copying MDX reference template...${NC}"

# Get the path to the mdx-reference directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MDX_REF_DIR="$PROJECT_ROOT/mdx-reference"

if [ -d "$MDX_REF_DIR" ]; then
    cp -r "$MDX_REF_DIR" ./

    # Update the metadata.json with user's info
    cat > mdx-reference/metadata.json << EOF
{
  "title": "Complete MDX Reference Guide",
  "summary": "A comprehensive demonstration of all MDX features available in this blog, including GitHub Flavored Markdown, math equations, interactive charts, callouts, and advanced formatting capabilities.",
  "date": "$(date +%Y-%m-%d)",
  "tags": ["mdx", "documentation", "reference", "charts", "markdown"],
  "published": true,
  "authors": [
    {
      "name": "Your Name",
      "linkedIn": "https://www.linkedin.com/in/your-profile/"
    }
  ]
}
EOF
    echo -e "${GREEN}✓ Template article copied${NC}"
else
    echo -e "${YELLOW}⚠ Warning: mdx-reference template not found. Creating minimal structure...${NC}"
    mkdir -p example-article
    cat > example-article/metadata.json << EOF
{
  "title": "My First Article",
  "summary": "Welcome to my blog!",
  "date": "$(date +%Y-%m-%d)",
  "tags": ["welcome"],
  "published": true,
  "authors": [
    {
      "name": "Your Name",
      "linkedIn": "https://www.linkedin.com/in/your-profile/"
    }
  ]
}
EOF
    cat > example-article/index.mdx << 'EOF'
# My First Article

Welcome to my blog! This is an example article.

## Getting Started

Edit this file to create your first blog post!

You can use:
- **Markdown** formatting
- `Code blocks`
- Math equations: $E = mc^2$
- And much more!

<Callout type="success">
Start writing your first article by editing this file!
</Callout>
EOF
fi

# Create .gitignore
cat > .gitignore << 'EOF'
# OS files
.DS_Store
Thumbs.db

# Editor files
*.swp
*.swo
*~
.vscode/
.idea/

# Temporary files
*.tmp
*.bak
EOF

# Commit and push
echo ""
echo -e "${BLUE}Committing and pushing to GitHub...${NC}"

git add .
git commit -m "Initial commit: Setup articles repository with template"

# Add remote and push
git remote add origin "https://github.com/${GH_USERNAME}/${REPO_NAME}.git"
git push -u origin main

echo -e "${GREEN}✓ Repository initialized and pushed${NC}"

# Clean up temp directory
cd - > /dev/null
rm -rf "$TEMP_DIR"

# Update .env.local if it exists
ENV_FILE="$PROJECT_ROOT/.env.local"
REPO_URL="https://github.com/${GH_USERNAME}/${REPO_NAME}"

echo ""
echo -e "${BLUE}Updating .env.local...${NC}"

if [ -f "$ENV_FILE" ]; then
    # Check if ARTICLES_REPO_URL exists
    if grep -q "ARTICLES_REPO_URL=" "$ENV_FILE"; then
        # Update existing line
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|ARTICLES_REPO_URL=.*|ARTICLES_REPO_URL=${REPO_URL}|" "$ENV_FILE"
        else
            # Linux
            sed -i "s|ARTICLES_REPO_URL=.*|ARTICLES_REPO_URL=${REPO_URL}|" "$ENV_FILE"
        fi
        echo -e "${GREEN}✓ Updated ARTICLES_REPO_URL in .env.local${NC}"
    else
        # Add new line
        echo "" >> "$ENV_FILE"
        echo "# Articles Repository (generated by setup script)" >> "$ENV_FILE"
        echo "ARTICLES_REPO_URL=${REPO_URL}" >> "$ENV_FILE"
        echo -e "${GREEN}✓ Added ARTICLES_REPO_URL to .env.local${NC}"
    fi
else
    echo -e "${YELLOW}⚠ .env.local not found. Please add this to your .env.local:${NC}"
    echo "ARTICLES_REPO_URL=${REPO_URL}"
fi

# Success!
echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! 🎉                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${BLUE}Repository Details:${NC}"
echo -e "  📦 Name:      ${GREEN}${REPO_NAME}${NC}"
echo -e "  🔗 URL:       ${GREEN}${REPO_URL}${NC}"
echo -e "  👁  Visibility: ${GREEN}${VISIBILITY}${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo -e "  1. ${GREEN}Visit your repository:${NC}"
echo -e "     ${REPO_URL}"
echo ""
echo -e "  2. ${GREEN}Customize the template article:${NC}"
echo -e "     - Edit ${YELLOW}mdx-reference/metadata.json${NC} with your info"
echo -e "     - Modify ${YELLOW}mdx-reference/index.mdx${NC} as needed"
echo ""
echo -e "  3. ${GREEN}Start your dev server:${NC}"
echo -e "     ${YELLOW}npm run dev${NC}"
echo ""
echo -e "  4. ${GREEN}View your articles at:${NC}"
echo -e "     ${YELLOW}http://localhost:3000/articles${NC}"
echo ""
echo -e "${BLUE}Creating New Articles:${NC}"
echo -e "  1. Clone your articles repo: ${YELLOW}git clone ${REPO_URL}${NC}"
echo -e "  2. Create a new article directory"
echo -e "  3. Add ${YELLOW}metadata.json${NC} and ${YELLOW}index.mdx${NC}"
echo -e "  4. Set ${YELLOW}published: true${NC} when ready"
echo -e "  5. Commit and push to GitHub"
echo ""
echo -e "${GREEN}Happy writing! ✨${NC}"
