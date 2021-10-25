<template>
    <div id="food-calendar-page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >智慧e聊健康</a>
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
            <p>{{year}}/{{month+1}}</p>
            <div class="row">
                <div class="col-6 col-sm-3 col-lg-2 mb-3" v-for="index in days" v-bind:key="index">
                    <div class="card">
                        <div class="card-body" @click="routeToCalendarDetail(index,month+1,year)">
                            <h5 class="card-title" style="margin-bottom: 3px;">{{month+1}}/{{index}}</h5>
                            <p class="card-text" style="color: red;margin-bottom: 3px;">{{calorieDay[index-1]}}大卡</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" @click="changeToLastMonth()">上個月</button>
        <button type="button" @click="changeToNextMonth()">下個月</button>

    </div>
    
</template>


<script>
import LiffService from '@/services/LiffService.js'
import FoodService from '@/services/FoodService.js'
export default {
    data() {
        return {
            userID : "" ,
            foodRecords : [],
            calorieDay : [],
            year : 0,
            month : 0,
            days : 31
        }
    },
    async mounted() {
        await this.calendarSet();
    },
    methods: {
        routeToCalendarDetail(index,m,y){
            this.$router.push(`/calendar-detail/${y}/${m}/${index}`)
        },
        async calendarSet(){
            let time = new Date();
            this.month = time.getMonth();
            this.year = time.getFullYear();
            this.correctDays();
            await this.countCalorieDay();
        },
        async countCalorieDay(){    
            const cals = []
            this.userID = await LiffService.getUserId()
            for(var i=0; i<this.days; i++){
                let time = new Date(this.year,this.month,i+1);
                let totalCalorie = 0;
                this.foodRecords = await FoodService.getFoodRecordsByDay(this.userID,time);
                //this.foodRecords.forEach((r) => {
                //    totalCalorie += r.calorie;
                //});
                cals.push(totalCalorie);
            }
            this.calorieDay = cals
        },
        async changeToLastMonth(){
            if(this.month == 0){
                this.month = 11;
                this.year = this.year-1;
            }
            else
                this.month = this.month-1;
            this.correctDays();
            await this.countCalorieDay();
        },
        async changeToNextMonth(){
            if(this.month == 11){
                this.month = 0;
                this.year = this.year+1;
            }
            else
                this.month = this.month+1;
            this.correctDays();
            await this.countCalorieDay();
        },
        async correctDays(){
            var dayInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
            if(((this.year%4==0 && this.year%100!=0) || this.year%400==0) && this.month==1)
                this.days=29;
            else
                this.days = dayInMonth[this.month];
        }
    }
}
</script>

<style>
.food-icon {
    max-width: 100%;
}
</style>



