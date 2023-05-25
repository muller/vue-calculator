<script setup lang="ts">
import { ref } from 'vue'
import CalculatorButton from './CalculatorButton.vue'
import { KeysData, type CalculatorKeyType } from '@/stores/calculator'

const props = defineProps<{
  disabled: boolean
}>()

const HIGHLIGHT_TIMEOUT = 200

const data = ref([...KeysData])

const toggleButton = (key: string) => {
  data.value.forEach((k) => {
    if (k.label === key) k.active = !k.active
  })
}

const emit = defineEmits<{
  (e: 'newKey', key: CalculatorKeyType): void
}>()

const onKeyPress = (key: CalculatorKeyType) => {
  emit('newKey', key)
}

const clickButton = (key: CalculatorKeyType) => {
  if (props.disabled === false) {
    emit('newKey', key)
    toggleButton(key)
    setTimeout(() => toggleButton(key), HIGHLIGHT_TIMEOUT)
  }
}

defineExpose({ clickButton })
</script>

<template>
  <div class="grid grid-cols-4 gap-1 mt-5">
    <CalculatorButton
      v-for="{ label, active } in data"
      :key="label"
      :label="label"
      :active="active"
      :disabled="disabled"
      @keyPress="onKeyPress"
    />
  </div>
</template>
