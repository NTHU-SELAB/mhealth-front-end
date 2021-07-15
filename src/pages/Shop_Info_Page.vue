<template>
    <div id = "shop-info-page" >
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
            <!--新增頁面-->
            <div class="edit-form">
                <h1 style="margin:10px; margin-bottom:20px">新增餐點</h1>
                <form @submit="checkForm">
                    <p>                    
                        <label class="label-input">商店名稱：</label>
                        <input v-model="temp_Shop_Name" class="input-text" type="text" maxlength="30" />
                        <input id="btn-edit" type="submit" value="修改" />
                    </p>
                </form>
                <form @submit="checkForm">
                    <p>
                        <label class="label-input">商店持有人：</label>
                        <input v-model="temp_Shop_Owner" class="input-text" type="text" maxlength="40" />
                        <input id="btn-edit" type="submit" value="修改" />
                    </p>
                </form>
                <form @submit="checkForm">
                    <p>
                        <label class="label-input">帳號：</label>
                        <input v-model="temp_Account" class="input-text" type="text" maxlength="40" />
                        <input id="btn-edit" type="submit" value="修改" />
                    </p>
                </form>
                <form @submit="checkForm">          
                    <p>
                        <label class="label-input">密碼：</label>
                        <input v-model="temp_PassWord" class="input-text" type="text" maxlength="40" />
                        <input id="btn-edit" type="submit" value="修改" />
                    </p>
                </form>
                <form @submit="checkForm">                           
                    <p>
                        <label class="label-input">Beacon ID：</label>
                        <input v-model="temp_Beacon_ID" class="input-text" type="text" maxlength="10" />
                        <input id="btn-edit" type="submit" value="修改" />
                    </p>        
                </form>  
            </div>
        </div>
              
    </div>
</template>

<script>
export default {
    name : 'pushing-setting',
    data() {
        return {
            temp_Shop_Name : "餐廳",        // 商店名稱 char[30]
            temp_Account : "abcde",          // 登入帳號 char[40]        
            temp_PassWord : "12345",         // 登入密碼 char[40]
            temp_Shop_Owner : "Leo",       // 商店持有者 char [40]
            temp_Beacon_ID : "0125f93bd3",        // char[10] 0125f93bd3 和 0126846195
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
