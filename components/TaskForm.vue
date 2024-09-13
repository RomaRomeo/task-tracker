<script setup lang="ts">
import { useTaskStore } from "~/store/index";
import type { Task } from "~/types/task";

const props = defineProps<{
  task: Task | null;
}>();

const emit = defineEmits<{
  (event: "close"): void;
  (event: "save", task: Task): void;
}>();

const taskStore = useTaskStore();
const columns = computed(() => taskStore.columns);
const priorities = computed(() => taskStore.tasksPriorities);

const form = ref<Task>({
  id: undefined,
  title: "",
  description: "",
  assignees: undefined,
  status: "todo",
  priority: "low",
});

const handleSubmit = () => emit("save", form.value);
const handleClose = () => emit("close");

watch(
  () => props.task,
  (task) => {
    form.value = task
      ? { ...task }
      : {
          title: "",
          description: "",
          assignees: undefined,
          status: "todo",
          priority: "low",
        };
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <h2 class="text-xl font-semibold mb-4">
        {{ task?.id ? "Edit Task" : "Add Task" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 text-sm font-medium">Title</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            placeholder="Enter task title"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 text-sm font-medium">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            rows="3"
            placeholder="Enter task description"
          />
        </div>
        <div class="mb-4">
          <label for="assignee" class="block text-gray-700 text-sm font-medium">Assignee (User ID)</label>
          <input
            id="assignee"
            v-model="form.assignees"
            type="number"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
            placeholder="Enter assignee number"
          />
        </div>
        <div class="mb-4">
          <label for="status" class="block text-gray-700 text-sm font-medium">Status</label>
          <select
            id="status"
            v-model="form.status"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          >
            <option v-for="opt in columns" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="priority" class="block text-gray-700 text-sm font-medium">Priority</label>
          <select
            id="priority"
            v-model="form.priority"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
          >
            <option v-for="opt in priorities" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
          </select>
        </div>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="handleClose"
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
