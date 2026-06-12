import { useSyncExternalStore, useCallback } from 'react';
import { NavLink, Stack, Text, Divider } from '@mantine/core';
import {
  IconShoppingBag,
  IconCpu,
  IconChecklist,
  IconBell,
  IconFileAnalytics,
  IconPuzzle,
  IconLanguage,
  IconPalette,
  IconCalculator,
} from '@tabler/icons-react';
import { componentRegistry } from '../../platform/component-registry/ComponentRegistry';
import { usePluginMenuItems } from '../../hooks/usePluginSlot';
import { useTranslation } from '../../hooks/useTranslation';

const ICON_MAP: Record<string, typeof IconShoppingBag> = {
  checklist: IconChecklist,
  bell: IconBell,
  'file-analytics': IconFileAnalytics,
  language: IconLanguage,
  palette: IconPalette,
  calculator: IconCalculator,
};

function isMarketplacePath(path: string) {
  return path === '/' || path === '/marketplace' || path.startsWith('/marketplace/');
}

export function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pluginItems = usePluginMenuItems();
  const { t } = useTranslation();

  const currentPath = useSyncExternalStore(
    (cb) => {
      window.addEventListener('popstate', cb);
      window.addEventListener('fpp:navigate', cb);
      return () => {
        window.removeEventListener('popstate', cb);
        window.removeEventListener('fpp:navigate', cb);
      };
    },
    () => (typeof window !== 'undefined' ? window.location.pathname : '/'),
    () => '/'
  );

  const navigate = useCallback(
    (path: string) => {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.dispatchEvent(new CustomEvent('fpp:navigate'));
      onNavigate?.();
    },
    [onNavigate]
  );

  useSyncExternalStore(
    (cb) => componentRegistry.subscribe(cb),
    () => componentRegistry.getMenuItems().length,
    () => 0
  );

  const HOST_NAV = [
    { label: t('nav.marketplace'), path: '/', icon: IconShoppingBag, match: isMarketplacePath },
    {
      label: t('nav.pluginDashboard'),
      path: '/plugins/dashboard',
      icon: IconCpu,
      match: (p: string) => p === '/plugins/dashboard',
    },
  ];

  return (
    <Stack gap={6}>
      <Text className="fpp-nav-section">{t('nav.platform')}</Text>
      {HOST_NAV.map((item) => (
        <NavLink
          key={item.path}
          label={item.label}
          leftSection={<item.icon size={18} stroke={1.5} />}
          active={item.match(currentPath)}
          onClick={() => navigate(item.path)}
          variant="light"
          radius="md"
        />
      ))}

      {pluginItems.length > 0 && (
        <>
          <Divider my="xs" />
          <Text className="fpp-nav-section">{t('nav.installed')}</Text>
          {pluginItems.map((item) => {
            const Icon = item.icon ? ICON_MAP[item.icon] ?? IconPuzzle : IconPuzzle;
            return (
              <NavLink
                key={`${item.pluginId}-${item.path}`}
                label={item.label}
                leftSection={<Icon size={18} stroke={1.5} />}
                active={currentPath.startsWith(item.path)}
                onClick={() => navigate(item.path)}
                variant="light"
                radius="md"
              />
            );
          })}
        </>
      )}
    </Stack>
  );
}
