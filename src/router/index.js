import { createWebHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import Calendar from '../pages/Calendar.vue'
import TaskLists from '../pages/TaskLists.vue'
import InputTask from '../pages/InputTask.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/inputtask', name: 'InputTask', component: InputTask },
  { path: '/tasklists', name: 'TaskLists', component: TaskLists },
  { path: '/calendar', name: 'Calendar', component: Calendar }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
