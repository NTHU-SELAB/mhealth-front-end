import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AddFoodPage from '@/pages/AddFoodPage.vue'
import RestaurantPage from '@/pages/RestaurantPage.vue'
import RestaurantFoodPage from '@/pages/RestaurantFoodPage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/liff',
            name: 'main-page',
            component: MainPage,
            children: [
                {
                    path: '/liff/add-food',
                    name: 'add-food-page',
                    component: AddFoodPage,
                },
                {
                    path: '/liff/restaurant',
                    name: 'restaurant-page',
                    component: RestaurantPage,
                },
                {
                    path: '/liff/restaurant/food',
                    name: 'restaurant-food-page',
                    component: RestaurantFoodPage,
                }
            ]
        }
    ]
})