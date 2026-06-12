import { Badge, Group, ScrollArea, Timeline, Text } from '@mantine/core';
import { useGetActivityFeedQuery } from '../../store/api/telemetryApi';
import { GlassCard } from './GlassCard';
import { LiveIndicator } from './LiveIndicator';
import { LoadingFallback } from '../common/LoadingFallback';

const TYPE_COLORS: Record<string, string> = {
  plugin: 'violet',
  task: 'teal',
  report: 'cyan',
  system: 'gray',
  error: 'red',
};

export function BackendActivityPanel() {
  const { data, isLoading, isFetching } = useGetActivityFeedQuery(undefined, {
    pollingInterval: 8000,
  });

  const feed = data?.data ?? [];

  return (
    <GlassCard
      title="Backend Activity Feed"
      subtitle="SQLite telemetry_events + activity_feed — persisted server-side"
      badge={`${feed.length} entries`}
      badgeColor="grape"
      action={<LiveIndicator label={isFetching ? 'Syncing' : 'SQLite'} />}
    >
      {isLoading ? (
        <LoadingFallback message="Loading activity feed..." />
      ) : feed.length === 0 ? (
        <Text size="sm" c="dimmed" ta="center" py="xl">
          Server-side activity appears when plugins track events or write to the feed.
        </Text>
      ) : (
        <ScrollArea h={280} type="auto" offsetScrollbars>
          <Timeline active={feed.length} bulletSize={18} lineWidth={2}>
            {feed.map((item) => (
              <Timeline.Item
                key={item.id}
                title={
                  <Group gap="xs">
                    <Badge
                      size="xs"
                      variant="light"
                      color={TYPE_COLORS[item.type] ?? 'indigo'}
                    >
                      {item.type}
                    </Badge>
                    <Text size="sm">{item.message}</Text>
                  </Group>
                }
              >
                <Text size="xs" c="dimmed">
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </ScrollArea>
      )}
    </GlassCard>
  );
}
