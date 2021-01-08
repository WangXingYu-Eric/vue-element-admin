import Layout from '@/layout/index'

const dataCollectionRouter =
  {
    path: '/demo/data-collection',
    redirect: '/demo/data-collection/index',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoDataCollection',
    meta: { title: 'demo.dataCollection.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/data-collection/index.vue'),
        name: 'DataCollectionIndex',
        meta: { title: 'demo.dataCollection.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'data-source-setting',
        component: () => import('@/views/demo/data-collection/data-source-setting/index.vue'),
        name: 'DataSourceSettingIndex',
        meta: { title: 'demo.dataCollection.children.dataSourceSetting.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default dataCollectionRouter
