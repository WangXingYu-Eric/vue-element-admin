const Mock = require('mockjs')

const list1 = []
for (let i = 0; i < 2; i++) {
  list1.push(Mock.mock({
    id: '@increment',
    jobNumber: /^[MS](0000015)\d{3}$/,
    a: '文件生成成功',
    b: '校验通过',
    dataStartTime: '@datetime("2020-MM-dd")',
    dataEndTime: '@datetime("2020-MM-dd")',
    dataProcessTime: '@datetime("2020-MM-dd HH:mm:ss")'
  }))
}

const list2 = []
for (let i = 0; i < 3; i++) {
  list2.push(Mock.mock({
    id: '@increment',
    'ywb|1': ['上海中科软', '深圳中科软'],
    'bmc|1': ['2021年', '2020年'],
    zdbm: '0000-000000-2021-02-01.zip',
    tqzt: '文件生成成功',
    tqsl: '数据包封装完毕',
    rzms: '@datetime("2020-MM-dd")'
  }))
}

module.exports = [
  {
    url: '/demo/oneButtonReport/list1',
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
    url: '/demo/oneButtonReport/list2',
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
