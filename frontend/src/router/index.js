import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () =>import('@/views/auth/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () =>import('@/views/auth/register.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () =>import('@/views/admin.vue' ) , 
      children:[
        {
          path: '',
          name: 'books',
          component: () =>import('@/views/admin/books.vue')
        },
        {
          path: '/insert',
          name: 'insert',
          component: () =>import('@/views/admin/form_add.vue')
        },
        {
          path: '/edit/:id',
          name: 'edit',
          component: () =>import('@/views/admin/form_edit.vue'),
          props: true
        },
      ]
    },
  ]
})

export default router
