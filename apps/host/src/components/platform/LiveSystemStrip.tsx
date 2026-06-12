import { useSyncExternalStore } from 'react';
import { useSelector } from 'react-redux';
import { Group, Paper, Text } from '@mantine/core';
import {
  IconApi,
  IconBolt,
  IconPlug,
  IconRoute,
} from '@tabler/icons-react';
import type { RootState } from '../../store';
import { usePlatform } from '../../platform/di/PlatformContext';
import { componentRegistry } from '../../platform/component-registry/ComponentRegistry';
import { LiveIndicator } from './LiveIndicator';

export function LiveSystemStrip() {
  const { eventBus } = usePlatform();
  const events = useSelector((s: RootState) => s.platformObservability.events);
  const apiCalls = useSelector((s: RootState) => s.platformObservability.apiCalls);
  const plugins = useSelector((s: RootState) => s.pluginMetadata.plugins);

  const registryStats = useSyncExternalStore(
    (cb) => componentRegistry.subscribe(cb),
    () => componentRegistry.getStats(),
    () => ({ routes: 0, widgets: 0, menuItems: 0, settings: 0 })
  );

  const enabled = Object.values(plugins).filter((p) => p.status === 'enabled').length;
  const contributions =
    registryStats.routes + registryStats.widgets + registryStats.menuItems;

  const metrics = [
    { icon: IconPlug, label: 'Plugins active', value: enabled },
    { icon: IconRoute, label: 'Contributions', value: contributions },
    { icon: IconBolt, label: 'Events', value: events.length },
    { icon: IconApi, label: 'API calls', value: apiCalls.length },
    {
      icon: IconBolt,
      label: 'Listeners',
      value: eventBus.getSubscriptionCount(),
    },
  ];

  return (
    <Paper className="fpp-system-strip" p="md" radius="lg">
      <Group justify="space-between" wrap="wrap" gap="md">
        <LiveIndicator label="System online" />
        <Group gap="xl" wrap="wrap" justify="flex-end" style={{ flex: 1 }}>
          {metrics.map((m) => (
            <Group key={m.label} gap="xs" wrap="nowrap">
              <m.icon size={16} stroke={1.5} opacity={0.7} />
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700} lh={1}>
                  {m.label}
                </Text>
                <Text fw={700} size="lg" lh={1.2}>
                  {m.value}
                </Text>
              </div>
            </Group>
          ))}
        </Group>
      </Group>
    </Paper>
  );
}
