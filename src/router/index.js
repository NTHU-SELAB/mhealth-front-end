import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AddFoodForm from '@/pages/AddFoodForm.vue'

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
                    path: '/add-food-form',
                    name: 'add-food-form',
                    component: AddFoodForm,
                }
            ]
        }
    ]
})