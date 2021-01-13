const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    a: '2021年3月',
    b: '4654654',
    c: '@datetime("2020-MM-dd")',
    d: '人工维护中'
  }))
}

module.exports = [
  {
    url: '/demo/data-check/data-checkOne/list',
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
