import Vue from "vue"
import Router from "vue-router"
import Login from "./view/login/index.vue"
import Layout from "@/components/layout.vue"
import Home from "./view/home"
import Member from "./view/member"
import Staff from "./view/staff"
import Goods from "./view/goods"
import Supplier from "./view/supplier"
Vue.use(Router);
export default new Router({
    // mode:"history",
    routes:[
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect:'/home',
            children:[
               { 
                   path:'/home',
                   component:Home,
                   meta:{tit:'首页'}
            
                }
                // {
                //     path: '/supplier',
                //     component: Supplier,
                //     meta: { tit: '商品' }

                // }

        ]
        },
        {
            path: '/member',
            component: Layout,
            children:[{
                    path: '/member',
                    component: Member,
                    meta: { tit: '会员' }

            }]
        },
        {
            path: '/staff',
            component: Layout,
            children: [{
                path: '/',
                    component: Staff,
                    meta: { tit: '员工' }

            }]
        },
        {
            path: '/goods',
            component: Layout,
            children: [{
                    path: '/goods',
                    component: Goods,
                    meta: { tit: '商品' }

            }]
        },
        {
            path: '/supplier',
            component: Layout,
            children: [{
                    path: '/',
                    component: Supplier,
                    meta: { tit: '商品' }

            }]
        },
        {
            path:'/login',
            name:'login',
            component:Login
        }
    ]
})