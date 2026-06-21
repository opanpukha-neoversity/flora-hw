import express from 'express';
import { bestsellers, feedbacks } from '../data/staticCollections.js';

export const staticRouter = express.Router();

staticRouter.get('/bestsellers', (_req, res) => {
  res.status(200).json(bestsellers);
});

staticRouter.get('/feedbacks', (_req, res) => {
  res.status(200).json(feedbacks);
});
