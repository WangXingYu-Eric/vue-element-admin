import Layout from '@/layout/index'

const integratedQueryRouter =
  {
    path: '/demo/integrated-query',
    redirect: '/demo/integrated-query/data-status/index',
    hidden: false,
    component: Layout,
    alwaysShow: true,
    name: 'DemoIntegratedQuery',
    meta: { title: 'demo.integratedQuery.title', icon: '', affix: false, roles: ['admin'] },
    children: [
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
      }
    ]
  }

export default integratedQueryRouter
