<template>
    <div id="food-calendar-page">
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
            <p>{{yearToday()}}/{{monthToday()}}</p>
            <div class="row">
                <div class="col-6 col-sm-3 col-lg-2 mb-3" v-for="index in daysMonth" v-bind:key="index">
                    <div class="card">
                        <div class="card-body" @click="routeToCalendarDetail(index,monthToday(),yearToday())">
                            <h5 class="card-title" style="margin-bottom: 3px;">{{monthToday()}}/{{index}}</h5>
                            <p class="card-text" style="color: red;margin-bottom: 3px;">{{calorieDay(index)}}大卡</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>


<script>
import LiffService from '@/services/LiffService.js'
import FoodService from '@/services/FoodService.js'
export default {
    data() {
        return {
            user_ID : "U77655323afc0252221566348b3558317",
            foodRecords : [],
            chartDataHeader: ['Time', '卡路里'],
            chartData: [['Time', '卡路里'],
                        [ "1234", "1222" ]],
            chartOptions: {
                legend: { position: 'none' }, 
                vAxis: { minValue: 0, format: '# kcal', gridlines: { color: 'none' } },
                hAxis: { gridlines: { color: 'none' }}
            }
        }
    },
    mounted() {

    },
    computed:{
        daysMonth(){
            var time = new Date();
            var month = time.getMonth();
            var year = time.getFullYear();
            var days = [31,28,31,30,31,30,31,31,30,31,30,31];
            if(((year%4==0 && year%100!=0) || year%400==0) && month==1)
                return 29;
            else
                return days[month];
        }
    },
    methods: {
        chartContent() {
            return [this.chartDataHeader, ...this.chartData]
        },
        routeToCalendarDetail(index,m,y){
            this.$router.push(`/calendar-detail/${y}/${m}/${index}`)
        },
        yearToday(){
            var time = new Date();
            var year = time.getFullYear();
            //var yy = (year).toString();
            return year;
        },
        monthToday(){
            var time = new Date();
            var month = time.getMonth();
            //var yy = (year).toString();
            return month+1;
        },
        calorieDay(index){
            var time = new Date();
            var date = time.getDate();
            var totalCalorie = 0;
            this.foodRecords = FoodService.getFoodRecordsByDay(user_ID,time+1000*60*60*24*(index-date));
            for(var record in foodRecords){
                totalCalorie += record.calorie;
            }
            return totalCalorie;
        }

    }
}
</script>

<style>
.food-icon {
    max-width: 100%;
}
</style>



