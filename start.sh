#!/bin/bash

echo "🚀 Starting Coach Hub API on Render..."

# Navigate to API directory
cd apps/api

# Start the application
echo "▶️ Starting NestJS application..."
pnpm start:prod
