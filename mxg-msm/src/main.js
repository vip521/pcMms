import Vue from 'vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import "./permissions"
import router from './router'
Vue.use(ElementUI)


Vue.config.productionTip = process.env.NODE_ENV==='production'//开发还是生产环境的设置
console.log(process.env.VUE_APP_SERVICE_URL);//开发：development   开发：producion
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
