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
                <div v-if="timeFilter !=='today'">每日平均體溫：{{avgCaloriesPerDay}}度</div>
                <div v-else>今日體溫：{{avgCaloriesPerDay}}度</div>
            </div>
            
        </div>
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'
import LiffService from '@/services/LiffService.js'
import FoodService from '@/services/FoodService.js'

export default {
    name: 'food-record',

    components: {
        GChart
    },

    data() {
        return {
            timeFilter: 'today',
            avgCaloriesPerDay : 0.0,
            foodRecords: [],
            userID : '',
            isChartShow: true,
            chartDataHeader: ['Time', '卡路里'],
            chartData: [],
            chartOptions: {
                legend: { position: 'none' }, 
                vAxis: { minValue: 0, format: '# kcal', gridlines: { color: 'none' } },
                hAxis: { gridlines: { color: 'none' }}
            }
        }
    },

    async mounted() {
        await this.refreshUserID()
        this.changeTimeFilter('today')
    },

    methods: {

        chartContent() {
            return [this.chartDataHeader, ...this.chartData]
        },
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },
        async changeTimeFilter(filter) {
            this.timeFilter = filter
            if ( this.timeFilter !== 'today' ) 
                this.isChartShow = true
            else 
                this.isChartShow = false
            await 
                this.refreshFoodRecord()
            if ( this.timeFilter === 'today' || this.timeFilter === 'week' || this.timeFilter === 'month' ) {
                this.refreshChart_Week_Month()
            }  // if
            else if ( this.timeFilter === 'three-month' || this.timeFilter === 'year' ) {
                this.refreshChart_ThreeMonths_Year()
            }  // else if
            
        },

        recordImage(imagePath) {
            if (imagePath.indexOf('https://') === 0) {
                return imagePath
            } else return require('../assets/food-icon.png')
        },

        async refreshChart_Week_Month() {
            const data = []
            let tmpCalorie = 0      // 當天熱量
            let tmpDate = false     // 當天日期

            let count_Day = 0       // 總天數
            let count_Cal = 0       // 總卡路里數
            this.foodRecords.forEach( ( r ) => {
                if ( ! tmpDate ) {
                    count_Day++             
                    tmpDate = new Date( r.recordTime )
                    tmpCalorie = 0
                }  // 初始化

                if ( tmpDate.getDate() != new Date( r.recordTime ).getDate() ) {
                    data.push( [ ( tmpDate.getMonth() + 1 ) + '/' + tmpDate.getDate(), tmpCalorie ] )
                    count_Day++
                    count_Cal += r.calorie
                    tmpDate = new Date( r.recordTime )
                    tmpCalorie = r.calorie
                }  // if
                else {
                    count_Cal += r.calorie
                    tmpCalorie += r.calorie
                }  // else
            })

            data.push( [ ( tmpDate.getMonth() + 1 ) + '/' + tmpDate.getDate(), tmpCalorie ] )  // push 最後一筆資料

            this.avgCaloriesPerDay = ( count_Cal / count_Day ).toFixed( 1 )
            this.chartData = data.reverse()
        },
        async refreshChart_ThreeMonths_Year() {
            const data = []
            let tmpCalorie = 0      // 當天熱量
            let tmpDate = false     // 當天日期

            let count_Day = 0       // 總天數
            let count_Cal = 0       // 總卡路里數
            this.foodRecords.forEach( ( r ) => {
                if ( ! tmpDate ) {                
                    count_Day++
                    
                    tmpDate = new Date( r.recordTime )
                    tmpCalorie = 0
                }  // 初始化

                if ( tmpDate.getDate() != new Date( r.recordTime ).getDate() ) 
                    count_Day++

                if ( tmpDate.getMonth() != new Date( r.recordTime ).getMonth() ) {
                    data.push( [ tmpDate.getFullYear() + '/' + ( tmpDate.getMonth() + 1 ), tmpCalorie ] )
                    tmpDate = new Date( r.recordTime )
                    count_Cal += r.calorie
                    tmpCalorie = r.calorie
                }  // if
                else {
                    count_Cal += r.calorie
                    tmpCalorie += r.calorie
                }  // else
            })

            data.push( [ tmpDate.getFullYear() + '/' + ( tmpDate.getMonth() + 1 ), tmpCalorie ] )  // push 最後一筆資料

            this.avgCaloriesPerDay = ( count_Cal / count_Day ).toFixed( 1 )
            this.chartData = data.reverse()
        },
        
        async refreshFoodRecord() {
            const userId = await LiffService.getUserId()
            var dateNow = Date.now()
            if (this.timeFilter === 'today') {
                this.foodRecords = await FoodService.getFoodRecords(userId, dateNow - 1000*3600*24)
            } else if (this.timeFilter === 'week') {
                this.foodRecords = await FoodService.getFoodRecords(userId, dateNow - 1000*3600*24*7)
            } else if (this.timeFilter === 'month') {
                this.foodRecords = await FoodService.getFoodRecords(userId, dateNow - 1000*3600*24*30)
            } else if (this.timeFilter === 'three-month') {
                this.foodRecords = await FoodService.getFoodRecords(userId, dateNow - 1000*3600*24*30*3)
            } else if (this.timeFilter === 'year') {
                this.foodRecords = await FoodService.getFoodRecords(userId, dateNow - 1000*3600*24*30*12)
            }
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