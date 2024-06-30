import { createMemoryHistory, createRouter } from 'vue-router'

import Calendar from '../pages/Calendar.vue'
import TaskLists from '../pages/TaskLists.vue'
import InputTask from '../pages/InputTask.vue'
import Home from '../pages/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tasklists', name: 'タスク一覧', component: TaskLists },
  { path: '/inputtask', name: 'タスク登録', component: InputTask },
  { path: '/calendar', name: 'カレンダー', component: Calendar }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
