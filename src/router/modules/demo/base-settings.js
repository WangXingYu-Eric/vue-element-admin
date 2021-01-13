import Layout from '@/layout/index'

const baseSettingsRouter =
  {
    path: '/demo/base-settings',
    redirect: '/demo/base-settings/group-role/index',
    hidden: false,
    component: Layout,
    name: 'DemoBaseSettings',
    meta: { title: 'demo.baseSettings.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'group-role/index',
        component: () => import('@/views/demo/base-settings/group-role/index.vue'),
        name: 'GroupRoleIndex',
        meta: { title: 'demo.baseSettings.children.groupRole.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'user-group/index',
        component: () => import('@/views/demo/base-settings/user-group/index.vue'),
        name: 'UserGroupIndex',
        meta: { title: 'demo.baseSettings.children.userGroup.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'role/index',
        component: () => import('@/views/demo/base-settings/role/index.vue'),
        name: 'Role',
        meta: { title: 'demo.baseSettings.children.role.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'user/index',
        component: () => import('@/views/demo/base-settings/user/index.vue'),
        name: 'User',
        meta: { title: 'demo.baseSettings.children.user.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'dictionary/index',
        component: () => import('@/views/demo/base-settings/dictionary/index.vue'),
        name: 'dictionary',
        meta: { title: 'demo.baseSettings.children.dictionary.title', icon: '', affix: false, roles: ['admin'] }
      },
      {
        path: 'notice-management/index',
        component: () => import('@/views/demo/base-settings/notice-management/index.vue'),
        name: 'NoticeManagement',
        meta: { title: 'demo.baseSettings.children.noticeManagement.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default baseSettingsRouter
