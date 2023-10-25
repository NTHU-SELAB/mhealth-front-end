<template>
<nav class="navbar navbar-expand-lg navbar-light mb-4 bg-dark bg-opacity-75 text-white">
            <h1 class="p-2"><i class="bi bi-hospital-fill"></i></h1>
            <a class="navbar-brand p-2 text-white">健談HealthTalker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'food-calendar-web', params:{userID:this.userID}}">飲食日曆</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'health-news', params:{userID:this.userID}}">健康新聞</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'food-record-web', params:{userID:this.userID}}">飲食紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'exercise-record', params:{userID:this.userID}}">運動紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'water-record', params:{userID:this.userID}}">飲水紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'temperature-record', params:{userID:this.userID}}">體溫紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'bloodpressure-record', params:{userID:this.userID}}">血壓紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'bloodpressure-record', params:{userID:this.userID}}">體重預測</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'login-page'}">登出</router-link>
                    </li>
                </ul>
            </div>
        </nav>
</template>

<script>
//useless component
export default {
    data(){
        return{
            userID:''
        }
    },
    created(){
        this.userID = this.$route.params.userID;
    }
}
</script>

<style>

</style>
