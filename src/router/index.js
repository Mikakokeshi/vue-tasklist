import { createMemoryHistory, createRouter } from 'vue-router'

import Calendar from '../pages/Calendar.vue'
import Home from '../pages/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/calendar', name: 'calendar', component: Calendar }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
