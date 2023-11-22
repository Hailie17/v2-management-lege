import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { GetRoutersApi } from '@/request/api'

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

router.beforeEach(async (to, from, next) => {
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

  // 获取用户菜单数据
  if (token && store.state.userMenuData.menuData.length === 0) {
    const menuDataRes = await GetRoutersApi()
    let newUserMenuData = [{ title: '首页', path: '/' }]
    let ret = menuDataRes.data.map(item => {
      if (item.children) {
        return {
          title: item.meta.title,
          path: item.path,
          children: item.children.map(child => {
            return {
              title: child.meta.title,
              path: item.path + '/' + child.path
            }
          })
        }
      } else {
        return {
          title: item.meta.title,
          path: item.path
        }
      }
    })
    newUserMenuData = [...newUserMenuData, ...ret]
    store.commit('userMenuData/changeMenuData', newUserMenuData)
  }
  next()
})

export default router
