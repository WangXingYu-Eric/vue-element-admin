import request from '@/utils/request'

export function getStandardTableList() {
  return request({
    url: 'http://10.10.10.108:5301/core-service/demo/data-collection/mapping-setting/getStandardTableList',
    method: 'post'
  })
}

export function getMatchTableList() {
  return request({
    url: 'http://10.10.10.108:5301/core-service/demo/data-collection/mapping-setting/getMatchTableList',
    method: 'post'
  })
}

