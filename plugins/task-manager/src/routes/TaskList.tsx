import { useReducer, useEffect, useCallback, useMemo, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useEmitEvent, usePluginPermissions, usePluginNotify } from '@fpp/plugin-sdk';
import type { Task } from '@fpp/shared';
import { taskReducer, initialTaskState, type TaskState } from '../state/taskReducer';

const API_URL = import.meta.env.PUBLIC_API_URL ?? '/api/v1';

function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('fpp_token');
}

async function apiFetch(path: string, options?: RequestInit) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function TaskList() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [newTitle, setNewTitle] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const { can } = usePluginPermissions();
  const emit = useEmitEvent();
  const notify = usePluginNotify();
  const canWrite = can('tasks:write');
  const canDelete = can('tasks:delete');

  const loadTasks = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const result = await apiFetch('/tasks');
      dispatch({ type: 'SET_TASKS', tasks: result.data });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        error: error instanceof Error ? error.message : 'Failed to load',
      });
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const handleCreate = useCallback(async () => {
    if (!newTitle.trim() || !canWrite) return;
    try {
      const result = await apiFetch('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title: newTitle }),
      });
      dispatch({ type: 'ADD_TASK', task: result.data });
      emit('task.created', {
        taskId: result.data.id,
        title: result.data.title,
        userId: result.data.userId,
      });
      notify('Task created successfully', 'success', 'Tasks');
      setNewTitle('');
      titleRef.current?.focus();
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        error: error instanceof Error ? error.message : 'Create failed',
      });
    }
  }, [newTitle, canWrite]);

  const handleDelete = useCallback(
    async (taskId: string) => {
      if (!canDelete) return;
      try {
        await apiFetch(`/tasks/${taskId}`, { method: 'DELETE' });
        dispatch({ type: 'REMOVE_TASK', taskId });
        emit('task.deleted', { taskId });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          error: error instanceof Error ? error.message : 'Delete failed',
        });
      }
    },
    [canDelete]
  );

  const handleStatusChange = useCallback(
    async (task: Task, status: Task['status']) => {
      if (!canWrite) return;
      try {
        const result = await apiFetch(`/tasks/${task.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        });
        dispatch({ type: 'UPDATE_TASK', task: result.data });
        emit('task.updated', {
          taskId: task.id,
          changes: { status },
        });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          error: error instanceof Error ? error.message : 'Update failed',
        });
      }
    },
    [canWrite]
  );

  const filteredTasks = useMemo(() => {
    if (state.filter === 'all') return state.tasks;
    return state.tasks.filter((t) => t.status === state.filter);
  }, [state.tasks, state.filter]);

  const statusColor = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return 'green';
      case 'in_progress':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Stack gap="lg">
      <Title order={2}>Tasks</Title>

      {state.error && (
        <Text c="red" size="sm">
          {state.error}
        </Text>
      )}

      {canWrite && (
        <Group>
          <TextInput
            ref={titleRef}
            placeholder="New task title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && void handleCreate()}
            style={{ flex: 1 }}
          />
          <Button leftSection={<IconPlus size={16} />} onClick={() => void handleCreate()}>
            Add Task
          </Button>
        </Group>
      )}

      <Select
        label="Filter"
        value={state.filter}
        onChange={(v) =>
          dispatch({ type: 'SET_FILTER', filter: (v as TaskState['filter']) ?? 'all' })
        }
        data={[
          { value: 'all', label: 'All' },
          { value: 'todo', label: 'To Do' },
          { value: 'in_progress', label: 'In Progress' },
          { value: 'done', label: 'Done' },
        ]}
        w={200}
      />

      <Stack gap="sm">
        {filteredTasks.map((task) => (
          <Card key={task.id} withBorder padding="md">
            <Group justify="space-between">
              <Stack gap={4}>
                <Text fw={500}>{task.title}</Text>
                <Badge size="sm" color={statusColor(task.status)} variant="light">
                  {task.status.replace('_', ' ')}
                </Badge>
              </Stack>
              <Group>
                {canWrite && (
                  <Select
                    size="xs"
                    value={task.status}
                    onChange={(v) =>
                      v && void handleStatusChange(task, v as Task['status'])
                    }
                    data={[
                      { value: 'todo', label: 'To Do' },
                      { value: 'in_progress', label: 'In Progress' },
                      { value: 'done', label: 'Done' },
                    ]}
                    w={130}
                  />
                )}
                {canDelete && (
                  <Button
                    size="xs"
                    color="red"
                    variant="subtle"
                    onClick={() => void handleDelete(task.id)}
                  >
                    <IconTrash size={14} />
                  </Button>
                )}
              </Group>
            </Group>
          </Card>
        ))}
        {filteredTasks.length === 0 && !state.loading && (
          <Text c="dimmed" ta="center" py="xl">
            No tasks yet. Create one above.
          </Text>
        )}
      </Stack>
    </Stack>
  );
}
