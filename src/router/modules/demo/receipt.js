import Layout from '@/layout/index'

const receiptRouter =
  {
    path: '/demo/receipt',
    redirect: '/demo/receipt/index',
    hidden: false,
    component: Layout,
    name: 'DemoReceipt',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/receipt/index.vue'),
        name: 'ReceiptIndex',
        meta: { title: 'demo.receipt.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default receiptRouter
