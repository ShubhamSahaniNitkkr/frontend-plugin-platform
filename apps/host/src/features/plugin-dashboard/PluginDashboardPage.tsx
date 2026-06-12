import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Badge,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import {
  IconActivity,
  IconApi,
  IconBolt,
  IconCpu,
  IconDatabase,
  IconShieldCheck,
} from '@tabler/icons-react';
import type { RootState } from '../../store';
import { useGetInstalledPluginsQuery } from '../../store/api/pluginRegistryApi';
import { LoadingFallback } from '../../components/common/LoadingFallback';
import { StatCard } from '../../components/platform/StatCard';
import { EventBusPanel } from '../../components/platform/EventBusPanel';
import { ApiActivityPanel } from '../../components/platform/ApiActivityPanel';
import { RegistryPanel } from '../../components/platform/RegistryPanel';
import { PermissionsPanel } from '../../components/platform/PermissionsPanel';
import { BackendActivityPanel } from '../../components/platform/BackendActivityPanel';
import { ArchitectureLivePanel } from '../../components/platform/ArchitectureLivePanel';
import { LiveIndicator } from '../../components/platform/LiveIndicator';

export function PluginDashboardPage() {
  const { data, isLoading } = useGetInstalledPluginsQuery();
  const events = useSelector((s: RootState) => s.platformObservability.events);
  const apiCalls = useSelector((s: RootState) => s.platformObservability.apiCalls);
  const metadata = useSelector((s: RootState) => s.pluginMetadata.plugins);

  const stats = useMemo(() => {
    const plugins = data?.data ?? [];
    const avgLoad =
      plugins.reduce((sum, p) => {
        const ms = metadata[p.id]?.loadTimeMs ?? p.loadTimeMs;
        return ms != null ? sum + ms : sum;
      }, 0) /
      Math.max(plugins.filter((p) => metadata[p.id]?.loadTimeMs != null).length, 1);

    return {
      total: plugins.length,
      enabled: plugins.filter((p) => p.status === 'enabled').length,
      unhealthy: plugins.filter((p) => p.health === 'unhealthy').length,
      events: events.length,
      apiCalls: apiCalls.length,
      avgLoad: Math.round(avgLoad) || 0,
    };
  }, [data, events.length, apiCalls.length, metadata]);

  if (isLoading) return <LoadingFallback />;

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end" wrap="wrap" gap="md" mb="xs">
        <Stack gap={2}>
          <Group gap="sm">
            <Title order={2} className="fpp-page-title">
              Platform Console
            </Title>
            <LiveIndicator />
          </Group>
          <Text c="dimmed" size="sm">
            API traffic, event bus, registry, and permissions — for debugging & ops.
          </Text>
        </Stack>
        <Badge size="lg" variant="light" color="indigo">
          {stats.enabled}/{stats.total} active
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }}>
        <StatCard label="Installed" value={stats.total} icon={IconDatabase} color="indigo" />
        <StatCard label="Enabled" value={stats.enabled} icon={IconBolt} color="green" />
        <StatCard
          label="Unhealthy"
          value={stats.unhealthy}
          icon={IconShieldCheck}
          color="red"
        />
        <StatCard label="Events" value={stats.events} icon={IconActivity} color="violet" hint="Live bus" />
        <StatCard label="API calls" value={stats.apiCalls} icon={IconApi} color="cyan" hint="RTK Query" />
        <StatCard
          label="Avg load"
          value={`${stats.avgLoad}ms`}
          icon={IconCpu}
          color="teal"
          hint="Plugin activate()"
        />
      </SimpleGrid>

      <ArchitectureLivePanel />

      <Tabs defaultValue="events" variant="pills" radius="md" className="fpp-console-tabs">
        <Tabs.List mb="lg" className="fpp-tabs-list">
          <Tabs.Tab value="events" leftSection={<IconBolt size={16} />}>
            Event Bus
          </Tabs.Tab>
          <Tabs.Tab value="api" leftSection={<IconApi size={16} />}>
            API Layer
          </Tabs.Tab>
          <Tabs.Tab value="registry" leftSection={<IconDatabase size={16} />}>
            Registry
          </Tabs.Tab>
          <Tabs.Tab value="permissions" leftSection={<IconShieldCheck size={16} />}>
            Permissions
          </Tabs.Tab>
          <Tabs.Tab value="backend" leftSection={<IconActivity size={16} />}>
            Backend Feed
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="events">
          <EventBusPanel />
        </Tabs.Panel>
        <Tabs.Panel value="api">
          <ApiActivityPanel />
        </Tabs.Panel>
        <Tabs.Panel value="registry">
          <RegistryPanel />
        </Tabs.Panel>
        <Tabs.Panel value="permissions">
          <PermissionsPanel />
        </Tabs.Panel>
        <Tabs.Panel value="backend">
          <BackendActivityPanel />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
