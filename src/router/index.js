import { createWebHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import Calendar from '../pages/Calendar.vue'
import TaskLists from '../pages/TaskLists.vue'
import InputTask from '../pages/InputTask.vue'
import { ref } from 'vue'
const items = ref(JSON.parse(localStorage.getItem('items')) || [])

const beforeEnter = (to, from, next) => {
  if (items.value.length) {
    next()
  } else {
    next({ path: '/inputtask' })
  }
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter
  },
  { path: '/inputtask', name: 'InputTask', component: InputTask },
  { path: '/tasklists', name: 'TaskLists', component: TaskLists, beforeEnter },
  { path: '/calendar', name: 'Calendar', component: Calendar, beforeEnter }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
