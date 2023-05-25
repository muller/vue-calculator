<script setup lang="ts">
import type { Operation, PostRecordRequest } from '@/api'
import { useOperationsStore } from '@/stores/operations'
import { useRecordsStore, type PostRecordRequestErrorType } from '@/stores/records'
import { storeToRefs } from 'pinia'
import { nextTick, reactive, ref, type ComponentPublicInstance } from 'vue'
import ModalTemplate from './ModalTemplate.vue'
import LoadingSpinner from './LoadingSpinner.vue'

type State = Partial<PostRecordRequest> & {
  loading: boolean
  open: boolean
  validationErrors: PostRecordRequestErrorType[]
}

const recordsStore = useRecordsStore()
const operationsStore = useOperationsStore()
const { operations } = storeToRefs(operationsStore)
const { userBalance, latestResult } = storeToRefs(recordsStore)

const amountRef = ref<ComponentPublicInstance<HTMLInputElement>>()

const state = reactive<State>({
  loading: false,
  open: false,
  validationErrors: []
})

const setOperation = (option: Operation) => {
  state.operation = option
}

const clearState = () => {
  state.amount = undefined
  state.open = false
  state.operation = undefined
  state.validationErrors = []
  state.loading = false
}

const show = () => {
  state.open = true
  nextTick(() => amountRef.value?.focus())
}

const submit = async () => {
  state.validationErrors = recordsStore.validatePostRecordRequest(state)
  if (state.validationErrors.length === 0) {
    state.loading = true
    await recordsStore.execute({
      amount: state.amount,
      operation: state.operation!
    })
    clearState()
  }
}
</script>
<template>
  <ModalTemplate :open="state.open">
    <div class="w-96">
      <form class="rounded p-6" @submit.prevent="submit()">
        <div class="mb-4">
          <label for="lastResult">Last result</label>
          <input
            class="mt-2 w-full rounded border p-2 shadow"
            id="lastResult"
            type="number"
            readonly
            disabled
            :value="latestResult"
          />
        </div>

        <div class="mb-6 w-full">
          <label for="list-radio"
            >Type <span class="text-sm">(balance: $ {{ userBalance }})</span></label
          >
          <p
            v-if="state.validationErrors.includes('requires_operation')"
            class="font-medium text-red-500 text-xs m-1"
          >
            Type is required!
          </p>
          <ul class="mt-2 rounded-lg border border-gray-200">
            <li class="w-full border-b border-gray-200" v-for="op in operations" :key="op.id">
              <div class="flex items-center pl-3">
                <input :id="op.id" @change="setOperation(op)" type="radio" name="list-radio" />
                <label :for="op.id" class="ml-2 flex w-full py-3 text-sm font-medium">
                  <div class="inline w-4/5">{{ op.type }}</div>
                  <div class="inline w-1/5">$ {{ op.cost }}</div>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-4">
          <label for="amount">Amount</label>
          <p
            v-if="state.validationErrors.includes('requires_amount')"
            class="font-medium text-red-500 text-xs m-1"
          >
            Amount is required!
          </p>
          <input
            class="mt-2 w-full appearance-none rounded border p-2 shadow"
            id="amount"
            type="number"
            ref="amountRef"
            placeholder="Amount"
            v-model.number="state.amount"
          />
        </div>
        <div class="flex items-center">
          <button
            type="submit"
            :disabled="state.loading"
            class="mx-3 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-gray-500"
          >
            Execute
          </button>
          <button
            type="button"
            @click="clearState"
            class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <div v-if="state.loading" class="mx-3">
            <LoadingSpinner />
          </div>
        </div>
      </form>
    </div>
  </ModalTemplate>
  <button
    type="button"
    @click="show"
    class="m-3 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
  >
    Execute operation
  </button>
</template>
