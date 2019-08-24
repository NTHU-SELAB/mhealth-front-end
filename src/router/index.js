import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AddFoodPage from '@/pages/AddFoodPage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'main-page',
            component: MainPage,
            children: [
                {
                    path: '/add-food',
                    name: 'add-food-page',
                    component: AddFoodPage,
                }
            ]
        }
    ]
})