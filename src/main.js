import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from '../vuetify'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
// Vue Datepickerに関するimport
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
// Vue Datepickerのコンポーネントを登録
app.component('VueDatePicker', VueDatePicker).use(vuetify).use(router).mount('#app')
