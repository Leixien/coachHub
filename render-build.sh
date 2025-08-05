#!/bin/bash

echo "🚀 RENDER DEPLOY - Coach Hub API"
echo "================================"

# Set environment
export NODE_ENV=production

# Install global tools
echo "📦 Installing global tools..."
npm install -g pnpm @nestjs/cli typescript

# Install workspace dependencies
echo "📦 Installing workspace dependencies..."
pnpm install --frozen-lockfile

# Navigate to API
cd apps/api

echo "🔧 Current directory: $(pwd)"
echo "📁 Directory contents:"
ls -la

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build with NestJS CLI
echo "🏗️ Building with NestJS CLI..."
nest build

# Verify build
echo "✅ Build verification:"
if [ -d "dist" ]; then
    echo "✅ dist/ directory exists"
    ls -la dist/
    if [ -f "dist/main.js" ]; then
        echo "✅ main.js found!"
    else
        echo "❌ main.js NOT found!"
        echo "📁 Contents of dist/:"
        find dist/ -name "*.js" | head -10
    fi
else
    echo "❌ dist/ directory NOT found!"
fi

echo "🎯 Build process complete!"
