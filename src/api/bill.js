import request from '../utils/request'
export default class bill {
  constructor() {
    this.cfg = {
      Base_url: process.env.NODE_ENV === 'production' ? '/bill' : '/api/bill'
    }
  }

  // 获取所有账单
  getBill(params) {
    return request.get(`${this.cfg.Base_url}/get`, params)
  }

  // 获取某段时间里的账单
  getDateBill(data) {
    return request.post(`${this.cfg.Base_url}/get`, data)
  }
}
