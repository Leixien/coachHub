-- Inizializzazione Database Coach Hub
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enable Row Level Security
ALTER DATABASE coachhub_dev SET row_security = on;
