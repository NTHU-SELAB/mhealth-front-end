<template>
    <div id="food-calendar-page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="/">吾.健.康</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">首頁<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active btn-primary" style="border-radius: 10px;">
                        <a class="nav-link" href="#">食物日誌</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">運動紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">體重預測</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">聯絡我們</a>
                    </li>
                </ul>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="輸入文字以搜尋..." aria-label="Search">
                    <button class="btn btn-outline-light" type="submit">搜尋</button>
                </form>
                <img class="ml-2" src="https://i7.pngguru.com/preview/527/663/825/logo-person-user-person-icon.jpg"
                        style="max-width: 3%; border-radius: 20px;">
                <!-- <div class="navbar-right"><img src="https://i7.pngguru.com/preview/527/663/825/logo-person-user-person-icon.jpg" alt="" style="max-width: 100%;"></div> -->
            </div>
        </nav>
        <div class="container">
            <div class="spinner-border text-primary" role="status" v-if="isloading" style="margin-top: 200px;">
                <span class="sr-only">Loading...</span>
            </div>
            <GChart style="height:210px;width:100%;"
                type="LineChart"
                v-if="!isloading"
                class="food-calender-content"
                :style="{opacity: contentOpacity}"
                :data="chartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref="chart"/>
            <div class="row food-calender-content" :style="{opacity: contentOpacity}">
                <div class="col-6 col-sm-3 col-lg-2 mb-3" v-for="record in foodRecords" v-bind:key="record.image_url">
                    <div class="card" data-toggle="modal" data-target="#staticBackdrop">
                        <div class="pl-4 pr-4 pt-4 pb-4"><img :src="record.image_url" class="card-img-top food-icon"></div>
                        <div class="card-body">
                            <h5 class="card-title" style="margin-bottom: 3px;">{{record.name}}</h5>
                            <p class="card-text" style="margin-bottom: 3px; font-weight: bold; color: #8e9191;">{{record.date}} {{record.meal}}</p>
                            <p class="card-text" style="color: red;margin-bottom: 3px;">{{record.calorie}}大卡</p>
                            <!-- <a href="#" class="btn btn-primary">查看明細</a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <food-record-detail></food-record-detail>
    </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import foodCalendarData from '../mock/foodCalendarData.json'
import foodRecordDetail from '@/components/foodRecordDetail.vue'

export default {
    components: {
        GChart,
        foodRecordDetail
    },

    data() {
        return {
            isloading: true,
            contentOpacity: 0,
            foodRecords: [],
            chartDataHeader: ['Time', '卡路里'],
            chartData: [],
            chartOptions: {
                legend: { position: 'none' }, 
                vAxis: { minValue: 0, format: '# kcal', gridlines: { color: 'none' } },
                hAxis: { gridlines: { color: 'none' }}
            }
        }
    },
    mounted() {
        this.initChartData()
        this.foodRecords = foodCalendarData
        setTimeout(() => {
            this.isloading = false;
            this.contentOpacity = 100;
        }, 1300)
    },

    methods: {
        chartContent() {
            return [this.chartDataHeader, ...this.chartData]
        },

        initChartData() {
            for (let i = 0; i < 30; i++) {
                this.chartData.push([new Date(Date.now()-86400000*i), 1400 + Math.floor(Math.random() * 450)])
            }
        }
    }
}
</script>

<style scope>
.food-icon {
    max-width: 100%;
}

.food-calender-content {
    transition-property: opacity;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
}
</style>