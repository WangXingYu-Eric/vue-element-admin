import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/data-collection/data-source-setting/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}

export function test(dataSourceSettingTestDTO) {
  return request({
    url: 'http://10.10.10.108:5301/core-service/demo/data-collection/data-source-setting/test',
    method: 'post',
    data: { 'dataSourceSettingTestDTO': dataSourceSettingTestDTO }
  })
}

