const Mock = require('mockjs')

const list = []
for (let i = 0; i < 100; i++) {
  list.push(Mock.mock({
    id: '@increment',
    'reportArea|1': ['浙江分公司', '大连分公司', '宁波分公司', '上海分公司'],
    'licenseCode|603927001-603907999': 603907999,
    'superviseCode|000001-603907999': 603907999,
    reportType: '持续采集',
    'reportWay|1': ['线上', '线下', 'FTP'],
    'date|1': ['2020-10-11', '2021-01-02']
  }))
}

module.exports = [
  {
    url: '/demo/package/report-parameter/list',
    type: 'get',
    response: config => {
      const pagination = JSON.parse(config.query.pagination)
      const pageList = list.filter((item, index) => index < pagination.limit * pagination.page && index >= pagination.limit * (pagination.page - 1))
      return {
        code: 20000,
        data: {
          total: list.length,
          list: pageList
        }
      }
    }
  }
]
