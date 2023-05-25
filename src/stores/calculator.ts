import type { Operation, OperationType } from '@/api'
import { defineStore, storeToRefs } from 'pinia'
import { readonly, ref } from 'vue'
import { useOperationsStore } from './operations'
import { useRecordsStore } from './records'

export const CalculatorKeys = [
  'c',
  'rand',
  '√',
  '⌫',
  '7',
  '8',
  '9',
  '÷',
  '4',
  '5',
  '6',
  '\u0078',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '=',
  '-'
] as const

export type CalculatorKeyType = (typeof CalculatorKeys)[number]

export type KeyData = {
  label: CalculatorKeyType
  active: boolean
}

export const KeysData: KeyData[] = CalculatorKeys.map((key) => ({
  label: key,
  active: false
}))

const CalculatorKeyToOperationType: Partial<Record<CalculatorKeyType, OperationType>> = {
  '-': 'subtraction',
  '\u0078': 'multiplication',
  '+': 'addition',
  '÷': 'division',
  '√': 'square_root',
  rand: 'random_string'
}

const removeLeadingZeroes = (display: string): string => display.replace(/(^0+)(.+)/, '$2')

const appendDigit = (calculatorKey: CalculatorKeyType, display: string) =>
  removeLeadingZeroes(display + calculatorKey)

const backspace = (display: string) =>
  display.slice(0, -1)

const appendDecimalSeparator = (display: string) => {
  const hasDecimalSeparator = display.includes('.')
  return hasDecimalSeparator ? display : display + '.'
}

const CLEAN_DISPLAY = ''

const updateDisplay = (calculatorKey: CalculatorKeyType, display: string) => {
  switch (calculatorKey) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return appendDigit(calculatorKey, display)
    case '.':
      return appendDecimalSeparator(display)
    case '⌫':
      return backspace(display)
    case 'c':
    case '=':
      return CLEAN_DISPLAY
    case '+':
    case '-':
    case '\u0078':
    case '÷':
    case '√':
    case 'rand':
      return display
  }
}

export const useCalculatorStore = defineStore('calculator', () => {
  const loading = ref(false)
  const display = ref('')
  const operation = ref<Operation>()
  const operationsStore = useOperationsStore()
  const recordsStore = useRecordsStore()
  const { operations } = storeToRefs(operationsStore)

  const findOperation = (calculatorKey: CalculatorKeyType): Operation | undefined => {
    const operationType = CalculatorKeyToOperationType[calculatorKey]
    const operation = operations.value.find(it => it.type === operationType)
    return operation
  }

  const execute = async () => {
    loading.value = true
    await recordsStore.execute({
      operation: operation.value!,
      amount: Number(display.value),
    })
    loading.value = false
  }

  const append = async (calculatorKey: CalculatorKeyType) => {

    const newOperation = findOperation(calculatorKey)
    const newDisplay = updateDisplay(calculatorKey, display.value)

    if (calculatorKey === '=') {
      execute()
    }

    if (newOperation !== undefined) {
      operation.value = newOperation
    }
    display.value = newDisplay
  }

  return {
    append,
    display: readonly(display),
    loading,
    operation,
  }
})
