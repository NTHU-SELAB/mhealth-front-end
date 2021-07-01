<template>
    <div id="sport-record-page">
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
                        <a class="nav-link" href="../sport-record">運動紀錄</a>
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
                <div v-if="timeFilter !=='today'">每日平均消耗熱量：{{avgCaloriesPerDay}}大卡</div>
                <div v-else>今日消耗熱量：{{avgCaloriesPerDay}}大卡</div>
            </div>
            <div class="row">
                <div class="col-12 col-md-8 col-lg-2 ml-2 mr-2 mb-2 sport-record" v-for="record in sportRecords" v-bind:key="record.recordTime">
                    <div class="card">
                        <div class="col-12">
                            <div class="pl-2 pr-2 pt-2 pb-2"><img class="card-img-top sport-icon" :src="recordImage(record.image)" alt=""></div>
                        </div>
                        <div class="col-12 sport-record-detail">
                            <div>名稱：{{record.name}}</div>
                            <div>時長(分鐘)：{{record.totalTime}} g</div>
                            <div>消耗熱量(卡路里)：{{record.calorie}}大卡</div>
                        </div>
                        <div class="col-12 sport-record-detail">記錄時間：{{new Date(record.recordTime).toLocaleString()}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'
import LiffService from '@/services/LiffService.js'
import SportService from '@/services/SportService.js'

export default {
    name: 'sport-record',

    components: {
        GChart
    },

    data() {
        return {
            timeFilter: 'today',
            avgCaloriesPerDay : 0.0,
            sportRecords: [],
            isChartShow: true,
            chartDataHeader: ['Time', '消耗卡路里'],
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
                this.refreshSportRecord()
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
            this.sportRecords.forEach( ( r ) => {
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
            this.sportRecords.forEach( ( r ) => {
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
        
        async refreshSportRecord() {
            const userId = await LiffService.getUserId()
            var dateNow = Date.now()
            if (this.timeFilter === 'today') {
                this.sportRecords = await SportService.getSportRecords(userId, dateNow - 1000*3600*24)
            } else if (this.timeFilter === 'week') {
                this.sportRecords = await SportService.getSportRecords(userId, dateNow - 1000*3600*24*7)
            } else if (this.timeFilter === 'month') {
                this.sportRecords = await SportService.getSportRecords(userId, dateNow - 1000*3600*24*30)
            } else if (this.timeFilter === 'three-month') {
                this.sportRecords = await SportService.getSportRecords(userId, dateNow - 1000*3600*24*30*3)
            } else if (this.timeFilter === 'year') {
                this.sportRecords = await SportService.getSportRecords(userId, dateNow - 1000*3600*24*30*12)
            }
        },

        
    }
}

</script>

<style scoped>
.sport-icon {
    margin-top: 10px;
    max-width: 100%;
    height: 115px;
}

.sport-record {
    /* border: 1px black solid; */
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 2px rgba(0, 0, 0, 0.19);
    margin-bottom: 7px;
}

.sport-record-detail {
    text-align: left;
    font-size: 13px;
}
</style>