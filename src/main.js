import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
  const isLogin = localStorage.getItem('token') == 'ImLogin' ;
  if( isLogin ){
    next();
  } else {
    if( to.path !== '/login' && to.path !== '/food-calendar' && to.path !== '/add-food-manually'
     && to.path !== '/add-food-camera' && to.path !== '/food-record' && to.path !== '/calendar-detail/:year/:month/:day')
      next('/login');
    else
      next();
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')




