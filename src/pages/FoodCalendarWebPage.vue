<template>
    <div id="food-calendar-page">
        <!-- Image and text -->
        <nav-bar/>
        <h3>Food Calendar</h3>
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <v-calendar  v-model="date" color="Teal" :attributes='attrs' :model-config="modelConfig" :rows="1" is-expanded/>
                    <strong>{{ this.date }}</strong>
                </div>
                <div class="col-sm-6 p-3">
                    <div class="alert alert-success">
                        <strong>近期飲食紀錄</strong>
                    </div>
                    <div class="container p-5 bg-white bg-opacity-50 overflow-auto" style="height: 600px">
                        <ul class="list-group">
                            <li class="list-group-item mb-2 border border-light border-2 rounded-5" v-for="(item,index) in fooddata" v-bind:key="index" style="background-color:rgba(115, 160, 201, 0.75);;">
                                <div class="row">
                                    <div class="col"><h5><strong>{{ item.name }}</strong></h5></div>
                                    <div class="col text-danger"><strong>{{ item.cal }} cal</strong></div>
                                    <div class="col"><icon-gen v-bind:foodname="item.name"></icon-gen></div>
                                    <div class="col">{{ item.time }}</div>
                                </div>
                            </li>
                        </ul>
                        <!-- <div v-for="(item,index) in fooddata" v-bind:key="index" class="p-2 mb-3 bg-dark bg-opacity-75 text-white border border-primary border-2 rounded-5" >
                            <strong class="text-green">{{ item.name }}</strong><br>
                            <strong class="text-danger">{{ item.cal }} cal</strong><br>
                            <strong>{{ item.time }}</strong><br>
                        </div> -->
                    </div>
                    
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
        // const date = new Date();
        // const day = date.getDate();
        // const year = date.getFullYear();
        // const month = date.getMonth();
        return {
            attrs: [
                {
                    key: 'today',
                    dates: new Date(),
                    popover: {
                        label: "today !",
                        visibility: 'hover'
                    },
                    highlight: {
                        color: 'blue',
                        fillMode: 'outline',
                    },
                },
                {
                    bar: 'red',
                    dates: [
                         
                    ],
                    popover: {
                        label: this.dates,
                        visibility: 'hover'
                    },
                },
                {
                    bar: 'blue',
                    dates: [
                        
                    ],
                    popover: {
                        label: this.dates,
                        visibility: 'hover'
                    },
                },
                {
                    bar: 'purple',
                    dates: [
                        
                    ],
                    popover: {
                        label: this.dates,
                        visibility: 'hover'
                    },
                },
            ],
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD', // Uses 'iso' if missing
            },
            date: "",
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
            days : 31,
            fooddata:"",
        }
    },
    async created() {
        await this.refreshUserID();
        // await this.calendarSet();
        // await this.countCalorieDay();
        await this.Recentfoodrecord();
        this.dataReady = true
    },
    methods: {
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },

        async Recentfoodrecord(){
            let time = new Date();
            var foodrecordrecent = await FoodService.getFoodRecordsRecent(this.userID,time);
            //foodrecordrecent =foodrecordrecent.slice(foodrecordrecent.length-8,foodrecordrecent.length);
            var colornum=1;
            for(var i=0;i<foodrecordrecent.length;i++){
                foodrecordrecent[i].time=foodrecordrecent[i].time.slice(0,19);
                var tepyear=parseInt(foodrecordrecent[i].time.slice(0,4));
                var tepmonth=parseInt(foodrecordrecent[i].time.slice(5,7));
                var tepday=parseInt(foodrecordrecent[i].time.slice(8,10));
                //console.log(foodrecordrecent[i]);
                var tepdate=new Date(tepyear,tepmonth-1,tepday);
                colornum++;
                if(colornum>3) colornum=1;
                var color='blue'
                if(colornum==1){color='blue'} 
                else if(colornum==2){color='red'}
                else if(colornum==3){color='purple'}
                var ob={
                    bar: color,
                    dates: [
                        tepdate
                    ],
                    popover: {
                        label: "name: "+foodrecordrecent[i].name + " | calorie: " +foodrecordrecent[i].cal +"卡",
                        visibility: 'hover'
                    },
                }
                this.attrs.push(ob);
            }
            this.fooddata=foodrecordrecent.reverse();
        },
        getRandomInt(max){
            return Math.floor(Math.random() * max);
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

.list-group-item {
    transition: transform 0.3s ease-in-out;
}

.list-group-item:hover {
    transform: scale(1.1);
    background-color: rgba(0, 255, 0, 0.2); /* Natural green color with 20% opacity */
}

.list-group-item:hover .list-group-item {
    background-color: rgba(255, 0, 0, 0.2); /* Natural red color with 20% opacity */
}

.list-group-item .col:first-child {
    margin-right: 2em;
}
</style>



