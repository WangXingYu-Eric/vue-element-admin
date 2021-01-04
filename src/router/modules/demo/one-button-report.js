import Layout from '@/layout/index'

const oneButtonReportRouter =
  {
    path: '/demo/one-button-report',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoOneButtonReport',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/one-button-report/index.vue'),
        name: 'OneButtonReportIndex',
        meta: { title: 'demo.oneButtonReport.title', icon: '', affix: false, noCache: true, roles: ['admin'] }
      }
    ]
  }

export default oneButtonReportRouter
