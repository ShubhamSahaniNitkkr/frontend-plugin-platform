import { MantineProvider as Mantine, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useSelector } from 'react-redux';
import type { ReactNode } from 'react';
import type { RootState } from '../store';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../styles/global.css';

export function MantineProvider({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const primaryColor = useSelector((state: RootState) => state.theme.primaryColor);

  const theme = createTheme({
    primaryColor,
    fontFamily: 'Inter, system-ui, sans-serif',
    defaultRadius: 'md',
    headings: { fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '700' },
    components: {
      Card: { defaultProps: { shadow: 'sm', radius: 'lg', withBorder: true } },
      Button: { defaultProps: { radius: 'md' } },
      Paper: { defaultProps: { radius: 'lg' } },
    },
  });

  return (
    <Mantine theme={theme} forceColorScheme={mode} key={primaryColor}>
      <Notifications position="top-right" zIndex={1000} containerWidth={360} />
      {children}
    </Mantine>
  );
}
