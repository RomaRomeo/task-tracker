<script setup lang="ts">
import type { Task } from "~/types/task";
import { TASK_PRIORITY } from "~/constants/priority";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "edit", task: Task): void;
}>();

const priorityClass = computed(() => {
  const priorityClasses = {
    [TASK_PRIORITY.HIGH]: "bg-red-500 text-white",
    [TASK_PRIORITY.MEDIUM]: "bg-yellow-500 text-white",
    [TASK_PRIORITY.LOW]: "bg-green-500 text-white",
  };
  return `${
    priorityClasses[props.task.priority] || "bg-gray-300 text-black"
  } px-2 py-1 rounded-full text-xs`;
});

const editTask = () => emit("edit", props.task);

const onDragStart = (event: DragEvent) => {
  const id = props.task.id?.toString();
  if (id) {
    event.dataTransfer?.setData("taskId", id);
  } else {
    console.error("Task ID is missing.");
  }
};
</script>

<template>
  <div
    class="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
    :draggable="true"
    @dragstart="onDragStart"
    @click="editTask"
  >
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">{{ task.title }}</h3>
      <p class="text-gray-600 mt-1">{{ task.description }}</p>
    </div>
    <div class="p-4 flex justify-between items-center">
      <span :class="priorityClass">{{ task.priority }}</span>
      <span class="text-blue-500 font-semibold">User #: {{ task.assignees }}</span>
    </div>
  </div>
</template>
