import type { Operation, Record } from "@/api";

export const OPERATIONS: Operation[] = [
    { id: 'op_YWRkaXRpb25fX19fX19f', type: 'addition', cost: 1 },
    { id: 'op_c3VidHJhY3Rpb25fX19f', type: 'subtraction', cost: 1 },
    { id: 'op_bXVsdGlwbGljYXRpb25f', type: 'multiplication', cost: 2 },
    { id: 'op_ZGl2aXNpb25fX19fX19f', type: 'division', cost: 2 },
    { id: 'op_c3F1YXJlX3Jvb3RfX19f', type: 'square_root', cost: 3 },
    { id: 'op_cmFuZG9tX3N0cmluZ19f', type: 'random_string', cost: 3 },
]

export const RECORDS: Record[] = [
    {
        id: 'rec_0',
        operation: OPERATIONS[0],
        amount: '10',
        userBalance: 10,
        operationResponse: '10',
        date: new Date()
    },
    {
        id: 'rec_1',
        operation: OPERATIONS[2],
        amount: '2',
        userBalance: 9,
        operationResponse: '20',
        date: new Date()
    },
]

const peekRecord = () =>
    RECORDS[RECORDS.length - 1]!

const latestNumbericOperationResponse = () => {
    for (let i = RECORDS.length; i > 0; i--) {
        const it = RECORDS[i - 1]
        if (it.operation.type !== 'random_string') {
            return it.operationResponse
        }
    }
    return 0
}

const calculate = (operation: Operation, amount: string) => {
    const operationResponse = latestNumbericOperationResponse()
    const a = Number(operationResponse)
    const b = Number(amount)

    switch (operation.type) {
        case "addition": return a + b + ''
        case "subtraction": return a - b + ''
        case "multiplication": return a * b + ''
        case "division": return a / b + ''
        case "square_root": return Math.pow(b || a, 1 / 2) + ''
        case "random_string": return '???!!!###'
    }
}

export const postRecord = (request: { operation_id?: string, amount?: number }) => {
    const operation = OPERATIONS.find(op => op.id === request.operation_id)!
    const amount = request.amount?.toString() || ''
    const newBalance = peekRecord().userBalance - operation.cost
    const record = {
        id: 'rec_' + RECORDS.length,
        operation: operation!,
        amount: amount,
        userBalance: newBalance,
        operationResponse: calculate(operation, amount),
        date: new Date()
    }
    RECORDS.push(record)
    return record
}
