import { memo, useCallback } from 'react';
import {
  Card,
  SimpleGrid,
  Text,
  Title,
  ThemeIcon,
  Stack,
  UnstyledButton,
  Group,
} from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useEmitEvent } from '@fpp/plugin-sdk';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export const LanguagePanel = memo(function LanguagePanel() {
  const emit = useEmitEvent();

  const select = useCallback(
    (locale: string) => {
      emit('locale.changed', { locale });
    },
    [emit]
  );

  return (
    <Card padding="lg" radius="lg" withBorder>
      <Stack gap="md">
        <Group gap="sm">
          <ThemeIcon size="lg" radius="md" variant="light" color="violet">
            <IconLanguage size={20} />
          </ThemeIcon>
          <div>
            <Title order={4}>Language Pack</Title>
            <Text size="xs" c="dimmed">
              Changes the entire host UI via event bus
            </Text>
          </div>
        </Group>
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
          {LANGUAGES.map((lang) => (
            <UnstyledButton
              key={lang.code}
              onClick={() => select(lang.code)}
              p="sm"
              style={{
                borderRadius: 12,
                border: '1px solid var(--mantine-color-gray-3)',
                textAlign: 'center',
              }}
            >
              <Text size="xl">{lang.flag}</Text>
              <Text size="sm" fw={500}>
                {lang.label}
              </Text>
            </UnstyledButton>
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  );
});
