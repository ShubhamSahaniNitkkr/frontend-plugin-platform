import { z } from 'zod';
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export const installPluginSchema = z.object({
    version: z.string().optional(),
});
export const updatePluginSchema = z.object({
    version: z.string(),
});
export const pluginConfigSchema = z.record(z.unknown());
export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
});
export const updateTaskSchema = createTaskSchema.partial();
export const generateReportSchema = z.object({
    type: z.enum(['tasks', 'activity', 'usage']),
    format: z.enum(['json', 'csv']).default('json'),
    title: z.string().optional(),
});
export const telemetryEventSchema = z.object({
    pluginId: z.string(),
    event: z.string(),
    payload: z.record(z.unknown()).optional(),
    timestamp: z.string().optional(),
});
//# sourceMappingURL=api.schema.js.map