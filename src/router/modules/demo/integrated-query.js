import Layout from '@/layout/index'

const integratedQueryRouter =
  {
    path: '/demo/integrated-query',
    redirect: '/demo/integrated-query/data-status/index',
    hidden: false,
    component: Layout,
    name: 'DemoIntegratedQuery',
    meta: { title: 'demo.integratedQuery.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'core-query/index',
        component: () => import('@/views/demo/integrated-query/core-query/index.vue'),
        name: 'CoreQueryIndex',
        meta: { title: 'demo.integratedQuery.children.coreQuery.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'data-status/index',
        component: () => import('@/views/demo/integrated-query/data-status/index.vue'),
        name: 'DataStatusIndex',
        meta: { title: 'demo.integratedQuery.children.dataStatus.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'maintenance-status/index',
        component: () => import('@/views/demo/integrated-query/maintenance-status/index.vue'),
        name: 'MaintenanceStatusIndex',
        meta: { title: 'demo.integratedQuery.children.maintenanceStatus.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'check-status/index',
        component: () => import('@/views/demo/integrated-query/check-status/index.vue'),
        name: 'CheckStatusIndex',
        meta: { title: 'demo.integratedQuery.children.checkStatus.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'audit-status/index',
        component: () => import('@/views/demo/integrated-query/audit-status/index.vue'),
        name: 'AuditStatusIndex',
        meta: { title: 'demo.integratedQuery.children.auditStatus.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'branch-reporting-log/index',
        component: () => import('@/views/demo/integrated-query/branch-reporting-log/index.vue'),
        name: 'BranchReportingLog',
        meta: { title: 'demo.integratedQuery.children.branchReportingLog.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'rule-hit-statistics/index',
        component: () => import('@/views/demo/integrated-query/rule-hit-statistics/index.vue'),
        name: 'RuleHitStatistics',
        meta: { title: 'demo.integratedQuery.children.ruleHitStatistics.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'report-problem-summary/index',
        component: () => import('@/views/demo/integrated-query/report-problem-summary/index.vue'),
        name: 'ReportProblemSummary',
        meta: { title: 'demo.integratedQuery.children.reportProblemSummary.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default integratedQueryRouter
