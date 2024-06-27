import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from '../vuetify'

// Vue Datepickerに関するimport
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
// Vue Datepickerのコンポーネントを登録
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
app.use(vuetify)
