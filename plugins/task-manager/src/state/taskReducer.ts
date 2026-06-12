import type { Task } from '@fpp/shared';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'todo' | 'in_progress' | 'done';
}

export type TaskAction =
  | { type: 'SET_TASKS'; tasks: Task[] }
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'UPDATE_TASK'; task: Task }
  | { type: 'REMOVE_TASK'; taskId: string }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_FILTER'; filter: TaskState['filter'] };

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.tasks, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.task, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.task.id ? action.task : t
        ),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.taskId),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}
