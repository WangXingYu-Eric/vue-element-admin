import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/base-settings/check-role/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
