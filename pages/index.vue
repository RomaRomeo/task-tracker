<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <div class="text-center mb-8">
      <img
        src="https://seeklogo.com/images/L/lion-logo-BAB27BEF71-seeklogo.com.png"
        alt="Task Tracker Logo"
        class="w-24 h-24 mb-4 mx-auto rounded-full shadow-lg"
      />
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
        Welcome to the Task Tracker!
      </h1>
      <p class="text-lg text-gray-700 mb-6">
        Organize your tasks efficiently and stay on top of your projects.
      </p>
    </div>

    <NuxtLink
      to="/board"
      class="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
    >
      Go to Board
    </NuxtLink>

    <div class="mt-8 text-center">
      <p class="text-gray-600">
        Manage tasks with ease and enhance your productivity.
      </p>
    </div>
  </div>
</template>
