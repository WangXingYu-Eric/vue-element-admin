const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    roleSource: '监管发文规则',
    roleType: '条件必填',
    roleCollection: '主流程集中采集规则',
    roleMajorTable: '机构股权信息表',
    'roleStatus|1': ['启用', '停用'],
    roleDescription: '@ctitle(4,8)',
    'data|1': ['机构证件类型', '个人证件类型', '处罚机关']
  }))
}

module.exports = [
  {
    url: '/demo/package/check-role/list',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list.filter(item => {
        if (filter.roleSource && item.roleSource !== filter.roleSource) { return false }
        if (filter.roleType && item.roleType !== filter.roleType) { return false }
        if (filter.roleCollection && item.roleCollection !== filter.roleCollection) { return false }
        if (filter.roleMajorTable && item.roleMajorTable !== filter.roleMajorTable) { return false }
        if (filter.roleStatus && item.roleStatus !== filter.roleStatus) { return false }
        return !(filter.roleDescription && item.roleDescription.indexOf(filter.roleDescription) < 0)
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
