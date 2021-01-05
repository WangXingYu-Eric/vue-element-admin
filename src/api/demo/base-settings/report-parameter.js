import request from '@/utils/request'

export function fetchList(pagination) {
  return request({
    url: '/base-settings/report-parameter/list',
    method: 'get',
    params: { 'pagination': pagination }
  })
}
