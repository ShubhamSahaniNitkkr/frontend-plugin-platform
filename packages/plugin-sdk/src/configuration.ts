import { resolvePluginId, getPluginContext } from './context.js';

export function getConfiguration<T = Record<string, unknown>>(
  pluginId?: string
): T {
  const id = resolvePluginId(pluginId);
  return getPluginContext(id).config.get<T>();
}

export async function setConfiguration(
  partial: Record<string, unknown>,
  pluginId?: string
): Promise<void> {
  const id = resolvePluginId(pluginId);
  await getPluginContext(id).config.set(partial);
}
