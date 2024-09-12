export interface Task {
  id?: number;
  title?: string;
  description?: string;
  assignees?: number;
  status: TaskStatuses;
  priority: "low" | "medium" | "high";
}

export type TaskStatuses = "todo" | "progress" | "done";

export interface ApiTask {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
