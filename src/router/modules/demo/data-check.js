import Layout from '@/layout/index'

const dataCheckRouter =
  {
    path: '/demo/data-check',
    redirect: '/demo/data-check/data-checkOne/index',
    hidden: false,
    component: Layout,
    name: 'DemoDataCheck',
    meta: { title: 'demo.dataCheck.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'data-checkOne/index',
        component: () => import('@/views/demo/data-check/data-checkOne/index.vue'),
        name: 'DataCheckOneIndex',
        meta: { title: 'demo.dataCheck.children.dataCheckOne.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'check-result/index',
        component: () => import('@/views/demo/data-check/check-result/index.vue'),
        name: 'CheckResultIndex',
        meta: { title: 'demo.dataCheck.children.checkResult.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'check-result-confirm/index',
        component: () => import('@/views/demo/data-check/check-result-confirm/index.vue'),
        name: 'CheckResultConfirmIndex',
        meta: { title: 'demo.dataCheck.children.checkResultConfirm.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default dataCheckRouter
