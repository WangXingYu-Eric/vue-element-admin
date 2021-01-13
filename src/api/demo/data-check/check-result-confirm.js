import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/data-check/check-result-confirm/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
