import { Sequelize } from 'sequelize';
import { env } from './env.js';

if (!env.databaseUrl) {
  console.error('DATABASE_URL is not configured');
  process.exit(1);
}

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: env.dbSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.info('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}
