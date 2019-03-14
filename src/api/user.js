import request from '../utils/request'
export default class user {
  constructor() {
    this.cfg = {
      Base_url: process.env.NODE_ENV === 'production' ? '/user' : '/api/user'
    }
  }

  // 登录
  login(data) {
    return request.post(`${this.cfg.Base_url}/login`, data)
  }

  // // 注册驾驶员
  // register(data) {
  //   return request.post(`${this.cfg.Base_url}/register`, data)
  // }
  //
  // // 获取个人信息（管理员、审批员、驾驶员）
  // getInformation(params) {
  //   return request.get(`${this.cfg.Base_url}/get`, params)
  // }
  //
  // // 用户修改个人信息（管理员、审批员、驾驶员）
  // updateInformation(data) {
  //   return request.post(`${this.cfg.Base_url}/update`, data)
  // }
  //
  // // 获取驾驶员
  // getDrivers(params) {
  //     return request.get(`${this.cfg.Base_url}/driver/get`, params)
  // }
  //
  // // 获取审批员
  // getApprover(params) {
  //   return request.get(`${this.cfg.Base_url}/approver/get`, params)
  // }
  //
  // // 管理员新增审批员
  // addApprover(data) {
  //   return request.post(`${this.cfg.Base_url}/addApprover`, data)
  // }
  //
  // // 管理员修改审批员/审批员修改驾驶员信息
  // updateUser(data) {
  //   return request.post(`${this.cfg.Base_url}/updateByOther`, data)
  // }
  //
  // // 管理员删除审批员/审批员删除驾驶员信息
  // deleteUser(data) {
  //   return request.post(`${this.cfg.Base_url}/delete`, data)
  // }
}
