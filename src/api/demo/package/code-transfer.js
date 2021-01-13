import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/package/code-transfer/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
