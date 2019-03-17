import request from '../utils/request'
export default class user {
  constructor() {
    this.cfg = {
      Base_url: process.env.NODE_ENV === 'production' ? '/user' : '/api/user'
    }
  }

  // 登录
  login(data) {
    // `${this.cfg.Base_url}/login` 相当于 this.cfg.Base_url + '/login'
    return request.post(`${this.cfg.Base_url}/login`, data)
  }

  // 获取所有员工
  getStaff(params) {
    return request.get(`${this.cfg.Base_url}/staff/get`, params)
  }
  // 管理员新增员工
  addStaff(data) {
    return request.put(`${this.cfg.Base_url}/staff/add`, data)
  }
  // 管理员删除员工
  deleteStaff(data) {
    return request.delete(`${this.cfg.Base_url}/staff/delete/${data.id}`)
  }
  // 管理员编辑员工信息
  updateStaff(data) {
    return request.post(`${this.cfg.Base_url}/staff/update`, data)
  }


  // 获取所有客户
  getCustomer(params) {
    return request.get(`${this.cfg.Base_url}/customer/get`, params)
  }
  // 客户注册
  addCustomer(data) {
    return request.put(`${this.cfg.Base_url}/customer/add`, data)
  }
  // 编辑客户信息
  updateCustomer(data) {
    return request.post(`${this.cfg.Base_url}/customer/update`, data)
  }
  // 根据身份证获取用户资料
  getCustomerByIdCard(params) {
    return request.get(`${this.cfg.Base_url}/customer/get/${params.idCard}`)
  }
}
