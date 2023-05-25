// import { describe, it, expect } from 'vitest'
// import { validatePostRecordRequest } from '../records'

// describe('Schemas', () => {
//     it('validatePostRecordRequest - amount is required', () => {
//         expect(validatePostRecordRequest({}))
//             .toEqual(["requires_operation", "requires_amount"])
//     })
//     it('validatePostRecordRequest - operation is required', () => {
//         expect(validatePostRecordRequest({
//             amount: 1,
//         })).toEqual(["requires_operation"])
//     })
//     it('validatePostRecordRequest - random_string without amount', () => {
//         expect(validatePostRecordRequest({
//             operation: {
//                 id: '123',
//                 cost: 0,
//                 type: 'random_string',
//             }
//         })).toEqual([])
//     })
//     it('validatePostRecordRequest - random_string with amount', () => {
//         expect(validatePostRecordRequest({
//             amount: 1,
//             operation: {
//                 id: '123',
//                 cost: 0,
//                 type: 'random_string',
//             }
//         })).toEqual([])
//     })
//     it('validatePostRecordRequest - division requires amount', () => {
//         expect(validatePostRecordRequest({
//             operation: {
//                 id: '123',
//                 cost: 0,
//                 type: 'division',
//             }
//         })).toEqual(["requires_amount"])
//     })
// })
