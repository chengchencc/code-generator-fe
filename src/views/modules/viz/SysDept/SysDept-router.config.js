import { RouteView } from '@/layouts/index'
import { bxAnaalyse } from '@/core/icons'

export const viz = {
path: '/tree',
name: 'tree',
meta: { title: 'tree', icon: 'code' },
component: RouteView,
redirect: '/tree/SysDept/index',
children: [
    {
    path: '/tree/SysDept/index',
    name: 'SysDeptManager',
    component: () => import('@/views/modules/viz/SysDept/SysDeptManager'),
    meta: { title: '部门表', keepAlive: false, icon: bxAnaalyse, permissions: [] }
    }
]
}
