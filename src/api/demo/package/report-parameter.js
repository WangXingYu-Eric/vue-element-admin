import request from '@/utils/request'

export function fetchList(pagination) {
  return request({
    url: '/demo/package/report-parameter/list',
    method: 'get',
    params: { 'pagination': pagination }
  })
}
