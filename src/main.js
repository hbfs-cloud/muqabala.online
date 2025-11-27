import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '222055895903-j0inv85m7qi7lt5l5nbvljoimr0tsb9k.apps.googleusercontent.com'
})

app.mount('#app')
