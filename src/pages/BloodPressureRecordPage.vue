<template>
    <div id="blood-record-page">
        <nav-bar/>
        <h3><strong>血壓紀錄</strong></h3>
        <p><strong>顯示最近前 7 筆資料 若資料少於7筆 剩餘填0</strong></p>
        <div class="container">
            <div class="row">
                <div class="col-md-6 p-4 bg-white bg-opacity-75 text-dark" v-if="dataReady">
                    <line-chart v-bind:blood-data="bloodPressureshow" v-bind:datatype="'blood'"></line-chart>
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
    name: 'bloodpressure-record',

    /*components: {
        GChart
    },*/

    data() {
        return {
            bloodPressureshow:"",
            dataReady: false,
            userID : '',
            warn : "",
            pictureURL :"",
            hasWarn : false,
        }
    },

    async created() {
        await this.refreshUserID();
        await this.getBloodPressure().then(
            response => {
                this.bloodPressureshow=response
            },
        );
        //console.log(this.bloodPressureshow);
        this.dataReady = true
    },

    methods: {
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },
        async getBloodPressure(){
            var bloodPressure = await FoodService.getBloodPressure(this.userID)
            // if(bloodPressure.HasWarn==1){
            //     this.hasWarn = true
            //     this.warn = bloodPressure.HealthWarn
            // }
            return bloodPressure;
            //this.pictureURL = bloodPressure.GraphURL
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