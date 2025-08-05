# Coach Hub - Piattaforma Avanzata per Personal Training

## 🎯 Obiettivo
Una piattaforma completa che integra anamnesi, gestione esercizi, creazione schede, monitoraggio atleti e chat realtime in un'unica soluzione mobile-first.

## 🏗️ Architettura

### Stack Tecnologico
- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: NestJS + GraphQL + tRPC + Prisma ORM
- **Database**: PostgreSQL 15 con Row Level Security
- **Realtime**: Socket.io + Push notifications
- **Storage**: Supabase buckets + AWS S3
- **Auth**: NextAuth.js con multi-tenant
- **Deploy**: Docker + GitHub Actions + Fly.io (preview) + AWS ECS (prod)

### Moduli Funzionali (STEP 1-5)
1. **Anamnesi & Profilo** - Wizard multistep con calcoli BMR/TDEE
2. **Rubrica Esercizi** - Libreria 300+ esercizi con video e CRUD custom
3. **Builder Schede** - Drag & drop con supporto set avanzati
4. **Rubrica Programmi** - Template e istanze con versioning
5. **Monitoraggio** - Dashboard con grafici e questionari automatici

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- pnpm 8+
- Supabase account (free)

### Setup
1. **Clone and install**
   ```bash
   git clone <repository>
   cd coachHub
   pnpm install
   ```

2. **Setup Supabase Database**
   - See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions
   - Update `apps/api/.env` with your Supabase connection string

3. **Run database migrations**
   ```bash
   cd apps/api
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Frontend (Next.js)
   cd apps/web && pnpm dev
   
   # Terminal 2: Backend (NestJS)  
   cd apps/api && pnpm dev
   ```

5. **Access applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/graphql
   - Database: Supabase Dashboard

## 📱 Demo
- **Coach Demo**: demo@coachhub.it / demo123
- **Atleta Demo**: atleta@coachhub.it / demo123
- **Live URL**: https://coachhub-demo.fly.dev

## 🧪 Testing
```bash
pnpm test          # Unit tests
pnpm test:e2e      # E2E tests
pnpm test:coverage # Coverage report
```

## 📚 Documentazione
- [Database Schema](./docs/database-schema.md)
- [API Documentation](./docs/api-docs.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing](./CONTRIBUTING.md)

## 🗺️ Roadmap
- [ ] Mobile offline mode (PWA)
- [ ] Stripe billing modulare
- [ ] AI assistant per progressioni
- [ ] Integrazione wearable devices

## 📄 License
MIT License - vedi [LICENSE](./LICENSE)
