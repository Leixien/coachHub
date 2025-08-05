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

# Install NestJS CLI globally
echo "🏗️ Installing NestJS CLI and TypeScript..."
npm install -g @nestjs/cli typescript

# Navigate to API directory
cd apps/api

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application with NestJS CLI (more reliable)
echo "🏗️ Building NestJS application..."
nest build

echo "✅ Build completed successfully!"
echo "📁 Contents of dist directory:"
ls -la dist/ || echo "❌ No dist directory found"
