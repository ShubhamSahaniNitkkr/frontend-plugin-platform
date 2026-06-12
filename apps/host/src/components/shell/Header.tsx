import { memo, useCallback } from 'react';
import { ActionIcon, Group, Text, Title } from '@mantine/core';
import { IconMoon, IconSun, IconLogout } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';
import { clearUser } from '../../store/slices/userSlice';
import { useLogoutMutation } from '../../store/api/authApi';
import { PluginSlot } from '../plugin-runtime/PluginSlot';
import { useTranslation } from '../../hooks/useTranslation';

export const Header = memo(function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const user = useSelector((state: RootState) => state.user);
  const [logout] = useLogoutMutation();
  const { t } = useTranslation();

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
    } catch {
      // proceed with local logout
    }
    dispatch(clearUser());
    window.location.href = '/login';
  }, [dispatch, logout]);

  return (
    <Group justify="space-between" h="100%" style={{ flex: 1 }} wrap="nowrap" gap="sm">
      <Title order={4} fw={700} visibleFrom="xs">
        {t('app.title')}
      </Title>
      <Group gap="xs" wrap="nowrap">
        <PluginSlot id="header.actions" />
        {user.name && (
          <Text size="sm" c="dimmed" visibleFrom="sm" truncate maw={120}>
            {user.name}
          </Text>
        )}
        <ActionIcon variant="subtle" onClick={handleToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
        </ActionIcon>
        <ActionIcon variant="subtle" onClick={handleLogout} aria-label="Logout">
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    </Group>
  );
});
