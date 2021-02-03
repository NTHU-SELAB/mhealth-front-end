<template>
    <div id="food-dairy-page">
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
                        <a class="nav-link" href="../food-dairy">食物日誌</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../food-record">運動紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#" @click="LoadTestData()">體重預測</a>
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
                <div class="col-10 col-sm-3 col-lg-2 mb-3" v-for="index in 6" v-bind:key="index">
                    <div class="card">
                        <div class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/food-icon.png" class="card-img-top food-icon">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" style="margin-bottom: 3px;">香酥雞腿飯</h5>
                            <p class="card-text" style="margin-bottom: 3px; font-weight: bold; color: #8e9191;">4/20 晚餐</p>
                            <p class="card-text" style="color: red;margin-bottom: 3px;">673大卡</p>
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
                { name : "茶葉蛋", dateStr : "Dec 24, 2020", Calories : 77, timeStamp : 20201224 },
                { name : "鮮筍肉包", dateStr : "Dec 24, 2020", Calories : 172, timeStamp : 20201224 },
                { name : "四海遊龍", dateStr : "Dec 25, 2020", Calories : 1100, timeStamp : 20201224 }
            ],
            chartDataHeader : ['Date', 'Calories'],
            chartData : [  
                // [{ dateStr : "Dec 21, 2020" }, { Calories : 2020 }],
                // [{ dateStr : "Dec 22, 2020" }, { Calories : 1821 }],
                // [{ dateStr : "Dec 23, 2020" }, { Calories : 2637 }],
                // [{ dateStr : "Dec 24, 2020" }, { Calories : 1887 }],
                // [{ dateStr : "Dec 25, 2020" }, { Calories : 1565 }],
                // [{ dateStr : "Dec 26, 2020" }, { Calories : 2333 }],
                // [{ dateStr : "Dec 27, 2020" }, { Calories : 1911 }]
                [ 'Dec 21, 2020', 2020 ],
                [ 'Dec 22, 2020', 1821 ],
                [ 'Dec 23, 2020', 2637 ],
                [ 'Dec 24, 2020', 1887 ],
                [ 'Dec 25, 2020', 1565 ],
                [ 'Dec 26, 2020', 2333 ],
                [ 'Dec 27, 2020', 1911 ]
            ],
            chartOptions : {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                },

                vAxis: { minValue: 0, format: '# kcal', ticks: [0, 1000, 2000, 3000], gridlines: { color: 'none' } },
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