import Layout from '@/layout/index'

const dataSplitCheckRouter =
  {
    path: '/demo/data-split-check',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoDataSplitCheck',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/data-split-check/index.vue'),
        name: 'DataSplitCheckIndex',
        meta: { title: 'demo.dataSplitCheck.title', icon: '', affix: false, noCache: true, roles: ['admin'] }
      }
    ]
  }

export default dataSplitCheckRouter
