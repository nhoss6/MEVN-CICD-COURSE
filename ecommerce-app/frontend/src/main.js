import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976d2',
          secondary: '#424242',
          accent: '#82b1ff',
          error: '#ff5252',
          warning: '#ffc107',
          info: '#2196f3',
          success: '#4caf50',
        }
      }
    }
  }
})

const app = createApp(App)
app.use(vuetify)
app.mount('#app')