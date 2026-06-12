import { generateReportSchema } from '@fpp/shared';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { requirePermission } from '../middleware/requirePermission.js';
import { validateBody } from '../middleware/validate.js';
import * as reportService from '../services/report.service.js';
import { paramId } from '../utils/params.js';

export const reportsRouter = Router();

reportsRouter.use(authMiddleware);

reportsRouter.get('/', requirePermission('reports:read'), (req, res) => {
  res.json({ data: reportService.listReports(req.user!.id) });
});

reportsRouter.post(
  '/',
  requirePermission('reports:generate'),
  validateBody(generateReportSchema),
  (req, res) => {
    const report = reportService.generateReport(req.user!.id, req.body);
    res.status(201).json({ data: report });
  }
);

reportsRouter.get(
  '/:id/export',
  requirePermission('reports:export'),
  (req, res) => {
    const format = (req.query.format as 'json' | 'csv') ?? 'json';
    const content = reportService.exportReport(
      req.user!.id,
      paramId(req),
      format
    );
    if (!content) {
      res.status(404).json({ title: 'Not Found', status: 404 });
      return;
    }
    const contentType = format === 'csv' ? 'text/csv' : 'application/json';
    res.setHeader('Content-Type', contentType);
    res.send(content);
  }
);
