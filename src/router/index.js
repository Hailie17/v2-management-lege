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
    path: '*',
    component: () => import('../views/404.vue')
  },
  {
    path: '/',
    name: 'mainlayout',
    component: () => import('@/views/layout/MainLayout.vue'),
    redirect: '/home',
    children: [
      // {
      //   path: '/home',
      //   component: () => import('../views/HomeView.vue')
      // },
      // {
      //   path: '/business/appointment',
      //   component: () => import('../views/business/Appointment.vue')
      // },
      // {
      //   path: '/business/service',
      //   component: () => import('../views/business/Service.vue')
      // },
      // {
      //   path: '/business/statement',
      //   component: () => import('../views/business/Statement.vue')
      // },
      // {
      //   path: '/customer/customer',
      //   component: () => import('../views/customer/Customer.vue')
      // },
      // {
      //   path: '/customer/visit',
      //   component: () => import('../views/customer/Visit.vue')
      // },
      // {
      //   path: '/flow/definition',
      //   component: () => import('../views/flow/Definition.vue')
      // }
    ]
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
    let newUserMenuData = [{ title: '首页', path: '/', icon: 'dashboard' }]
    if (!menuDataRes) return
    // 菜单
    const ret = menuDataRes.data.map(item => {
      if (item.children) {
        return {
          title: item.meta.title,
          icon: item.meta.icon,
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
          icon: item.meta.icon,
          path: item.path
        }
      }
    })
    newUserMenuData = [...newUserMenuData, ...ret]
    store.commit('userMenuData/changeMenuData', newUserMenuData)
    // 动态添加路由
    let newChildrenRoutes = [{
      path: '/home',
      component: () => import('../views/HomeView.vue')
    }]
    menuDataRes.data.forEach(item => {
      const rets = item.children.map(sitem => {
        return {
          path: item.path + '/' + sitem.path,
          component: () => import(`../views${item.path}/${sitem.name}.vue`)
        }
      })
      newChildrenRoutes = [...newChildrenRoutes, ...rets]
    })
    newChildrenRoutes.forEach(item => {
      router.addRoute('mainlayout', item)
    })
    // 添加to.path重新走路由守卫，此时路由添加完毕，可以检查出用户能否访问这个路径
    next(to.path)
    return
  }
  next()
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => {
    console.log(err)
  })
}
export default router
