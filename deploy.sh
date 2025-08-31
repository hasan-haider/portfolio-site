#!/bin/bash

echo "🚀 Deploying AI Data Engineer Portfolio to GitHub Pages..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install git first."
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
git add .

# Commit changes
git commit -m "Deploy AI Data Engineer Portfolio" 2>/dev/null || git commit -m "Update portfolio"

# Set branch to main
git branch -M main

# Add remote if not exists
if ! git remote get-url origin &> /dev/null; then
    echo "📝 Please enter your GitHub repository URL (e.g., https://github.com/username/repo.git):"
    read repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo "✅ Deployment complete!"
echo "🌐 Enable GitHub Pages:"
echo "   1. Go to your repository settings"
echo "   2. Navigate to Pages section"
echo "   3. Select 'Deploy from a branch'"
echo "   4. Choose 'main' branch and '/' folder"
echo "   5. Save and wait 5-10 minutes"
echo ""
echo "🎉 Your portfolio will be live at: https://username.github.io/repo-name"
