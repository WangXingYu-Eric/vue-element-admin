import Layout from '@/layout/index'

const oneButtonReportRouter =
  {
    path: '/demo/one-button-report',
    redirect: '/demo/one-button-report/index',
    hidden: false,
    component: Layout,
    name: 'DemoOneButtonReport',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/one-button-report/index.vue'),
        name: 'OneButtonReportIndex',
        meta: { title: 'demo.oneButtonReport.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default oneButtonReportRouter
