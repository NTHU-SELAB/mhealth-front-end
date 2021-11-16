<template>
    <div id = "meal-record-page" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >智慧e聊健康</a>
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
            <div class="adding-form">               
                <h1>餐點內容</h1>
                <div>
                    <select v-model="selected_shop" @change="Refresh_Meal_Records()">
                        <option disabled value="">請選擇餐廳</option>
                        <option v-for="shop in shop_List" v-bind:key="shop" :value="shop.shopID">{{shop.shopName}}</option>
                    </select>
                    <!-- <p>ID = {{this.error_Msg}}</p> -->
                </div>
                <!--從下拉式清單選擇餐廳後印出它的餐點-->
                <p v-if="selected_shop != ''">
                    <button id="btn-adding" type="submit" @click="Add_Meal()">新增餐點</button>
                </p>
                <div v-if="meal_List.length > 0">
                    <div class="row" >
                        <div class="col-12 col-sm-4 col-lg-3 mb-4" v-for="meal in meal_List" v-bind:key="meal">
                            <div class="card">
                                <div class="img-area">
                                    <div class="pl-4 pr-4 pt-4 pb-4">
                                        <img :src="'https://selab1.cs.nthu.edu.tw/mhealth/' + meal.img" class="img-area">
                                    </div>
                                    
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title" style="margin-bottom: 3px;">{{meal.mealName}}</h3>
                                    <p class="card-text" style="margin-bottom: 3px; font-weight: bold; color: #8e9191;">價格：{{meal.price}} 元</p>
                                    <p class="card-text" style="color: red;margin-bottom: 3px;">熱量：{{meal.calorie}} 大卡</p>
                                    <!-- <a href="#" class="btn btn-primary">查看明細</a> -->
                                    
                                    <button id="btn-menu" @click="To_Edit_Page( meal )">修改</button>
                                    <button id="btn-menu" @click="Delete_Meal( meal.mealID, meal.mealName )">刪除</button>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        <!-- <p>Select = {{selected_shop}}</p>      -->
    </div>
</template>

<script>
import ShopService from '@/services/ShopService.js'
import MealService from '@/services/MealService.js'
export default {  
    name : 'pushing-setting',
    data() {
        return {
            error_Msg : -1,
            user_ID : "U77655323afc0252221566348b3558317",
            selected_shop : "",
            shop_List : [],    // 從DB讀取到的餐廳清單
            // 根據選擇的餐廳對應的餐點資訊  
            meal_List : []            
        }
    },  // data()
    async mounted() {
        await this.Refresh_Shop_List()
    },

    methods: {
        async Add_Meal() {
            var shop_ID = this.selected_shop
            this.$router.push( { name: 'add-meal-page', params : { shop_ID } } )
        },
        async Get_Shop_List() {
            // 用 selected_shop 到 DB 查詢已選取的餐廳對應的餐點
        },
        async Refresh_Meal_Records() {
            var temp_List = await MealService.Get_Meal_By_Shop( this.selected_shop )
            this.meal_List = temp_List.mealList
        },
        async Refresh_Shop_List() {
            var temp_List = await ShopService.Get_Shop_By_Owner( this.user_ID )
            this.shop_List = temp_List.shopList
            if ( this.shop_List.length > 0 )
                this.selected_shop = this.shop_List[0].shopID
            else
                this.selected_shop = ""
            this.Refresh_Meal_Records()
        },
        async To_Edit_Page( meal ) {
            // this.error_Msg = meal.mealName
            var shop_ID = this.selected_shop
            this.$router.push( { name: 'edit-meal-page', params : { meal, shop_ID } } )
        },
        async Delete_Meal( meal_ID, meal_Name ) {
            var del = confirm( "確定要刪除 " + meal_Name + " 嗎？" )
            if ( ! del )
                return
            var target_ID = -1
            var data = await MealService.Get_Targets_By_Shop( this.selected_shop )
            data.targetList.forEach( tar => {
                if ( tar.targetMealID == meal_ID ) {
                    target_ID = tar.targetID
                }   // if
            });
            if ( target_ID > -1 )
                var res = await MealService.Delete_Target( target_ID )
            res = await MealService.Delete_Meal( meal_ID )
            if ( res.errorID == 0 )
                alert( "刪除成功！" )
            else
                alert( "Error ID : " + res.errorID + "\nError Msg : " + res.errorMsg )
            await this.Refresh_Meal_Records()
            window.scrollTo( 0, 0 )
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
.img-area {
    width: 100%;
    height: 240px;
    margin-bottom: 15px;
}

.card {
    height: 450px;
    width: auto;
}
.card-body {
    padding-bottom: 15px;
    font-size: 20px;
}

#btn-menu {
    position :sticky;
    font-size: 20px;
    font-family: 宋體;
    width: 100px;
    height: 30px;
    margin: 25px;
    line-height: 28px;
    text-align: center;
    color: black;
    border-radius: 6px;
    border: 2px black solid;
}
</style>
