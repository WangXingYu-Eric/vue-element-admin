const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    batchNumber: '@datetime("yyyyMMddss")',
    'reportType|1': ['集中采集', '持续采集'],
    'dataGroup|1': ['总公司', '四川分公司'],
    'dataStatus|1': ['未推送', '推送中', '推送完成'],
    dataRange: '2017-2020年',
    dataStartTime: '@datetime("yyyy-MM-dd")',
    dataEndTime: '@datetime("yyyy-MM-dd")',
    dataProcessTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }))
}

module.exports = [
  {
    url: '/demo/job/core-query/list',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list.filter(item => {
        if (filter.reportType && item.reportType !== filter.reportType) { return false }
        if (filter.dataYear && item.dataStartTime !== filter.dataYear) { return false }
        return !(filter.dataMonth && item.dataEndTime !== filter.dataMonth)
      })

      const pageList = filteredList.filter((item, index) => index < pagination.limit * pagination.page && index >= pagination.limit * (pagination.page - 1))

      return {
        code: 20000,
        data: {
          total: filteredList.length,
          list: pageList
        }
      }
    }
  }
]
