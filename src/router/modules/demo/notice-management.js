import Layout from '@/layout/index'

const noticeManagement =
  {
    path: '/demo/notice-management',
    redirect: '/demo/notice-management/index',
    hidden: false,
    component: Layout,
    name: 'NoticeManagement',
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/notice-management/index.vue'),
        name: 'NoticeManagement',
        meta: { title: 'demo.noticeManagement.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default noticeManagement
