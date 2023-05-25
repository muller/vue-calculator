import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createApi } from '@/api'

import App from '@/App.vue'
import router from '@/router'

import('@/mocks/browser').then(({ start }) => start())

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('api', createApi())
app.mount('#app')
