<template>
    <div id="food-calendar-page">
        <!-- Image and text -->
        <nav-bar/>
        <h3>Food Calendar</h3>
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <v-date-picker v-model="date" is-expanded color="Teal" :attributes='attrs'/>
                    <strong>{{ this.date }}</strong>
                </div>
                <div class="col-sm-6 p-4 bg-white bg-opacity-50 text-dark">

                </div>
            </div>
        </div>
        <!-- <div class="container" v-if="dataReady">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-primary p-2 m-2" @click="changeToLastMonth()">上個月</button>
                <button class="btn btn-light p-2 m-2">{{year}}/{{month+1}}</button>
                <button class="btn btn-primary p-2 m-2" @click="changeToNextMonth()">下個月</button>
            </div>
            <div class="row">
                <div class="col-6 col-sm-3 col-lg-2 mb-3" v-for="(item,index) in calorieDay" v-bind:key="index">
                    <div class="card bg-body bg-opacity-50 shadow-lg">
                        <div class="card-body" @click="routeToCalendarDetail(index+1,month+1,year)">
                            <h5 class="card-title" style="margin-bottom: 3px;">{{month+1}}/{{index+1}}</h5>
                            <p class="card-text" style="color: red;margin-bottom: 3px;">{{item}}大卡</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <!--<button type="button" @click="countCalorieDay()">載入食物日曆</button>-->

    </div>
    
</template>


<script>
import FoodService from '@/services/FoodService.js'
export default {
    data() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        return {
            attrs: [
                {
                    key: 'today',
                    highlight: 'teal',
                    dates: new Date(),
                    popover: {
                        label: this.dates,
                        visibility: 'hover'
                    }
                },
                {
                    highlight: {
                        color: 'red',
                        fillMode: 'light',
                    },
                    dates: new Date(year, month, 13),
                },
            ],
            customer: {
                name: 'Nathan Reyes',
                birthday: '1983-01-21',
            },
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD', // Uses 'iso' if missing
            },
            date: new Date(),
            dataReady : false,
            //dataReady1: false,
            //dataReady2: false,
            //dataReady3: false,
            //userID : "" ,
            //foodRecords : [],
            userID : '',
            calorieDay : [],
            year : 0,
            month : 0,
            days : 31
        }
    },
    async created() {
        await this.refreshUserID();
        await this.calendarSet();
        await this.countCalorieDay();
        this.dataReady = true
    },
    methods: {
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },
        routeToCalendarDetail(index,m,y){
            this.$router.push(`/calendar-detail-web/${this.userID}/${y}/${m}/${index}`)
        },
        async calendarSet(){
            let time = new Date();
            this.month = time.getMonth();
            this.year = time.getFullYear();
            await this.correctDays();
        },
        async countCalorieDay(){    
            //const cals = []
            this.calorieDay = []
            var foodRecords = []
            for(var i=0; i<this.days; i++){
                let time = new Date(this.year,this.month,i+1).getTime();
                let totalCalorie = 0;
                foodRecords = await FoodService.getFoodRecordsByDay(this.userID,time);
                foodRecords.forEach((r) => {
                    totalCalorie += r.calorie;
                })
                this.calorieDay.push(totalCalorie);
                /*if(i==0)
                    this.dataReady1=true
                if(i==10)
                    this.dataReady2=true
                if(i==20)
                    this.dataReady3=true
                */
            }
            
            //this.calorieDay = cals
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
.special-card {
  background-color: rgb(19, 101, 217);
  opacity: 0.5;
}
.card-title{
  color: black;
  opacity: 1
}
</style>



