import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/reset.css'
import './style/index.css'
import './utils/windowResize.js'

const app = createApp(App)

const registerComponents = (app) => {
  const modules = import.meta.globEager("../packages/*/index.vue");
  Object.keys(modules).forEach((key) => {
    const component = modules[key].default;
    const { name } = component
    app.component(name, component)
  });
}

registerComponents(app)

app.use(router)
app.mount('#app')
