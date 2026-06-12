import type { PluginLifecycle, PluginContext } from '@fpp/plugin-sdk';

const LIFECYCLE_TIMEOUT_MS = 10000;

export async function runLifecycleHook(
  hook: ((ctx: PluginContext) => Promise<void>) | undefined,
  ctx: PluginContext,
  hookName: string
): Promise<void> {
  if (!hook) return;

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`${hookName} timed out after ${LIFECYCLE_TIMEOUT_MS}ms`)),
      LIFECYCLE_TIMEOUT_MS
    )
  );

  await Promise.race([hook(ctx), timeoutPromise]);
}

export async function executeEnable(
  lifecycle: PluginLifecycle | undefined,
  ctx: PluginContext
): Promise<void> {
  await runLifecycleHook(lifecycle?.onEnable, ctx, 'onEnable');
}

export async function executeDisable(
  lifecycle: PluginLifecycle | undefined,
  ctx: PluginContext
): Promise<void> {
  await runLifecycleHook(lifecycle?.onDisable, ctx, 'onDisable');
}

export async function executeDestroy(
  lifecycle: PluginLifecycle | undefined,
  ctx: PluginContext
): Promise<void> {
  await runLifecycleHook(lifecycle?.onDestroy, ctx, 'onDestroy');
}
