import Layout from '@/layout/index'

const receiptRouter =
  {
    path: '/demo/data-audit',
    redirect: '/demo/data-audit/index',
    hidden: false,
    component: Layout,
    alwaysShow: false,
    name: 'DemoReceipt',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/receipt/index.vue'),
        name: 'ReceiptIndex',
        meta: { title: 'demo.receipt.title', icon: '', affix: false, noCache: true, roles: ['admin'] }
      }
    ]
  }

export default receiptRouter
