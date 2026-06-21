import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL || '*',
  baseUrl: (process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/$/, ''),
  dbSsl: process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production',
  seedOnStart: process.env.SEED_ON_START !== 'false',
};
