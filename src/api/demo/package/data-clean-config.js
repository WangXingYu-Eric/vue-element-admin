import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/package/data-clean-config/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
