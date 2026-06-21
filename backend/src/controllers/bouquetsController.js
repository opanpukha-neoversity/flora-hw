import fs from 'node:fs/promises';
import path from 'node:path';
import { HttpError } from '../helpers/HttpError.js';
import { createUploadedPhotoURL } from '../helpers/createPhotoURL.js';
import * as bouquetsService from '../services/bouquetsService.js';

const photosDir = path.resolve('public', 'photos');

function ensureFound(bouquet) {
  if (!bouquet) {
    throw HttpError(404, 'Not found');
  }
  return bouquet;
}

export async function getBouquets(req, res, next) {
  try {
    const { _page, _limit, category } = req.query;
    const { items, total } = await bouquetsService.listBouquets({
      page: _page,
      limit: _limit,
      category,
    });

    res.set('X-Total-Count', String(total));
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

export async function getBouquet(req, res, next) {
  try {
    const bouquet = ensureFound(await bouquetsService.getBouquetById(req.params.id));
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

export async function addBouquet(req, res, next) {
  try {
    const bouquet = await bouquetsService.createBouquet(req.body);
    res.status(201).json(bouquet);
  } catch (error) {
    next(error);
  }
}

export async function editBouquet(req, res, next) {
  try {
    const bouquet = ensureFound(await bouquetsService.updateBouquet(req.params.id, req.body));
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

export async function deleteBouquet(req, res, next) {
  try {
    const bouquet = ensureFound(await bouquetsService.removeBouquet(req.params.id));
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

export async function updateFavorite(req, res, next) {
  try {
    const bouquet = ensureFound(
      await bouquetsService.updateBouquet(req.params.id, { favorite: req.body.favorite })
    );
    res.status(200).json(bouquet);
  } catch (error) {
    next(error);
  }
}

export async function updatePhoto(req, res, next) {
  try {
    if (!req.file) {
      throw HttpError(400, 'Photo file is required');
    }

    const extension = path.extname(req.file.originalname).toLowerCase();
    const filename = `${req.params.id}-${Date.now()}${extension}`;
    const newPath = path.join(photosDir, filename);

    await fs.rename(req.file.path, newPath);

    const bouquet = ensureFound(
      await bouquetsService.updateBouquet(req.params.id, {
        photoURL: createUploadedPhotoURL(req, filename),
      })
    );

    res.status(200).json(bouquet);
  } catch (error) {
    if (req.file?.path) {
      await fs.rm(req.file.path, { force: true }).catch(() => null);
    }
    next(error);
  }
}
