import Vue from 'vue'
import VueRouter from 'vue-router'
import loginService from '../services/loginService'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.name === 'sair') {
      loginService.logout()
      next({ name: 'login' })
    }
    if (to.matched.some(record => record.meta.auth)) {
      if (localStorage.getItem('default_auth_token') == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        if (to.matched.some(record => record.meta.isProfessor)) {
          if (usuario.papel === 'professor') {
            next()
          } else {
            next({ name: 'Livros' })
          }
        } else {
          next()
        }
      }
    } else {
      next()
    }
  })

  return Router
}
