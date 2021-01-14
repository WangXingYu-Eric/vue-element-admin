import request from '@/utils/request'

export function getTableList() {
  return request({
    url: 'http://13810600758.qicp.vip/core-service/demo/data-collection/standard-database/car/getTableList',
    method: 'post',
    data: { 'prefix': 'CAR_' }
  })
}

