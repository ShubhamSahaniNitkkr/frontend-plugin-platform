import { z } from 'zod';
export declare const taskCreatedSchema: z.ZodObject<{
    taskId: z.ZodString;
    title: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    taskId: string;
    title: string;
    userId: string;
}, {
    taskId: string;
    title: string;
    userId: string;
}>;
export declare const taskUpdatedSchema: z.ZodObject<{
    taskId: z.ZodString;
    changes: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    taskId: string;
    changes: Record<string, unknown>;
}, {
    taskId: string;
    changes: Record<string, unknown>;
}>;
export declare const taskDeletedSchema: z.ZodObject<{
    taskId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    taskId: string;
}, {
    taskId: string;
}>;
export declare const reportGeneratedSchema: z.ZodObject<{
    reportId: z.ZodString;
    type: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string;
    reportId: string;
    title?: string | undefined;
}, {
    type: string;
    reportId: string;
    title?: string | undefined;
}>;
export declare const userLoggedInSchema: z.ZodObject<{
    userId: z.ZodString;
    email: z.ZodString;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    email: string;
    timestamp: string;
}, {
    userId: string;
    email: string;
    timestamp: string;
}>;
export declare const notificationShowSchema: z.ZodObject<{
    message: z.ZodString;
    variant: z.ZodDefault<z.ZodEnum<["info", "success", "error", "warning"]>>;
    title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    variant: "info" | "success" | "error" | "warning";
    title?: string | undefined;
}, {
    message: string;
    title?: string | undefined;
    variant?: "info" | "success" | "error" | "warning" | undefined;
}>;
export declare const pluginErrorSchema: z.ZodObject<{
    pluginId: z.ZodString;
    error: z.ZodString;
    stack: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error: string;
    pluginId: string;
    stack?: string | undefined;
}, {
    error: string;
    pluginId: string;
    stack?: string | undefined;
}>;
export declare const pluginLifecycleSchema: z.ZodObject<{
    pluginId: z.ZodString;
    version: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    pluginId: string;
    version?: string | undefined;
}, {
    pluginId: string;
    version?: string | undefined;
}>;
export declare const localeChangedSchema: z.ZodObject<{
    locale: z.ZodString;
}, "strip", z.ZodTypeAny, {
    locale: string;
}, {
    locale: string;
}>;
export declare const themePresetSchema: z.ZodObject<{
    primaryColor: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    primaryColor: string;
    label?: string | undefined;
}, {
    primaryColor: string;
    label?: string | undefined;
}>;
export declare const EVENT_SCHEMAS: {
    readonly 'task.created': z.ZodObject<{
        taskId: z.ZodString;
        title: z.ZodString;
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        title: string;
        userId: string;
    }, {
        taskId: string;
        title: string;
        userId: string;
    }>;
    readonly 'task.updated': z.ZodObject<{
        taskId: z.ZodString;
        changes: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
        changes: Record<string, unknown>;
    }, {
        taskId: string;
        changes: Record<string, unknown>;
    }>;
    readonly 'task.deleted': z.ZodObject<{
        taskId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        taskId: string;
    }, {
        taskId: string;
    }>;
    readonly 'report.generated': z.ZodObject<{
        reportId: z.ZodString;
        type: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        reportId: string;
        title?: string | undefined;
    }, {
        type: string;
        reportId: string;
        title?: string | undefined;
    }>;
    readonly 'user.loggedIn': z.ZodObject<{
        userId: z.ZodString;
        email: z.ZodString;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        email: string;
        timestamp: string;
    }, {
        userId: string;
        email: string;
        timestamp: string;
    }>;
    readonly 'notification.show': z.ZodObject<{
        message: z.ZodString;
        variant: z.ZodDefault<z.ZodEnum<["info", "success", "error", "warning"]>>;
        title: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        variant: "info" | "success" | "error" | "warning";
        title?: string | undefined;
    }, {
        message: string;
        title?: string | undefined;
        variant?: "info" | "success" | "error" | "warning" | undefined;
    }>;
    readonly 'plugin.error': z.ZodObject<{
        pluginId: z.ZodString;
        error: z.ZodString;
        stack: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        error: string;
        pluginId: string;
        stack?: string | undefined;
    }, {
        error: string;
        pluginId: string;
        stack?: string | undefined;
    }>;
    readonly 'plugin.enabled': z.ZodObject<{
        pluginId: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        pluginId: string;
        version?: string | undefined;
    }, {
        pluginId: string;
        version?: string | undefined;
    }>;
    readonly 'plugin.disabled': z.ZodObject<{
        pluginId: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        pluginId: string;
        version?: string | undefined;
    }, {
        pluginId: string;
        version?: string | undefined;
    }>;
    readonly 'locale.changed': z.ZodObject<{
        locale: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        locale: string;
    }, {
        locale: string;
    }>;
    readonly 'theme.preset': z.ZodObject<{
        primaryColor: z.ZodString;
        label: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        primaryColor: string;
        label?: string | undefined;
    }, {
        primaryColor: string;
        label?: string | undefined;
    }>;
};
export type PlatformEventMap = {
    'task.created': z.infer<typeof taskCreatedSchema>;
    'task.updated': z.infer<typeof taskUpdatedSchema>;
    'task.deleted': z.infer<typeof taskDeletedSchema>;
    'report.generated': z.infer<typeof reportGeneratedSchema>;
    'user.loggedIn': z.infer<typeof userLoggedInSchema>;
    'notification.show': z.infer<typeof notificationShowSchema>;
    'plugin.error': z.infer<typeof pluginErrorSchema>;
    'plugin.enabled': z.infer<typeof pluginLifecycleSchema>;
    'plugin.disabled': z.infer<typeof pluginLifecycleSchema>;
    'locale.changed': z.infer<typeof localeChangedSchema>;
    'theme.preset': z.infer<typeof themePresetSchema>;
};
export type PlatformEventName = keyof PlatformEventMap;
//# sourceMappingURL=events.d.ts.map