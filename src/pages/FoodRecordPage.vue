<template>
    <div id="food-record-page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >醫師鏈 Dr. Chain</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="../food-calendar">首頁<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../food-dairy">個人資訊</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../food-record">飲食紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">體重紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">聯絡我們</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="輸入文字以搜尋..." aria-label="Search">
                    <button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜尋</button>
                </form>
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
                    <a class="nav-link" href="#" :class="{'active': timeFilter==='month'}" @click="changeTimeFilter('month')">一月</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" :class="{'active': timeFilter==='three-month'}" @click="changeTimeFilter('three-month')">三月</a>
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
                <div class="col-10 col-md-5 col-lg-3 mb-2 food-record" v-for="record in foodRecords" v-bind:key="record.recordTime">
                    <div class="card">
                        <div class="col-12">
                            <div class="pl-2 pr-2 pt-2 pb-2"><img class="card-img-top food-icon" :src="recordImage(record.image)" alt=""></div>
                        </div>
                        <div class="col-12 food-record-detail">
                            <div>時段：{{record.meal}}</div>
                            <div>名稱：{{record.name}}</div>
                            <div>重量：{{record.weight}}g</div>
                            <div>脂肪：{{record.fat}}</div>
                            <div>卡路里：{{record.calorie}}</div>
                            <div>膳食纖維：{{record.fiber}}</div>
                            <div>碳水化合物：{{record.sugar}}</div>
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
            foodRecords: [],
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
        this.changeTimeFilter('today')
    },

    methods: {

        chartContent() {
            return [this.chartDataHeader, ...this.chartData]
        },

        async changeTimeFilter(filter) {
            this.timeFilter = filter
            if ( this.timeFilter !== 'today' ) 
                this.isChartShow = true
            else 
                this.isChartShow = false
            await 
                this.refreshFoodRecord()
            if ( this.timeFilter === 'week' || this.timeFilter === 'month' || this.timeFilter === 'three-month' ) {
                this.refreshChart_Week_Month()
            }  // if
            else if ( this.timeFilter === 'year' ) {
                this.refreshChart_Year()
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
            this.foodRecords.forEach( ( r ) => {
                if ( ! tmpDate ) {                   
                    tmpDate = new Date( r.recordTime )
                    tmpCalorie = 0
                }  // 初始化

                if ( tmpDate.getDate() != new Date( r.recordTime ).getDate() ) {
                    data.push( [ ( tmpDate.getMonth() + 1 ) + '/' + tmpDate.getDate(), tmpCalorie ] )
                    tmpDate = new Date( r.recordTime )
                    tmpCalorie = r.calorie
                }  // if
                else {
                    tmpCalorie += r.calorie
                }  // else
            })
            data.push( [ ( tmpDate.getMonth() + 1 ) + '/' + tmpDate.getDate(), tmpCalorie ] )  // push 最後一筆資料
            this.chartData = data.reverse()
        },
        async refreshChart_Year() {
            const data = []
            let tmpCalorie = 0      // 當天熱量
            let tmpDate = false     // 當天日期
            this.foodRecords.forEach( ( r ) => {
                if ( ! tmpDate ) {                   
                    tmpDate = new Date( r.recordTime )
                    tmpCalorie = 0
                }  // 初始化

                if ( tmpDate.getMonth() != new Date( r.recordTime ).getMonth() ) {
                    data.push( [ tmpDate.getFullYear() + '/' + ( tmpDate.getMonth() + 1 ), tmpCalorie ] )
                    tmpDate = new Date( r.recordTime )
                    tmpCalorie = r.calorie
                }  // if
                else {
                    tmpCalorie += r.calorie
                }  // else
            })
            data.push( [ tmpDate.getFullYear() + '/' + ( tmpDate.getMonth() + 1 ), tmpCalorie ] )  // push 最後一筆資料
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