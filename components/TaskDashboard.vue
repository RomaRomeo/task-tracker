<script setup lang="ts">
import { useTaskStore } from "~/store/index";
import type { Task } from "~/types/task";

const columns = ["todo", "progress", "done"] as Task["status"][];
const showForm = ref(false);
const currentTask = ref<Task | null>(null);
const selectedUserId = ref<number | string>("all");
const filteredTasks = ref<Task[]>([]);

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.tasks);
const users = computed(() =>
  Array.from(
    new Set(tasks.value.map((task) => Number(task.assignees)).filter(Boolean))
  )
);

const filterTasksByAssignee = (assigneeId: number | string) =>
  assigneeId === "all"
    ? tasks.value
    : tasks.value.filter((task) => Number(task.assignees) === assigneeId);

const openTaskForm = (task: Task | null) => {
  currentTask.value = task;
  showForm.value = true;
};

const hideTaskForm = () => (showForm.value = false);

const saveTask = (task: Task) => {
  if (task.id) {
    taskStore.updateTask(task);
  } else {
    taskStore.addTask(task);
  }
  hideTaskForm();
};

watch(
  [tasks, selectedUserId],
  ([_, newUserId]) => {
    filteredTasks.value = filterTasksByAssignee(newUserId);
  },
  { deep: true, immediate: true }
);

onMounted(() => taskStore.fetchTasks());
</script>

<template>
  <div class="flex flex-col p-6 bg-white rounded-lg shadow-xl">
    <div class="flex items-center justify-between space-x-4">
      <button
        @click="openTaskForm(null)"
        class="flex items-center justify-center bg-blue-500 text-white text-base font-medium rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105 px-6 py-3"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Task
      </button>

      <div class="flex items-center space-x-2">
        <span class="text-gray-800 text-base font-medium">Filter by Assignee:</span>
        <div class="relative">
          <select
            id="user-select"
            v-model="selectedUserId"
            class="block w-40 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base px-3 py-2 appearance-none"
          >
            <option value="all">All Users</option>
            <option v-for="userId in users" :key="userId" :value="userId">
              {{ userId }}
            </option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="flex overflow-x-auto gap-8 mt-8">
      <Column
        v-for="column in columns"
        :key="column"
        :item="column"
        :filtered-tasks="filteredTasks"
        @editTask="openTaskForm"
      />
    </div>

    <TaskForm
      v-if="showForm"
      :task="currentTask"
      @close="hideTaskForm"
      @save="saveTask"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    />
  </div>
</template>
