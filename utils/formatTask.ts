import type { Task, ApiTask } from "~/types/task";

export function formatTask(apiTask: ApiTask): Task {
  return {
    id: apiTask.id,
    title: apiTask.todo,
    description: "",
    assignees: Number(apiTask.userId),
    status: apiTask.completed ? "done" : "todo",
    priority: "medium",
  };
}
