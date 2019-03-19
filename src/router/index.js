import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Cookies from 'js-cookie'

// 登录页面
import login from '@/pages/login'
// 注册页面
import register from '@/pages/register'

// 有顶部和左边菜单，中间能显示别的页面的基础组件
import HelloWorld from '@/components/HelloWorld'
// 首页
import home from '@/pages/home'
// 管理员的页面
// 员工信息管理
import adminStaff from '@/pages/admin/staff'
// 新增员工信息
import adminStaffAdd from '@/pages/admin/staff/add'
// 客户信息管理
import adminCustomer from '@/pages/admin/customer'
// 房间类型管理
import adminDevice from '@/pages/admin/device'
// 新增房间类型
import adminDeviceAdd from '@/pages/admin/device/add'
// 客房信息管理
import adminRoom from '@/pages/admin/room'
// 新增客房信息
import adminRoomAdd from '@/pages/admin/room/add'
// 员工的页面
// 客房信息管理
import staffRoom from '@/pages/staff/room'
// 入住客房管理
import staffCheckIn from '@/pages/staff/checkIn/'
// 退还房间管理
import staffCheckOut from '@/pages/staff/checkOut'
// 账单信息管理
import staffBill from '@/pages/staff/bill'
// 客户的页面
import customer from '@/pages/customer'
// 更新个人信息
import updateInformation from '@/pages/customer/updateInformation'
// 客房信息列表
import customerRoom from '@/pages/customer/room'
// 我的预约列表
import customerMyRoom from '@/pages/customer/myBookRoom'




Vue.use(Router)

const routes = [
  // 登录页面，不需要权限验证，路由拦截
  {
    path: '/login',
    name: 'login',
    component: login,
    // 不需要权限验证，路由拦截
    meta: {
      requiresAuth: false
    }
  },
  // 注册页面，不需要权限验证，路由拦截
  {
    path: '/register',
    name: 'register',
    component: register,
    // 不需要权限验证，路由拦截
    meta: {
      requiresAuth: false
    }
  },
  // 客户的页面,需要权限验证，路由拦截
  // 更新个人信息
  // 客房信息列表 customer
  {
    path: '/customer',
    redirect: '/customer/room',
    name: 'customer',
    component: customer,
    children: [
      {
        path: 'updateInformation',
        component: updateInformation,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'room',
        component: customerRoom,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: false
        }
      },
      // 我的预约列表
      {
        path: 'my',
        component: customerMyRoom,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  // 有顶部和左边菜单，中间能显示别的页面的基础组件
  {
    path: '*',
    redirect: '/home',
    name: 'HelloWorld',
    component: HelloWorld,
    children: [
      // 其余有顶部和左边菜单的页面
      // 首页
      {
        path: '/home',
        component: home,
        // 不需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },

      // 管理员的页面
      // 员工信息管理
      {
        path: '/admin/staff',
        component: adminStaff,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 新增员工信息
      {
        path: '/admin/staff/add',
        component: adminStaffAdd,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 客户信息管理
      {
        path: '/admin/customer',
        component: adminCustomer,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 房间类型管理
      {
        path: '/admin/device',
        component: adminDevice,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 新增房间类型
      {
        path: '/admin/device/add',
        component: adminDeviceAdd,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 客房信息管理
      {
        path: '/admin/room',
        component: adminRoom,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 新增客房信息
      {
        path: '/admin/room/add',
        component: adminRoomAdd,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },

      // 员工的页面
      // 客房信息管理
      {
        path: '/staff/room',
        component: staffRoom,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 入住房间管理
      {
        path: '/staff/checkIn',
        component: staffCheckIn,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 退还房间管理
      {
        path: '/staff/checkOut',
        component: staffCheckOut,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
      // 账单信息管理
      {
        path: '/staff/bill',
        component: staffBill,
        // 需要权限验证，路由拦截
        meta: {
          requiresAuth: true
        }
      },
    ]
  },

]

// 页面刷新时，重新赋值有没登录

if (Cookies.get('userInfo')) {
  const data = JSON.parse(Cookies.get('userInfo'))
  store.commit('SET_USERINFO', data);
}

const router = new Router({
  routes
});

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {  // 判断该路由是否需要登录权限
    // console.log(store.getters);
    if (store.getters.token) {  // 通过vuex 如果当前有登录
      next();
    }
    else {
      console.log("没有登录吖")
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router
