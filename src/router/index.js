import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import AddFoodManuallyPage from '@/pages/AddFoodManuallyPage.vue'
import AddFoodCameraPage from '@/pages/AddFoodCameraPage.vue'
//import RestaurantPage from '@/pages/RestaurantPage.vue'
//import RestaurantFoodPage from '@/pages/RestaurantFoodPage.vue'
import FoodRecordPage from '@/pages/FoodRecordPage.vue'
import LandingPage from '@/pages/LandingPage.vue'
import FoodCalendarPage from '@/pages/FoodCalendarPage.vue'
//import FoodDairyPage from '@/pages/FoodDairyPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CalendarDetailPage from '@/pages/CalendarDetailPage'

import FoodRecordWebPage from '@/pages/FoodRecordWebPage.vue'
import FoodCalendarWebPage from '@/pages/FoodCalendarWebPage.vue'
import CalendarDetailWebPage from '@/pages/CalendarDetailWebPage'
import ExerciseRecordPage from '@/pages/ExerciseRecordPage.vue'
import WaterRecordPage from '@/pages/WaterRecordPage.vue'
import BloodPressureRecordPage from '@/pages/BloodPressureRecordPage.vue'
import TemperatureRecordPage from '@/pages/TemperatureRecordPage.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'main-page',
            component: MainPage,
            children: [
                {
                    path: '/land',
                    name: 'landing-page',
                    component: LandingPage,
                },
                //pages for line
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
                    path: '/food-record',
                    name: 'food-record',
                    component: FoodRecordPage,
                },
                {
                    path: '/calendar-detail/:year/:month/:day',
                    name: 'calendar-detail',
                    component: CalendarDetailPage,
                },
                //pages for web
                {
                    path: '/',
                    name: 'login-page',
                    component: LoginPage,
                },
                {
                    path: '/food-calendar-web',
                    name: 'food-calendar-web-page',
                    component: FoodCalendarWebPage,
                },
                {
                    path: '/calendar-detail-web/:year/:month/:day',
                    name: 'calendar-detail-web',
                    component: CalendarDetailWebPage,
                },
                {
                    path: '/food-record-web',
                    name: 'food-record-web',
                    component: FoodRecordWebPage,
                },
                {
                    path: '/exercise-record-web',
                    name: 'exercise-record-web',
                    component: ExerciseRecordPage,
                },
                {
                    path: '/water-record-web',
                    name: 'water-record-web',
                    component: WaterRecordPage,
                },
                {
                    path: '/temperature-record-web',
                    name: 'temperature-record-web',
                    component: TemperatureRecordPage,
                },
                {
                    path: '/bloodpressure-record-web',
                    name: 'bloodpressure-record-web',
                    component: BloodPressureRecordPage,
                },
                {
                    path: '*',
                    redirect: '/',
                }
            ]
        }
    ]
})
/*
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});
*/
export default router;