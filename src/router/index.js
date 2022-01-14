import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
/*
import AddFoodManuallyPage from '@/pages/AddFoodManuallyPage.vue'
import AddFoodCameraPage from '@/pages/AddFoodCameraPage.vue'
import RestaurantPage from '@/pages/RestaurantPage.vue'
import RestaurantFoodPage from '@/pages/RestaurantFoodPage.vue'
import FoodRecordPage from '@/pages/FoodRecordPage.vue'
import SportRecordPage from '@/pages/SportRecordPage.vue'
import LandingPage from '@/pages/LandingPage.vue'
import FoodCalendarPage from '@/pages/FoodCalendarPage.vue'
import FoodDairyPage from '@/pages/FoodDairyPage.vue'
*/
import Add_Meal_Page from '@/pages/Add_Meal_Page.vue'
import Meal_Record_Page from '@/pages/Meal_Record_Page.vue'
import Sign_In_Page from '@/pages/Sign_In_Page.vue'
import Shop_Info_Page from '@/pages/Shop_Info_Page.vue'
import Add_New_Shop_Page from '@/pages/Add_New_Shop_Page.vue'
import Edit_Shop_Page from '@/pages/Edit_Shop_Page.vue'
import Edit_Meal_Page from '@/pages/Edit_Meal_Page.vue'
import Add_Hospital_Page from '@/pages/Add_Hospital_Page.vue'
import Edit_Hospital_Page from '@/pages/Edit_Hospital_Page.vue'
import Add_Medical_Msg_Page from '@/pages/Add_Medical_Msg_Page.vue'
import Edit_Medical_Msg_Page from '@/pages/Edit_Medical_Msg_Page.vue'
import Hospital_Info_Page from '@/pages/Hospital_Info_Page.vue'
import Medical_Msg_Record_Page from '@/pages/Medical_Msg_Record_Page.vue'

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
                    name: 'sign-in-page',
                    component : Sign_In_Page               
                },
                {
                    path: '/meal-record',
                    // path: '/pushing-setting',
                    name: 'meal-record-page',
                    component : Meal_Record_Page
                },
                {
                    path: '/add-meal',
                    name: 'add-meal-page',
                    component : Add_Meal_Page
                },
                {
                    path: '/shop-info',
                    name: 'shop-info-page',
                    component : Shop_Info_Page
                },
                {
                    path: '/add-new-shop',
                    name: 'add-new-shop-page',
                    component : Add_New_Shop_Page
                },
                {
                    path: '/edit-meal',
                    name: 'edit-meal-page',
                    component : Edit_Meal_Page
                },
                {
                    path: '/edit-shop',
                    name: 'edit-shop-page',
                    component : Edit_Shop_Page
                },
                {
                    path:'/add-hospital',
                    name:'add-hospital-page',
                    component: Add_Hospital_Page 
                },{
                    path:'/add-medical-msg',
                    name:'add-medical-msg-page',
                    component: Add_Medical_Msg_Page 
                },
                {
                    path:'/edit-hospital',
                    name:'edit-hospital-page',
                    component: Edit_Hospital_Page 
                },
                
                {
                    path:'/edit-medical-msg',
                    name:'edit-medical-msg-page',
                    component: Edit_Medical_Msg_Page
                },
                {
                    path:'/hospital-info',
                    name:'hospital-info-page',
                    component: Hospital_Info_Page 
                },
                {
                    path:'/medical-msg-record',
                    name:'medical-msg-record-page',
                    component: Medical_Msg_Record_Page
                }            
                /*
                {
                    path: '/landing',
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
                    path: '/sport-record',
                    name: 'sport-record',
                    component: SportRecordPage,
                },
                */
            ]
        }
    ]
})