<template>
    <div id="food-calendar-page">
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



