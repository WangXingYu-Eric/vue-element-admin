const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    'groupName|1': ['财务部', '董办', '总公司'],
    'tableName|1': ['总账会计全科表', '自主投资交易流水表', '自主投资账户持仓明细表',
      '自主投资账户信息汇总表', '银行账户信息表', '手续费及佣金分科目明细表', '业务及管理费分科目明细表',
      '财务凭证信息表', '内部科目对照表', '董监高履职信息表']
  }))
}

module.exports = [
  {
    url: '/demo/base-settings/group-role/list',
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
