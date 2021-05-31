import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/reset.css'
import './style/index.css'
import './utils/windowResize.js'

const app = createApp(App)

const registerComponents = (app) => {
  const templateList = import.meta.globEager('./template/*/index.{vue,jsx}')
  Object.keys(templateList).forEach((key) => {
    const component = templateList[key].default
    const { name } = component
    app.component(name, component)
  })

  // const modules = import.meta.globEager("../packages/*/index.{vue,jsx}");
  // Object.keys(modules).forEach((key) => {
  //   const component = modules[key].default;
  //   const { name } = component
  //   app.component(name, component)
  // });

  // app.component('FormRender', FormRender)

  // Object.keys(widgets).forEach(name => {
  //   app.component(widgets[name].name, widgets[name])
  // })
}

registerComponents(app)

app.use(router)
app.mount('#app')
