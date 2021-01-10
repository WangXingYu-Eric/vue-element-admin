import Layout from '@/layout/index'

const baseSettingsRouter =
  {
    path: '/demo/base-settings',
    redirect: '/demo/base-settings/check-role/index',
    hidden: false,
    component: Layout,
    name: 'DemoBaseSettings',
    meta: { title: 'demo.baseSettings.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'check-role/index',
        component: () => import('@/views/demo/base-settings/check-role/index.vue'),
        name: 'CheckRoleIndex',
        meta: { title: 'demo.baseSettings.children.checkRole.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'report-parameter/index',
        component: () => import('@/views/demo/base-settings/report-parameter/index.vue'),
        name: 'ReportParameterIndex',
        meta: { title: 'demo.baseSettings.children.reportParameter.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'code-transfer/index',
        component: () => import('@/views/demo/base-settings/code-transfer/index.vue'),
        name: 'CodeTransferIndex',
        meta: { title: 'demo.baseSettings.children.codeTransfer.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'group-role/index',
        component: () => import('@/views/demo/base-settings/group-role/index.vue'),
        name: 'GroupRoleIndex',
        meta: { title: 'demo.baseSettings.children.groupRole.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'user-group/index',
        component: () => import('@/views/demo/base-settings/user-group/index.vue'),
        name: 'UserGroupIndex',
        meta: { title: 'demo.baseSettings.children.userGroup.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'data-clean-config/index',
        component: () => import('@/views/demo/base-settings/data-clean-config/index.vue'),
        name: 'DataCleanConfig',
        meta: { title: 'demo.baseSettings.children.dataCleanConfig.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'timed-task-management/index',
        component: () => import('@/views/demo/base-settings/timed-task-management/index.vue'),
        name: 'TimedTaskManagement',
        meta: { title: 'demo.baseSettings.children.timedTaskManagement.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'dictionary/index',
        component: () => import('@/views/demo/base-settings/dictionary/index.vue'),
        name: 'dictionary',
        meta: { title: 'demo.baseSettings.children.dictionary.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'role/index',
        component: () => import('@/views/demo/base-settings/role/index.vue'),
        name: 'Role',
        meta: { title: 'demo.baseSettings.children.role.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'user/index',
        component: () => import('@/views/demo/base-settings/user/index.vue'),
        name: 'User',
        meta: { title: 'demo.baseSettings.children.user.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default baseSettingsRouter
