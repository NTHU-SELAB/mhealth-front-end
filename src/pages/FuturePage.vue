<template>
    <div id="food-record-page" v-if="dataReady">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand">智慧e聊健康</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                        <router-link class="nav-link" :to ="{name:'login-page'}">登出</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container">
            <GChart style="height:210px;width:100%;" v-show="isChartShow"
                type="LineChart"
                :data="chartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref="chart"/>
        </div>
        <!--
        <div>
            <p>{{this.chartData}}</p>
        </div>
        -->
    </div>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
    components:{
        GChart
    },

    data(){
        return {
            dataReady :"true",
            isChartShow:"false",
            chartDataHeader: ['Time', '體重'],
            chartData: [[1,60.1],[2,60.5],[3,60.7],[4,60.4],[5,61],
                        [6,61.5],[7,61.3],[8,61.7],[9,61.6],[10,62]],
            userID:"A",
            chartOptions: {
                legend: { position: 'none' }, 
                vAxis: {  format: '# kg', gridlines: { color: 'none' } },
                hAxis: { gridlines: { color: 'none' }}
            },
            weights: []
        }
    },
    mounted(){
        this.generate(5)
    },
    methods:{
        generate(times){
            let data = this.chartData
            //ARMA(5,3)
            for(var i=0;i<times;i++){
                let sum = 0.5*data[i+9][1]+0.25*data[i+8][1]+0.15*data[i+7][1]+0.1*data[i+6][1]
                let sd = 0
                for(var j=0;j<3;j++){
                    sd = sd + (sum-data[i+j+6][1])*(sum-data[i+j+6][1])
                } 
                data.push([i+11, sum + 0.5 * Math.sqrt(sd) * (data[i+9][1]>data[i+8][1]? 1 : -1) + Math.random()*0.4-0.2])
            }
            this.chartData = data.slice()
            this.isChartShow = 'true'
        },
        chartContent(){
            return [this.chartDataHeader,...this.chartData]
        }
    }
}   
</script>
