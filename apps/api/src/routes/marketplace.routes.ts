import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as marketplaceService from '../services/marketplace.service.js';
import { paramId } from '../utils/params.js';

export const marketplaceRouter = Router();

marketplaceRouter.use(authMiddleware);

marketplaceRouter.get('/plugins', (req, res) => {
  const plugins = marketplaceService.listMarketplacePlugins(req.user!.id);
  res.json({ data: plugins, meta: { total: plugins.length } });
});

marketplaceRouter.get('/plugins/:id', (req, res) => {
  const plugin = marketplaceService.getMarketplacePlugin(
    paramId(req),
    req.user!.id
  );
  if (!plugin) {
    res.status(404).json({ title: 'Not Found', status: 404 });
    return;
  }
  res.json({ data: plugin });
});
