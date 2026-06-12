import { useEffect, useCallback } from 'react';
import { AppShell as MantineAppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [opened, { toggle, close }] = useDisclosure();

  const handleNavigate = useCallback(() => {
    close();
  }, [close]);

  useEffect(() => {
    window.addEventListener('fpp:navigate', handleNavigate);
    window.addEventListener('popstate', handleNavigate);
    return () => {
      window.removeEventListener('fpp:navigate', handleNavigate);
      window.removeEventListener('popstate', handleNavigate);
    };
  }, [handleNavigate]);

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding={{ base: 'sm', sm: 'md', lg: 'lg' }}
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" aria-label="Menu" />
          <Header />
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Navbar p="md">
        <Navigation onNavigate={close} />
      </MantineAppShell.Navbar>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
