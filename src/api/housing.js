import request from '../utils/request'
export default class housing {
  constructor() {
    this.cfg = {
      Base_url: process.env.NODE_ENV === 'production' ? '/housing' : '/api/housing'
    }
  }

  // // 添加房间类型
  // addDevice(data) {
  //   // `${this.cfg.Base_url}/device/add` 相当于 this.cfg.Base_url + '/device/add'
  //   return request.put(`${this.cfg.Base_url}/device/add`, data)
  // }
  // // 获取所有房间类型
  // getDevice(params) {
  //   return request.get(`${this.cfg.Base_url}/device/get`, params)
  // }
  // // 更新房间类型
  // updateDevice(data) {
  //   return request.post(`${this.cfg.Base_url}/device/update`, data)
  // }
  // // 删除房间类型
  // deleteDevice(data) {
  //   return request.delete(`${this.cfg.Base_url}/device/delete/${data.id}`)
  // }

}
