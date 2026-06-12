import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Group, ScrollArea, Stack, Table, Text } from '@mantine/core';
import type { RootState } from '../../store';
import { useGetInstalledPluginsQuery } from '../../store/api/pluginRegistryApi';
import { useGetMarketplacePluginsQuery } from '../../store/api/marketplaceApi';
import { GlassCard } from './GlassCard';

export function PermissionsPanel() {
  const user = useSelector((s: RootState) => s.user);
  const { data: installed } = useGetInstalledPluginsQuery();
  const { data: marketplace } = useGetMarketplacePluginsQuery();

  const matrix = useMemo(() => {
    const catalog = marketplace?.data ?? [];
    const plugins = installed?.data ?? [];
    return plugins.map((p) => {
      const catalogEntry = catalog.find((c) => c.id === p.id);
      return {
        id: p.id,
        name: p.name,
        status: p.status,
        declared: catalogEntry?.permissions ?? p.permissions,
        granted: p.status === 'enabled' ? p.permissions : [],
      };
    });
  }, [installed, marketplace]);

  return (
    <GlassCard
      title="Permission Model"
      subtitle="Manifest declarations → runtime grants → API middleware enforcement"
      badge={`${user.permissions?.length ?? 0} host grants`}
      badgeColor="orange"
    >
      <Stack gap="md">
        <Group gap="xs">
          <Text size="sm" fw={600}>
            Host user grants:
          </Text>
          {(user.permissions ?? []).map((p) => (
            <Badge key={p} size="sm" variant="outline" color="indigo">
              {p}
            </Badge>
          ))}
        </Group>

        <ScrollArea h={300} type="auto" offsetScrollbars>
          {matrix.length === 0 ? (
            <Text size="sm" c="dimmed" ta="center" py="xl">
              No plugins installed — permissions appear after install.
            </Text>
          ) : (
            <Table verticalSpacing="sm" className="fpp-console-table">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Plugin</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Declared (manifest)</Table.Th>
                  <Table.Th>Active grants</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {matrix.map((row) => (
                  <Table.Tr key={row.id}>
                    <Table.Td fw={600}>{row.name}</Table.Td>
                    <Table.Td>
                      <Badge
                        size="sm"
                        variant="light"
                        color={row.status === 'enabled' ? 'green' : 'gray'}
                      >
                        {row.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        {row.declared.map((perm) => (
                          <Badge key={perm} size="xs" variant="dot" color="gray">
                            {perm}
                          </Badge>
                        ))}
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4}>
                        {row.granted.length === 0 ? (
                          <Text size="xs" c="dimmed">
                            —
                          </Text>
                        ) : (
                          row.granted.map((perm) => (
                            <Badge key={perm} size="xs" variant="light" color="green">
                              {perm}
                            </Badge>
                          ))
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Stack>
    </GlassCard>
  );
}
