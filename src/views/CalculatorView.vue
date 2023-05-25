<script setup lang="ts">
import CalculatorKeyboard from '@/components/CalculatorKeyboard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useCalculatorStore, type CalculatorKeyType } from '@/stores/calculator'
import { useRecordsStore } from '@/stores/records'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const KeyboardKeyToCalculatorKey: Record<string, CalculatorKeyType> = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0',
  '.': '.',
  '-': '-',
  '+': '+',
  '*': '\u0078',
  '/': '÷',
  Escape: 'c',
  '=': '=',
  Enter: '=',
  Backspace: '⌫'
} as const

const keyboardRef = ref<InstanceType<typeof CalculatorKeyboard> | null>(null)
const calculatorStore = useCalculatorStore()
const recordsStore = useRecordsStore()
const { display, loading, operation } = storeToRefs(calculatorStore)
const { latestResult } = storeToRefs(recordsStore)

const clickCalculatorButton = (e: KeyboardEvent) => {
  const calculatorKey = KeyboardKeyToCalculatorKey[e.key]
  if (calculatorKey !== undefined) {
    keyboardRef.value?.clickButton(calculatorKey)
  }
}
</script>

<template>
  <main>
    <div class="max-w-md m-6" @keyup="clickCalculatorButton" tabindex="0">
      <div class="bg-white shadow-md rounded p-4">
        <div class="flex h-30">
          <p class="text-lg">{{ latestResult }} &nbsp;</p>
          <p class="text-lg">{{ operation?.type }} &nbsp;</p>
          <LoadingSpinner v-if="loading" />
        </div>
        <input
          class="shadow focus:ring text-right ppearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg font-mono"
          id="display"
          type="text"
          :value="display"
          readonly
        />
        <CalculatorKeyboard
          :disabled="loading"
          ref="keyboardRef"
          @new-key="calculatorStore.append"
        />
      </div>
    </div>
  </main>
</template>
