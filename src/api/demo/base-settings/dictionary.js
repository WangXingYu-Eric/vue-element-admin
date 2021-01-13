import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/base-settings/dictionary/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
