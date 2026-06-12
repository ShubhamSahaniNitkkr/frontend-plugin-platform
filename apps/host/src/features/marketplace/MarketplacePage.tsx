import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Badge,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Paper,
  Button,
  SegmentedControl,
} from '@mantine/core';
import { IconSearch, IconCpu, IconPackage } from '@tabler/icons-react';
import { PluginCard } from '../../components/marketplace/PluginCard';
import { PlatformExplainer } from '../../components/marketplace/PlatformExplainer';
import { LoadingFallback } from '../../components/common/LoadingFallback';
import { PluginSlot } from '../../components/plugin-runtime/PluginSlot';
import {
  useInstallPluginMutation,
  useUninstallPluginMutation,
  useEnablePluginMutation,
  useDisablePluginMutation,
} from '../../store/api/pluginRegistryApi';
import { useGetMarketplacePluginsQuery } from '../../store/api/marketplaceApi';
import { usePlatform } from '../../platform/di/PlatformContext';
import { buildEnableOptions, toManifest } from '../../platform/plugin-manager/pluginEnableHelpers';
import { useTranslation } from '../../hooks/useTranslation';
import type { AppDispatch } from '../../store';

type FilterMode = 'all' | 'installed' | 'available';

export function MarketplacePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, refetch } = useGetMarketplacePluginsQuery();
  const [install, { isLoading: installing }] = useInstallPluginMutation();
  const [uninstall, { isLoading: uninstalling }] = useUninstallPluginMutation();
  const [enable] = useEnablePluginMutation();
  const [disable] = useDisablePluginMutation();
  const { pluginManager } = usePlatform();
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');

  const stats = useMemo(() => {
    const plugins = data?.data ?? [];
    return {
      total: plugins.length,
      installed: plugins.filter((p) => p.installed).length,
      active: plugins.filter((p) => p.enabled).length,
    };
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (data?.data ?? []).filter((p) => {
      if (filter === 'installed' && !p.installed) return false;
      if (filter === 'available' && p.installed) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [data, search, filter]);

  const hasActiveWidgets = stats.active > 0;

  const handleInstall = useCallback(
    async (id: string) => {
      const result = await install({ id }).unwrap();
      await enable(id).unwrap();
      const plugin = result.data;
      await pluginManager.enablePlugin(
        buildEnableOptions(plugin, pluginManager, dispatch)
      );
      await refetch();
      window.dispatchEvent(new CustomEvent('fpp:navigate'));
    },
    [install, enable, pluginManager, refetch, dispatch]
  );

  const handleUninstall = useCallback(
    async (id: string) => {
      await disable(id).unwrap().catch(() => {});
      await pluginManager.destroyPlugin(
        id,
        toManifest({ id, name: id, description: '', author: '', permissions: [] })
      );
      await uninstall(id).unwrap();
      await refetch();
      window.dispatchEvent(new CustomEvent('fpp:navigate'));
    },
    [uninstall, disable, pluginManager, refetch]
  );

  const handleEnable = useCallback(
    async (id: string) => {
      const plugin = data?.data.find((p) => p.id === id);
      if (!plugin) return;
      await enable(id).unwrap();
      await pluginManager.enablePlugin(
        buildEnableOptions(
          { ...plugin, version: plugin.latestVersion, entry: `/plugins/${plugin.id}/index.js` },
          pluginManager,
          dispatch
        )
      );
      await refetch();
      window.dispatchEvent(new CustomEvent('fpp:navigate'));
    },
    [data, enable, pluginManager, refetch, dispatch]
  );

  const handleDisable = useCallback(
    async (id: string) => {
      await pluginManager.disablePlugin(
        id,
        toManifest({ id, name: id, description: '', author: '', permissions: [] })
      );
      await disable(id).unwrap();
      await refetch();
      window.dispatchEvent(new CustomEvent('fpp:navigate'));
    },
    [disable, pluginManager, refetch]
  );

  const goToConsole = () => {
    window.history.pushState({}, '', '/plugins/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.dispatchEvent(new CustomEvent('fpp:navigate'));
  };

  if (isLoading) return <LoadingFallback message="Loading marketplace..." />;

  return (
    <div className="fpp-marketplace-page">
      <div className="fpp-marketplace-bg" aria-hidden>
        <span className="fpp-orb fpp-orb-1" />
        <span className="fpp-orb fpp-orb-2" />
        <span className="fpp-orb fpp-orb-3" />
        <span className="fpp-orb fpp-orb-4" />
      </div>

      <Stack gap="lg" className="fpp-marketplace-content">
        <Group justify="space-between" align="flex-end" wrap="wrap" gap="md">
          <Stack gap={4}>
            <Title order={2} className="fpp-page-title">
              {t('marketplace.title')}
            </Title>
            <Text c="dimmed" size="sm">
              {t('marketplace.subtitle')}
            </Text>
          </Stack>
          <Group gap="xs">
            <Badge variant="light" color="indigo" size="lg" leftSection={<IconPackage size={14} />}>
              {stats.total} extensions
            </Badge>
            <Badge variant="light" color="green" size="lg">
              {stats.active} active
            </Badge>
            <Button
              variant="subtle"
              color="gray"
              size="compact-sm"
              leftSection={<IconCpu size={16} />}
              onClick={goToConsole}
            >
              {t('nav.pluginDashboard')}
            </Button>
          </Group>
        </Group>

        <Group wrap="wrap" gap="sm">
          <TextInput
            placeholder="Search extensions..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ flex: 1, minWidth: 200, maxWidth: 360 }}
            radius="md"
          />
          <SegmentedControl
            value={filter}
            onChange={(v) => setFilter(v as FilterMode)}
            data={[
              { label: 'All', value: 'all' },
              { label: 'Installed', value: 'installed' },
              { label: 'Available', value: 'available' },
            ]}
          />
        </Group>

        {filtered.length === 0 ? (
          <Paper p="xl" radius="lg" className="fpp-glass-panel" ta="center">
            <Text c="dimmed">No extensions match your search.</Text>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }} spacing="md">
            {filtered.map((plugin) => (
              <PluginCard
                key={plugin.id}
                plugin={plugin}
                onInstall={handleInstall}
                onUninstall={handleUninstall}
                onEnable={handleEnable}
                onDisable={handleDisable}
                loading={installing || uninstalling}
              />
            ))}
          </SimpleGrid>
        )}

        {hasActiveWidgets && (
          <Paper p="lg" radius="lg" className="fpp-glass-panel">
            <Text fw={600} mb="md" size="sm" tt="uppercase" c="dimmed">
              Active extension controls
            </Text>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <PluginSlot id="dashboard.main" />
              <PluginSlot id="dashboard.sidebar" />
            </SimpleGrid>
          </Paper>
        )}

        <PlatformExplainer />
      </Stack>
    </div>
  );
}
