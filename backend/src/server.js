import { app } from './app.js';
import { connectDatabase, sequelize } from './config/sequelize.js';
import { env } from './config/env.js';
import './models/index.js';
import { seedBouquetsIfNeeded } from './data/seedBouquets.js';
import { seedFeedbacksIfNeeded } from './data/seedFeedbacks.js';

async function startServer() {
  await connectDatabase();
  await sequelize.sync();

  if (env.seedOnStart) {
    await seedBouquetsIfNeeded();
    await seedFeedbacksIfNeeded();
  }

  app.listen(env.port, () => {
    console.info(`Flora API is running on port ${env.port}`);
  });
}

startServer().catch(error => {
  console.error('Server start failed:', error.message);
  process.exit(1);
});
