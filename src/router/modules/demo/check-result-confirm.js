import Layout from '@/layout/index'

const checkResultConfirmRouter =
  {
    path: '/demo/check-result-confirm',
    redirect: '/demo/check-result-confirm/index',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoCheckResultConfirm',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/check-result-confirm/index.vue'),
        name: 'CheckResultConfirmIndex',
        meta: { title: 'demo.checkResultConfirm.title', icon: '', affix: false, noCache: true, roles: ['admin'] }
      }
    ]
  }

export default checkResultConfirmRouter
