import { installPluginSchema, pluginConfigSchema, updatePluginSchema, } from '@fpp/shared';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import * as registryService from '../services/plugin-registry.service.js';
import { paramId } from '../utils/params.js';
export const pluginsRouter = Router();
pluginsRouter.use(authMiddleware);
pluginsRouter.get('/', (req, res) => {
    const plugins = registryService.listInstalledPlugins(req.user.id);
    const enabled = plugins.filter((p) => p.status === 'enabled').length;
    res.json({
        data: plugins,
        meta: { total: plugins.length, enabled },
    });
});
pluginsRouter.get('/:id', (req, res) => {
    const plugin = registryService.getInstalledPlugin(req.user.id, paramId(req));
    if (!plugin) {
        res.status(404).json({ title: 'Not Found', status: 404 });
        return;
    }
    res.json({ data: plugin });
});
pluginsRouter.get('/:id/compatibility', (req, res) => {
    const version = req.query.version ?? '1.0.0';
    const result = registryService.checkCompatibility(paramId(req), version);
    res.json({ data: result });
});
pluginsRouter.post('/:id/install', validateBody(installPluginSchema), (req, res) => {
    try {
        const plugin = registryService.installPlugin(req.user.id, paramId(req), req.body.version);
        res.status(201).json({ data: plugin });
    }
    catch (error) {
        res.status(400).json({
            title: 'Bad Request',
            status: 400,
            detail: error.message,
        });
    }
});
pluginsRouter.delete('/:id/uninstall', (req, res) => {
    registryService.uninstallPlugin(req.user.id, paramId(req));
    res.json({ data: { success: true } });
});
pluginsRouter.patch('/:id/enable', (req, res) => {
    try {
        const plugin = registryService.enablePlugin(req.user.id, paramId(req));
        res.json({ data: plugin });
    }
    catch (error) {
        res.status(400).json({
            title: 'Bad Request',
            status: 400,
            detail: error.message,
        });
    }
});
pluginsRouter.patch('/:id/disable', (req, res) => {
    try {
        const plugin = registryService.disablePlugin(req.user.id, paramId(req));
        res.json({ data: plugin });
    }
    catch (error) {
        res.status(400).json({
            title: 'Bad Request',
            status: 400,
            detail: error.message,
        });
    }
});
pluginsRouter.post('/:id/update', validateBody(updatePluginSchema), (req, res) => {
    try {
        const plugin = registryService.updatePlugin(req.user.id, paramId(req), req.body.version);
        res.json({ data: plugin });
    }
    catch (error) {
        res.status(400).json({
            title: 'Bad Request',
            status: 400,
            detail: error.message,
        });
    }
});
pluginsRouter.get('/:id/config', (req, res) => {
    const config = registryService.getPluginConfig(req.user.id, paramId(req));
    res.json({ data: config });
});
pluginsRouter.put('/:id/config', validateBody(pluginConfigSchema), (req, res) => {
    const config = registryService.setPluginConfig(req.user.id, paramId(req), req.body);
    res.json({ data: config });
});
pluginsRouter.patch('/:id/config', validateBody(pluginConfigSchema), (req, res) => {
    const config = registryService.patchPluginConfig(req.user.id, paramId(req), req.body);
    res.json({ data: config });
});
pluginsRouter.patch('/:id/health', (req, res) => {
    const { health, lastError, loadTimeMs } = req.body;
    registryService.updatePluginHealth(req.user.id, paramId(req), health, lastError, loadTimeMs);
    res.json({ data: { success: true } });
});
//# sourceMappingURL=plugins.routes.js.map