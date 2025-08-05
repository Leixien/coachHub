#!/bin/bash

echo "🔨 Building Coach Hub API for Render..."

# Install pnpm if not present
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Navigate to API directory
cd apps/api

# Build the application
echo "🏗️ Building NestJS application..."
pnpm build

echo "✅ Build completed successfully!"
