import cors from 'cors';
import express from 'express';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import openapiDocument from './swagger/openapi.json' with { type: 'json' };
import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const app = express();

app.set('trust proxy', 1);

const corsOptions = {
  origin: env.frontendUrl === '*' ? '*' : env.frontendUrl.split(',').map(origin => origin.trim()),
  exposedHeaders: ['X-Total-Count'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/photos', express.static(path.resolve('public', 'photos')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
