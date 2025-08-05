import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/coachhub_dev',
  // Prisma configuration
  schema: './prisma/schema.prisma',
  seed: './prisma/seed.ts',
}));
