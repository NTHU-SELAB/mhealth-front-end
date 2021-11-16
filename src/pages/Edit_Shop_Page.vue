<template>
    <div id = "edit-shop" >
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
            <!--新增頁面-->
            <div class="adding-form">
                <h1 style="margin:10px; margin-bottom:20px">編輯店家</h1>
                <form @submit.prevent="Update_Shop()">
                    <p>                    
                        <label class="label-input-add-shop">店家名稱：</label>
                        <input v-model="shop_Name" maxlength="20" type="text" class="input-text-add-shop" required />  
                    </p>
                    <p>              
                        <label class="label-input-add-shop">店家地址：</label>
                        <input v-model="shop_Address" class="input-text-add-shop" type="text" required />
                    </p>
                    <p>
                        <label class="label-input-add-shop">綁定的Beacon ID：</label>
                        <select v-model="selected_beacon_ID">
                            <option disabled value="">請選擇</option>
                            <option v-for="id in beacon_IDs" v-bind:key="id" :value="id">{{id}}</option>
                        </select>
                    </p>                                           
                    <p style="text-align:center;">
                        <button id="btn-adding" type="submit">儲存</button>
                        <button id="btn-adding" type="reset">重設</button>
                        <button id="btn-adding" type="button" @click="Cancel_and_Return()">取消</button>
                    </p>
                </form>  
            </div>
        </div>    
        <!-- <p>result = "{{res.errorMsg}}"</p>     -->
    </div>
</template>

<script>
import ShopService from '@/services/ShopService.js'
export default {
    name : 'pushing-data',
    data() {
        return {
            user_ID : "U77655323afc0252221566348b3558317",
            shop_ID : "",
            shop_Name : "",
            shop_Address : "",
            beacon_IDs : ["0000000001", "0000000002", "0000000003"],
            selected_beacon_ID : "",
            res : ""
        }
    },  // data()
    async mounted() {
        await this.Set_All_Vars()
    },

    methods: {
        async Update_Shop() {
            // TODO 寫入 DB
            this.res = await ShopService.Update_Shop(  this.shop_ID, this.selected_beacon_ID, this.user_ID, this.shop_Name, this.shop_Address )
            if ( this.res.errorID == 0 )
                alert( "修改成功！" )
            else
                alert( "Error ID : " + this.res.errorID + "\nError Msg : " + this.res.errorMsg )
            this.$router.push( { name: 'shop-info-page' } )
        },
        async Cancel_and_Return() {
            this.$router.push( { name: 'shop-info-page' } )
        },
        async Set_All_Vars() {
            var shop = this.$route.params.shop
            this.shop_Name = shop.shopName
            this.shop_Address = shop.shopAddr
            this.selected_beacon_ID = shop.beaconID
            this.shop_ID = shop.shopID
        }
    }
}
</script>