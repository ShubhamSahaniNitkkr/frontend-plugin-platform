import { Suspense, memo } from 'react';
import type { SlotId } from '@fpp/shared';
import { Stack } from '@mantine/core';
import { usePluginSlot } from '../../hooks/usePluginSlot';
import { PluginBoundary } from './PluginBoundary';
import { LoadingFallback } from '../common/LoadingFallback';

interface PluginSlotProps {
  id: SlotId;
  emptyMessage?: string;
}

export const PluginSlot = memo(function PluginSlot({
  id,
  emptyMessage,
}: PluginSlotProps) {
  const widgets = usePluginSlot(id);

  if (widgets.length === 0 && emptyMessage) {
    return null;
  }

  return (
    <Stack gap="md">
      {widgets.map((widget) => {
        const Component = widget.component;
        return (
          <PluginBoundary
            key={`${widget.pluginId}-${id}`}
            pluginId={widget.pluginId}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Component />
            </Suspense>
          </PluginBoundary>
        );
      })}
    </Stack>
  );
});
