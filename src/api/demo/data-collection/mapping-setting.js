import request from '@/utils/request'

export function getStandardTableList() {
  return request({
    url: 'http://13810600758.qicp.vip/core-service/demo/data-collection/mapping-setting/getStandardTableList',
    method: 'post'
  })
}

export function getMatchTableList() {
  return request({
    url: 'http://13810600758.qicp.vip/core-service/demo/data-collection/mapping-setting/getMatchTableList',
    method: 'post'
  })
}

