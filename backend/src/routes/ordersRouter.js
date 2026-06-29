import express from 'express';
import * as ordersController from '../controllers/ordersController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createOrderSchema } from '../schemas/orderSchemas.js';

export const ordersRouter = express.Router();

ordersRouter.get('/', ordersController.getOrders);
ordersRouter.get('/:id', ordersController.getOrder);
ordersRouter.post('/', validateBody(createOrderSchema), ordersController.addOrder);
