
export const Operations = [
    'addition',
    'subtraction',
    'multiplication',
    'division',
    'square_root',
    'random_string'
] as const

export type OperationType = (typeof Operations)[number]

type Operation = {
    id: string
    type: OperationType
    cost: number
}

type Record = {
    id: string
    operation: Operation
    amount: string
    userBalance: number
    operationResponse: string
    date: Date
}

type PostRecordRequest = {
    operation: Operation
    amount: number | undefined
}

export type Api = {
    getRecords: () => Promise<Record[]>
    getOperations: () => Promise<Operation[]>
    postRecord: (request: PostRecordRequest) => Promise<string>
}

const getOperations = async (): Promise<Operation[]> => {
    const response = await fetch('/v1/operations')
    const json = await response.json()
    return json
}

const postRecord: Api["postRecord"] = async ({ operation, amount }) => {
    const response = await fetch('/v1/records', {
        method: 'post',
        body: JSON.stringify({
            operation_id: operation.id,
            amount,
        })
    })
    const json = await response.json()
    return json
}

const getRecords: Api["getRecords"] = async () => {
    const response = await fetch('/v1/records')
    const text = await response.text()
    const json = JSON.parse(text, (key, value) => {
        if (key === "date") {
            return new Date(Date.parse(value))
        }
        return value;
    })
    return json
}

export const createApi = (): Api => ({
    postRecord,
    getRecords,
    getOperations,
})

export type { Operation, Record, PostRecordRequest }