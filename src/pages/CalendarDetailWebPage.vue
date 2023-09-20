<template>
    <div id="food-calendar-page">
        <nav class="navbar navbar-expand-lg navbar-light mb-4" style="background-color: #91c5ea;">
            <h1><i class="bi bi-arrow-through-heart-fill"></i></h1>
            <a class="navbar-brand">健談HealthTalker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'food-calendar-web', params:{userID:this.userID}}">飲食日曆</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'food-record-web', params:{userID:this.userID}}">飲食紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'exercise-record', params:{userID:this.userID}}">運動紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'water-record', params:{userID:this.userID}}">飲水紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'temperature-record', params:{userID:this.userID}}">體溫紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'bloodpressure-record', params:{userID:this.userID}}">血壓紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'bloodpressure-record', params:{userID:this.userID}}">體重預測</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" :to ="{name:'login-page'}">登出</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        

        <div class="container">
            <!--<GChart style="height:210px; width:100%; top = 20%;" v-show="true"
                type="LineChart"
                :data="chartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref="chart"/>-->
            <div class="row">
                <div class="col-12 col-sm-6 col-lg-3 mb-3" v-for="meal in mealList" v-bind:key="meal">
                    <div class="card">
                        <div class="pl-4 pr-4 pt-4 pb-4">
                            <p>{{getM}}/{{getD}}</p>
                            <img class="card-img-top food-icon" :src="recordImage(meal.image)">
                        </div>
                        <div class="col-10 food-record-detail">
                            <div>{{getM}}/{{getD}}{{meal.meal}}</div>
                            <div>名稱：{{meal.name}}</div>
                            <div>重量：{{meal.weight}} g</div>
                            <div>脂肪：{{meal.fat}} g</div>
                            <div>卡路里：{{meal.calorie}}大卡</div>
                            <div>膳食纖維：{{meal.fiber}} g</div>
                            <div>碳水化合物：{{meal.sugar}} g</div>
                        </div>
                        <div class="col-12 food-record-detail">記錄時間：{{new Date(meal.recordTime).toLocaleString()}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>


<script>
import FoodService from '@/services/FoodService.js'

export default {
    data() {
        return {
            userID : "",
            mealList : []
        }
    },
    async created() {
        await this.refreshUserID();
        await this.refreshMealList();
    },
    computed:{
        getD(){
            return this.$route.params.day;
        },
        getM(){
            return this.$route.params.month;
        },
        getY(){
            return this.$route.params.year;
        },
    },
    methods: {
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },
        async refreshMealList(){
            let time = new Date(this.$route.params.year,this.$route.params.month-1,this.$route.params.day).getTime();
            this.mealList = await FoodService.getFoodRecordsByDay(this.userID,time);
            //console.log(time);
        },
        recordImage(imagePath) {
            if (imagePath.indexOf('https://') === 0) {
                return imagePath
            } else return require('../assets/food-icon.png')
        },
    }
}
</script>

<style>
.food-icon {
    max-width: 100%;
}
</style>



