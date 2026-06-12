import type { ReactNode } from 'react';
import { Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: Icon;
  color?: string;
  hint?: string;
  trend?: ReactNode;
}

export function StatCard({ label, value, icon: IconComp, color = 'indigo', hint, trend }: StatCardProps) {
  return (
    <Paper className="fpp-stat-card" p="lg" radius="lg">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap={4}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed" className="fpp-stat-label">
            {label}
          </Text>
          <Text className="fpp-stat-value" fw={700} lh={1.1}>
            {value}
          </Text>
          {hint && (
            <Text size="xs" c="dimmed">
              {hint}
            </Text>
          )}
          {trend}
        </Stack>
        <ThemeIcon size={44} radius="md" variant="light" color={color}>
          <IconComp size={22} stroke={1.5} />
        </ThemeIcon>
      </Group>
    </Paper>
  );
}
