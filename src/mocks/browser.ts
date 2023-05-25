import { setupWorker } from 'msw'
import { handlers } from './handlers'

const onUnhandledRequest = () => { }

export const start: () => void = () => {
    setupWorker(...handlers).start({ onUnhandledRequest })
}