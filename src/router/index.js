import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Registration from '@/views/Register'
import Test from '@/views/Test'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/register',
      name: '注册页面',
      component: Registration
    },
    {
      path: '/test',
      name: '测试',
      component: Test
    }
  ]
})
