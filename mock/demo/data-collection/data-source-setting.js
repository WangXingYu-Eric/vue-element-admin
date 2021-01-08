const Mock = require('mockjs')

const list = []
for (let i = 0; i < 3; i++) {
  list.push(Mock.mock({
    id: '@increment',
    'groupName|1': ['财务部', '金融服务部'],
    'systemName|1': ['财务系统', '业务系统', '客服系统'],
    'username|1': ['DMSS', 'DMSS'],
    'password|1': ['DMSS', 'DMSS'],
    'url|1': ['jdbc:oracle:thin:@182.92.202.47:1521/ orcl', 'jdbc:oracle:thin:@182.92.202.47:1521/ orcl'],
    'driver|1': ['oracle.jdbc.OracleDriver', 'oracle.jdbc.OracleDriver']
  }))
}

module.exports = [
  {
    url: '/demo/data-collection/data-source-setting/list',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list.filter(item => {
        return !(filter.group && item.group !== filter.group)
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
