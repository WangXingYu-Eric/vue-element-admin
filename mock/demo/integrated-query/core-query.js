const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    batchNumber: /^[MS](0000015)\d{3}$/,
    reportType: '集中采集',
    dataGroup: '北京中科软',
    dataStatus: '成功',
    dataRange: '2021年1月',
    dataStartTime: '@datetime("yyyy-MM-dd")',
    dataEndTime: '@datetime("yyyy-MM-dd")',
    dataProcessTime: '@datetime("yyyy-MM-dd")'
  }))
}

module.exports = [
  {
    url: '/demo/integrated-query/core-query/list',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list.filter(item => {
        if (filter.groupName && item.groupName !== filter.groupName) { return false }
        return !(filter.tableName && item.tableName !== filter.tableName)
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
