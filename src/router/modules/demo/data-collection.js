import Layout from '@/layout/index'
import AppMain from '@/layout/components/AppMain'

const dataCollectionRouter =
  {
    path: '/demo/data-collection',
    redirect: '/demo/data-collection/mapping-setting/index',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoDataCollection',
    meta: { title: 'demo.dataCollection.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'standard-database',
        redirect: '/demo/data-collection/standard-database/finance/index',
        hidden: false,
        component: AppMain,
        alwaysShow: false,
        name: 'DataCollectionStandardDataBase',
        meta: { title: 'demo.dataCollection.children.standardDataBase.title', icon: '', affix: false, roles: ['admin'] },
        children: [
          {
            path: 'finance/index',
            component: () => import('@/views/demo/data-collection/standard-database/finance/index'),
            name: 'FinanceIndex',
            meta: { title: 'demo.dataCollection.children.standardDataBase.children.finance.title', icon: '', affix: false, roles: ['admin'] }
          },
          {
            path: 'car/index',
            component: () => import('@/views/demo/data-collection/standard-database/car/index'),
            name: 'CarIndex',
            meta: { title: 'demo.dataCollection.children.standardDataBase.children.car.title', icon: '', affix: false, roles: ['admin'] }
          },
          {
            hidden: true,
            path: 'standard-database/details',
            component: () => import('@/views/demo/data-collection/standard-database/details.vue'),
            name: 'StandardDataBaseDetails',
            meta: { title: 'demo.dataCollection.children.standardDataBase.children.details.title', icon: '', affix: false, roles: ['admin'] }
          }
        ]
      },
      {
        path: 'index',
        component: () => import('@/views/demo/data-collection/index.vue'),
        name: 'DataCollectionIndex',
        meta: { title: 'demo.dataCollection.title', icon: '', affix: false, roles: ['admin'] }
      },
      // {
      //   path: 'data-source-setting',
      //   component: () => import('@/views/demo/data-collection/data-source-setting/index.vue'),
      //   name: 'DataSourceSettingIndex',
      //   meta: { title: 'demo.dataCollection.children.dataSourceSetting.title', icon: '', affix: false, roles: ['admin'] }
      // },
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
      },
      {
        path: 'additional',
        component: () => import('@/views/demo/data-collection/additional.vue'),
        name: 'DataCollectionAdditional',
        meta: { title: 'demo.dataCollection.children.additional.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default dataCollectionRouter
