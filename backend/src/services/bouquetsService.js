import { Bouquet } from '../models/index.js';
import { createGravatarPhotoURL } from '../helpers/createPhotoURL.js';

function serializeBouquet(bouquet) {
  const plain = bouquet.toJSON ? bouquet.toJSON() : bouquet;
  return {
    ...plain,
    price: Number(plain.price),
  };
}

export async function listBouquets({ page = 1, limit = 100, category } = {}) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 100);
  const where = {};

  if (category) {
    where.category = category;
  }

  const { rows, count } = await Bouquet.findAndCountAll({
    where,
    order: [['id', 'ASC']],
    offset: (safePage - 1) * safeLimit,
    limit: safeLimit,
  });

  return {
    items: rows.map(serializeBouquet),
    total: count,
  };
}

export async function getBouquetById(id) {
  const bouquet = await Bouquet.findByPk(id);
  return bouquet ? serializeBouquet(bouquet) : null;
}

export async function createBouquet(data) {
  const bouquet = await Bouquet.create({
    ...data,
    category: data.category || null,
    favorite: data.favorite ?? false,
    photoURL: createGravatarPhotoURL(data.title),
  });
  return serializeBouquet(bouquet);
}

export async function updateBouquet(id, data) {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;

  await bouquet.update(data);
  return serializeBouquet(bouquet);
}

export async function removeBouquet(id) {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;

  const result = serializeBouquet(bouquet);
  await bouquet.destroy();
  return result;
}
