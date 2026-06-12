import { memo } from 'react';
import { Alert, Button, Group, Text } from '@mantine/core';
import { IconPlugOff } from '@tabler/icons-react';

interface PluginFallbackProps {
  pluginId: string;
  pluginName?: string;
  onRetry?: () => void;
}

export const PluginFallback = memo(function PluginFallback({
  pluginId,
  pluginName,
  onRetry,
}: PluginFallbackProps) {
  return (
    <Alert
      color="orange"
      title={`${pluginName ?? pluginId} encountered an error`}
      icon={<IconPlugOff size={16} />}
    >
      <Text size="sm" mb="sm">
        This plugin failed to render. The host application continues to work
        normally.
      </Text>
      <Group>
        {onRetry && (
          <Button size="xs" variant="light" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Group>
    </Alert>
  );
});
