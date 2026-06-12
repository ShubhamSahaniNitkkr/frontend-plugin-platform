import { createTaskSchema, updateTaskSchema } from '@fpp/shared';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { requirePermission } from '../middleware/requirePermission.js';
import { validateBody } from '../middleware/validate.js';
import * as taskService from '../services/task.service.js';
import { paramId } from '../utils/params.js';
export const tasksRouter = Router();
tasksRouter.use(authMiddleware);
tasksRouter.get('/', requirePermission('tasks:read'), (req, res) => {
    res.json({ data: taskService.listTasks(req.user.id) });
});
tasksRouter.get('/:id', requirePermission('tasks:read'), (req, res) => {
    const task = taskService.getTask(req.user.id, paramId(req));
    if (!task) {
        res.status(404).json({ title: 'Not Found', status: 404 });
        return;
    }
    res.json({ data: task });
});
tasksRouter.post('/', requirePermission('tasks:write'), validateBody(createTaskSchema), (req, res) => {
    const task = taskService.createTask(req.user.id, req.body);
    res.status(201).json({ data: task });
});
tasksRouter.patch('/:id', requirePermission('tasks:write'), validateBody(updateTaskSchema), (req, res) => {
    const task = taskService.updateTask(req.user.id, paramId(req), req.body);
    if (!task) {
        res.status(404).json({ title: 'Not Found', status: 404 });
        return;
    }
    res.json({ data: task });
});
tasksRouter.delete('/:id', requirePermission('tasks:delete'), (req, res) => {
    const deleted = taskService.deleteTask(req.user.id, paramId(req));
    if (!deleted) {
        res.status(404).json({ title: 'Not Found', status: 404 });
        return;
    }
    res.json({ data: { success: true } });
});
//# sourceMappingURL=tasks.routes.js.map