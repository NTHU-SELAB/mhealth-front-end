<template>
    <div id="food-record-page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand">智慧e聊健康</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'food-calendar-web', params:{userID:this.userID}}">飲食日曆</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'food-record-web', params:{userID:this.userID}}">飲食紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'exercise-record', params:{userID:this.userID}}">運動紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'water-record', params:{userID:this.userID}}">飲水紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'temperature-record', params:{userID:this.userID}}">體溫紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'bloodpressure-record', params:{userID:this.userID}}">血壓紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'login-page'}">登出</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container">
            <img :src="pictureURL">
            <p v-if="hasWarn">{{this.warn}}</p>
            <!--
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item">
                    <a class="nav-link" href="#" :class="{'active': timeFilter==='today'}" @click="changeTimeFilter('today')">當日</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" :class="{'active': timeFilter==='week'}" @click="changeTimeFilter('week')">一週</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" :class="{'active': timeFilter==='month'}" @click="changeTimeFilter('month')">一個月</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" :class="{'active': timeFilter==='three-month'}" @click="changeTimeFilter('three-month')">三個月</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" :class="{'active': timeFilter==='year'}" @click="changeTimeFilter('year')">一年</a>
                </li>
            </ul>
            
            <GChart style="height:210px;width:100%;" v-show="isChartShow"
                type="LineChart"
                :data="chartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref="chart"/>
            <div>
                <div v-if="timeFilter !=='today'">每日平均血壓：{{avgBloodPressurePerDay}}mmHg</div>
                <div v-else>今日平均血壓：{{avgBloodPressurePerDay}}mmHg</div>
                <div>註:平均血壓=(收縮壓 + 2 x 舒張壓)/3</div>
            </div>
            -->
        </div>
    </div>
</template>

<script>

//import { GChart } from 'vue-google-charts'
//import LiffService from '@/services/LiffService.js'
import FoodService from '@/services/FoodService.js'

export default {
    name: 'bloodpressure-record',

    /*components: {
        GChart
    },*/

    data() {
        return {
            userID : '',
            warn : "",
            pictureURL :"",
            hasWarn : false,
        }
    },

    async mounted() {
        await this.refreshUserID()
        await this.getBloodPressure()
    },

    methods: {
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },
        async getBloodPressure(){
            let bloodPressure = await FoodService.getBloodPressure(this.userID)
            if(bloodPressure.HasWarn==1){
                this.hasWarn = true
                this.warn = bloodPressure.HealthWarn
            }
            this.pictureURL = bloodPressure.GraphURL
        },
        recordImage(imagePath) {
            if (imagePath.indexOf('https://') === 0) {
                return imagePath
            } else return require('../assets/food-icon.png')
        },
        
    }
}

</script>

<style scoped>
.food-icon {
    margin-top: 10px;
    max-width: 100%;
    height: 200px;
}

.food-record {
    /* border: 1px black solid; */
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 5px;
    box-shadow: 3px 4px 4px 0 rgba(0, 0, 0, 0.2), 3px 3px 4px 6px rgba(0, 0, 0, 0.19);
    margin-bottom: 7px;
}

.food-record-detail {
    text-align: left;
    font-size: 14px;
}
</style>