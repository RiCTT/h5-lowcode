import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/reset.css'
import './style/index.css'
import './utils/windowResize.js'
import FormRender from '../packages/FormRender/index.jsx'
import { widgets } from '../packages/FormRender/widgets/index.jsx'

const app = createApp(App)

const registerComponents = (app) => {
  // const modules = import.meta.globEager("../packages/*/index.vue");
  const modules = import.meta.globEager("../packages/*/index.{vue,jsx}");
  Object.keys(modules).forEach((key) => {
    const component = modules[key].default;
    const { name } = component
    app.component(name, component)
  });

  app.component('FormRender', FormRender)

  Object.keys(widgets).forEach(name => {
    app.component(widgets[name].name, widgets[name])
  })
}

registerComponents(app)

app.use(router)
app.mount('#app')
