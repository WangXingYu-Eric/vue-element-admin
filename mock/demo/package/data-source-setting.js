const Mock = require('mockjs')

const list = []
for (let i = 0; i < 10; i++) {
  list.push(Mock.mock({
    id: '@increment',
    'groupName|1': ['财务部'],
    'systemName|1': ['核心业务系统','会计核算系统','信贷系统','票据系统','人力资源系统','外币业务系统'],
    'username|1': '@name',
    'password|1': ['DMSS', 'DMSS'],
    'url|1': ['jdbc:oracle:thin:@182.92.202.47:1521/ orcl', 'jdbc:oracle:thin:@182.92.202.50:1521/ orcl'],
    'driver|1': ['oracle.jdbc.OracleDriver', 'oracle.jdbc.OracleDriver']
  }))
}

module.exports = [
  {
    url: '/demo/package/data-source-setting/list',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list.filter(item => {
        if (filter.systemName && item.systemName !== filter.systemName) { return false }
        return !(filter.groupName && item.groupName !== filter.groupName)
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
