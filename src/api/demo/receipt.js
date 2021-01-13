import request from '@/utils/request'

export function fetchList1(filter, pagination) {
  return request({
    url: '/demo/receipt/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
