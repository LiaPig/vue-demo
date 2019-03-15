import request from '../utils/request'
export default class housing {
  constructor() {
    this.cfg = {
      Base_url: process.env.NODE_ENV === 'production' ? '/housing' : '/api/housing'
    }
  }

  // 根据时间段查询房间
  searchHome(data) {
    return request.post(`${this.cfg.Base_url}/search`, data)
  }
  // 入住房间
  checkIn(data) {
    return request.post(`${this.cfg.Base_url}/checkIn`, data)
  }

}
