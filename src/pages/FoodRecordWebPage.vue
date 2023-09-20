<template>
    <div v-if="dataReady">
        <nav class="navbar navbar-expand-lg navbar-light mb-4" style="background-color: #91c5ea;">
            <h1><i class="bi bi-arrow-through-heart-fill"></i></h1>
            <a class="navbar-brand">健談HealthTalker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                        <router-link class="nav-link" :to ="{name:'bloodpressure-record', params:{userID:this.userID}}">體重預測</router-link>
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
                    <a class="nav-link" :class="{'active': timeFilter==='today'}" @click="changeTimeFilter('today')">當日</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': timeFilter==='week'}" @click="changeTimeFilter('week')">一週</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': timeFilter==='month'}" @click="changeTimeFilter('month')">一個月</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': timeFilter==='three-month'}" @click="changeTimeFilter('three-month')">三個月</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{'active': timeFilter==='year'}" @click="changeTimeFilter('year')">一年</a>
                </li>
            </ul>

            <GChart style="height:250px;width:100%;" v-show="isChartShow"
                type="LineChart"
                :data="chartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref="chart"/>
            <div>
                <div v-if="timeFilter !=='today'">每日平均攝取熱量：{{avgCaloriesPerDay}}大卡</div>
                <div v-else>今日攝取熱量：{{avgCaloriesPerDay}}大卡</div>
            </div>
            <!-- <div class="row food-record mt-2" v-for="record in foodRecords" v-bind:key="record.recordTime">
                <div class="col-2"><img class="food-icon" :src="recordImage(record.image)" alt=""></div>
                <div class="col-5">
                    <div class="row">
                        <div class="col-6 food-record-detail">
                            <div>時段：{{record.meal}}</div>
                            <div>名稱：{{record.name}}</div>
                            <div>重量：{{record.weight}}g</div>
                        </div>
                        <div class="col-6 food-record-detail">
                            <div>脂肪：{{record.fat}}</div>
                            <div>卡路里：{{record.calorie}}
                            </div>
                            <div>膳食纖維：{{record.fiber}}</div>
                            <div>碳水化合物：{{record.sugar}}</div>
                        </div>
                        <div class="col-12 food-record-detail">記錄時間：{{new Date(record.recordTime).toLocaleString()}}</div>
                    </div>
                </div>
            </div> -->
            <div class="row">
                <div class="col-12 col-md-8 col-lg-3 mb-2 food-record" v-for="(record,index) in foodRecords" v-bind:key="index">
                    <div class="card">
                        <div class="col-12">
                            <div class="pl-2 pr-2 pt-2 pb-2"><img class="card-img-top food-icon" :src="recordImage(record.image)" alt=""></div>
                        </div>
                        <div class="col-10 food-record-detail">
                            <div>時段：{{record.meal}}</div>
                            <div>名稱：{{record.name}}</div>
                            <div>重量：{{record.weight}} g</div>
                            <div>脂肪：{{record.fat}} g</div>
                            <div>卡路里：{{record.calorie}}大卡</div>
                            <div>膳食纖維：{{record.fiber}} g</div>
                            <div>碳水化合物：{{record.sugar}} g</div>
                        </div>
                        <div class="col-12 food-record-detail">記錄時間：{{new Date(record.recordTime).toLocaleString()}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'
//import LiffService from '@/services/LiffService.js'
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
            isChartShow: true,
            dataReady : false,
            chartDataHeader: ['Time', '卡路里','建議攝取','預測卡路里'],
            chartData: [],
            userID:"",
            chartOptions: {
                //legend: { position: 'none' }, 
                vAxis: { title:"熱量", minValue: 0, format: '# kcal',textStyle:{fontSize:20} },
                hAxis: { textStyle:{fontSize:20}},
                legend: {position:"bottom", textStyle:{fontSize:20}},
                lineWidth: 7
            }
        }
    },

    async mounted() {
        await this.refreshUserID()
        await this.changeTimeFilter('today')
        this.dataReady = true
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
            await this.refreshFoodRecord()
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
            let data = []
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
                    data.push( [ ( tmpDate.getMonth() + 1 ) + '/' + tmpDate.getDate(), tmpCalorie, 1000, 0] )
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

            data.push( [ ( tmpDate.getMonth() + 1 ) + '/' + tmpDate.getDate(), tmpCalorie, 1000, 0] )  // push 最後一筆資料
            for(let i = 0;i<data.length;i++){
                if(i == data.length-1){
                    data[i][3] = data[i][1]
                }
                else{
                    data[i][3] = data[i+1][1]
                }
            }
            this.avgCaloriesPerDay = ( count_Cal / count_Day ).toFixed( 1 )
            this.chartData = data.reverse()
            //this.dataReady = true
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
                    data.push( [ tmpDate.getFullYear() + '/' + ( tmpDate.getMonth() + 1 ), tmpCalorie, 10000,0 ] )
                    tmpDate = new Date( r.recordTime )
                    count_Cal += r.calorie
                    tmpCalorie = r.calorie
                }  // if
                else {
                    count_Cal += r.calorie
                    tmpCalorie += r.calorie
                }  // else
            })

            data.push( [ tmpDate.getFullYear() + '/' + ( tmpDate.getMonth() + 1 ), tmpCalorie, 10000,0 ] )  // push 最後一筆資料
            for(let i = 0;i<data.length;i++){
                if(i == data.length-1){
                    data[i][3] = data[i][1]
                }
                else{
                    data[i][3] = data[i+1][1]
                }
            }
            this.avgCaloriesPerDay = ( count_Cal / count_Day ).toFixed( 1 )
            this.chartData = data.reverse()
            //this.dataReady = true
        },
        
        async refreshFoodRecord() {
            //  const userId = await LiffService.getUserId()
            var dateNow = Date.now()
            if (this.timeFilter === 'today') {
                this.foodRecords = await FoodService.getFoodRecords(this.userID, dateNow - 1000*3600*24)
            } else if (this.timeFilter === 'week') {
                this.foodRecords = await FoodService.getFoodRecords(this.userID, dateNow - 1000*3600*24*7)
            } else if (this.timeFilter === 'month') {
                this.foodRecords = await FoodService.getFoodRecords(this.userID, dateNow - 1000*3600*24*30)
            } else if (this.timeFilter === 'three-month') {
                this.foodRecords = await FoodService.getFoodRecords(this.userID, dateNow - 1000*3600*24*30*3)
            } else if (this.timeFilter === 'year') {
                this.foodRecords = await FoodService.getFoodRecords(this.userID, dateNow - 1000*3600*24*30*12)
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