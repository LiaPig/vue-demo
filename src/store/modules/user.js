// 引用cookie
import Cookies from 'js-cookie'

// 从cookie中拿到userInfo
const userInfo = Cookies.getJSON('userInfo') || {}

// 创建一个user类，state里装的是他的全局属性
const user = {
  state: {
    // token,userInfo有就赋值，没就为''
    token: userInfo.token || '',
    // 用户名,userInfo有就赋值，没就为'unknown'
    userName: userInfo.user || 'unknown',
    // 身份证,
    idCard: userInfo.idCard || '',
    // 角色
    role: userInfo.role || ''
  },

  // 相当于它的方法，各种get和set，官方文档是这么命名和这么写的
  mutations: {
    // 将第二个参数userInfo信息，存到当前类user里
    SET_USERINFO: (state, userInfo) => {
      Object.assign(state, userInfo)
    },
    // 清空所有信息，包括cookie的
    REMOVE_USERINFO: state => {
      state.token = ''
      state.userName = ''
      state.idCard = ''
      state.role = ''
      Cookies.remove('userInfo')
    }
  },
  // 相当于立即调用它的方法，官方文档是这么命名和这么写的
  actions: {
    // 执行退出登录操作，实际上就是调用上面的REMOVE_USERINFO方法
    Logout({ commit }) {
      commit('REMOVE_USERINFO')
    }
  }
}

export default user
