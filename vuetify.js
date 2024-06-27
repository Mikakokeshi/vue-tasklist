import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi' // 追加
  }
})

export default vuetify
