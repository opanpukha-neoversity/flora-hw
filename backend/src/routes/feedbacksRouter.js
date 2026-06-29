import express from 'express';
import * as feedbacksController from '../controllers/feedbacksController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createFeedbackSchema } from '../schemas/feedbackSchemas.js';

export const feedbacksRouter = express.Router();

feedbacksRouter.get('/', feedbacksController.getFeedbacks);
feedbacksRouter.post('/', validateBody(createFeedbackSchema), feedbacksController.addFeedback);
