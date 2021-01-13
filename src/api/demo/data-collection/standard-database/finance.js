import request from '@/utils/request'

export function getTableList() {
  return request({
    url: 'http://192.168.223.89:5301/core-service/demo/data-collection/standard-database/finance/getTableList',
    method: 'post',
    data: { 'prefix': 'NON_BANK' }
  })
}

