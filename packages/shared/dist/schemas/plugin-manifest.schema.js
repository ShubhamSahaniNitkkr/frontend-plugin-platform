import { z } from 'zod';
import { PERMISSIONS } from '../constants/permissions.js';
import { SLOT_IDS } from '../constants/slots.js';
export const pluginManifestSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    description: z.string(),
    author: z.string(),
    entry: z.string(),
    hostCompatibility: z.string().default('^1.0.0'),
    permissions: z.array(z.enum(PERMISSIONS)).default([]),
    dependencies: z.record(z.string()).optional(),
    icon: z.string().optional(),
    category: z.string().optional(),
});
export const routeContributionSchema = z.object({
    path: z.string(),
    label: z.string().optional(),
    permission: z.string().optional(),
});
export const widgetContributionSchema = z.object({
    slot: z.enum(SLOT_IDS),
    priority: z.number().default(0),
});
export const menuItemContributionSchema = z.object({
    label: z.string(),
    path: z.string(),
    icon: z.string().optional(),
    section: z.string().optional(),
    order: z.number().default(0),
});
//# sourceMappingURL=plugin-manifest.schema.js.map