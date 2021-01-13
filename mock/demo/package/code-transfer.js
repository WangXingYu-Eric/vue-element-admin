const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    'codeValue|908776-908999': 908999,
    'codeType|1': ['受理', '调查评论', '审批', '发放','贷后管理'],
    'originalCode|1-108': 108,
    'targetCode|1-20': 20,
    'targetCodeName|1': ['医疗', '伤残', '身故', '高残', '重大疾病', '特定疾病', '失业', '医疗'],
    mapping: '@ctitle(4,8)',
    'groupCode|1-80': 80,

    date: '@date'
  }))
}

module.exports = [
  {
    url: '/demo/package/code-transfer/list',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list.filter(item => {
        if (filter.codeType && item.codeType !== filter.codeType) { return false }
        if (filter.targetCode && item.targetCode !== parseInt(filter.targetCode)) { return false }
        return !(filter.originalCode && item.originalCode !== parseInt(filter.originalCode))
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
