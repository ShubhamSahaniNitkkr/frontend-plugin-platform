import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { ErrorInfo, ReactNode } from 'react';
import { PluginIdProvider } from '@fpp/plugin-sdk';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { PluginFallback } from './PluginFallback';
import { updatePluginHealth } from '../../store/slices/pluginMetadataSlice';
import { usePlatform } from '../../platform/di/PlatformContext';

interface PluginBoundaryProps {
  pluginId: string;
  pluginName?: string;
  children: ReactNode;
}

export function PluginBoundary({
  pluginId,
  pluginName,
  children,
}: PluginBoundaryProps) {
  const dispatch = useDispatch();
  const { eventBus } = usePlatform();

  const handleError = useCallback(
    (error: Error, _info: ErrorInfo) => {
      dispatch(
        updatePluginHealth({
          id: pluginId,
          health: 'unhealthy',
          lastError: error.message,
        })
      );
      eventBus.emit(
        'plugin.error',
        { pluginId, error: error.message, stack: error.stack },
        { source: 'host' }
      );
    },
    [dispatch, eventBus, pluginId]
  );

  return (
    <ErrorBoundary
      onError={handleError}
      fallback={
        <PluginFallback
          pluginId={pluginId}
          pluginName={pluginName}
          onRetry={() => window.location.reload()}
        />
      }
    >
      <PluginIdProvider pluginId={pluginId}>{children}</PluginIdProvider>
    </ErrorBoundary>
  );
}
