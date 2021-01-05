// 基础信息配置
const baseSettingsCheckRole = require('./base-settings/check-role')
const baseSettingsReportParameter = require('./base-settings/report-parameter')

module.exports = [
  // 基础信息配置
  ...baseSettingsCheckRole,
  ...baseSettingsReportParameter
]
