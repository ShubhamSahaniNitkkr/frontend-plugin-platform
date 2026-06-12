import { useSyncExternalStore } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Code, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import type { RootState } from '../../store';
import { usePlatform } from '../../platform/di/PlatformContext';
import { componentRegistry } from '../../platform/component-registry/ComponentRegistry';
import { GlassCard } from './GlassCard';

import { API_URL } from '../../lib/apiUrl';

const LAYERS = [
  { name: 'Astro Shell', desc: 'Static HTML + React islands', color: 'orange' },
  { name: 'Redux + RTK Query', desc: 'Client state + API cache', color: 'red' },
  { name: 'PluginManager', desc: 'Dynamic import + activate()', color: 'violet' },
  { name: 'ComponentRegistry', desc: 'Routes · widgets · nav', color: 'teal' },
  { name: 'EventBus', desc: 'Zod-validated pub/sub', color: 'cyan' },
  { name: 'Express API', desc: 'JWT · permissions · SQLite', color: 'blue' },
];

export function ArchitectureLivePanel() {
  const { eventBus } = usePlatform();
  const events = useSelector((s: RootState) => s.platformObservability.events);
  const apiCalls = useSelector((s: RootState) => s.platformObservability.apiCalls);
  const plugins = useSelector((s: RootState) => s.pluginMetadata.plugins);

  const registryStats = useSyncExternalStore(
    (cb) => componentRegistry.subscribe(cb),
    () => componentRegistry.getStats(),
    () => ({ routes: 0, widgets: 0, menuItems: 0, settings: 0 })
  );

  const enabledCount = Object.values(plugins).filter((p) => p.status === 'enabled').length;

  return (
    <GlassCard
      title="Live Architecture"
      subtitle="Every layer visible — no black boxes"
      badge="transparent"
      badgeColor="indigo"
    >
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="sm" mb="lg">
        {LAYERS.map((layer) => (
          <Stack
            key={layer.name}
            gap={4}
            className="fpp-arch-layer"
            p="sm"
          >
            <Badge size="sm" variant="light" color={layer.color}>
              {layer.name}
            </Badge>
            <Text size="xs" c="dimmed">
              {layer.desc}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>

      <Group gap="md" wrap="wrap">
        <Stack gap={2}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            API endpoint
          </Text>
          <Code className="fpp-code-inline">{API_URL}</Code>
        </Stack>
        <Stack gap={2}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            Enabled plugins
          </Text>
          <Text fw={700}>{enabledCount}</Text>
        </Stack>
        <Stack gap={2}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            Registry items
          </Text>
          <Text fw={700}>
            {registryStats.routes + registryStats.widgets + registryStats.menuItems}
          </Text>
        </Stack>
        <Stack gap={2}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            Event listeners
          </Text>
          <Text fw={700}>{eventBus.getSubscriptionCount()}</Text>
        </Stack>
        <Stack gap={2}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            Events captured
          </Text>
          <Text fw={700}>{events.length}</Text>
        </Stack>
        <Stack gap={2}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            API calls logged
          </Text>
          <Text fw={700}>{apiCalls.length}</Text>
        </Stack>
      </Group>
    </GlassCard>
  );
}
