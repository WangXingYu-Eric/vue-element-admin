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
    dataStartTime: '@datetime("2020-MM-dd")',
    dataEndTime: '@datetime("2020-MM-dd")',
    dataProcessTime: '@datetime("2020-MM-dd HH:mm:ss")'
  }))
}

const list2 = []
for (let i = 0; i < 3; i++) {
  list2.push(Mock.mock({
    id: '@increment',
    jrjgmc: '中国**银行',
    jrxkzh: 3055498814,
    jgdm: 'MSIUF4955',
    nbjgh: '465461879',
    name: '@cname',
    code: /^[MS](0000015)\d{3}$/,
    zjhm: '',
    startTime: '@datetime("2020-MM-dd")',
    endTime: '@datetime("2020-MM-dd")',
    pfTime: '@datetime("2020-MM-dd")',
    'gwrzxx|1': ['董事长', '高级总裁', '高级副总裁', '董事'],
    cfxh: /^[MS](0000015)\d{3}$/,
    cfjg: '',
    cfzl: '',
    cfyy: '',
    cfje: '',
    'zw|1': ['董事长', '高级总裁', '高级副总裁', '董事'],
    entryTime: '@datetime("2020-MM-dd")',
    leaveTime: '@datetime("2020-MM-dd")',
    birthday: '@datetime("2020-MM-dd")',
    'zjlb|1': ['身份证', '驾照', '护照', '户口本'],
    cardNo: '@id'
  }))
}

module.exports = [
  {
    url: '/demo/data-maintenance/dongjiangao/list1',
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
    url: '/demo/data-maintenance/dongjiangao/list2',
    type: 'get',
    response: config => {
      const filter = JSON.parse(config.query.filter)
      const pagination = JSON.parse(config.query.pagination)
      const filteredList = list2.filter(item => {
        if (filter.name && item.name !== filter.name) { return false }
        if (filter.gender && item.gender !== filter.gender) { return false }
        if (filter.cardNo && item.cardNo !== filter.cardNo) { return false }
        if (filter.cardType && item.cardType !== filter.cardType) { return false }
        return !(filter.birthday && item.birthday !== filter.birthday)
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
