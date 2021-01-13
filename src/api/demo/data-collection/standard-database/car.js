import request from '@/utils/request'

export function getTableList() {
  return request({
    url: 'http://10.10.10.108:5301/core-service/demo/data-collection/standard-database/car/getTableList',
    method: 'post',
    data: { 'prefix': 'CAR_' }
  })
}

