# 🚀 Deploy GRATUITO - Coach Hub

## 💰 Costi: $0/mese per sempre!

- ✅ **Vercel**: Gratis (Hobby Plan)  
- ✅ **Render**: Completamente GRATIS
- ✅ **Supabase**: Database gratis 500MB

---

## 🚀 Deploy Frontend (Vercel)

### 1. Preparazione
```bash
# Installa Vercel CLI
npm install -g vercel

# Vai nella cartella frontend
cd apps/web
```

### 2. Deploy automatico
```bash
# Login con GitHub
vercel login

# Deploy in un comando
vercel --prod
```

### 3. Configurazione automatica
Vercel legge automaticamente da `vercel.json` e `.env.local`

**✅ Frontend online in 2 minuti!**

---

## 🚀 Deploy Backend (Railway)

### 1. Setup Railway
1. Vai su [railway.app](https://railway.app)
2. Registrati con GitHub
3. Click "Deploy from GitHub repo"
4. Seleziona il tuo repository `coachHub`
5. Seleziona `apps/api` come **Root Directory**

### 2. Environment Variables
Nel dashboard Railway aggiungi:
```env
DATABASE_URL=postgresql://postgres.pjcecihebmynmqmnkleh:Giuseppe.hubcoach.01@aws-0-eu-west-3.pooler.supabase.com:6543/postgres
JWT_SECRET=super-secret-production-key-2024
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=4000
```

### 3. Deploy automatico
Railway fa il deploy automatico! 
- ✅ Build automatico
- ✅ Health check su `/health`
- ✅ SSL certificate gratuito

**✅ Backend online in 5 minuti!**

---

## � Collega Frontend e Backend

### 1. Ottieni URL Railway
Dopo deploy, Railway ti darà un URL tipo:
`https://coach-hub-api-production.up.railway.app`

### 2. Aggiorna Vercel Environment
Nel dashboard Vercel, aggiungi:
```env
NEXT_PUBLIC_API_URL=https://coach-hub-api-production.up.railway.app/graphql
```

### 3. Aggiorna Railway CORS
Nel dashboard Railway, aggiorna:
```env
CORS_ORIGIN=https://coach-hub.vercel.app
```

**✅ Tutto connesso!**

---

## 🎯 Risultato Finale

Il tuo Coach Hub sarà disponibile su:
- **Frontend**: `https://coach-hub.vercel.app`
- **Backend**: `https://coach-hub-api.railway.app`
- **GraphQL**: `https://coach-hub-api.railway.app/graphql`
- **Database**: Supabase Dashboard

### 📊 Monitoraggio Gratuito
- **Vercel**: Analytics integrato
- **Railway**: Logs e metriche in tempo reale
- **Supabase**: Dashboard con query analytics

### 🔄 Deploy Automatico
✅ **Push to main branch** → **Deploy automatico**
✅ **Zero downtime deployments**
✅ **Rollback con un click**
