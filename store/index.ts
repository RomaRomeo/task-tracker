import { defineStore } from "pinia";
import { formatTask } from "~/utils/formatTask";
import type { Task } from "~/types/task";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async addTask(newTask: Task) {
      try {
        if (!newTask.assignees) {
          throw new Error("User ID is required to create a task.");
        }

        const response = await fetch("https://dummyjson.com/todos/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: newTask.title,
            completed: newTask.status === "done",
            userId: newTask.assignees,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Task added from server:", result);

        const formattedTask = formatTask(result);
        this.tasks.push({ id: formattedTask.id, ...newTask });
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        console.log(`Task with ID ${updatedTask.id} updated successfully.`);
      } else {
        console.warn(`Task with ID ${updatedTask.id} not found.`);
      }
    },
    getTaskById(id: number) {
      return this.tasks.find((task) => task.id === id);
    },
    tasksByStatus(status: string) {
      return this.tasks.filter((task) => task.status === status);
    },
    setTasks(tasks: Task[]) {
      this.tasks = tasks;
      console.log("Tasks have been set:", tasks);
    },
    async fetchTasks() {
      try {
        const response = await fetch("https://dummyjson.com/todos?limit=5");
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }
        const tasks = await response.json();
        const formattedTasks = tasks.todos.map(formatTask);
        this.setTasks(formattedTasks);
        console.log("Fetched tasks successfully:", formattedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    },
  },
});
