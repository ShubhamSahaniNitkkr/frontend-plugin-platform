import { useSelector, useDispatch } from 'react-redux';
import {
  Badge,
  Button,
  Code,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { RootState } from '../../store';
import { clearEvents } from '../../store/slices/platformObservabilitySlice';
import { GlassCard } from './GlassCard';
import { LiveIndicator } from './LiveIndicator';
import { usePlatform } from '../../platform/di/PlatformContext';

const EVENT_COLORS: Record<string, string> = {
  task: 'teal',
  plugin: 'violet',
  user: 'blue',
  notification: 'orange',
  report: 'cyan',
  locale: 'grape',
  theme: 'pink',
};

function eventColor(event: string) {
  const prefix = event.split('.')[0] ?? 'default';
  return EVENT_COLORS[prefix] ?? 'gray';
}

export function EventBusPanel() {
  const dispatch = useDispatch();
  const events = useSelector((s: RootState) => s.platformObservability.events);
  const { eventBus } = usePlatform();

  const subscriptions = eventBus.getSubscriptionSummary();

  return (
    <GlassCard
      title="Event Bus"
      subtitle="Typed pub/sub with Zod validation & permission middleware"
      badge={`${events.length} events`}
      badgeColor="violet"
      action={
        <Group gap="xs">
          <LiveIndicator />
          <Button
            size="compact-xs"
            variant="subtle"
            color="gray"
            leftSection={<IconTrash size={14} />}
            onClick={() => dispatch(clearEvents())}
          >
            Clear
          </Button>
        </Group>
      }
    >
      <Stack gap="md">
        <Group gap="xs">
          <Badge variant="outline" size="sm">
            {eventBus.getSubscriptionCount()} active listeners
          </Badge>
          {subscriptions.slice(0, 6).map((s) => (
            <Badge key={s.event} variant="light" size="sm" color="indigo">
              {s.event} ×{s.count}
            </Badge>
          ))}
        </Group>

        <ScrollArea h={320} type="auto" offsetScrollbars className="fpp-console-scroll">
          {events.length === 0 ? (
            <Text size="sm" c="dimmed" ta="center" py="xl">
              Install plugins and interact — events appear here in real time.
            </Text>
          ) : (
            <Table verticalSpacing="xs" className="fpp-console-table">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>Event</Table.Th>
                  <Table.Th>Source</Table.Th>
                  <Table.Th>Payload</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {events.map((evt) => (
                  <Table.Tr key={evt.id} className="fpp-console-row">
                    <Table.Td>
                      <Text size="xs" c="dimmed" ff="monospace">
                        {new Date(evt.timestamp).toLocaleTimeString()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge size="sm" variant="light" color={eventColor(evt.event)}>
                        {evt.event}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Code className="fpp-code-inline">{evt.source}</Code>
                    </Table.Td>
                    <Table.Td>
                      <Code block className="fpp-code-block-sm">
                        {JSON.stringify(evt.payload, null, 0).slice(0, 120)}
                        {JSON.stringify(evt.payload).length > 120 ? '…' : ''}
                      </Code>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>
      </Stack>
    </GlassCard>
  );
}
