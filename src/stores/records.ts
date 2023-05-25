import type { Api, Record, PostRecordRequest, OperationType } from '@/api'
import { defineStore } from 'pinia'
import { computed, inject, ref, watch } from 'vue'

const PostRecordRequestErrors = [
    'requires_operation',
    'requires_amount',
] as const

export type PostRecordRequestErrorType = (typeof PostRecordRequestErrors)[number]

const REQUIRES_AMOUNT: (OperationType | undefined)[] = [
    'addition',
    'subtraction',
    'multiplication',
    'division',
]

const validatePostRecordRequest = (request: Partial<PostRecordRequest>): PostRecordRequestErrorType[] => {
    const errors: PostRecordRequestErrorType[] = []
    const operationType = request.operation?.type
    const requiresAmount = REQUIRES_AMOUNT.includes(operationType)

    if (!request.operation?.id) {
        errors.push('requires_operation')
    }

    if (requiresAmount && !request.amount) {
        errors.push('requires_amount')
    }

    return errors
}

const latestNumbericOperationResponse = (records: Record[]) => {
    for (let i = records.length; i > 0; i--) {
        const it = records[i - 1]
        if (it.operation.type !== 'random_string') {
            return it.operationResponse
        }
    }
    return '0'
}

export const useRecordsStore = defineStore('records', () => {
    const api = inject('api') as Api
    const records = ref<Record[]>([])
    const userBalance = computed(() =>
        records.value[records.value.length - 1]?.userBalance
    )
    const latestResult = ref('')

    watch(records, records => {
        latestResult.value = latestNumbericOperationResponse(records)
    })

    const execute = async (request: PostRecordRequest) => {
        console.log({ request })
        await api.postRecord(request)
        records.value = await api.getRecords()
    }

    api.getRecords().then(result => records.value = result)

    return {
        execute, latestResult, records, userBalance, validatePostRecordRequest
    }
})
