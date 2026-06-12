export declare function trackEvent(userId: string | undefined, pluginId: string, event: string, payload?: Record<string, unknown>): void;
export declare function getPluginTelemetry(userId: string, pluginId: string): {
    pluginId: string;
    events: {
        event: string;
        count: number;
    }[];
    errorCount: number;
    totalEvents: number;
};
export declare function addActivityFeed(userId: string, type: string, message: string, metadata?: Record<string, unknown>): void;
export declare function getActivityFeed(userId: string, limit?: number): {
    id: string | null;
    type: string | null;
    message: string | null;
    metadata: any;
    createdAt: string | null;
}[];
//# sourceMappingURL=telemetry.service.d.ts.map