import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/integrated-query/dataStatus/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}
