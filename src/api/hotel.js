import request from '../utils/request'
export default class decive {
  constructor() {
    this.cfg = {
      Base_url: process.env.NODE_ENV === 'production' ? '/hotel' : '/api/hotel'
    }
  }

  // 添加房间类型
  addDevice(data) {
    return request.put(`${this.cfg.Base_url}/decive/add`, data)
  }


  // // 登录
  // login(data) {
  //   // `${this.cfg.Base_url}/login` 相当于 this.cfg.Base_url + '/login'
  //   return request.post(`${this.cfg.Base_url}/login`, data)
  // }
  //
  // // 获取所有员工
  // getStaff(params) {
  //   return request.get(`${this.cfg.Base_url}/staff/get`, params)
  // }
  //

  // // 管理员删除员工
  // deleteStaff(data) {
  //   return request.delete(`${this.cfg.Base_url}/staff/delete/${data.id}`)
  // }

}
