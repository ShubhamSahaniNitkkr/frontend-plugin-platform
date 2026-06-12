import type { CreateTaskInput, UpdateTaskInput } from '@fpp/shared';
export declare function listTasks(userId: string): {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    userId: string;
    createdAt: string;
    updatedAt: string;
}[];
export declare function getTask(userId: string, taskId: string): {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    userId: string;
    createdAt: string;
    updatedAt: string;
} | null;
export declare function createTask(userId: string, input: CreateTaskInput): {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    userId: string;
    createdAt: string;
    updatedAt: string;
} | null;
export declare function updateTask(userId: string, taskId: string, input: UpdateTaskInput): {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    userId: string;
    createdAt: string;
    updatedAt: string;
} | null;
export declare function deleteTask(userId: string, taskId: string): boolean;
//# sourceMappingURL=task.service.d.ts.map