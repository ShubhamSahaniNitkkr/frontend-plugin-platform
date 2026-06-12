import { useSyncExternalStore } from 'react';
import { useSelector } from 'react-redux';
import {
  Accordion,
  Badge,
  Code,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import type { RootState } from '../../store';
import { useGetInstalledPluginsQuery } from '../../store/api/pluginRegistryApi';
import { componentRegistry } from '../../platform/component-registry/ComponentRegistry';
import { GlassCard } from './GlassCard';

export function RegistryPanel() {
  const { data } = useGetInstalledPluginsQuery();
  const metadata = useSelector((s: RootState) => s.pluginMetadata.plugins);

  const stats = useSyncExternalStore(
    (cb) => componentRegistry.subscribe(cb),
    () => componentRegistry.getStats(),
    () => ({ routes: 0, widgets: 0, menuItems: 0, settings: 0 })
  );

  const contributions = useSyncExternalStore(
    (cb) => componentRegistry.subscribe(cb),
    () => componentRegistry.getContributions(),
    () => ({ routes: [], widgets: [], menuItems: [] })
  );

  return (
    <GlassCard
      title="Component Registry"
      subtitle="Runtime contributions from activate() — routes, widgets, nav items"
      badge={`${stats.routes + stats.widgets + stats.menuItems} live`}
      badgeColor="teal"
    >
      <Group gap="xs" mb="md">
        <Badge variant="light">{stats.routes} routes</Badge>
        <Badge variant="light">{stats.widgets} widgets</Badge>
        <Badge variant="light">{stats.menuItems} nav items</Badge>
        <Badge variant="light">{stats.settings} settings</Badge>
      </Group>

      <Accordion variant="separated" defaultValue="plugins">
        <Accordion.Item value="plugins">
          <Accordion.Control>Installed plugins (API + runtime)</Accordion.Control>
          <Accordion.Panel>
            <ScrollArea.Autosize mah={280} offsetScrollbars>
              <Table verticalSpacing="xs" className="fpp-console-table">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Plugin</Table.Th>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Entry</Table.Th>
                    <Table.Th>Load</Table.Th>
                    <Table.Th>Installed</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {(data?.data ?? []).map((p) => {
                    const meta = metadata[p.id];
                    return (
                      <Table.Tr key={p.id}>
                        <Table.Td fw={600}>{p.name}</Table.Td>
                        <Table.Td>
                          <Code className="fpp-code-inline">{p.id}</Code>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            size="sm"
                            color={p.status === 'enabled' ? 'green' : 'gray'}
                            variant="light"
                          >
                            {p.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" c="dimmed" lineClamp={1} maw={160}>
                            {p.entry}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {meta?.loadTimeMs != null ? `${meta.loadTimeMs}ms` : '—'}
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" c="dimmed">
                            {new Date(p.installedAt).toLocaleDateString()}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </ScrollArea.Autosize>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="contributions">
          <Accordion.Control>Live contributions map</Accordion.Control>
          <Accordion.Panel>
            <Stack gap="sm">
              {contributions.routes.map((r) => (
                <Group key={`${r.pluginId}-${r.path}`} gap="xs">
                  <Badge size="xs" color="violet">route</Badge>
                  <Code className="fpp-code-inline">{r.path}</Code>
                  <Text size="xs" c="dimmed">← {r.pluginId}</Text>
                </Group>
              ))}
              {contributions.widgets.map((w, i) => (
                <Group key={`${w.pluginId}-${w.slot}-${i}`} gap="xs">
                  <Badge size="xs" color="cyan">widget</Badge>
                  <Code className="fpp-code-inline">{w.slot}</Code>
                  <Text size="xs" c="dimmed">p{w.priority} · {w.pluginId}</Text>
                </Group>
              ))}
              {contributions.menuItems.map((m) => (
                <Group key={`${m.pluginId}-${m.path}`} gap="xs">
                  <Badge size="xs" color="teal">nav</Badge>
                  <Text size="sm">{m.label}</Text>
                  <Text size="xs" c="dimmed">← {m.pluginId}</Text>
                </Group>
              ))}
              {contributions.routes.length === 0 &&
                contributions.widgets.length === 0 && (
                  <Text size="sm" c="dimmed">
                    Enable plugins from Marketplace to populate the registry.
                  </Text>
                )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </GlassCard>
  );
}
