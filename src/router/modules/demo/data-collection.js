import Layout from '@/layout/index'

const dataCollectionRouter =
  {
    path: '/demo/data-collection',
    redirect: '/demo/data-collection/mapping-setting/index',
    hidden: false,
    component: Layout,
    alwaysShow: true,
    name: 'DemoDataCollection',
    meta: { title: 'demo.dataCollection.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'mapping-setting/index',
        component: () => import('@/views/demo/data-collection/mapping-setting/index.vue'),
        name: 'MappingSettingIndex',
        meta: { title: 'demo.dataCollection.children.mappingSetting.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default dataCollectionRouter
