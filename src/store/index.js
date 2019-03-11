import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
// 引入getters
import getters from './getters';
// 引入modules
import user from './modules/user'

Vue.use(Vuex);

// 官方文档官方写法
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user
  },
  getters
});

export default store
