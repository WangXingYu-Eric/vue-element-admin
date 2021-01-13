const Mock = require('mockjs')

const list = []
for (let i = 0; i < 1; i++) {
  list.push(Mock.mock({
    id: '@increment',
    a: '管理员',
    b: 'admin',
    c: '启用',
    d: '管理员',
    e: '',
    f: '2020-01-10',
    g: '@name',
    h: '',
    i: ''
  }))
}

module.exports = [
  {
    url: '/demo/base-settings/role/list',
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
