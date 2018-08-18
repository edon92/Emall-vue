import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Digital from '../components/digital/digital'
import Computer from '../components/computer/computer'
import Phone from '../components/phone/phone'
import Eletrical from '../components/eletrical/eletrical'
import Detail from '../components/detail/detail'
import Category from 'components/categories/categories'
import GoodData from 'components/categories/components/goodData'
import UserCenter from 'components/user-center/user-center'
import SearchList from 'components/searchList/searchList'
import shopcartListBig from 'components/shopcart-list-big/shopcart-list-big'
import Login from 'components/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/phone',
      component: Phone
    },
    {
      path: '/shopcart-list-big',
      component: shopcartListBig
    },
    {
      path: '/computer',
      component: Computer
    },
    {
      path: '/user-center',
      component: UserCenter
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/digital',
      component: Digital
    },
    {
      path: '/eletrical',
      component: Eletrical
    },
    {
      path: '/detail/productId=:id',
      component: Detail
    },
    {
      path: '/search/searchList=:keyword',
      component: SearchList
    },
    {
      path: '/category',
      component: Category,
      redirect: '/category/keyword=手机',
      children: [
        {
          path: 'keyword=:keyword',
          component: GoodData
        }
      ]
    }
  ]
})
