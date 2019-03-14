import request from '../utils/request'
export default class decive {
  constructor() {
    this.cfg = {
      Base_url: process.env.NODE_ENV === 'production' ? '/hotel' : '/api/hotel'
    }
  }

  // 添加房间类型
  addDevice(data) {
    // `${this.cfg.Base_url}/device/add` 相当于 this.cfg.Base_url + '/device/add'
    return request.put(`${this.cfg.Base_url}/device/add`, data)
  }
  // 获取所有房间类型
  getDevice(params) {
    return request.get(`${this.cfg.Base_url}/device/get`, params)
  }
  // 更新房间类型
  updateDevice(data) {
    return request.post(`${this.cfg.Base_url}/device/update`, data)
  }
  // 删除房间类型
  deleteDevice(data) {
    return request.delete(`${this.cfg.Base_url}/device/delete/${data.id}`)
  }

  // 添加客房
  addRoom(params) {
    return request.put(`${this.cfg.Base_url}/room/add`, params)
  }
  // 获取所有客房
  getRoom(data) {
    return request.get(`${this.cfg.Base_url}/room/get/${data.hotelId}`)
  }
  // 更新客房信息
  updateRoom(data) {
    return request.post(`${this.cfg.Base_url}/room/update`, data)
  }
  // 删除客房
  deleteRoom(data) {
    return request.delete(`${this.cfg.Base_url}/room/delete/${data.id}`)
  }

}
