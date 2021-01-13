import request from '@/utils/request'

export function fetchList(filter, pagination) {
  return request({
    url: '/demo/package/data-source-setting/list',
    method: 'get',
    params: { 'filter': filter, 'pagination': pagination }
  })
}

export function test(dataSourceSettingTestDTO) {
  return request({
    url: 'http://192.168.223.89:5301/core-service/demo/data-collection/data-source-setting/test',
    method: 'post',
    data: { 'dataSourceSettingTestDTO': dataSourceSettingTestDTO }
  })
}

