import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'
import './style.css'
import cors from "cors"

const app = createApp(App)
app.use(createPinia())
app.use(cors({ origin: ["https://muqabala.online", "https://hbfs-cloud.github.io"] }))

app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '222055895903-j0inv85m7qi7lt5l5nbvljoimr0tsb9k.apps.googleusercontent.com'
})

app.mount('#app')

// Register Service Worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered:', registration)
            })
            .catch((error) => {
                console.log('SW registration failed:', error)
            })
    })
}
