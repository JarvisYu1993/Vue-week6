import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/products',
        name: '產品列表',
        component: () => import('@/views/Products.vue')
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('@/views/Cart.vue')
      },
      {
        path: '/login',
        name: '登入',
        component: () => import('@/views/Login.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: '後台管理',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '後台產品',
        component: () => import('@/views/Dashboard/Products.vue')
      },
      {
        path: 'orders',
        name: '後台訂單',
        component: () => import('@/views/Dashboard/Orders.vue')
      },
      {
        path: 'coupon',
        name: '後台優惠券',
        component: () => import('@/views/Dashboard/Coupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
