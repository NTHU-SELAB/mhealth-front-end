import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import VCalendar from 'v-calendar';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VCalendar);
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import navbar from './components/navbar.vue'
import barchart from './components/barchart.vue'
import linechart from './components/linechart.vue'
import addfoodmanuallypage from './pages/AddFoodManuallyPage.vue'
import calendardetailwebpage from './pages/CalendarDetailWebPage.vue'
import addhealthdata from './pages/AddHealthData.vue'
import addsportdata from './pages/AddSportData.vue'
import chatadvice from './components/chatadvice.vue'
import icongen from './components/icongen.vue'
Vue.config.productionTip = false
Vue.component('nav-bar', navbar)
Vue.component('bar-chart', barchart)
Vue.component('line-chart', linechart)
Vue.component('add-food-manually-page', addfoodmanuallypage)
Vue.component('calendar-detail-web-page', calendardetailwebpage)
Vue.component('add-health-data', addhealthdata)
Vue.component('add-sport-data', addsportdata)
Vue.component('chat-room', chatadvice)
Vue.component('icon-gen', icongen)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')




