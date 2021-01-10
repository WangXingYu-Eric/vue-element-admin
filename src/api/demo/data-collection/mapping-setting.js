import request from '@/utils/request'

export function getStandardTableList() {
  return request({
    url: 'http://localhost:5301/core-service/demo/data-collection/mapping-setting/getStandardTableList',
    method: 'post'
  })
}

export function getMatchTableList() {
  return request({
    url: 'http://localhost:5301/core-service/demo/data-collection/mapping-setting/getMatchTableList',
    method: 'post'
  })
}

