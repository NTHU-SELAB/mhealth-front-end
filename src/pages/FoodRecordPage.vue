<template>
    <div class="container" style="margin-top:15px;">
        <ul class="nav nav-pills nav-fill" style="margin-bottom:15px;">
            <li class="nav-item">
                <a class="nav-link" href="#" :class="{'active': timeFilter==='today'}" @click="changeTimeFilter('today')">當日</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" :class="{'active': timeFilter==='week'}" @click="changeTimeFilter('week')">一週</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" :class="{'active': timeFilter==='month'}" @click="changeTimeFilter('month')">一月</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" :class="{'active': timeFilter==='three-month'}" @click="changeTimeFilter('three-month')">三月</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" :class="{'active': timeFilter==='year'}" @click="changeTimeFilter('year')">一年</a>
            </li>
        </ul>

        <div class="row food-record" v-for="record in foodRecords" v-bind:key="record.recordTime">
            <div class="col-2"><img class="food-icon" src="../assets/food-icon.png" alt=""></div>
            <div class="col-5 food-record-detail">
                <div>時段：{{record.meal}}</div>
                <div>名稱：{{record.name}}</div>
                <div>重量：{{record.weight}}g</div>
            </div>
            <div class="col-5 food-record-detail">
                <div>卡路里：{{record.calorie}}</div>
                <div>脂肪：{{record.fat}}</div>
                <div>碳水化合物：{{record.sugar}}</div>
                <div>膳食纖維：{{record.fiber}}</div>
            </div>
            <div class="col-10 offset-2 food-record-detail">記錄時間：{{new Date(record.recordTime).toLocaleString()}}</div>
        </div>
    </div>
</template>

<script>

import FoodService from '@/services/FoodService.js'

export default {
    name: 'food-record',

    data() {
        return {
            timeFilter: 'today',
            foodRecords: []
        }
    },

    async mounted() {

    },

    methods: {
        changeTimeFilter(filter) {
            this.timeFilter = filter
            this.refreshFoddRecord()
        },
        
        async refreshFoddRecord() {
            if (this.timeFilter === 'today') {
                this.foodRecords = await FoodService.getFoodRecords('Uedd9e265d4663947057bdf33a6dec9e0', Date.now() - 1000*3600*24)
            } else if (this.timeFilter === 'week') {
                this.foodRecords = await FoodService.getFoodRecords('Uedd9e265d4663947057bdf33a6dec9e0', Date.now() - 1000*3600*24*7)
            } else if (this.timeFilter === 'month') {
                this.foodRecords = await FoodService.getFoodRecords('Uedd9e265d4663947057bdf33a6dec9e0', Date.now() - 1000*3600*24*30)
            } else if (this.timeFilter === 'three-month') {
                this.foodRecords = await FoodService.getFoodRecords('Uedd9e265d4663947057bdf33a6dec9e0', Date.now() - 1000*3600*24*30*3)
            } else if (this.timeFilter === 'year') {
                this.foodRecords = await FoodService.getFoodRecords('Uedd9e265d4663947057bdf33a6dec9e0', Date.now() - 1000*3600*24*30*12)
            }
        }
    }
}

</script>

<style>
.food-icon {
    margin-top: 35px;
    max-width: 100%;
}

.food-record {
    /* border: 1px black solid; */
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 5px;
    box-shadow: 3px 4px 4px 0 rgba(0, 0, 0, 0.2), 3px 3px 4px 6px rgba(0, 0, 0, 0.19);
    margin-bottom: 7px;
}

.food-record-detail {
    text-align: left;
    font-size: 14px;
}
</style>