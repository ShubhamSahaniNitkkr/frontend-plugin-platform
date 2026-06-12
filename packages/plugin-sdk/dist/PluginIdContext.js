import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const PluginIdContext = createContext(null);
export function PluginIdProvider({ pluginId, children, }) {
    return (_jsx(PluginIdContext.Provider, { value: pluginId, children: children }));
}
export function usePluginId() {
    const pluginId = useContext(PluginIdContext);
    if (!pluginId) {
        throw new Error('[PluginSDK] usePluginId must be used within PluginIdProvider (wrap plugin UI in PluginBoundary)');
    }
    return pluginId;
}
export function tryGetPluginId() {
    return useContext(PluginIdContext);
}
//# sourceMappingURL=PluginIdContext.js.map