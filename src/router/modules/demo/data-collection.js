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
      },
      {
        path: 'mapping-setting',
        component: () => import('@/views/demo/data-collection/mapping-setting/index.vue'),
        name: 'MappingSettingIndex',
        meta: { title: 'demo.dataCollection.children.mappingSetting.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'mapping-setting/edit',
        component: () => import('@/views/demo/data-collection/mapping-setting/edit.vue'),
        name: 'MappingSettingEdit',
        meta: { title: 'demo.dataCollection.children.mappingSettingEdit.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        hidden: true,
        path: 'mapping-setting/check-rule',
        component: () => import('@/views/demo/data-collection/mapping-setting/check-rule.vue'),
        name: 'CheckRule',
        meta: { title: 'demo.dataCollection.children.checkRule.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default dataCollectionRouter
