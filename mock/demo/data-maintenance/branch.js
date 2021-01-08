const Mock = require('mockjs')

const list1 = []
for (let i = 0; i < 2; i++) {
  list1.push(Mock.mock({
    id: '@increment',
    jobNumber: /^[MS](0000015)\d{3}$/,
    batchNumber: /^(0000015)\d{3}$/,
    'jobType|1': ['主流程', '次流程'],
    majorJob: /^[MS](0000015)\d{3}$/,
    'reportStatus|1': ['人工维护中', '待人工维护'],
    dataRange: '2017-2020年',
    dataStartTime: '@datetime("yyyy-MM-dd")',
    dataEndTime: '@datetime("yyyy-MM-dd")',
    dataProcessTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }))
}

const list2 = []
for (let i = 0; i < 3; i++) {
  list2.push(Mock.mock({
    id: '@increment',
    branchCode: /^(8637)(000)\d{3}$/,
    'branchName|1': ['人寿保险公司', '汽车保险公司'],
    'branchAddress|1': ['北京市朝阳区...', '北京市东城区...', '北京市海淀区...'],
    'cardType|1': ['身份证', '未记录'],
    'cardNo|1': ['@id', '未记录'],
    foundedTime: '@datetime("yyyy-MM-dd")',
    updateTime: '@datetime("yyyy-MM-dd")',
    'status|1': ['正常', '废弃']
  }))
}

module.exports = [
  {
    url: '/demo/data-maintenance/branch/list1',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list1.filter(item => {
        if (filter.reportType && item.reportType !== filter.reportType) { return false }
        if (filter.dataYear && item.dataStartTime !== filter.dataYear) { return false }
        return !(filter.dataMonth && item.dataMonth !== filter.dataMonth)
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
  },
  {
    url: '/demo/data-maintenance/branch/list2',
    type: 'get',
    response: config => {
      const pagination = JSON.parse(config.query.pagination)
      const pageList = list2.filter((item, index) => index < pagination.limit * pagination.page && index >= pagination.limit * (pagination.page - 1))

      return {
        code: 20000,
        data: {
          total: list2.length,
          list: pageList
        }
      }
    }
  }
]
