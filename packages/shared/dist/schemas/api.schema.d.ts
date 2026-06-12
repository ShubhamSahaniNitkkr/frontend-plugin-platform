import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const installPluginSchema: z.ZodObject<{
    version: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    version?: string | undefined;
}, {
    version?: string | undefined;
}>;
export declare const updatePluginSchema: z.ZodObject<{
    version: z.ZodString;
}, "strip", z.ZodTypeAny, {
    version: string;
}, {
    version: string;
}>;
export declare const pluginConfigSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["todo", "in_progress", "done"]>>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    description?: string | undefined;
}, {
    title: string;
    status?: "todo" | "in_progress" | "done" | undefined;
    description?: string | undefined;
    priority?: "low" | "medium" | "high" | undefined;
}>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["todo", "in_progress", "done"]>>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    status?: "todo" | "in_progress" | "done" | undefined;
    description?: string | undefined;
    priority?: "low" | "medium" | "high" | undefined;
}, {
    title?: string | undefined;
    status?: "todo" | "in_progress" | "done" | undefined;
    description?: string | undefined;
    priority?: "low" | "medium" | "high" | undefined;
}>;
export declare const generateReportSchema: z.ZodObject<{
    type: z.ZodEnum<["tasks", "activity", "usage"]>;
    format: z.ZodDefault<z.ZodEnum<["json", "csv"]>>;
    title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "tasks" | "activity" | "usage";
    format: "json" | "csv";
    title?: string | undefined;
}, {
    type: "tasks" | "activity" | "usage";
    title?: string | undefined;
    format?: "json" | "csv" | undefined;
}>;
export declare const telemetryEventSchema: z.ZodObject<{
    pluginId: z.ZodString;
    event: z.ZodString;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    pluginId: string;
    event: string;
    timestamp?: string | undefined;
    payload?: Record<string, unknown> | undefined;
}, {
    pluginId: string;
    event: string;
    timestamp?: string | undefined;
    payload?: Record<string, unknown> | undefined;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GenerateReportInput = z.infer<typeof generateReportSchema>;
//# sourceMappingURL=api.schema.d.ts.map