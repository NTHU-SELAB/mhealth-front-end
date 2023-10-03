<template>
    <div>
        <nav-bar/>
        <h3><strong>運動紀錄</strong></h3>
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <div class="bg-white bg-opacity-50 text-dark p-4">
                    <bar-chart/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="container" v-if="dataReady">
                        <img :src="pictureURL">
                        <!--<p>{{this.data}}</p>-->
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
    name: 'exercise-record',
    data() {
        return {
            dataReady: false,
            userID : '',
            pictureURL :"",
            data :[],
        }
    },

    async created() {
        await this.refreshUserID()
        await this.getSport()
        this.dataReady = true
    },

    methods: {
        async refreshUserID(){
            this.userID = this.$route.params.userID
        },
        async getSport(){
            var sport = await FoodService.getSportPicture(this.userID)
            this.pictureURL = sport
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