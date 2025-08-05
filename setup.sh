#!/bin/bash

echo "🚀 Configurazione Coach Hub - Inizializzazione del progetto"
echo ""

# Verifica dei prerequisiti
echo "📋 Verifica prerequisiti..."

# Controlla Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato. Installa Node.js 20+ da https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js versione 20+ richiesta. Versione attuale: $(node -v)"
    exit 1
fi

# Controlla pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installazione pnpm..."
    npm install -g pnpm
fi

# Controlla Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker non trovato. Installa Docker per eseguire i servizi locali."
    echo "   Puoi continuare ma dovrai configurare PostgreSQL e Redis manualmente."
fi

echo "✅ Prerequisiti verificati"
echo ""

# Installa dipendenze
echo "📦 Installazione dipendenze..."
pnpm install

# Copia file environment
echo "⚙️  Configurazione environment..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "✅ File .env.local creato da .env.example"
    echo "⚠️  Ricordati di configurare le variabili di ambiente in .env.local"
else
    echo "⚠️  File .env.local già esistente"
fi

# Avvia servizi Docker (se disponibile)
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Avvio servizi Docker..."
    docker-compose up -d postgres redis
    
    # Attendi che PostgreSQL sia pronto
    echo "⏳ Attendo che PostgreSQL sia pronto..."
    until docker exec coachhub-postgres pg_isready -U postgres; do
        sleep 2
    done
    
    echo "✅ Servizi Docker avviati"
else
    echo "⚠️  Docker non disponibile. Configura manualmente PostgreSQL e Redis."
fi

# Configura database
echo "🗄️  Configurazione database..."
cd apps/api
pnpm db:generate
pnpm db:migrate
pnpm db:seed
cd ../..

echo ""
echo "🎉 Configurazione completata!"
echo ""
echo "🚀 Per avviare il progetto in sviluppo:"
echo "   pnpm dev"
echo ""
echo "🌐 URLs di sviluppo:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   GraphQL Playground: http://localhost:3001/graphql"
echo "   Database Studio: pnpm db:studio"
echo ""
echo "👤 Utenti demo:"
echo "   Coach: demo@coachhub.it / demo123"
echo "   Atleta 1: atleta1@coachhub.it / demo123"
echo "   Atleta 2: atleta2@coachhub.it / demo123"
echo ""
echo "📚 Documentazione: ./docs/"
echo "🆘 Support: https://github.com/coachhub/issues"
