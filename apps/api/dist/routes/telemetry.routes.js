import { telemetryEventSchema } from '@fpp/shared';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import * as telemetryService from '../services/telemetry.service.js';
import { paramId } from '../utils/params.js';
export const telemetryRouter = Router();
telemetryRouter.use(authMiddleware);
telemetryRouter.post('/events', validateBody(telemetryEventSchema), (req, res) => {
    telemetryService.trackEvent(req.user.id, req.body.pluginId, req.body.event, req.body.payload);
    res.status(201).json({ data: { success: true } });
});
telemetryRouter.get('/plugins/:id', (req, res) => {
    const data = telemetryService.getPluginTelemetry(req.user.id, paramId(req));
    res.json({ data });
});
telemetryRouter.get('/activity', (req, res) => {
    const feed = telemetryService.getActivityFeed(req.user.id);
    res.json({ data: feed });
});
telemetryRouter.post('/activity', (req, res) => {
    const { type, message, metadata } = req.body;
    telemetryService.addActivityFeed(req.user.id, type, message, metadata);
    res.status(201).json({ data: { success: true } });
});
//# sourceMappingURL=telemetry.routes.js.map