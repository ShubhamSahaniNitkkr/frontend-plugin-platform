import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  memo,
  type ReactNode,
} from 'react';
import { Card, ScrollArea, Stack, Text, Title, Badge, Group, ThemeIcon } from '@mantine/core';
import { IconActivity } from '@tabler/icons-react';
import { usePluginEvent, usePluginNotify } from '@fpp/plugin-sdk';

interface FeedItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

interface FeedState {
  items: FeedItem[];
}

type FeedAction =
  | { type: 'ADD'; item: FeedItem }
  | { type: 'CLEAR' };

function feedReducer(state: FeedState, action: FeedAction): FeedState {
  switch (action.type) {
    case 'ADD':
      return { items: [action.item, ...state.items].slice(0, 50) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const FeedContext = createContext<{
  items: FeedItem[];
  addItem: (type: string, message: string, toast?: boolean) => void;
} | null>(null);

function FeedProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(feedReducer, { items: [] });
  const notify = usePluginNotify();

  const addItem = useCallback(
    (type: string, message: string, toast = false) => {
      dispatch({
        type: 'ADD',
        item: {
          id: `${Date.now()}-${Math.random()}`,
          type,
          message,
          timestamp: new Date().toISOString(),
        },
      });
      if (toast) notify(message, 'info');
    },
    [notify]
  );

  usePluginEvent('task.created', useCallback(
    (p) => addItem('task', `Task created: ${p.title}`, true),
    [addItem]
  ));
  usePluginEvent('task.updated', useCallback(
    (p) => addItem('task', `Task updated: ${p.taskId}`),
    [addItem]
  ));
  usePluginEvent('task.deleted', useCallback(
    (p) => addItem('task', `Task deleted: ${p.taskId}`, true),
    [addItem]
  ));
  usePluginEvent('report.generated', useCallback(
    (p) => addItem('report', `Report generated: ${p.type}`, true),
    [addItem]
  ));
  usePluginEvent('user.loggedIn', useCallback(
    (p) => addItem('user', `User logged in: ${p.email}`),
    [addItem]
  ));

  return (
    <FeedContext.Provider value={{ items: state.items, addItem }}>
      {children}
    </FeedContext.Provider>
  );
}

function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error('useFeed must be used within FeedProvider');
  return ctx;
}

const FeedList = memo(function FeedList() {
  const { items } = useFeed();

  return (
    <ScrollArea h={280}>
      <Stack gap="xs">
        {items.map((item) => (
          <Card key={item.id} withBorder padding="sm" radius="md">
            <Group justify="space-between" wrap="nowrap">
              <Text size="sm" lineClamp={2}>
                {item.message}
              </Text>
              <Badge size="xs" variant="light">
                {item.type}
              </Badge>
            </Group>
            <Text size="xs" c="dimmed" mt={4}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </Card>
        ))}
        {items.length === 0 && (
          <Text c="dimmed" ta="center" py="md" size="sm">
            Install this plugin, then create a task — events appear here instantly.
          </Text>
        )}
      </Stack>
    </ScrollArea>
  );
});

export const ActivityFeedPanel = memo(function ActivityFeedPanel() {
  return (
    <FeedProvider>
      <Card withBorder padding="lg" radius="lg">
        <Stack gap="md">
          <Group gap="sm">
            <ThemeIcon variant="light" color="orange" size="lg" radius="md">
              <IconActivity size={20} />
            </ThemeIcon>
            <Title order={4}>Live Activity Feed</Title>
          </Group>
          <FeedList />
        </Stack>
      </Card>
    </FeedProvider>
  );
});
