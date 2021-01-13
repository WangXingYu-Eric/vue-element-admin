import Layout from '@/layout/index'

const dataMaintenanceRouter =
  {
    path: '/demo/data-maintenance',
    redirect: '/demo/data-maintenance/dongjiangao/index',
    hidden: false,
    component: Layout,
    name: 'DemoDataMaintenance',
    meta: { title: 'demo.dataMaintenance.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'dongjiangao/index',
        component: () => import('@/views/demo/data-maintenance/dongjiangao/index.vue'),
        name: 'DongjiangaoIndex',
        meta: { title: 'demo.dataMaintenance.children.dongJianGao.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'branch/index',
        component: () => import('@/views/demo/data-maintenance/branch/index.vue'),
        name: 'BranchIndex',
        meta: { title: 'demo.dataMaintenance.children.branch.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'groupEquity/index',
        component: () => import('@/views/demo/data-maintenance/groupEquity/index.vue'),
        name: 'GroupEquityIndex',
        meta: { title: 'demo.dataMaintenance.children.groupEquity.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'entrustedInvestment/index',
        component: () => import('@/views/demo/data-maintenance/entrustedInvestment/index.vue'),
        name: 'EntrustedInvestmentIndex',
        meta: { title: 'demo.dataMaintenance.children.entrustedInvestment.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'associatedInformation/index',
        component: () => import('@/views/demo/data-maintenance/associatedInformation/index.vue'),
        name: 'AssociatedInformationIndex',
        meta: { title: 'demo.dataMaintenance.children.associatedInformation.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'associatedAggregate/index',
        component: () => import('@/views/demo/data-maintenance/associatedAggregate/index.vue'),
        name: 'ImportantAssociatedIndex',
        meta: { title: 'demo.dataMaintenance.children.importantAssociated.title', icon: '', affix: false, roles: ['admin'] }
      }
      // {
      //   path: 'associated-aggregate/index',
      //   component: () => import('@/views/demo/data-maintenance/associated-aggregate/index.vue'),
      //   name: 'AssociatedAggregateIndex',
      //   meta: { title: 'demo.dataMaintenance.children.associatedAggregate.title', icon: '', affix: false, roles: ['admin'] }
      // },
      // {
      //   path: 'autonomous-investment-position-details/index',
      //   component: () => import('@/views/demo/data-maintenance/autonomous-investment-position-details/index.vue'),
      //   name: 'AutonomousInvestmentPositionDetailsIndex',
      //   meta: { title: 'demo.dataMaintenance.children.autonomousInvestmentPositionDetails.title', icon: '', affix: false, roles: ['admin'] }
      // },
      // {
      //   path: 'autonomous-investment-record/index',
      //   component: () => import('@/views/demo/data-maintenance/autonomous-investment-record/index.vue'),
      //   name: 'AutonomousInvestmentRecordIndex',
      //   meta: { title: 'demo.dataMaintenance.children.autonomousInvestmentRecord.title', icon: '', affix: false, roles: ['admin'] }
      // },
      // {
      //   path: 'autonomous-investment-aggregate/index',
      //   component: () => import('@/views/demo/data-maintenance/autonomous-investment-aggregate/index.vue'),
      //   name: 'AutonomousInvestmentAggregateIndex',
      //   meta: { title: 'demo.dataMaintenance.children.autonomousInvestmentAggregate.title', icon: '', affix: false, roles: ['admin'] }
      // }
    ]
  }

export default dataMaintenanceRouter
