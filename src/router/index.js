<<<<<<< HEAD
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
=======
import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
// import AddFoodPage from '@/pages/AddFoodPage.vue'
import AddFoodManuallyPage from '@/pages/AddFoodManuallyPage.vue'
import AddFoodCameraPage from '@/pages/AddFoodCameraPage.vue'
import RestaurantPage from '@/pages/RestaurantPage.vue'
import RestaurantFoodPage from '@/pages/RestaurantFoodPage.vue'

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
                // {
                //     path: '/add-food',
                //     name: 'add-food-page',
                //     component: AddFoodPage,
                // },
                {
                    path: '/add-food-manually',
                    name: 'add-food-page-manually',
                    component: AddFoodManuallyPage,
                },
                {
                    path: '/add-food-camera',
                    name: 'add-food-camera-page',
                    component: AddFoodCameraPage,
                },
                {
                    path: '/restaurant',
                    name: 'restaurant-page',
                    component: RestaurantPage,
                },
                {
                    path: '/restaurant/food',
                    name: 'restaurant-food-page',
                    component: RestaurantFoodPage,
                }
            ]
        }
    ]
>>>>>>> b589115a108980be83dda0ea35a98b5bf78a69f4
})