<template>
    <div id = "add-new-shop" >
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
            <!--新增頁面-->
            <div class="adding-form">
                <h1 style="margin:10px; margin-bottom:20px">新增店家</h1>
                <form>
                    <p>                    
                        <label class="label-input-add-shop">店家名稱：</label>
                        <input v-model="shop_Name" maxlength="20" type="text" class="input-text-add-shop" required />  
                    </p>
                    <p>              
                        <label class="label-input-add-shop">店家地址：</label>
                        <input v-model="shop_Address" class="input-text-add-shop" type="text" />
                    </p>
                    <p>
                        <label class="label-input-add-shop">綁定的Beacon ID：</label>
                        <select v-model="selected_beacon_ID">
                            <option disabled value="">請選擇</option>
                            <option v-for="id in beacon_IDs" v-bind:key="id">{{id}}</option>
                        </select>
                    </p>                                           
                    <p style="text-align:center;">
                        <button id="btn-adding" type="submit" @click="Add_Shop()">新增</button>
                        <button id="btn-adding" type="reset">重設</button>
                        <button id="btn-adding" type="button" @click="Cancel_and_Return()">取消</button>
                    </p>
                </form>  
            </div>
        </div>        
    </div>
</template>

<script>
import MealService from '@/services/MealService.js'
export default {
    name : 'pushing-data',
    data() {
        return {
            user_ID : "U77655323afc0252221566348b3558317",
            shop_Name : "",
            shop_Address : "",
            beacon_IDs : ["000000001", "000000002", "000000003"],
            selected_beacon_ID : ""
        }
    },  // data()

    methods: {
        async Add_Shop() {
            // TODO 寫入 DB
            await MealService.Post_New_Shop( this.shop_Name, this.shop_Address, this.user_ID, this.beacon_ID )

            this.$router.push( { name: 'shop-info-page' } )
        },
        async Cancel_and_Return() {
            this.$router.push( { name: 'shop-info-page' } )
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

.adding-form {
    padding: 15px;
    text-align: left;
    font-size: 20px;
}

.label-input-add-shop {
    font-size: 20px;
    font-family: 宋體;
    width: 200px;
    height: 28px;
    margin-left: 50px;
    line-height: 28px;
    text-align:left;
    color: black;
    float:initial;
}
.input-text-add-shop {
    font-size: 20px;
    width: 500px;
    float:inherit;
}

#btn-adding {
    font-size: 20px;
    font-family: 宋體;
    width: 120px;
    height: 30px;
    margin: 25px;
    line-height: 28px;
    text-align: center;
    color: black;
    border-radius: 6px;
    border: 2px black solid;
}
</style>