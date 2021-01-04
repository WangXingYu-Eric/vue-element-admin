import Layout from '@/layout/index'

const dataCollectionRouter =
  {
    path: '/demo/data-collection',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoDataCollection',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/data-collection/index.vue'),
        name: 'DataCollectionIndex',
        meta: { title: 'demo.dataCollection.title', icon: '', affix: false, noCache: true, roles: ['admin'] }
      }
    ]
  }

export default dataCollectionRouter
