<template>
    <div id="food-calendar-page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="#" @click ="To_Landing_Page()">醫師鏈 Dr. Chain</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="../">首頁<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../food-record">食物日誌</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../add-food-manually">運動紀錄</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">體重預測</a>
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
        </nav>

        <!--圖表-->
        <!-- <div id="app" class="container">
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        </div> -->


        <!--每天吃的食物紀錄-->
        <div class="container">
            <GChart style="height:210px; width:100%;" v-show="isChartShow"
                type="LineChart"
                :data="chartContent()"
                :options="chartOptions"
                :resizeDebounce="500"
                ref="chart"/>
            <div class="row">
                <div class="col-6 col-sm-3 col-lg-2 mb-3" v-for="index in 6" v-bind:key="index">
                    <div class="card">
                        <div class="pl-4 pr-4 pt-4 pb-4">
                            <img src="../assets/food-icon.png" class="card-img-top food-icon">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" style="margin-bottom: 3px;">香酥雞腿飯</h5>
                            <p class="card-text" style="margin-bottom: 3px; font-weight: bold; color: #8e9191;">4/20 晚餐</p>
                            <p class="card-text" style="color: red;margin-bottom: 3px;">673大卡</p>
                            <!-- <a href="#" class="btn btn-primary">查看明細</a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            chartDataHeader: ['Time', '卡路里'],
            chartData: [],
            chartOptions: {
                legend: { position: 'none' }, 
                vAxis: { minValue: 0, format: '# kcal', gridlines: { color: 'none' } },
                hAxis: { gridlines: { color: 'none' }}
            }
        }
    },
    mounted() {

    },

    methods: {
        chartContent() {
            return [this.chartDataHeader, ...this.chartData]
        }
        
    }
}
</script>





<style>
.food-icon {
    max-width: 100%;
}
</style>