import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Panel from '@/components/Panel'
import Users from '@/components/Users'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    component: Dashboard,
    children:[
      {
        path:'/',
        name:'Panel',
        component:Panel
      }   
      ,{
        path: '/users',
        name: 'Users',
        component: Users
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }]
})

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   next()
// })

export default router
