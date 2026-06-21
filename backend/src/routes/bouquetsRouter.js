import express from 'express';
import * as bouquetsController from '../controllers/bouquetsController.js';
import { uploadPhoto } from '../middlewares/upload.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createBouquetSchema,
  updateBouquetSchema,
  updateFavoriteSchema,
} from '../schemas/bouquetSchemas.js';

export const bouquetsRouter = express.Router();

bouquetsRouter.get('/', bouquetsController.getBouquets);
bouquetsRouter.get('/:id', bouquetsController.getBouquet);
bouquetsRouter.post('/', validateBody(createBouquetSchema), bouquetsController.addBouquet);
bouquetsRouter.put('/', validateBody(updateBouquetSchema), (_req, res) =>
  res.status(400).json({ message: 'Bouquet id is required' })
);
bouquetsRouter.put('/:id', validateBody(updateBouquetSchema), bouquetsController.editBouquet);
bouquetsRouter.delete('/:id', bouquetsController.deleteBouquet);
bouquetsRouter.patch(
  '/:id/favorite',
  validateBody(updateFavoriteSchema),
  bouquetsController.updateFavorite
);
bouquetsRouter.patch('/:id/photo', uploadPhoto, bouquetsController.updatePhoto);
