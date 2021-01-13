const Mock = require('mockjs')

const list = []
for (let i = 0; i < 2; i++) {
  list.push(Mock.mock({
    jobNumber: '2020年3月-2020年4月',
    'batchNumber|1': ['文件生成成功','文件上传失败'],
    jobType: /^[MS](0000015)\d{3}$/,
    dataProcessTime: '2020-04-02'
  }))
}

module.exports = [
  {
    url: '/demo/receipt/list',
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
