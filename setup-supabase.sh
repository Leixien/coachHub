#!/bin/bash

# Coach Hub Setup Script for Supabase

echo "🚀 Coach Hub - Supabase Setup"
echo "================================"

# Check if .env exists
if [ ! -f "apps/api/.env" ]; then
    echo "❌ .env file not found in apps/api/"
    echo "Please create the .env file first with your Supabase connection string"
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🔧 Generating Prisma client..."
cd apps/api
npx prisma generate

echo "🗄️ Pushing database schema to Supabase..."
npx prisma db push

echo "🌱 Seeding database with initial data..."
npx prisma db seed

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Start frontend: cd apps/web && pnpm dev"
echo "2. Start backend:  cd apps/api && pnpm dev"
echo "3. Visit http://localhost:3000"
echo ""
echo "📊 Supabase Dashboard:"
echo "- Go to your Supabase project"
echo "- Check 'Table Editor' to see your data"
