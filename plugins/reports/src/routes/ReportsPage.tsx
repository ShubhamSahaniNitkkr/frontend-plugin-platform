import { useState, useCallback } from 'react';
import {
  Button,
  Card,
  Group,
  Select,
  Stack,
  Text,
  Title,
  Table,
} from '@mantine/core';
import { IconDownload, IconFileAnalytics } from '@tabler/icons-react';
import { useEmitEvent, usePluginPermissions } from '@fpp/plugin-sdk';

const API_URL =
  import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

function getToken() {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem('fpp_token')
    : null;
}

interface Report {
  id: string;
  type: string;
  title: string;
  createdAt: string;
}

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [reportType, setReportType] = useState<string | null>('tasks');
  const [loading, setLoading] = useState(false);

  const { can } = usePluginPermissions();
  const emit = useEmitEvent();
  const canGenerate = can('reports:generate');
  const canExport = can('reports:export');

  const loadReports = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`${API_URL}/reports`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setReports(data.data ?? []);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!canGenerate || !reportType) return;
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type: reportType }),
      });
      const data = await res.json();
      emit('report.generated', {
        reportId: data.data.id,
        type: data.data.type,
        title: data.data.title,
      });
      await loadReports();
    } finally {
      setLoading(false);
    }
  }, [canGenerate, reportType, loadReports]);

  const handleExport = useCallback(
    async (reportId: string) => {
      if (!canExport) return;
      const token = getToken();
      const res = await fetch(
        `${API_URL}/reports/${reportId}/export?format=json`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${reportId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    [canExport]
  );

  return (
    <Stack gap="lg">
      <Title order={2}>Reports</Title>

      {canGenerate && (
        <Card withBorder padding="md">
          <Group>
            <Select
              label="Report Type"
              value={reportType}
              onChange={setReportType}
              data={[
                { value: 'tasks', label: 'Tasks Report' },
                { value: 'activity', label: 'Activity Report' },
                { value: 'usage', label: 'Usage Report' },
              ]}
              w={200}
            />
            <Button
              leftSection={<IconFileAnalytics size={16} />}
              onClick={() => void handleGenerate()}
              loading={loading}
              mt={24}
            >
              Generate Report
            </Button>
            <Button variant="subtle" onClick={() => void loadReports()} mt={24}>
              Refresh List
            </Button>
          </Group>
        </Card>
      )}

      <Card withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {reports.map((report) => (
              <Table.Tr key={report.id}>
                <Table.Td>{report.title}</Table.Td>
                <Table.Td>{report.type}</Table.Td>
                <Table.Td>
                  {new Date(report.createdAt).toLocaleString()}
                </Table.Td>
                <Table.Td>
                  {canExport && (
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconDownload size={14} />}
                      onClick={() => void handleExport(report.id)}
                    >
                      Export
                    </Button>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        {reports.length === 0 && (
          <Text c="dimmed" ta="center" py="xl">
            No reports generated yet.
          </Text>
        )}
      </Card>
    </Stack>
  );
}
