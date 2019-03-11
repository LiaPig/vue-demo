// 要封装当然要先引入
import axios from 'axios'
// 饿了么的提示框UI
import { Message } from 'element-ui'
// 引入js-cookie
import Cookies from 'js-cookie'
// 引入路由，没权限的时候需要跳转路由到登录页
import router from 'vue-router'


// 官方文档写的，新建一个axios服务
// create an axios instance
const service = axios.create({
  // baseURL: 'http://192.168.1.57:8212',
  timeout: 15000
})

// 官方文档写的，请求拦截
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // 发请求的时候，如果cookie里有token，带上在请求头的Authorization属性里
    if (Cookies.get('token')) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = Cookies.get('token')
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// 按照官方文档写，返回的拦截，下面是把错误通过饿了么的UI弹窗显示出来
// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response) {
      switch (error.response.status) {
        case 400:
          Message.error(error.response.data)
          break
        case 403:
          Message({
            message: error.message,
            type: 'error',
            duration: 2 * 1000,
            onClose: () => router.push({ path: '/login' })  //403说明没权限，路由跳转到登录页要求重新登录
          })
          break
        default:
          Message({
            message: error.message || error.response.data,
            type: 'error',
            duration: error.response.status === 500 ? 0 : 5 * 1000,
            showClose: true
          })
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service
