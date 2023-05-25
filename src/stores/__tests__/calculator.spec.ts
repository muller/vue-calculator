// import { describe, it, expect, beforeEach } from 'vitest'
// import { useCalculatorStore } from '../calculator'
// import { setActivePinia, createPinia } from 'pinia'

// describe('Calculator Store', () => {
//   beforeEach(() => {
//     setActivePinia(createPinia())
//   })
//   it('appends digits', async () => {
//     const store = useCalculatorStore()
//     await store.append('1')
//     expect(store.display).toBe('1')
//   })
//   it('appends multiple digits', async () => {
//     const store = useCalculatorStore()
//     await store.append('1')
//     await store.append('0')
//     await store.append('7')
//     expect(store.display).toBe('107')
//   })
//   it('appends decimal separator', async () => {
//     const store = useCalculatorStore()
//     await store.append('1')
//     await store.append('.')
//     await store.append('7')
//     expect(store.display).toBe('1.7')
//   })
//   it('appends decimal separator only once', async () => {
//     const store = useCalculatorStore()
//     await store.append('1')
//     await store.append('.')
//     await store.append('7')
//     await store.append('.')
//     expect(store.display).toBe('1.7')
//   })
//   it('appends leading decimal separator', async () => {
//     const store = useCalculatorStore()
//     await store.append('.')
//     await store.append('7')
//     expect(store.display).toBe('.7')
//   })
//   it('clears the display', async () => {
//     const store = useCalculatorStore()
//     await store.append('.')
//     await store.append('7')
//     await store.append('c')
//     expect(store.display).toBe('')
//   })
//   it('appends operations, clears the display then move to buffer', async () => {
//     const store = useCalculatorStore()
//     await store.append('1')
//     await store.append('+')
//     expect(store.op).toBe('+')
//     expect(store.display).toBe('')
//     expect(store.buffer).toBe('1')
//   })
//   it('skips operations without display value', async () => {
//     const store = useCalculatorStore()
//     await store.append('+')
//     expect(store.op).toBe(undefined)
//     expect(store.display).toBe('')
//     expect(store.buffer).toBe('')
//   })
//   it('accepts backspace', async () => {
//     const store = useCalculatorStore()
//     await store.append('1')
//     await store.append('2')
//     await store.append('3')
//     await store.append('⌫')
//     expect(store.display).toBe('12')
//   })
// })
