import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "@firebase/auth";
 
import store from '../store';
 

const routes = [
    //dashboard
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "index2" */ '../views/home/Home.vue'),
      meta: { layout: 'app'  }, 
  },

    {
      path: '/comissao',
      name: 'RelComissao',
      component: () => import(/* webpackChunkName: "auth-login-boxed" */ '../views/comissao/Comissao.vue'),
      meta: { layout: 'app'  }, 
    },

    {
      path: '/comissaosintetica',
      name: 'RelComissaoSintetica',
      component: () => import(/* webpackChunkName: "auth-login-boxed" */ '../views/comissao/ComissaoSintetica.vue'),
      meta: { layout: 'app'  }, 
    },
  {
      path: '/comissaogerencial',
      name: 'RelComissaoGerencial',
      component: () => import(/* webpackChunkName: "auth-login-boxed" */ '../views/comissao/ComissaoGerencial.vue'),
      meta: { layout: 'app'  }, 
    },

    {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import(/* webpackChunkName: "index2" */ '../views/cadastro/Cadastro.vue'),
        meta: { requiresAuth: true }, 
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import(/* webpackChunkName: "index2" */ '../views/usuarios/Usuarios.vue'),
        meta: { requiresAuth: true }, 
    },
    {
        path: '/checkpoint',
        name: 'checkpoint',
        component: () => import(/* webpackChunkName: "index2" */ '../views/checkpoint/Checkpoint.vue'),
        meta: { requiresAuth: true }, 
    },
    {
      path: '/regrascomissao',
      name: 'regrascomissao',
      component: () => import(/* webpackChunkName: "index2" */ '../views/regrascomissao/RegrasComissao.vue'),
      meta: { requiresAuth: true }, 
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "auth-login" */ '../views/auth/login.vue'),
    meta: { layout: 'auth' },
}
      
];

const router = new createRouter({
    // mode: 'history',
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});
 
 

router.beforeEach((to, from, next) => {
    if (to.meta.layout == 'auth') {
        store.commit('setLayout', 'app');
    } else {
        store.commit('setLayout', 'app');
    }
    next(true);
});

export default router;
 
