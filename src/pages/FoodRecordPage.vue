<template>
    <div class="container" style="margin-top:15px;">
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

        <div class="row food-record mt-2" v-for="record in foodRecords" v-bind:key="record.recordTime">
            <div class="col-3"><img class="food-icon" :src="recordImage(record.image)" alt=""></div>
            <div class="col-9">
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
            if (this.timeFilter !== 'today') this.isChartShow = true
            else this.isChartShow = false
            await this.refreshFoodRecord()
            this.refreshChart()
        },

        recordImage(imagePath) {
            if (imagePath.indexOf('https://') === 0) {
                return imagePath
            } else return require('../assets/food-icon.png')
        },

        async refreshChart() {
            const data = []
            let tmpCalorie = 0
            let tmpDate = false
            this.foodRecords.forEach((r) => {
                if (tmpDate && tmpDate.getDate() == new Date(r.recordTime).getDate()) {
                    tmpCalorie += r.calorie
                } else {
                    if (tmpDate) data.push([new Date(r.recordTime), tmpCalorie])
                    tmpDate = new Date(r.recordTime)
                    tmpCalorie = 0
                }
            })
            this.chartData = data
            this.chartData.push(this.chartData.pop())
        },
        
        async refreshFoodRecord() {
            const userId = await LiffService.getUserId()
            if (this.timeFilter === 'today') {
                this.foodRecords = await FoodService.getFoodRecords(userId, Date.now() - 1000*3600*24)
            } else if (this.timeFilter === 'week') {
                this.foodRecords = await FoodService.getFoodRecords(userId, Date.now() - 1000*3600*24*7)
            } else if (this.timeFilter === 'month') {
                this.foodRecords = await FoodService.getFoodRecords(userId, Date.now() - 1000*3600*24*30)
            } else if (this.timeFilter === 'three-month') {
                this.foodRecords = await FoodService.getFoodRecords(userId, Date.now() - 1000*3600*24*30*3)
            } else if (this.timeFilter === 'year') {
                this.foodRecords = await FoodService.getFoodRecords(userId, Date.now() - 1000*3600*24*30*12)
            }
        },

        
    }
}

</script>

<style>
.food-icon {
    margin-top: 10px;
    max-width: 100%;
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