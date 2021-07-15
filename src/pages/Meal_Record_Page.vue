<template>
    <div id = "meal-record-page" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >mhealth</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="../meal-record">餐點內容</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../add-meal">新增餐點</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../shop-info">店家資訊</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">聯絡我們</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../">登出</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="輸入文字以搜尋..." aria-label="Search">
                    <button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜尋</button>
                </form>
            </div>
        </nav>
        <div class="view-page">
            <!--檢視頁面-->
            <div class="adding-form" v-show="page_state == 'view'">
                <div v-for="meal in meals_data" v-bind:key="meal">
                    <div>
                        <p>餐點名稱：{{meal.name}}</p>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    name : 'pushing-setting',
    data() {
        return {
            meal_data : []
        }
    },  // data()

    methods: {
        async Edit_Meal() {
            
        },
        async Delete_Meal() {

        }
    }
}
</script>

<style>
.view-page {
    height: auto;
    min-height: 200px;
    width: 80%;
    min-width: 600px;
    max-width: 1600px;
    border: 2px black solid;
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 15px;
    margin-bottom: 15px;
}

.one-record {
    height: auto;
    width: 100%;
    max-width: 1140px;      /*隨螢幕尺寸而變，當螢幕尺寸 ≥ 1200px 時是 1140px。*/
    border: 2px black solid;
    background-color: white;
    margin-right: auto;
    margin-left: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-top: 16px;
    padding-right: 15px;
    padding-left: 15px;
}
.one-record-text {
    display: block;
    font-size: 20px;
    line-height: 20px;
    text-align: left;
    white-space: pre-wrap;
}
.one-record-add-text {
    display: inline-block;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
}
</style>
