import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/auth.routes.js';
import { marketplaceRouter } from './routes/marketplace.routes.js';
import { pluginsRouter } from './routes/plugins.routes.js';
import { reportsRouter } from './routes/reports.routes.js';
import { tasksRouter } from './routes/tasks.routes.js';
import { telemetryRouter } from './routes/telemetry.routes.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());

  app.get('/api/v1/health', (_req, res) => {
    res.json({ status: 'ok', version: '1.0.0' });
  });

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/marketplace', marketplaceRouter);
  app.use('/api/v1/plugins', pluginsRouter);
  app.use('/api/v1/tasks', tasksRouter);
  app.use('/api/v1/reports', reportsRouter);
  app.use('/api/v1/telemetry', telemetryRouter);

  app.use(errorHandler);

  return app;
}
