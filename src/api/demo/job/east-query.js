import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/job/east-query/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
