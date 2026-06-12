import type { ReactNode } from 'react';
import { Paper, Stack, Text, Group, Badge } from '@mantine/core';

interface GlassCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function GlassCard({
  title,
  subtitle,
  badge,
  badgeColor = 'indigo',
  children,
  action,
}: GlassCardProps) {
  return (
    <Paper className="fpp-glass-panel" p="lg" radius="lg">
      <Group justify="space-between" align="flex-start" mb="md" wrap="wrap" gap="sm">
        <Stack gap={2}>
          <Group gap="xs">
            <Text fw={700} size="lg" className="fpp-panel-title">
              {title}
            </Text>
            {badge && (
              <Badge variant="light" color={badgeColor} size="sm">
                {badge}
              </Badge>
            )}
          </Group>
          {subtitle && (
            <Text size="sm" c="dimmed">
              {subtitle}
            </Text>
          )}
        </Stack>
        {action}
      </Group>
      {children}
    </Paper>
  );
}
