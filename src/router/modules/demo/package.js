import Layout from '@/layout/index'

const packageRouter =
  {
    path: '/demo/package',
    redirect: '/demo/package/report-parameter/index',
    hidden: false,
    component: Layout,
    name: 'Package',
    meta: { title: 'demo.package.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'report-parameter/index',
        component: () => import('@/views/demo/package/report-parameter/index.vue'),
        name: 'ReportParameterIndex',
        meta: { title: 'demo.package.children.reportParameter.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'code-transfer/index',
        component: () => import('@/views/demo/package/code-transfer/index.vue'),
        name: 'CodeTransferIndex',
        meta: { title: 'demo.package.children.codeTransfer.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'check-role/index',
        component: () => import('@/views/demo/package/check-role/index.vue'),
        name: 'CheckRoleIndex',
        meta: { title: 'demo.package.children.checkRole.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'data-source-setting',
        component: () => import('@/views/demo/package/data-source-setting/index.vue'),
        name: 'DataSourceSettingIndex',
        meta: { title: 'demo.package.children.dataSourceSetting.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'data-clean-config/index',
        component: () => import('@/views/demo/package/data-clean-config/index.vue'),
        name: 'DataCleanConfig',
        meta: { title: 'demo.package.children.dataCleanConfig.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'index',
        component: () => import('@/views/demo/package/workflow/index.vue'),
        name: 'WorkflowIndex',
        meta: { title: 'demo.workflow.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'timed-task-management/index',
        component: () => import('@/views/demo/base-settings/timed-task-management/index.vue'),
        name: 'TimedTaskManagement',
        meta: { title: 'demo.baseSettings.children.timedTaskManagement.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default packageRouter
