import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'mainlayout',
    component: () => import('@/views/layout/MainLayout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 1.判断用户是否登录, 用户访问登录页，如果有token，跳转首页
  const token = localStorage.getItem('authorization-token')
  if (to.path === '/login' && token) {
    next('/')
    return
  }
  // 2. 用户访问非登录页, 如果没有token, 跳转登录页
  if (to.path !== '/login' && !token) {
    next('/login')
    return
  }
  next()
})

export default router
