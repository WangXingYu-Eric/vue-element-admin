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
    jrjgmc: '中国**银行',
    qqfrsbm: 3055498814,
    jgdm: 'MSIUF4955',
    nbjgh: '465461879',
    sjgljgdm: '7987546',
    sjgljgmc: '中国***',
    clsj: '@datetime("yyyy-MM-dd")',
    yysj: '营业',
    zcdq: '*****',
    zcdz: '******',
    zczb: '1000000000元',
    yzbm: '100010',
    frxm: '刘**',
    zyfzrxm: '刘**'

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
