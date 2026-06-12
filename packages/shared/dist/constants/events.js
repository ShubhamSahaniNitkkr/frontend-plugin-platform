import { z } from 'zod';
export const taskCreatedSchema = z.object({
    taskId: z.string(),
    title: z.string(),
    userId: z.string(),
});
export const taskUpdatedSchema = z.object({
    taskId: z.string(),
    changes: z.record(z.unknown()),
});
export const taskDeletedSchema = z.object({
    taskId: z.string(),
});
export const reportGeneratedSchema = z.object({
    reportId: z.string(),
    type: z.string(),
    title: z.string().optional(),
});
export const userLoggedInSchema = z.object({
    userId: z.string(),
    email: z.string(),
    timestamp: z.string(),
});
export const notificationShowSchema = z.object({
    message: z.string(),
    variant: z.enum(['info', 'success', 'error', 'warning']).default('info'),
    title: z.string().optional(),
});
export const pluginErrorSchema = z.object({
    pluginId: z.string(),
    error: z.string(),
    stack: z.string().optional(),
});
export const pluginLifecycleSchema = z.object({
    pluginId: z.string(),
    version: z.string().optional(),
});
export const localeChangedSchema = z.object({
    locale: z.string(),
});
export const themePresetSchema = z.object({
    primaryColor: z.string(),
    label: z.string().optional(),
});
export const EVENT_SCHEMAS = {
    'task.created': taskCreatedSchema,
    'task.updated': taskUpdatedSchema,
    'task.deleted': taskDeletedSchema,
    'report.generated': reportGeneratedSchema,
    'user.loggedIn': userLoggedInSchema,
    'notification.show': notificationShowSchema,
    'plugin.error': pluginErrorSchema,
    'plugin.enabled': pluginLifecycleSchema,
    'plugin.disabled': pluginLifecycleSchema,
    'locale.changed': localeChangedSchema,
    'theme.preset': themePresetSchema,
};
//# sourceMappingURL=events.js.map