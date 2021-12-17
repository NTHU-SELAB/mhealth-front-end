<template>
    <div id="food-calendar-page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >健談HealthTalker</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--網頁目錄在router/index內-->
            <!--
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="../../../food-calendar">首頁<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../../../food-dairy">食物日誌</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../../../food-record">飲食紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../../../exercise-record">運動紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../../../water-record">飲水紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../../../temperature-record">體溫紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../../../bloodpressure-record">血壓紀錄</a>
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
            -->
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
import LiffService from '@/services/LiffService.js'

export default {
    data() {
        return {
            mealList : []
        }
    },
    async mounted() {
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
        async refreshMealList(){
            let time = new Date(this.$route.params.year,this.$route.params.month-1,this.$route.params.day).getTime();
            const userID = await LiffService.getUserId()
            this.mealList = await FoodService.getFoodRecordsByDay(userID,time);
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



