# ===================================
# SUPABASE SETUP INSTRUCTIONS
# ===================================

## 1. Create Supabase Project
1. Go to https://supabase.com
2. Sign up/Login
3. Click "New Project"
4. Fill in:
   - Name: coach-hub
   - Database Password: [choose a strong password]
   - Region: [choose closest region]

## 2. Get Database URL
1. Go to Settings → Database
2. Copy the Connection String
3. Replace [password] with your actual password

## 3. Update .env file
Replace this line in apps/api/.env:
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@[YOUR_SUPABASE_HOST]:5432/postgres"

Example:
DATABASE_URL="postgresql://postgres:mypassword@db.abc123xyz.supabase.co:5432/postgres"

## 4. Run Database Migration
```bash
cd apps/api
npx prisma migrate dev --name init
```

## 5. Seed Initial Data (optional)
```bash
cd apps/api  
npx prisma db seed
```

## 6. View Database in Supabase Dashboard
- Go to your Supabase project
- Click on "Table Editor" to see your tables
- Use SQL Editor for custom queries

## 7. Benefits of Supabase
✅ Free PostgreSQL database
✅ Real-time subscriptions
✅ Built-in Auth (if needed later)
✅ File storage
✅ Edge functions
✅ Visual table editor
✅ Automatic backups
