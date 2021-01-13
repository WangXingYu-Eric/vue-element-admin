const Mock = require('mockjs')

const list = []
for (let i = 0; i < 1; i++) {
  list.push(Mock.mock({
    id: '@increment',
    a: 'admin',
    b: '1325995134@163.com',
    c: '155****9119',
    d: '启用',
    e: '2020-01-10',
    f: '2020-01-10',
    g: '0',
    h: '',
    i: '@name',
    j: '2020-01-10',
    k: '0',
    l: ''
  }))
}

module.exports = [
  {
    url: '/demo/base-settings/user/list',
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
