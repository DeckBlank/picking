import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Google from '../components/Google.vue'




Vue.use(Router)
export default new Router({
  //mode: 'history',
  // base: '/Webskeleton',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Google
    },
    {
      path: '/ordenes',
      name: 'ordenes',
      component: HelloWorld
    }
    ,
    {
      path: '/buscarOrden',
      name: 'buscarOrden',
      component: HelloWorld
    }
  ]
})
