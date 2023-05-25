<script setup lang="ts">
// https://tailwindui.com/components/application-ui/overlays/modals
defineProps<{
  open: boolean
}>()
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="ease-out duration-300"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-lg"
          >
            <slot> </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
