import { memo, useCallback } from 'react';
import type { MarketplacePlugin } from '@fpp/shared';
import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconDownload,
  IconPlayerPlay,
  IconPlayerPause,
  IconTrash,
  IconLanguage,
  IconPalette,
  IconCalculator,
  IconChecklist,
  IconBell,
  IconFileAnalytics,
  type Icon,
} from '@tabler/icons-react';

const PLUGIN_META: Record<
  string,
  { icon: Icon; gradient: { from: string; to: string }; tagline: string }
> = {
  'com.fpp.i18n': {
    icon: IconLanguage,
    gradient: { from: 'violet', to: 'grape' },
    tagline: '6 languages · full UI translation',
  },
  'com.fpp.themes': {
    icon: IconPalette,
    gradient: { from: 'pink', to: 'orange' },
    tagline: 'Solid color themes',
  },
  'com.fpp.calculator': {
    icon: IconCalculator,
    gradient: { from: 'cyan', to: 'blue' },
    tagline: 'Widget + full page',
  },
  'com.fpp.task-manager': {
    icon: IconChecklist,
    gradient: { from: 'teal', to: 'cyan' },
    tagline: 'Tasks with event bus',
  },
  'com.fpp.notifications': {
    icon: IconBell,
    gradient: { from: 'orange', to: 'red' },
    tagline: 'Bell, toasts & feed',
  },
  'com.fpp.reports': {
    icon: IconFileAnalytics,
    gradient: { from: 'blue', to: 'indigo' },
    tagline: 'Generate & export',
  },
};

interface PluginCardProps {
  plugin: MarketplacePlugin;
  onInstall: (id: string) => void;
  onUninstall: (id: string) => void;
  onEnable: (id: string) => void;
  onDisable: (id: string) => void;
  loading?: boolean;
}

export const PluginCard = memo(function PluginCard({
  plugin,
  onInstall,
  onUninstall,
  onEnable,
  onDisable,
  loading,
}: PluginCardProps) {
  const meta = PLUGIN_META[plugin.id] ?? {
    icon: IconDownload,
    gradient: { from: 'gray', to: 'dark' },
    tagline: plugin.description,
  };
  const IconComp = meta.icon;

  const handlePrimary = useCallback(() => {
    if (!plugin.installed) onInstall(plugin.id);
    else if (plugin.enabled) onDisable(plugin.id);
    else onEnable(plugin.id);
  }, [plugin, onInstall, onEnable, onDisable]);

  const primaryLabel = !plugin.installed
    ? 'Install'
    : plugin.enabled
      ? 'Disable'
      : 'Enable';

  return (
    <Card padding="md" radius="lg" className="fpp-store-card">
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
            <ThemeIcon size={44} radius="md" variant="gradient" gradient={meta.gradient}>
              <IconComp size={22} stroke={1.5} />
            </ThemeIcon>
            <div style={{ minWidth: 0 }}>
              <Title order={5} lineClamp={1}>
                {plugin.name}
              </Title>
              <Text size="xs" c="dimmed" lineClamp={1}>
                {meta.tagline}
              </Text>
            </div>
          </Group>
          {plugin.enabled && (
            <Badge size="xs" color="green" variant="dot">
              Active
            </Badge>
          )}
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2} lh={1.45}>
          {plugin.description}
        </Text>

        <Group gap={6}>
          <Badge size="xs" variant="outline" color="gray">
            {plugin.category}
          </Badge>
          <Badge size="xs" variant="outline" color="gray">
            v{plugin.latestVersion}
          </Badge>
        </Group>

        <Group justify="space-between" mt={4}>
          {plugin.installed ? (
            <Button
              size="compact-xs"
              variant="subtle"
              color="red"
              leftSection={<IconTrash size={14} />}
              onClick={() => onUninstall(plugin.id)}
              loading={loading}
            >
              Remove
            </Button>
          ) : (
            <span />
          )}
          <Button
            size="compact-sm"
            variant={plugin.enabled ? 'light' : 'filled'}
            color={plugin.enabled ? 'gray' : 'indigo'}
            leftSection={
              plugin.enabled ? <IconPlayerPause size={14} /> : <IconPlayerPlay size={14} />
            }
            onClick={handlePrimary}
            loading={loading}
          >
            {primaryLabel}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
});
