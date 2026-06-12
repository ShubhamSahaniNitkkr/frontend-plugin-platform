import { memo, useCallback, useState } from 'react';
import { ActionIcon, Indicator, Menu, Text, Badge, Stack } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { usePluginEvent } from '@fpp/plugin-sdk';

interface FeedItem {
  id: string;
  message: string;
  type: string;
  time: string;
}

export const NotificationBell = memo(function NotificationBell() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [unread, setUnread] = useState(0);

  const push = useCallback((type: string, message: string) => {
    setItems((prev) =>
      [
        {
          id: `${Date.now()}-${Math.random()}`,
          type,
          message,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 20)
    );
    setUnread((n) => n + 1);
  }, []);

  usePluginEvent('task.created', useCallback(
    (p) => push('task', `New task: ${p.title}`),
    [push]
  ));
  usePluginEvent('task.updated', useCallback(
    (p) => push('task', `Task updated: ${p.taskId}`),
    [push]
  ));
  usePluginEvent('task.deleted', useCallback(
    (p) => push('task', `Task deleted: ${p.taskId}`),
    [push]
  ));
  usePluginEvent('report.generated', useCallback(
    (p) => push('report', `Report ready: ${p.type}`),
    [push]
  ));
  usePluginEvent('plugin.enabled', useCallback(
    (p) => push('plugin', `Plugin enabled: ${p.pluginId}`),
    [push]
  ));

  return (
    <Menu
      position="bottom-end"
      width={320}
      onOpen={() => setUnread(0)}
    >
      <Menu.Target>
        <Indicator inline label={unread > 0 ? unread : undefined} size={16} color="red" disabled={unread === 0}>
          <ActionIcon variant="subtle" aria-label="Notifications">
            <IconBell size={18} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Live event feed</Menu.Label>
        {items.length === 0 ? (
          <Text size="sm" c="dimmed" px="sm" py="xs">
            Create a task or generate a report to see events.
          </Text>
        ) : (
          <Stack gap={4} px="xs" pb="xs" mah={280} style={{ overflow: 'auto' }}>
            {items.map((item) => (
              <Menu.Item key={item.id}>
                <Stack gap={2}>
                  <Text size="sm">{item.message}</Text>
                  <Badge size="xs" variant="light">
                    {item.type} · {item.time}
                  </Badge>
                </Stack>
              </Menu.Item>
            ))}
          </Stack>
        )}
      </Menu.Dropdown>
    </Menu>
  );
});
