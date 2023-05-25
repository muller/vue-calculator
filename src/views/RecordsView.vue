<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ExecuteOperationModal from '@/components/ExecuteOperationModal.vue'
import { useRecordsStore } from '@/stores/records'
const store = useRecordsStore()
const { records } = storeToRefs(store)
</script>

<template>
  <main class="p-10">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="border-b p-6 text-slate-500 bg-slate-100 text-left">Id</th>
          <th class="border-b p-6 text-slate-500 bg-slate-100 text-left">Operation</th>
          <th class="border-b p-6 text-slate-500 bg-slate-100 text-left">Amount</th>
          <th class="border-b p-6 text-slate-500 bg-slate-100 text-left">User balance</th>
          <th class="border-b p-6 text-slate-500 bg-slate-100 text-left">Operation response</th>
          <th class="border-b p-6 text-slate-500 bg-slate-100 text-left">Date</th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr v-for="record in records" :key="record.id">
          <td class="border-b p-4 text-slate-600 border-slate-300 text-sm">
            {{ record.id }}
          </td>
          <td class="border-b p-4 text-slate-600 border-slate-300">
            {{ record.operation.type }} <span class="text-xs">($ {{ record.operation.cost }})</span>
          </td>
          <td class="border-b p-4 text-slate-600 border-slate-300">
            {{ record.amount }}
          </td>
          <td class="border-b p-4 text-slate-600 border-slate-300">
            {{ record.userBalance }}
          </td>
          <td class="border-b p-4 text-slate-600 border-slate-300">
            {{ record.operationResponse }}
          </td>
          <td class="border-b p-4 text-slate-600 border-slate-300 text-sm">
            {{ record.date.toISOString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <ExecuteOperationModal />
  </main>
</template>
