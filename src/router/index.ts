import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layout/auth-layout.vue'
import AppLayout from '@/layout/app-layout.vue'
import Page404Layout from '@/layout/page-404-layout.vue'

import RouteViewComponent from './route-view.vue'
import store from '../store';
import Token from '@/config/token';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    redirect: { name: '/auth/login' },
  },
  { 
    path: '/', 
    redirect: '/auth/login'
   },
  {
    name: '',
    path: '/admin',
    meta:{auth:['hostess','clouser','senior']},
    component: AppLayout,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        meta:{auth:['hostess','clouser','senior']},
        component: () => import('@/pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'cuestionarios',
        path: 'cuestionarios',
        meta:{auth:['hostess','clouser','senior']},
        component: () => import('@/pages/admin/etapa1/answers/Answers.vue'),
      },      
        {
          name: 'es-potencial',
          path: 'cuestionarios/potencial/:id',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/answers/Potential.vue'),
        },
        {
          name: 'crear-respuesta',
          path: 'cuestionarios/crear-respuesta',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/answers/Create.vue'),
        },
        {
          name: 'ver-respuesta',
          path: 'cuestionarios/:id',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/answers/Show.vue'),
        },
        {
          name: 'editar-respuesta',
          path: 'cuestionarios/editar/:id',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/answers/Edit.vue'),
        },
      {
        name: 'clientes',
        path: 'clientes',
        meta:{auth:['hostess','clouser','senior']},
        component: () => import('@/pages/admin/etapa1/clients/Clients.vue'),
      },
        {
          name: 'crear-cliente',
          path: 'clientes/crear',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/clients/Create.vue'),
        },      
        {
          name: 'ver-cliente',
          path: 'clientes/:id',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/clients/Show.vue'),
        },
        {
          name: 'editar-cliente',
          path: 'clientes/editar/:id',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/clients/Edit.vue'),
        },
      {
        name: 'cotizaciones',
        path: 'cotizaciones',
        meta:{auth:['hostess','clouser','senior']},
        component: () => import('@/pages/admin/etapa1/quotes/Quotes.vue'),
      },
        {
          name: 'crear-cotizacion',
          path: 'cotizaciones/crear/:answer_id?',
          meta:{auth:['hostess','clouser','senior']},
          component: () => import('@/pages/admin/etapa1/quotes/Create.vue'),
        },

      {
          name: 'usuarios',
          path: 'usuarios',
        meta:{auth:['senior']},
          component: () => import('@/pages/admin/users/Users.vue'),
      },
        {
          name: 'crear-usuario',
           path: 'usuarios/crear',
          meta:{auth:['senior']},
          component: () => import('@/pages/admin/users/Create.vue'),
        }, 
        {
          name: 'editar-usuarios',
          path: 'usuarios/editar/:id',
          meta:{auth:['senior']},
          component: () => import('@/pages/admin/users/Edit.vue'),
        },  

    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        meta:{auth:false},
        component: () => import('@/pages/auth/login/Login.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        meta:{auth:false},
        component: () => import('@/pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        name: 'cambiar-password',
        path: 'cambiar-password/:token?',
        meta:{auth:false},
        component: () => import('@/pages/auth/recover-password/ChangePassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    path: '/404',
    component: Page404Layout,
    children: [
      {
        name: 'not-found-advanced',
        path: 'not-found-advanced',
        component: () => import('@/pages/404-pages/VaPageNotFoundSearch.vue'),
      },
      {
        name: 'not-found-simple',
        path: 'not-found-simple',
        component: () => import('@/pages/404-pages/VaPageNotFoundSimple.vue'),
      },
      {
        name: 'not-found-custom',
        path: 'not-found-custom',
        component: () => import('@/pages/404-pages/VaPageNotFoundCustom.vue'),
      },
      {
        name: 'not-found-large-text',
        path: '/pages/not-found-large-text',
        component: () => import('@/pages/404-pages/VaPageNotFoundLargeText.vue'),
      },
    ],
  }
]

let router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes
})


router.beforeEach((to, from, next) => {
 
 let requireAuth:any = to.meta.auth || false;
 let tokenData:any = Token.check();
 let user:any = false;

  if(tokenData){
    user = tokenData.user;
   store.commit('setTokenDataMutation',tokenData)
  }

  console.log(user);



  if(requireAuth){
    if(!user)
      return next({name:'login'})

    if(requireAuth.includes(user.role) )
      return next();

    return next({name:'dashboard'})


 }else{
    if(user)
      return next({name:'dashboard'})
 
   return next();

 }

})

export default router
