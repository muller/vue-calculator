<script setup lang="ts">
defineProps<{
  active: boolean
  disabled: boolean
  label: string
}>()

defineEmits(['keyPress'])
</script>

<template>
  <button
    @click.prevent="$emit('keyPress', label)"
    @keypress.prevent=""
    :class="{ 'bg-violet-700': active }"
    :disabled="disabled"
    class="bg-gray-500 m-1 active:bg-violet-700 disabled:bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
  >
    {{ label }}
  </button>
</template>
