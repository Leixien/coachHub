# Coach Hub Setup Script for Windows
Write-Host "🚀 Configurazione Coach Hub - Inizializzazione del progetto" -ForegroundColor Cyan
Write-Host ""

# Verifica prerequisiti
Write-Host "📋 Verifica prerequisiti..." -ForegroundColor Yellow

# Controlla Node.js
try {
    $nodeVersion = (node -v) -replace 'v', ''
    $majorVersion = [int]($nodeVersion.Split('.')[0])
    if ($majorVersion -lt 20) {
        Write-Host "❌ Node.js versione 20+ richiesta. Versione attuale: $(node -v)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Node.js non trovato. Installa Node.js 20+ da https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Controlla pnpm
try {
    pnpm --version | Out-Null
} catch {
    Write-Host "📦 Installazione pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Controlla Docker
try {
    docker --version | Out-Null
} catch {
    Write-Host "⚠️  Docker non trovato. Installa Docker Desktop per Windows." -ForegroundColor Yellow
    Write-Host "   Puoi continuare ma dovrai configurare PostgreSQL e Redis manualmente."
}

Write-Host "✅ Prerequisiti verificati" -ForegroundColor Green
Write-Host ""

# Installa dipendenze
Write-Host "📦 Installazione dipendenze..." -ForegroundColor Yellow
pnpm install

# Copia file environment
Write-Host "⚙️  Configurazione environment..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ File .env.local creato da .env.example" -ForegroundColor Green
    Write-Host "⚠️  Ricordati di configurare le variabili di ambiente in .env.local" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  File .env.local già esistente" -ForegroundColor Yellow
}

# Avvia servizi Docker (se disponibile)
try {
    docker --version | Out-Null
    docker-compose --version | Out-Null
    
    Write-Host "🐳 Avvio servizi Docker..." -ForegroundColor Yellow
    docker-compose up -d postgres redis
    
    # Attendi che PostgreSQL sia pronto
    Write-Host "⏳ Attendo che PostgreSQL sia pronto..." -ForegroundColor Yellow
    do {
        Start-Sleep -Seconds 2
        $pgReady = docker exec coachhub-postgres pg_isready -U postgres 2>$null
    } while ($LASTEXITCODE -ne 0)
    
    Write-Host "✅ Servizi Docker avviati" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Docker non disponibile. Configura manualmente PostgreSQL e Redis." -ForegroundColor Yellow
}

# Configura database
Write-Host "🗄️  Configurazione database..." -ForegroundColor Yellow
Set-Location "apps/api"
pnpm db:generate
pnpm db:migrate
pnpm db:seed
Set-Location "../.."

Write-Host ""
Write-Host "🎉 Configurazione completata!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Per avviare il progetto in sviluppo:" -ForegroundColor Cyan
Write-Host "   pnpm dev"
Write-Host ""
Write-Host "🌐 URLs di sviluppo:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000"
Write-Host "   Backend API: http://localhost:3001"
Write-Host "   GraphQL Playground: http://localhost:3001/graphql"
Write-Host "   Database Studio: pnpm db:studio"
Write-Host ""
Write-Host "👤 Utenti demo:" -ForegroundColor Cyan
Write-Host "   Coach: demo@coachhub.it / demo123"
Write-Host "   Atleta 1: atleta1@coachhub.it / demo123"
Write-Host "   Atleta 2: atleta2@coachhub.it / demo123"
Write-Host ""
Write-Host "📚 Documentazione: ./docs/" -ForegroundColor Cyan
Write-Host "🆘 Support: https://github.com/coachhub/issues" -ForegroundColor Cyan
