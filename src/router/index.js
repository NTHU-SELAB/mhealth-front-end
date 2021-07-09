import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AddFoodManuallyPage from '@/pages/AddFoodManuallyPage.vue'
import AddFoodCameraPage from '@/pages/AddFoodCameraPage.vue'
import RestaurantPage from '@/pages/RestaurantPage.vue'
import RestaurantFoodPage from '@/pages/RestaurantFoodPage.vue'
import FoodRecordPage from '@/pages/FoodRecordPage.vue'
import LandingPage from '@/pages/LandingPage.vue'
import FoodCalendarPage from '@/pages/FoodCalendarPage.vue'
import FoodDairyPage from '@/pages/FoodDairyPage.vue'
import ScanQRPage from '@/pages/ScanQRPage.vue'

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
                    path: '/',
                    name: 'landing-page',
                    component: LandingPage,
                },
                {
                    path: '/food-calendar',
                    name: 'food-calendar-page',
                    component: FoodCalendarPage,
                },
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
                },
                {
                    path: '/food-record',
                    name: 'food-record',
                    component: FoodRecordPage,
                },
                {
                    path: '/food-dairy',
                    name: 'food-dairy',
                    component: FoodDairyPage,
                },
                {
                    path: '/scan-qr',
                    component: ScanQRPage
                }
            ]
        }
    ]
})