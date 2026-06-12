import { memo, useCallback } from 'react';
import { Menu, ActionIcon, Text, Group } from '@mantine/core';
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

export const LanguageSelector = memo(function LanguageSelector() {
  const emit = useEmitEvent();

  const select = useCallback(
    (locale: string) => {
      emit('locale.changed', { locale });
    },
    [emit]
  );

  return (
    <Menu position="bottom-end" width={200}>
      <Menu.Target>
        <ActionIcon variant="subtle" aria-label="Change language">
          <IconLanguage size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>App language</Menu.Label>
        {LANGUAGES.map((lang) => (
          <Menu.Item key={lang.code} onClick={() => select(lang.code)}>
            <Group gap="sm">
              <Text>{lang.flag}</Text>
              <Text size="sm">{lang.label}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
});
