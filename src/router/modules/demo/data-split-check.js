import Layout from '@/layout/index'

const dataSplitCheckRouter =
  {
    path: '/demo/data-split-check',
    redirect: '/demo/data-split-check/index',
    hidden: false,
    component: Layout,
    name: 'DemoDataSplitCheck',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/data-split-check/index.vue'),
        name: 'DataSplitCheckIndex',
        meta: { title: 'demo.dataSplitCheck.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default dataSplitCheckRouter
