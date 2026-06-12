import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Button,
  Code,
  Group,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { RootState } from '../../store';
import { clearApiCalls } from '../../store/slices/platformObservabilitySlice';
import { GlassCard } from './GlassCard';
import { LiveIndicator } from './LiveIndicator';

import { API_URL } from '../../lib/apiUrl';

export function ApiActivityPanel() {
  const dispatch = useDispatch();
  const apiCalls = useSelector((s: RootState) => s.platformObservability.apiCalls);

  const pending = apiCalls.filter((c) => c.status === 'pending').length;
  const errors = apiCalls.filter((c) => c.status === 'error').length;

  return (
    <GlassCard
      title="API Layer"
      subtitle={`Express + SQLite backend · ${API_URL}`}
      badge={`${apiCalls.length} calls`}
      badgeColor="cyan"
      action={
        <Group gap="xs">
          <LiveIndicator label="RTK Query" />
          <Button
            size="compact-xs"
            variant="subtle"
            color="gray"
            leftSection={<IconTrash size={14} />}
            onClick={() => dispatch(clearApiCalls())}
          >
            Clear
          </Button>
        </Group>
      }
    >
      <Group gap="xs" mb="md">
        <Badge variant="light" color="yellow" size="sm">
          {pending} in-flight
        </Badge>
        <Badge variant="light" color="red" size="sm">
          {errors} errors
        </Badge>
        <Badge variant="outline" size="sm">
          JWT Bearer auth
        </Badge>
        <Badge variant="outline" size="sm">
          Zod validation
        </Badge>
      </Group>

      <ScrollArea h={320} type="auto" offsetScrollbars className="fpp-console-scroll">
        {apiCalls.length === 0 ? (
          <Text size="sm" c="dimmed" ta="center" py="xl">
            Every RTK Query request is logged here — navigate the app to see traffic.
          </Text>
        ) : (
          <Table verticalSpacing="xs" className="fpp-console-table">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Method</Table.Th>
                <Table.Th>Endpoint</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Time</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {apiCalls.map((call) => (
                <Table.Tr key={call.id} className="fpp-console-row">
                  <Table.Td>
                    <Badge
                      size="sm"
                      variant="filled"
                      color={
                        call.method === 'GET'
                          ? 'blue'
                          : call.method === 'POST'
                            ? 'green'
                            : call.method === 'PATCH'
                              ? 'orange'
                              : 'red'
                      }
                    >
                      {call.method}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Code className="fpp-code-inline">{call.url}</Code>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      size="sm"
                      variant="light"
                      color={
                        call.status === 'pending'
                          ? 'yellow'
                          : call.status === 'error'
                            ? 'red'
                            : 'green'
                      }
                    >
                      {call.status === 'pending'
                        ? '…'
                        : call.statusCode ?? call.status}
                    </Badge>
                    {call.error && (
                      <Text size="xs" c="red" mt={2}>
                        {call.error}
                      </Text>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed" ff="monospace">
                      {call.durationMs != null ? `${call.durationMs}ms` : '—'}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </ScrollArea>
    </GlassCard>
  );
}
