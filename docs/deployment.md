# Deployment Guide - Coach Hub

## 🚀 Opzioni di Deploy

### 1. Deploy Locale per Sviluppo

```bash
# Setup iniziale
./setup.sh  # Linux/macOS
# oppure
.\setup.ps1  # Windows PowerShell

# Avvio servizi
pnpm dev
```

**URLs Locali:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- GraphQL Playground: http://localhost:3001/graphql
- Prisma Studio: http://localhost:5555

### 2. Deploy Preview (Fly.io)

Il deploy preview viene automaticamente triggerato ad ogni Pull Request.

#### Setup Manuale Fly.io

```bash
# Installa Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Setup app (prima volta)
flyctl launch --no-deploy

# Deploy
flyctl deploy
```

**Configurazione Fly.io:**
```toml
# fly.preview.toml
app = "coachhub-preview"
primary_region = "fra"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "preview"
  PORT = "3000"

[[services]]
  http_checks = []
  internal_port = 3000
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

### 3. Deploy Production (AWS ECS)

#### Prerequisiti AWS

1. **Account AWS** con permessi ECR, ECS, RDS, ElastiCache
2. **VPC** configurata con subnets pubbliche e private
3. **RDS PostgreSQL** per database production
4. **ElastiCache Redis** per cache e sessioni
5. **ALB** (Application Load Balancer) per routing

#### Infrastruttura AWS (Terraform)

```hcl
# infrastructure/main.tf
provider "aws" {
  region = "us-east-1"
}

# ECR Repositories
resource "aws_ecr_repository" "api" {
  name                 = "coachhub-api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "web" {
  name                 = "coachhub-web"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "coachhub-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  identifier = "coachhub-db"
  
  allocated_storage    = 20
  max_allocated_storage = 100
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  
  db_name  = "coachhub"
  username = "postgres"
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  skip_final_snapshot = true
}

# ElastiCache Redis
resource "aws_elasticache_subnet_group" "main" {
  name       = "coachhub-cache-subnet"
  subnet_ids = var.private_subnet_ids
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "coachhub-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.main.name
  security_group_ids   = [aws_security_group.redis.id]
}
```

#### Deploy Automatico via GitHub Actions

Il deploy production viene automaticamente triggerato ad ogni push su `main`.

**Secrets GitHub richiesti:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DATABASE_URL` (production)
- `REDIS_URL` (production)
- `JWT_SECRET` (production)
- Altri secrets specifici (OAuth, email, ecc.)

#### Deploy Manuale AWS

```bash
# Build e push immagini Docker
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin {ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com

# Build API
docker build -f apps/api/Dockerfile -t coachhub-api .
docker tag coachhub-api:latest {ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/coachhub-api:latest
docker push {ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/coachhub-api:latest

# Build Web
docker build -f apps/web/Dockerfile -t coachhub-web .
docker tag coachhub-web:latest {ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/coachhub-web:latest
docker push {ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/coachhub-web:latest

# Update ECS services
aws ecs update-service --cluster coachhub-cluster --service coachhub-api --force-new-deployment
aws ecs update-service --cluster coachhub-cluster --service coachhub-web --force-new-deployment
```

### 4. Deploy con Docker Compose (Self-hosted)

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXTAUTH_URL=https://yourdomain.com
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/coachhub
    depends_on:
      - api
      - postgres

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/coachhub
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: coachhub
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
      - api

volumes:
  postgres_data:
  redis_data:
```

```bash
# Deploy con Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Configurazione Environment Variables

### Sviluppo (`.env.local`)
```bash
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/coachhub_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-secret-key
NEXTAUTH_SECRET=dev-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### Production
```bash
NODE_ENV=production
DATABASE_URL=postgresql://username:password@production-db:5432/coachhub
REDIS_URL=redis://production-redis:6379
JWT_SECRET=super-secure-production-secret
NEXTAUTH_SECRET=super-secure-nextauth-secret
NEXTAUTH_URL=https://yourdomain.com

# Storage
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# Email
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=xxx

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
```

## 🔒 Security Checklist

- [ ] **Secrets**: Usa secret manager in production (AWS Secrets Manager, HashiCorp Vault)
- [ ] **HTTPS**: Certificati SSL/TLS configurati
- [ ] **Database**: Row Level Security abilitata
- [ ] **Rate Limiting**: Configurato per API endpoints
- [ ] **CORS**: Origini permesse configurate correttamente
- [ ] **Headers Security**: CSP, HSTS, etc.
- [ ] **Backup**: Backup automatici database configurati
- [ ] **Monitoring**: Sentry per error tracking, Grafana per metriche

## 📊 Monitoring e Observability

### Sentry (Error Tracking)
```bash
# Installa Sentry
pnpm add @sentry/nextjs @sentry/node

# Configura in next.config.js e apps/api/src/main.ts
```

### Grafana (Metrics)
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3030:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  grafana_data:
```

## 🚀 Performance Optimization

### CDN Setup
- **Vercel**: Per assets statici frontend
- **CloudFront**: Per distribuzione globale
- **Supabase**: Per immagini e video storage

### Database Optimization
- **Connection Pooling**: PgBouncer per PostgreSQL
- **Read Replicas**: Per query analytics
- **Indexes**: Ottimizzati per query frequenti

### Caching Strategy
- **Redis**: Per sessioni e cache API
- **Next.js**: ISR per pagine statiche
- **Service Worker**: Per PWA offline capabilities
