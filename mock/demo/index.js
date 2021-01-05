// 基础信息配置
const baseSettingsCheckRole = require('./base-settings/check-role')
const baseSettingsReportParameter = require('./base-settings/report-parameter')
const baseSettingsCodeTransfer = require('./base-settings/code-transfer')
const baseSettingsGroupRole = require('./base-settings/group-role')
const baseSettingsUserGroup = require('./base-settings/user-group')

// 任务管理
const jobCoreQuery = require('./job/core-query')
const jobEastQuery = require('./job/east-query')

module.exports = [
  // 基础信息配置
  ...baseSettingsCheckRole,
  ...baseSettingsReportParameter,
  ...baseSettingsCodeTransfer,
  ...baseSettingsGroupRole,
  ...baseSettingsUserGroup,

  // 任务管理
  ...jobCoreQuery,
  ...jobEastQuery
]
