/** 将demo演示的路由模块话,方便后期维护 **/

import baseSettingsRouter from './base-settings'
import packageRouter from './package'
import jobRouter from './job'
import dataCollectionRouter from './data-collection'
import dataCheck from './data-check'
import dataMaintenance from './data-maintenance'
import dataSplitCheckRouter from './data-split-check'
import dataAuditRouter from './data-audit'
import dataApprovalRouter from './data-approval'
import oneButtonReportRouter from './one-button-report'
import receiptRouter from './receipt'
import integratedQueryRouter from './integrated-query'
import workflowRouter from './workflow'

const demoRouter = [
  // 系统管理
  baseSettingsRouter,
  // 配置管理
  packageRouter,
  // 上报任务管理
  jobRouter,
  // 数据采集
  dataCollectionRouter,
  // 特殊表维护
  dataMaintenance,
  // 数据确认
  dataSplitCheckRouter,
  // 数据校验
  dataCheck,
  // 数据审核
  dataAuditRouter,
  // 数据审批
  dataApprovalRouter,
  // 一键上报
  oneButtonReportRouter,
  // 回执处理
  receiptRouter,
  // 综合查询
  integratedQueryRouter,
  // 流程管理
  workflowRouter
]

export default demoRouter
