import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import type { Api, Operation } from '@/api'

export const useOperationsStore = defineStore('operations', () => {
  const api = inject('api') as Api
  const operations = ref<Operation[]>([])

  api.getOperations().then(result => {
    operations.value = result
  })

  return { operations }
})
