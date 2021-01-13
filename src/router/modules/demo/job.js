import Layout from '@/layout/index'

const jobRouter =
  {
    path: '/demo/job',
    redirect: '/demo/job/east-query/index',
    hidden: false,
    component: Layout,
    alwaysShow: true,
    name: 'DemoJob',
    meta: { title: 'demo.job.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'east-query/index',
        component: () => import('@/views/demo/job/east-query/index.vue'),
        name: 'EastQueryIndex',
        meta: { title: 'demo.job.children.eastQuery.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default jobRouter
