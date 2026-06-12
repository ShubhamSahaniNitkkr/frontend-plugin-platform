import { z } from 'zod';
export declare const pluginManifestSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    version: z.ZodString;
    description: z.ZodString;
    author: z.ZodString;
    entry: z.ZodString;
    hostCompatibility: z.ZodDefault<z.ZodString>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodEnum<[string, ...string[]]>, "many">>;
    dependencies: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    icon: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    version: string;
    id: string;
    name: string;
    description: string;
    author: string;
    entry: string;
    hostCompatibility: string;
    permissions: string[];
    dependencies?: Record<string, string> | undefined;
    icon?: string | undefined;
    category?: string | undefined;
}, {
    version: string;
    id: string;
    name: string;
    description: string;
    author: string;
    entry: string;
    hostCompatibility?: string | undefined;
    permissions?: string[] | undefined;
    dependencies?: Record<string, string> | undefined;
    icon?: string | undefined;
    category?: string | undefined;
}>;
export declare const routeContributionSchema: z.ZodObject<{
    path: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    permission: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path: string;
    label?: string | undefined;
    permission?: string | undefined;
}, {
    path: string;
    label?: string | undefined;
    permission?: string | undefined;
}>;
export declare const widgetContributionSchema: z.ZodObject<{
    slot: z.ZodEnum<["dashboard.main", "dashboard.sidebar", "header.actions", "settings.sections", "reports.widgets", "sidebar.nav"]>;
    priority: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    slot: "dashboard.main" | "dashboard.sidebar" | "header.actions" | "settings.sections" | "reports.widgets" | "sidebar.nav";
    priority: number;
}, {
    slot: "dashboard.main" | "dashboard.sidebar" | "header.actions" | "settings.sections" | "reports.widgets" | "sidebar.nav";
    priority?: number | undefined;
}>;
export declare const menuItemContributionSchema: z.ZodObject<{
    label: z.ZodString;
    path: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    path: string;
    label: string;
    order: number;
    icon?: string | undefined;
    section?: string | undefined;
}, {
    path: string;
    label: string;
    icon?: string | undefined;
    section?: string | undefined;
    order?: number | undefined;
}>;
export type PluginManifest = z.infer<typeof pluginManifestSchema>;
export type RouteContribution = z.infer<typeof routeContributionSchema>;
export type WidgetContribution = z.infer<typeof widgetContributionSchema>;
export type MenuItemContribution = z.infer<typeof menuItemContributionSchema>;
//# sourceMappingURL=plugin-manifest.schema.d.ts.map