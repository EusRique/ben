import { createApp } from 'vue'
import svg4everybody from 'svg4everybody'
import { mockServer } from './miragejs'
import { router } from './router/router'
import './style.css'
import App from './app.vue'

const bootstrap = async (): Promise<void> => {
  if (!['production', 'staging'].includes(import.meta.env.MODE)) {
    mockServer()
  }

  svg4everybody()

  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}

Promise.all([bootstrap()])
  .catch(err => { console.log(err) })
