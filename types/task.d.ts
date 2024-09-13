export interface Task {
  id?: number;
  title?: string;
  description?: string;
  assignees?: number;
  status: "todo" | "progress" | "done";
  priority: "low" | "medium" | "high";
}

export interface ApiTask {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
