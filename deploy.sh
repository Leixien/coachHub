#!/bin/bash

echo "🚀 DEPLOY AUTOMATICO COACH HUB 🚀"
echo "================================="

# Controlla se è tutto pronto
if [ ! -f "pnpm-lock.yaml" ]; then
    echo "❌ Errore: pnpm-lock.yaml non trovato!"
    exit 1
fi

echo "✅ Preparazione completata"

# Deploy Backend Railway
echo ""
echo "🔧 DEPLOY BACKEND (Railway)"
echo "1. Vai su https://railway.app"
echo "2. Click 'Deploy from GitHub repo'"
echo "3. Seleziona repository 'coachHub'"
echo "4. Imposta Root Directory: apps/api"
echo "5. Aggiungi environment variables:"
echo "   DATABASE_URL=postgresql://postgres.pjcecihebmynmqmnkleh:Giuseppe.hubcoach.01@aws-0-eu-west-3.pooler.supabase.com:6543/postgres"
echo "   JWT_SECRET=super-secret-production-key-2024"
echo "   JWT_EXPIRES_IN=7d"
echo "   NODE_ENV=production"
echo "   PORT=4000"

echo ""
echo "📋 Copia URL Railway e premi ENTER..."
read RAILWAY_URL

# Deploy Frontend Vercel  
echo ""
echo "🌐 DEPLOY FRONTEND (Vercel)"
cd apps/web

# Controlla se Vercel CLI è installato
if ! command -v vercel &> /dev/null; then
    echo "📦 Installando Vercel CLI..."
    npm install -g vercel
fi

# Aggiorna URL API
if [ ! -z "$RAILWAY_URL" ]; then
    echo "🔗 Aggiornando URL API..."
    sed -i "s|https://your-railway-app.railway.app|$RAILWAY_URL|g" vercel.json
fi

echo "🚀 Deploy frontend..."
vercel --prod

echo ""
echo "🎉 DEPLOY COMPLETATO!"
echo "========================"
echo "✅ Frontend: Vercel URL"
echo "✅ Backend: $RAILWAY_URL"
echo "✅ Database: Supabase"
echo "✅ Costo: $0/mese"
echo ""
echo "🔗 Aggiorna CORS_ORIGIN in Railway con URL Vercel!"
