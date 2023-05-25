import CalculatorView from '@/views/CalculatorView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/records',
      name: 'records',
      component: () => import('@/views/RecordsView.vue')
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: CalculatorView
    }
  ]
})

export default router
