const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    'userCode': '@word(8)',
    'userName': '@word(8)',
    'userStatus|1': ['有效', '无效'],
    'userGroup|1': ['财务部', '董办', '总公司'],
    'userDescription': '@csentence'
  }))
}

module.exports = [
  {
    url: '/demo/base-settings/user-group/list',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list.filter(item => {
        if (filter.userCode && item.userCode !== filter.userCode) { return false }
        return !(filter.userName && item.userName !== filter.userName)
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
