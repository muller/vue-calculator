import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createApi } from '@/api'

import App from '@/App.vue'
import router from '@/router'

if (process.env.NODE_ENV === 'development') {
    const { start } = await import('@/mocks/browser')
    start()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('api', createApi())
app.mount('#app')
