import express from 'express';
import { bouquetsRouter } from './bouquetsRouter.js';
import { ordersRouter } from './ordersRouter.js';
import { feedbacksRouter } from './feedbacksRouter.js';
import { staticRouter } from './staticRouter.js';

export const apiRouter = express.Router();

apiRouter.use('/bouquets', bouquetsRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/feedbacks', feedbacksRouter);
apiRouter.use('/', staticRouter);
