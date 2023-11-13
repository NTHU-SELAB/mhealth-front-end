<template>
<nav class="navbar navbar-expand-lg navbar-light mb-4 bg-dark bg-opacity-75 text-white sticky-top">
            <h1 class="p-2"><i class="bi bi-hospital-fill"></i></h1>
            <router-link class="navbar-brand text-white" :to ="{name:'food-calendar-web', params:{userID:this.userID}}"> <strong>Chat食有料</strong></router-link>
            
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
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">身體數值紀錄</a>
                        <ul class="dropdown-menu">
                            <li class="nav-item active p-2">
                                <router-link class="nav-link text-black" :to ="{name:'water-record', params:{userID:this.userID}}">飲水紀錄</router-link>
                            </li>
                            <li class="nav-item active p-2">
                                <router-link class="nav-link text-black" :to ="{name:'bloodpressure-record', params:{userID:this.userID}}">血壓紀錄</router-link>
                            </li>
                            <li class="nav-item active p-2">
                                <router-link class="nav-link text-black" :to ="{name:'temperature-record', params:{userID:this.userID}}">體溫紀錄</router-link>
                            </li>
                            <li class="nav-item active p-2">
                                <router-link class="nav-link text-black" :to ="{name:'exercise-record', params:{userID:this.userID}}">運動紀錄</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'food-record-web', params:{userID:this.userID}}">飲食紀錄</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link text-white" :to ="{name:'Input-FoodPage', params:{userID:this.userID}}">各項紀錄輸入</router-link>
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
