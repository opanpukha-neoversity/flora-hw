import express from 'express';
import { bestsellers } from '../data/staticCollections.js';

export const staticRouter = express.Router();

staticRouter.get('/bestsellers', (_req, res) => {
  res.status(200).json(bestsellers);
});
