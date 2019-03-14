// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './store'
import util from './utils/util'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false
// 更改原型(加入到原型属性中)
Vue.prototype.baseJs = util

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
