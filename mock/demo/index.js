// 基础信息配置
const baseSettingsCheckRole = require('./base-settings/check-role')
const baseSettingsReportParameter = require('./base-settings/report-parameter')
const baseSettingsCodeTransfer = require('./base-settings/code-transfer')
const baseSettingsGroupRole = require('./base-settings/group-role')

module.exports = [
  // 基础信息配置
  ...baseSettingsCheckRole,
  ...baseSettingsReportParameter,
  ...baseSettingsCodeTransfer,
  ...baseSettingsGroupRole
]
