import { Badge, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import {
  IconBrandVscode,
  IconDownload,
  IconPlug,
  IconShieldCheck,
  IconArrowsExchange,
} from '@tabler/icons-react';

const STEPS = [
  {
    icon: IconBrandVscode,
    title: 'Stable host shell',
    body: 'Like VS Code itself — the core app never changes. It only provides slots: sidebar, header, routes, and dashboard areas.',
  },
  {
    icon: IconDownload,
    title: 'Install from marketplace',
    body: 'Browse extensions here, click Install. The backend saves your choice; the host loads the plugin bundle at runtime.',
  },
  {
    icon: IconPlug,
    title: 'activate() registers UI',
    body: 'Each extension exports activate() — same idea as VS Code’s activate(). It registers menus, pages, and widgets into the host.',
  },
  {
    icon: IconArrowsExchange,
    title: 'Event bus connects them',
    body: 'Extensions talk through typed events (tasks, notifications, themes) — never importing each other directly.',
  },
];

export function PlatformExplainer() {
  return (
    <Paper p="xl" radius="lg" className="fpp-explainer">
      <Stack gap="lg">
        <Group gap="md" align="flex-start" wrap="wrap">
          <ThemeIcon size={48} radius="md" variant="light" color="indigo">
            <IconBrandVscode size={26} />
          </ThemeIcon>
          <Stack gap={6} style={{ flex: 1, minWidth: 240 }}>
            <Group gap="xs">
              <Title order={4}>What is this platform?</Title>
              <Badge variant="light" color="indigo" size="sm">
                VS Code–style
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" lh={1.65} maw={720}>
              This is a <strong>frontend extension platform</strong> — the same model as{' '}
              <strong>VS Code extensions</strong>, Chrome extensions, or Firefox add-ons. The host
              is a thin, stable shell. Everything you install from this marketplace is an
              independently versioned package that plugs in at runtime: new sidebar links, header
              controls, dashboard widgets, and full pages — without redeploying the host app.
            </Text>
          </Stack>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          {STEPS.map((step) => (
            <Stack key={step.title} gap="xs" className="fpp-explainer-step">
              <ThemeIcon size={36} radius="md" variant="light" color="violet">
                <step.icon size={18} />
              </ThemeIcon>
              <Text fw={600} size="sm">
                {step.title}
              </Text>
              <Text size="xs" c="dimmed" lh={1.55}>
                {step.body}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>

        <Group gap="xs" className="fpp-explainer-footer">
          <IconShieldCheck size={16} opacity={0.6} />
          <Text size="xs" c="dimmed">
            Each extension declares permissions in its manifest. The API and event bus enforce them —
            open <strong>Platform Console</strong> to see the full backend in action.
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
