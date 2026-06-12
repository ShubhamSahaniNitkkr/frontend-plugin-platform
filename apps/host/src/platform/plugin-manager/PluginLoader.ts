import { pluginEntryMap } from './pluginEntryMap';

const LOAD_TIMEOUT_MS = 10000;

export interface LoadResult {
  success: boolean;
  loadTimeMs: number;
  error?: string;
}

type PluginModule = { activate?: () => void };

export class PluginLoader {
  private loadedModules = new Set<string>();

  async load(_entry: string, pluginId: string): Promise<LoadResult> {
    const start = performance.now();

    try {
      const mappedLoader = pluginEntryMap[pluginId];
      if (!mappedLoader) {
        throw new Error(`No entry map for plugin: ${pluginId}`);
      }

      const loadPromise = mappedLoader() as Promise<PluginModule>;
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Plugin load timeout')), LOAD_TIMEOUT_MS)
      );

      const mod = await Promise.race([loadPromise, timeoutPromise]);

      if (typeof mod?.activate === 'function') {
        mod.activate();
      } else {
        throw new Error(`Plugin ${pluginId} must export activate()`);
      }

      this.loadedModules.add(pluginId);

      return {
        success: true,
        loadTimeMs: Math.round(performance.now() - start),
      };
    } catch (error) {
      return {
        success: false,
        loadTimeMs: Math.round(performance.now() - start),
        error: error instanceof Error ? error.message : 'Unknown load error',
      };
    }
  }

  unload(pluginId: string): void {
    this.loadedModules.delete(pluginId);
  }

  isLoaded(pluginId: string): boolean {
    return this.loadedModules.has(pluginId);
  }
}

export const pluginLoader = new PluginLoader();
