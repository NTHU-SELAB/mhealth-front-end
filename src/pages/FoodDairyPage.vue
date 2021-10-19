<template>
    <div id="food-dairy-page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >聊健康 Health Chat</a>
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
                        <a class="nav-link" href="../food-dairy">食物日誌</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../food-record">飲食紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../exercise-record">運動紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../water-record">飲水紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../temperature-record">體溫紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../bloodpressure-record">血壓紀錄</a>
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
            <GChart style="height:400px;width:100%;" v-show="true"       
                type="LineChart"
                :data="ChartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref = "chart"
            />
        </div>

        <!-- <div class="container">
            <GChart style="height:400px;width:100%;" v-show="true"       
                type="LineChart"
                :data="TestChartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref = "chart"
            />
        </div> -->

        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-4 col-lg-3 mb-4" v-for="index in f_data" v-bind:key="index">
                    <div class="card">
                        <div v-if="index.name === '珍奶全糖加糖'" class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/milktea.jpg" class="card-img-top food-icon">
                        </div>
                        <div v-else-if="index.name === '甜甜圈'" class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/donut.jpg" class="card-img-top food-icon">
                        </div>
                        <div v-else-if="index.name === '巧克力珍奶'" class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/cho_milktea.jpg" class="card-img-top food-icon">
                        </div>
                        <div v-else-if="index.name === '炸雞排'" class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/chicken.jpg" class="card-img-top food-icon">
                        </div>
                        <div v-else-if="index.name === '薯條'" class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/frenchfries.jpg" class="card-img-top food-icon">
                        </div>
                        <div v-else-if="index.name === '洋芋片'" class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/potatochips.jpg" class="card-img-top food-icon">
                        </div>
                        <div v-else-if="index.name === '可樂'" class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/coke.jpg" class="card-img-top food-icon">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" style="margin-bottom: 3px;">{{index.name}}</h5>
                            <p class="card-text" style="margin-bottom: 3px; font-weight: bold; color: #8e9191;">{{index.date}}</p>
                            <p class="card-text" style="color: red;margin-bottom: 3px;">{{index.Calories}} 大卡</p>
                            <!-- <a href="#" class="btn btn-primary">查看明細</a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
    components: {
        GChart
    },
    data () {
        return {
            time : Date,
            // Array will be automatically processed with visualization.arrayToDataTable function
            testData : [],
            f_data : [ 
                { name : "甜甜圈", date : "2/7", Calories : 500 },
                { name : "珍奶全糖加糖", date : "2/7", Calories : 720 },
                { name : "甜甜圈", date : "2/7", Calories : 500 },
                { name : "巧克力珍奶", date : "2/7", Calories : 735 },
                { name : "炸雞排", date : "2/7", Calories : 550 },
                { name : "洋芋片", date : "2/7", Calories : 484 },
                { name : "薯條", date : "2/6", Calories : 445 },
                { name : "可樂", date : "2/6", Calories : 190 },
                { name : "甜甜圈", date : "2/6", Calories : 500 },
                { name : "珍奶全糖加糖", date : "2/6", Calories : 720 },
                { name : "炸雞排", date : "2/6", Calories : 550 },
                { name : "薯條", date : "2/6", Calories : 445 },
                { name : "可樂", date : "2/5", Calories : 190 },
                { name : "珍奶全糖加糖", date : "2/5", Calories : 720 },
                { name : "甜甜圈", date : "2/5", Calories : 500 },
                { name : "炸雞排", date : "2/5", Calories : 550 },
                { name : "洋芋片", date : "2/5", Calories : 484 },
                { name : "炸雞排", date : "2/5", Calories : 550 },
                { name : "珍奶全糖加糖", date : "2/4", Calories : 720 },
                { name : "甜甜圈", date : "2/4", Calories : 500 },
                { name : "炸雞排", date : "2/4", Calories : 550 },
                { name : "巧克力珍奶", date : "2/4", Calories : 735 },
                { name : "薯條", date : "2/3", Calories : 445 },
                { name : "可樂", date : "2/3", Calories : 190 },
                { name : "洋芋片", date : "2/3", Calories : 532 },
                { name : "炸雞排", date : "2/3", Calories : 550 },
                { name : "甜甜圈", date : "2/3", Calories : 500 },
                { name : "珍奶全糖加糖", date : "2/3", Calories : 720 },
                { name : "炸雞排", date : "2/2", Calories : 550 },
                { name : "可樂", date : "2/2", Calories : 190 },
                { name : "薯條", date : "2/2", Calories : 445 },
                { name : "珍奶全糖加糖", date : "2/2", Calories : 720 },
                { name : "甜甜圈", date : "2/2", Calories : 500 },
                { name : "可樂", date : "2/2", Calories : 190 },
                { name : "薯條", date : "2/1", Calories : 445 },
                { name : "洋芋片", date : "2/1", Calories : 484 },
                { name : "炸雞排", date : "2/1", Calories : 550 },
                { name : "可樂", date : "2/1", Calories : 190 },
                { name : "甜甜圈", date : "2/1", Calories : 500 },
                { name : "珍奶全糖加糖", date : "2/1", Calories : 720 }
            ],
            chartDataHeader : ['Date', 'Calories'],
            chartData : [  
                [ 'Feb 1, 2021', 3010 ],
                [ 'Feb 2, 2021', 4000 ],
                [ 'Feb 3, 2021', 3355 ],
                [ 'Feb 4, 2021', 3642 ],
                [ 'Feb 5, 2021', 3158 ],
                [ 'Feb 6, 2021', 3747 ],
                [ 'Feb 7, 2021', 4219 ]
            ],
            chartOptions : {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                },

                vAxis: { minValue: 0, format: '# kcal', ticks: [0, 1000, 2000, 3000, 4000, 5000], gridlines: { color: 'none' } },
                hAxis: { gridlines: { color: 'none' }}
            }
        }
    },
    methods : {
        ChartContent() {
            return [this.chartDataHeader, ...this.chartData]
        },
        TestChartContent() {
            return [[ 'a', 'b'], ...this.testData]
        },
        async LoadTestData() {
            // const testData = []
            let todayCalories = 0
            let todayDate = 20201224
            let todayDateStr = 'Dec 24, 2020'
            let i = 1
            // this.testData.push( [ 1, 1200 ] )
            // this.testData.push( [ 2, 2200 ] )

            for ( i = 0; i < 10; i++ ) {
                this.testData.push( [ i, 1000 + i * 100 ] )
            }   // for
            /*
            this.f_data.forEach( (r) => {
                if ( r.timeStamp == todayDate )
                    todayCalories += r.calories
                else {
                    this.testData.push( [ i, todayCalories ] )
                    todayDateStr = r.dateStr
                    todayDate = r.timeStamp
                    todayCalories = 0
                    i++
                }  // else
            })
            */

            // this.chartData = this.testData
            this.chartData.push(this.chartData.pop())
        }
    }
}
</script>

<style>

</style>