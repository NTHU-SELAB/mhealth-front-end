<template>
    <div id = "shop-info-page" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >Health Chat</a>
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
            <div class="edit-form">
                <h1 style="margin:10px; margin-bottom:20px">店家資訊</h1>
                <div>
                    <p>
                        <button id="btn-adding" type="submit" @click="Add_Shop()">新增</button>
                    </p>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-4 col-lg-12 mb-1 pt-2" style="border: 1px black solid;" v-for="shop in shop_List" v-bind:key="shop">
                        <div>
                            <h3>{{shop.shopName}}</h3>
                            
                            <p>地址：{{shop.shopAddr}}</p>
                            <p>Beacon ID：{{shop.beaconID}}</p>
                        </div>
                        <div>
                            <button id="btn-adding" @click="To_Eidt_Shop_Page( shop )">修改</button>
                            <button id="btn-adding">刪除</button>
                        </div>
                    </div>
                </div>
            </div>                         
        </div>             
    </div>
</template>

<script>
import ShopService from '@/services/ShopService.js'
export default {
    name : 'pushing-setting',
    data() {
        return {
            user_ID : "U77655323afc0252221566348b3558317",
            shop_List : []
        }
    },  // data()
    async mounted() {
        await this.Get_Shop_List()
    },
    methods: {
        async Add_Shop() {
            this.$router.push( { name: 'add-new-shop-page' } )
        },
        async Get_Shop_List() {
            var temp_List = await ShopService.Get_Shop_By_Owner( this.user_ID )
            this.shop_List = temp_List.shopList
        },
        async To_Eidt_Shop_Page( shop ) {
            this.$router.push( { name: 'edit-shop-page', params : { shop } } )
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
.edit-form {
    padding: 15px;
    text-align: left;
    font-size: 20px;
}
.label-input {
    font-size: 20px;
    font-family: 宋體;
    width: 120px;
    height: 28px;
    margin-left: 50px;
    line-height: 28px;
    text-align:left;
    color: black;
    float:initial;
}
.input-text {
    font-size: 20px;
    width: 200px;
    float:inline-start;
}
#btn-edit {
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
