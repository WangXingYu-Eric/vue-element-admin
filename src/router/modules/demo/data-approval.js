import Layout from '@/layout/index'

const dataApprovalRouter =
  {
    path: '/demo/data-approlva',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoDataApproval',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/data-approval/index.vue'),
        name: 'DataApprovalIndex',
        meta: { title: 'demo. dataApproval.title', icon: '', affix: false, noCache: true, roles: ['admin'] }
      }
    ]
  }

export default dataApprovalRouter
