export const testRouter = {
  children: () => import(/* webpackChunkName: "test" */ '@/views/user/Login')
}
