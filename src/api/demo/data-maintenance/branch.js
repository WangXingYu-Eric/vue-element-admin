import request from '@/utils/request'

export function fetchList1(filter, pagination) {
  return request({
    url: '/demo/data-maintenance/branch/list1',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}

export function fetchList2(filter, pagination) {
  return request({
    url: '/demo/data-maintenance/branch/list2',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}

