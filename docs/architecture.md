# Architettura Sistema Coach Hub

## Diagramma Architetturale

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 14 App Router + React 18 + TypeScript + Tailwind     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ Coach       │ │ Athlete     │ │ Admin       │              │
│  │ Dashboard   │ │ App         │ │ Panel       │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  Components: shadcn/ui + Framer Motion + Recharts             │
│  State: Zustand + React Query                                  │
│  Auth: NextAuth.js + Multi-tenant middleware                   │
└─────────────────────────────────────────────────────────────────┘
                                  │
                               HTTPS/WSS
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                         API GATEWAY                            │
├─────────────────────────────────────────────────────────────────┤
│  NestJS + GraphQL Code-First + tRPC                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ GraphQL     │ │ tRPC        │ │ Socket.io   │              │
│  │ Endpoint    │ │ Router      │ │ Realtime    │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  Middleware: Auth, CORS, Rate Limiting, Logging               │
│  Guards: RBAC, Multi-tenant isolation                         │
└─────────────────────────────────────────────────────────────────┘
                                  │
                              DB Queries
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL 15 + Row Level Security + Prisma ORM              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ Users &     │ │ Programs &  │ │ Tracking &  │              │
│  │ Auth        │ │ Exercises   │ │ Analytics   │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  Features: Multi-tenancy, Audit logs, Full-text search        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ Supabase    │ │ AWS S3      │ │ Push        │              │
│  │ Storage     │ │ Backup      │ │ Notifications│              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │
│  │ Sentry      │ │ Grafana     │ │ Email       │              │
│  │ Error Track │ │ Monitoring  │ │ Service     │              │
│  └─────────────┘ └─────────────┘ └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

## Flusso di Autenticazione Multi-Tenant

```
1. User Login → NextAuth.js
2. JWT Token + Organization ID
3. Middleware checks X-ORG-ID header
4. Database RLS filters by organization_id
5. API responses scoped to organization
```

## Moduli Funzionali (STEP 1-5)

### STEP 1: Anamnesi & Profilo
```
User Input → Wizard Component → Form Validation → 
BMR/TDEE Calculation → Database Save → Profile Dashboard
```

### STEP 2: Rubrica Esercizi
```
Exercise Library → Filter/Search → Exercise Detail → 
Video Player → CRUD Operations → Volume Rubrics
```

### STEP 3: Builder Schede
```
Drag & Drop Interface → Exercise Selection → 
Set Configuration → Progression Rules → 
Workout Day Assembly → Template Save
```

### STEP 4: Rubrica Programmi
```
Template Creation → Instance Cloning → 
Athlete Assignment → Versioning → 
PDF Export → Mobile Deep Links
```

### STEP 5: Monitoraggio
```
Real-time Logging → Chart Generation → 
Progress Analytics → Questionnaire Scheduler → 
Coach Dashboard → Athlete Mobile View
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CI/CD PIPELINE                         │
├─────────────────────────────────────────────────────────────────┤
│  GitHub Actions → Docker Build → Tests → Deploy               │
│                                                                 │
│  ┌─────────────┐           ┌─────────────┐                    │
│  │ Preview     │           │ Production  │                    │
│  │ Fly.io      │           │ AWS ECS     │                    │
│  │ + Neon DB   │           │ + RDS       │                    │
│  └─────────────┘           └─────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

## Scalabilità e Performance

### Database Optimization
- Row Level Security per multi-tenancy
- Indici ottimizzati per query frequenti
- Connection pooling con PgBouncer
- Read replicas per analytics

### Caching Strategy
- Redis per sessioni e cache API
- CDN per assets statici
- Browser caching per componenti UI
- Service Worker per PWA offline

### Monitoring
- Sentry per error tracking
- Grafana per metriche sistema
- Lighthouse CI per performance
- Real User Monitoring (RUM)
