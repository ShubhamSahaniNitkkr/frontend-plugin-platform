export declare function listMarketplacePlugins(userId?: string): {
    id: string;
    name: string;
    description: string;
    author: string;
    category: string;
    icon: string | undefined;
    latestVersion: string;
    permissions: string[];
    versions: string[];
    installed: boolean;
    enabled: boolean;
}[];
export declare function getMarketplacePlugin(pluginId: string, userId?: string): {
    id: string;
    name: string;
    description: string;
    author: string;
    category: string;
    icon: string | undefined;
    latestVersion: string;
    permissions: string[];
    versions: string[];
    installed: boolean;
    enabled: boolean;
} | null;
//# sourceMappingURL=marketplace.service.d.ts.map