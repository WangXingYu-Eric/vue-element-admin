import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/job/core-query/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
