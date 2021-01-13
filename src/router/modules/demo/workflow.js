import Layout from '@/layout/index'

const workflowRouter =
  {
    path: '/demo/workflow',
    redirect: '/demo/workflow/index',
    hidden: false,
    component: Layout,
    name: 'DemoWorkflow',
    meta: { title: 'demo.workflow.title', icon: '', affix: false, roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/demo/workflow/index.vue'),
        name: 'WorkflowIndex',
        meta: { title: 'demo.workflow.title', icon: '', affix: false, roles: ['admin'] }
      }
    ]
  }

export default workflowRouter
