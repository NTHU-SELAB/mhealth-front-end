<template>
    <div>
        <nav-bar/>
        <h3><strong>飲水紀錄</strong></h3>
        <p><strong>顯示最近前 7 筆資料 若資料少於7筆 剩餘填0</strong></p>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="bg-white bg-opacity-50 text-dark p-4" v-if="dataReady">
                    <bar-chart v-bind:water-data="watershow" v-bind:datatype="'water'"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="container" v-if="dataReady">
                        <p v-if="hasWarn">{{this.warn}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//import { GChart } from 'vue-google-charts'
//import LiffService from '@/services/LiffService.js'
import FoodService from '@/services/FoodService.js'

export default {
    name: 'water-record',
/*
    components: {
        GChart
    },
*/
    data() {
        return {
            dataReady: false,
            userID : '',
            warn : "",
            pictureURL :"",
            hasWarn : false,
            watershow:""
        }
    },

    async created() {
        await this.refreshUserID()
        await this.getWater().then(
            response => {
                this.watershow=response
            },
        );
        //console.log(this.watershow)
        this.dataReady = true
    },

    methods: {
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },
        async getWater(){
            var water = await FoodService.getWater(this.userID)
            // if(water.HasWarn==1){
            //     this.hasWarn = true
            //     this.warn = water.HealthWarn
            // }
            return water;
        },
    }
}

</script>

<style scoped>
.food-icon {
    margin-top: 10px;
    max-width: 100%;
    height: 200px;
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