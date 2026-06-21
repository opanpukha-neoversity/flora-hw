import express from 'express';
import { bouquetsRouter } from './bouquetsRouter.js';
import { staticRouter } from './staticRouter.js';

export const apiRouter = express.Router();

apiRouter.use('/bouquets', bouquetsRouter);
apiRouter.use('/', staticRouter);
