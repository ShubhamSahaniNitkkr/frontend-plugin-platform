import { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { usePluginRoutes } from '../../hooks/usePluginSlot';
import { PluginBoundary } from './PluginBoundary';
import { LoadingFallback } from '../common/LoadingFallback';
import { Text } from '@mantine/core';

export function PluginRouteRenderer() {
  const routes = usePluginRoutes();
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const handlePopState = useCallback(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('fpp:navigate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('fpp:navigate', handlePopState);
    };
  }, [handlePopState]);

  const matchedRoute = useMemo(
    () => routes.find((r) => currentPath === r.path || currentPath.startsWith(r.path + '/')),
    [routes, currentPath]
  );

  if (!matchedRoute) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        Plugin route not found: {currentPath}
      </Text>
    );
  }

  const Component = matchedRoute.component;

  return (
    <PluginBoundary
      pluginId={matchedRoute.pluginId}
      pluginName={matchedRoute.label}
    >
      <Suspense fallback={<LoadingFallback message="Loading plugin route..." />}>
        <Component />
      </Suspense>
    </PluginBoundary>
  );
}
