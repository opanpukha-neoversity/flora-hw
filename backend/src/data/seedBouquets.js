import { env } from '../config/env.js';
import { Bouquet } from '../models/index.js';
import { seedBouquets } from './seedData.js';

function withPhotoURL(item) {
  const { photoFile, ...data } = item;
  return {
    ...data,
    photoURL: `${env.baseUrl}/photos/${photoFile}`,
  };
}

export async function seedBouquetsIfNeeded() {
  const count = await Bouquet.count();
  if (count > 0) return;

  await Bouquet.bulkCreate(seedBouquets.map(withPhotoURL));
  console.info(`Seeded ${seedBouquets.length} bouquets`);
}
