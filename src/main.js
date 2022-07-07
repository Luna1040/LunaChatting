import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from 'js-md5'
import './assets/js/publicFunction.js'
import './assets/js/publicFunction.js'
import './assets/css/public.scss'
import './assets/LunaUI/index'

Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
