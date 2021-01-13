// 系统管理

const baseSettingsGroupRole = require('./base-settings/group-role')
const baseSettingsUserGroup = require('./base-settings/user-group')
const baseSettingDictionary = require('./base-settings/dictionary')
const baseSettingTimedTaskManagement = require('./base-settings/timedTaskManagement')
const baseSettingNoticeManagement = require('./base-settings/noticeManagement')
const baseSettingRole = require('./base-settings/role')
const baseSettingUser = require('./base-settings/user')

// 配置管理
const packageReportParameter = require('./package/report-parameter')
const packageCodeTransfer = require('./package/code-transfer')
const packageCheckRole = require('./package/check-role')
const packageDataSourceSetting = require('./package/data-source-setting')
const packageDataCleanConfig = require('./package/data-clean-config')

// 上报任务管理
const jobEastQuery = require('./job/east-query')

// 数据采集
const dataCollectionIndex = require('./data-collection/index')
const dataCollectionMappingSetting = require('./data-collection/mapping-setting')

// 数据确认
const dataSplitCheck = require('./data-split-check')

// 数据校验
const dataCheckOne = require('./data-check/data-checkOne')

// 数据审核
const dataAudit = require('./data-audit')

// 数据审批
const dataApporval = require('./data-approval')

// 回执处理
const receipt = require('./receipt')

// 特殊表维护
const dataMaintenanceDongjiangao = require('./data-maintenance/dongjiangao')
const dataMaintenanceBranch = require('./data-maintenance/branch')
const dataMaintenanceRoupEquity = require('./data-maintenance/groupEquity')
const dataMaintenanceEntrustedInvestment = require('./data-maintenance/entrustedInvestment')
const dataMaintenanceAssociatedInformation = require('./data-maintenance/associatedInformation')
const dataMaintenanceImportantAssociated = require('./data-maintenance/importantAssociated')

// 一键上报
const oneButtonReport = require('./oneButtonReport.js')

// 综合查询
const integratedQueryCoreQuery = require('./integrated-query/core-query')

module.exports = [
  // 系统管理
  ...baseSettingsGroupRole,
  ...baseSettingsUserGroup,
  ...baseSettingDictionary,
  ...baseSettingTimedTaskManagement,
  ...baseSettingNoticeManagement,
  ...baseSettingRole,
  ...baseSettingUser,

  // 配置管理
  ...packageReportParameter,
  ...packageCodeTransfer,
  ...packageCheckRole,
  ...packageDataSourceSetting,
  ...packageDataCleanConfig,

  // 上报任务管理
  ...jobEastQuery,

  // 数据系统采集
  ...dataCollectionIndex,
  ...dataCollectionMappingSetting,

  // 数据确认
  ...dataSplitCheck,
  // 数据校验
  ...dataCheckOne,
  // 数据审核
  ...dataAudit,
  // 数据审批
  ...dataApporval,
  // 特殊表维护
  ...dataMaintenanceDongjiangao,
  ...dataMaintenanceBranch,
  ...dataMaintenanceRoupEquity,
  ...dataMaintenanceEntrustedInvestment,
  ...dataMaintenanceAssociatedInformation,
  ...dataMaintenanceImportantAssociated,

  // 一键上报
  ...oneButtonReport,

  // 综合查询
  ...integratedQueryCoreQuery,

  ...receipt
]
