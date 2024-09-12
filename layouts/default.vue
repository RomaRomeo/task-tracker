<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md border-b border-gray-200">
      <div class="container mx-auto flex items-center justify-between p-6">
        <div class="flex items-center space-x-4">
          <img
            src="https://seeklogo.com/images/L/lion-logo-BAB27BEF71-seeklogo.com.png"
            alt="Task Tracker Logo"
            class="w-12 h-12 rounded-full shadow-md"
          />
          <NuxtLink
            to="/"
            class="text-2xl font-bold text-gray-900 hover:text-gray-700"
          >
            Task Tracker
          </NuxtLink>
        </div>

        <nav class="flex space-x-6">
          <NuxtLink to="/" class="text-gray-900 hover:text-gray-700">Home</NuxtLink>
          <NuxtLink to="/board" class="text-gray-900 hover:text-gray-700">Board</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 p-6">
      <NuxtPage />
    </main>

    <footer class="bg-gray-100 border-t border-gray-200">
      <div class="container mx-auto text-center py-4">
        <p class="text-gray-700">&copy; 2024 Task Tracker. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
