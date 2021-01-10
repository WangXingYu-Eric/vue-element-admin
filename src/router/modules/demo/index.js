/** 将demo演示的路由模块话,方便后期维护 **/

import baseSettingsRouter from './base-settings'
import jobRouter from './job'
import dataCollectionRouter from './data-collection'
import dataMaintenance from './data-maintenance'
import dataSplitCheckRouter from './data-split-check'
import noticeManagement from './notice-management'
import checkResultRouter from './check-result'
import checkResultConfirmRouter from './check-result-confirm'
import dataAuditRouter from './data-audit'
import dataApprovalRouter from './data-approval'
import oneButtonReportRouter from './one-button-report'
import receiptRouter from './receipt'
import integratedQueryRouter from './integrated-query'

const demoRouter = [
  // 基础信息配置
  baseSettingsRouter,
  // 任务管理
  jobRouter,
  // 数据系统采集
  dataCollectionRouter,
  // 数据人工维护
  dataMaintenance,
  // 数据拆分校验管理
  dataSplitCheckRouter,
  noticeManagement,
  // 校验结果维护
  checkResultRouter,
  // 校验结果确认
  checkResultConfirmRouter,
  // 数据审核
  dataAuditRouter,
  // 数据审批
  dataApprovalRouter,
  // 一键上报
  oneButtonReportRouter,
  // 回执处理
  receiptRouter,
  // 综合查询
  integratedQueryRouter
]

export default demoRouter
