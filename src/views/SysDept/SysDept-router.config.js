import { RouteView } from '@/layouts/index'
import { bxAnaalyse } from '@/core/icons'
export const viz = {
  path: '/viz',
  name: 'viz',
  meta: { title: 'viz', icon: 'code' },
  component: RouteView,
  redirect: '/SysDept/index',
  children: [
    {
      path: '/SysDept/index',
      name: 'SysDeptManager',
      component: () => import('@/views/SysDept/SysDeptManager'),
      meta: { title: '部门表', keepAlive: false, icon: bxAnaalyse }
    }
  ]
}
