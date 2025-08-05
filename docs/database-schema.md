# Database Schema - Coach Hub

## Entità Principali

### 1. Autenticazione e Utenti

```sql
-- Organizzazioni (Multi-tenant)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  logo_url TEXT,
  primary_color VARCHAR(7), -- hex color
  secondary_color VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Utenti
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'athlete',
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE user_role AS ENUM ('super_admin', 'coach', 'athlete');
```

### 2. Profili e Anamnesi

```sql
-- Profili Atleti
CREATE TABLE athlete_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  gender gender_type,
  height_cm INTEGER,
  activity_level activity_level_type,
  goals TEXT[],
  injuries_history JSONB,
  medical_conditions TEXT[],
  bmr DECIMAL(8,2), -- Basal Metabolic Rate
  tdee DECIMAL(8,2), -- Total Daily Energy Expenditure
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE activity_level_type AS ENUM ('sedentary', 'light', 'moderate', 'active', 'very_active');

-- Misurazioni Corporee
CREATE TABLE body_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID REFERENCES athlete_profiles(id) ON DELETE CASCADE,
  weight_kg DECIMAL(5,2),
  body_fat_percentage DECIMAL(5,2),
  muscle_mass_kg DECIMAL(5,2),
  circumferences JSONB, -- {chest: 100, waist: 80, ...}
  skinfolds JSONB, -- {triceps: 12, subscapular: 15, ...}
  photos JSONB, -- {front: "url", back: "url", side: "url"}
  notes TEXT,
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);
```

### 3. Esercizi e Libreria

```sql
-- Gruppi Muscolari
CREATE TABLE muscle_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7), -- hex color for UI
  sort_order INTEGER DEFAULT 0
);

-- Esercizi
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT,
  video_url TEXT,
  youtube_id VARCHAR(50),
  thumbnail_url TEXT,
  primary_muscle_group_id UUID REFERENCES muscle_groups(id),
  secondary_muscle_groups UUID[], -- array of muscle_group IDs
  equipment_needed TEXT[],
  difficulty_level difficulty_type DEFAULT 'beginner',
  is_default BOOLEAN DEFAULT FALSE, -- seed exercises
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE difficulty_type AS ENUM ('beginner', 'intermediate', 'advanced');

-- Rubriche Volume
CREATE TABLE volume_rubrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  type volume_type NOT NULL,
  description TEXT,
  muscle_groups UUID[], -- array of muscle_group IDs
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE volume_type AS ENUM ('direct', 'direct_indirect', 'custom', 'work_lines');
```

### 4. Programmi e Schede

```sql
-- Template Programmi
CREATE TABLE program_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_weeks INTEGER NOT NULL,
  phase_type phase_type,
  tags TEXT[],
  is_public BOOLEAN DEFAULT FALSE,
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES users(id),
  version INTEGER DEFAULT 1,
  parent_template_id UUID REFERENCES program_templates(id), -- for versioning
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE phase_type AS ENUM ('strength', 'hypertrophy', 'endurance', 'power', 'mixed');

-- Istanze Programmi (assegnate agli atleti)
CREATE TABLE program_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES program_templates(id),
  athlete_id UUID REFERENCES athlete_profiles(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status program_status DEFAULT 'draft',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE program_status AS ENUM ('draft', 'active', 'paused', 'completed', 'cancelled');

-- Giorni di Allenamento
CREATE TABLE workout_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_template_id UUID REFERENCES program_templates(id) ON DELETE CASCADE,
  program_instance_id UUID REFERENCES program_instances(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL, -- 1, 2, 3, etc.
  week_number INTEGER NOT NULL DEFAULT 1,
  name VARCHAR(255) NOT NULL, -- "Push Day", "Legs", etc.
  notes TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Esercizi nelle Schede
CREATE TABLE workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_day_id UUID REFERENCES workout_days(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id),
  sort_order INTEGER NOT NULL DEFAULT 0,
  set_type set_type DEFAULT 'straight',
  sets INTEGER NOT NULL DEFAULT 3,
  reps_min INTEGER,
  reps_max INTEGER,
  weight_kg DECIMAL(6,2),
  percentage_1rm DECIMAL(5,2), -- percentage of 1RM
  rpe DECIMAL(3,1), -- Rate of Perceived Exertion
  effort_level effort_type,
  rest_seconds INTEGER DEFAULT 90,
  notes TEXT,
  superset_group INTEGER, -- for grouping supersets
  progression_rule JSONB -- rules for auto-progression
);

CREATE TYPE set_type AS ENUM ('straight', 'superset', 'jump_set', 'multiset', 'drop_set', 'rest_pause');
CREATE TYPE effort_type AS ENUM ('easy', 'moderate', 'hard', 'max');
```

### 5. Tracking e Monitoraggio

```sql
-- Log Allenamenti
CREATE TABLE workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_instance_id UUID REFERENCES program_instances(id),
  workout_day_id UUID REFERENCES workout_days(id),
  athlete_id UUID REFERENCES athlete_profiles(id),
  planned_date DATE NOT NULL,
  completed_date DATE,
  status workout_log_status DEFAULT 'scheduled',
  duration_minutes INTEGER,
  overall_rpe DECIMAL(3,1),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE workout_log_status AS ENUM ('scheduled', 'in_progress', 'completed', 'skipped');

-- Log Set
CREATE TABLE set_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_log_id UUID REFERENCES workout_logs(id) ON DELETE CASCADE,
  workout_exercise_id UUID REFERENCES workout_exercises(id),
  set_number INTEGER NOT NULL,
  reps_completed INTEGER,
  weight_kg DECIMAL(6,2),
  rpe DECIMAL(3,1),
  effort_level effort_type,
  rest_seconds INTEGER,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questionari
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  questions JSONB NOT NULL, -- array of question objects
  frequency questionnaire_frequency,
  is_active BOOLEAN DEFAULT TRUE,
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE questionnaire_frequency AS ENUM ('daily', 'weekly', 'biweekly', 'monthly', 'custom');

-- Risposte Questionari
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_id UUID REFERENCES questionnaires(id),
  athlete_id UUID REFERENCES athlete_profiles(id),
  responses JSONB NOT NULL, -- answers mapped to question IDs
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Chat e Comunicazione

```sql
-- Chat Rooms
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  type chat_type DEFAULT 'direct',
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE chat_type AS ENUM ('direct', 'group');

-- Partecipanti Chat
CREATE TABLE chat_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(chat_room_id, user_id)
);

-- Messaggi
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  metadata JSONB, -- for file attachments, etc.
  reply_to_id UUID REFERENCES chat_messages(id),
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE message_type AS ENUM ('text', 'image', 'file', 'workout_share', 'system');
```

## Indici e Performance

```sql
-- Indici per performance
CREATE INDEX idx_users_organization_role ON users(organization_id, role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_workout_logs_athlete_date ON workout_logs(athlete_id, planned_date DESC);
CREATE INDEX idx_set_logs_workout_exercise ON set_logs(workout_exercise_id, set_number);
CREATE INDEX idx_chat_messages_room_created ON chat_messages(chat_room_id, created_at DESC);
CREATE INDEX idx_body_measurements_athlete_date ON body_measurements(athlete_id, measured_at DESC);

-- RLS (Row Level Security) per multi-tenancy
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_templates ENABLE ROW LEVEL SECURITY;
-- ... altri per tutte le tabelle organization-scoped
```

## Trigger e Funzioni

```sql
-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Applicare a tutte le tabelle con updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ... repeat for other tables
```
