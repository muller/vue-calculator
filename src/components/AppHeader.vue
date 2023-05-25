<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-gray-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Calculator</span>
    </div>
    <div class="flex-grow flex items-center w-auto">
      <div class="text-sm flex-grow">
        <a class="inline-block mt-0 text-gray-200 hover:text-white mr-4">
          <RouterLink to="/calculator">Calculator</RouterLink>
        </a>
        <a class="inline-block mt-0 text-gray-200 hover:text-white mr-4">
          <RouterLink to="/records">Records</RouterLink>
        </a>
      </div>
      <div>
        <a
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white m-0"
          >Login</a
        >
      </div>
    </div>
  </nav>
</template>
