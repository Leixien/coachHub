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
echo "🏗️ Installing NestJS CLI..."
npm install -g @nestjs/cli

# Navigate to API directory
cd apps/api

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application with explicit TypeScript compilation
echo "🏗️ Building NestJS application..."
npx tsc -p tsconfig.build.json

echo "✅ Build completed successfully!"
echo "📁 Contents of dist directory:"
ls -la dist/ || echo "❌ No dist directory found"
