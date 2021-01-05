import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/base-settings/user-group/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
