import { memo, useCallback } from 'react';
import {
  Card,
  SimpleGrid,
  Text,
  Title,
  Stack,
  UnstyledButton,
  ThemeIcon,
} from '@mantine/core';
import { IconPalette } from '@tabler/icons-react';
import { useEmitEvent } from '@fpp/plugin-sdk';

const PRESETS = [
  { id: 'indigo', label: 'Indigo', color: '#4f46e5' },
  { id: 'violet', label: 'Violet', color: '#7c3aed' },
  { id: 'cyan', label: 'Cyan', color: '#0891b2' },
  { id: 'teal', label: 'Teal', color: '#0d9488' },
  { id: 'green', label: 'Green', color: '#16a34a' },
  { id: 'orange', label: 'Orange', color: '#ea580c' },
  { id: 'red', label: 'Red', color: '#dc2626' },
  { id: 'pink', label: 'Pink', color: '#db2777' },
  { id: 'grape', label: 'Grape', color: '#9333ea' },
];

export const ThemePicker = memo(function ThemePicker() {
  const emit = useEmitEvent();

  const apply = useCallback(
    (primaryColor: string, label: string) => {
      emit('theme.preset', { primaryColor, label });
    },
    [emit]
  );

  return (
    <Card padding="lg" radius="lg" withBorder>
      <Stack gap="md">
        <Stack gap={4}>
          <ThemeIcon size="lg" radius="md" variant="light" color="pink">
            <IconPalette size={20} />
          </ThemeIcon>
          <Title order={4}>Theme Studio</Title>
          <Text size="xs" c="dimmed">
            Solid color presets — updates Mantine primary across the whole app
          </Text>
        </Stack>
        <SimpleGrid cols={{ base: 3, sm: 3 }} spacing="sm">
          {PRESETS.map((preset) => (
            <UnstyledButton
              key={preset.id}
              onClick={() => apply(preset.id, preset.label)}
              p="sm"
              style={{
                borderRadius: 12,
                border: '2px solid var(--mantine-color-gray-3)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: preset.color,
                  margin: '0 auto 8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              />
              <Text size="xs" fw={600}>
                {preset.label}
              </Text>
            </UnstyledButton>
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  );
});
