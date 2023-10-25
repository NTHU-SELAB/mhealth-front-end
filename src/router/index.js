import Vue from 'vue'
import Router from 'vue-router'
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

import FuturePage from '@/pages/FuturePage.vue'
import HealthNews from '@/pages/HealthNews.vue'
import InputFoodPage from '@/pages/InputFoodPage.vue'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: __dirname,
    routes: [
                {
                    path: '/future',
                    name: 'future-page',
                    component: FuturePage,
                },
                {
                    path: '/land/:userID',
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
                    path: '/food-calendar-web/:userID',
                    name: 'food-calendar-web',
                    component: FoodCalendarWebPage,
                },
                {
                    path: '/calendar-detail-web/:userID/:year/:month/:day',
                    name: 'calendar-detail-web',
                    component: CalendarDetailWebPage,
                },
                {
                    path: '/food-record-web/:userID',
                    name: 'food-record-web',
                    component: FoodRecordWebPage,
                },
                {
                    path: '/exercise-record/:userID',
                    name: 'exercise-record',
                    component: ExerciseRecordPage,
                },
                {
                    path: '/water-record/:userID',
                    name: 'water-record',
                    component: WaterRecordPage,
                },
                {
                    path: '/temperature-record/:userID',
                    name: 'temperature-record',
                    component: TemperatureRecordPage,
                },
                {
                    path: '/bloodpressure-record/:userID',
                    name: 'bloodpressure-record',
                    component: BloodPressureRecordPage,
                },
                {
                    path: '/healthnews/:userID',
                    name: 'health-news',
                    component: HealthNews,
                },
                {
                    path: '/inputfoodpage/:userID',
                    name: 'Input-FoodPage',
                    component: InputFoodPage,
                },
                {
                    path: '*',
                    redirect: '/',
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