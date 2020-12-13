import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/h5/pages/home/index',
    component: () => import('@/views/Index')
  },
  {
    path: '/shopcar',
    component: () => import('@/views/Shopcar')
  },
  {
    path: '/center/home',
    component: () => import('@/views/Center')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    component: () => import('@/views/Register')
  },
  {
    path: '/pages/jd-union/list',
    component: () => import('@/views/Youhui')
  },
  {
    path: '/pages/cate/cate-home',
    component: () => import('@/views/List')
  },
  {
    path: '/pages/detail/detail',
    component: () => import('@/views/category/Category')
  },
  {
    path: '/h5/pages/detail',
    component: () => import('@/views/YouDetail')
  },
  {
    path: '/classify',
    component: () => import('@/views/Classify')
  },
  {
    path: '*',
    redirect: '/h5/pages/home/index'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const address = ['/center/home']
  if (address.includes(to.path)) {
    if (localStorage.getItem('username') && (localStorage.getItem('password'))) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
