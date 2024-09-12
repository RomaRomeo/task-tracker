<script setup lang="ts">
import { useTaskStore } from "~/store/index";
import type { Task } from "~/types/task";

const props = defineProps<{
  item: Task["status"];
  filteredTasks: Task[];
}>();

const emit = defineEmits<{
  (event: "editTask", task: Task): void;
}>();

const taskStore = useTaskStore();

const tasks = computed(() =>
  props.filteredTasks.filter((task) => task.status === props.item)
);

const editTask = (task: Task) => emit("editTask", task);

const onDrop = (event: DragEvent) => {
  const taskId = event.dataTransfer?.getData("taskId");
  if (taskId) {
    const task = taskStore.getTaskById(Number(taskId));
    if (task) {
      task.status = props.item;
      taskStore.updateTask(task);
    }
  }
};
</script>

<template>
  <div
    class="flex flex-col w-80 p-4 bg-gray-100 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl"
    @dragover.prevent
    @drop="onDrop"
  >
    <h2 class="text-xl font-semibold mb-4">{{ item }}</h2>
    <div class="space-y-4">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="editTask"
      />
    </div>
  </div>
</template>
