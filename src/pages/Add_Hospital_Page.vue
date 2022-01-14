<template>
    <div id = "add-hospital-page" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >智慧e聊健康</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="../hospital-info">醫療院所管理</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../medical-msg-record">推播訊息管理</a>
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
                <h1 style="margin:10px; margin-bottom:20px">新增醫療院所</h1>
                <form @submit.prevent="Add_Hospital()">
                    <p>                    
                        <label class="label-input-add-shop">名稱：</label>
                        <input v-model="hospital_Name" maxlength="20" type="text" class="input-text-add-shop" required />  
                    </p>
                    <p>              
                        <label class="label-input-add-shop">地址：</label>
                        <input v-model="hospital_Address" class="input-text-add-shop" type="text" required />
                    </p>
                    <p>              
                        <label class="label-input-add-shop">簡介：</label>
                        <input v-model="hospital_Description" class="input-text-add-shop" type="text" required />
                    </p>
                    <p>
                        <label class="label-input-add-shop">綁定的Beacon ID：</label>
                        <select v-model="selected_beacon_ID">
                            <option disabled value="">請選擇</option>
                            <option v-for="id in beacon_IDs" v-bind:key="id" :value="id">{{id}}</option>
                        </select>
                    </p>                                           
                    <p style="text-align:center;">
                        <button id="btn-adding" type="submit">新增</button>
                        <button id="btn-adding" type="reset">重設</button>
                        <button id="btn-adding" type="button" @click="Cancel_and_Return()">取消</button>
                    </p>
                </form>  
            </div>
        </div>
        <p></p>
    </div>
</template>

<script>
import HospitalService from '@/services/HospitalService.js'
export default {
    name : 'pushing-data',
    data() {
        return {
            user_ID : "U77655323afc0252221566348b3558317",
            hospital_Name : "",
            hospital_Address : "",
            hospital_Description : "",
            beacon_IDs : ["0000000000", "0150ffaab5", "01514bc89e", "0126846195", "0125f93bd3"],
            selected_beacon_ID : "",
            res : ""
        }
    },  // data()

    methods: {
        async Add_Hospital() {
            // 寫入 DB  
            var temp_res = await HospitalService.Insert_new_Hospital( this.hospital_Name, this.hospital_Address, this.hospital_Description, this.user_ID, this.selected_beacon_ID )
            this.res = temp_res.errorMsg
            if ( temp_res.errorID == 0 )
                alert( "新增成功！" )
            else
                alert( "Error ID : " + temp_res.errorID + "\nError Msg : " + temp_res.errorMsg )          
            
            this.$router.push( { name: 'hospital-info-page' } )
        },
        async Cancel_and_Return() {
            this.$router.push( { name: 'hospital-info-page' } )
        }
    }
}
</script>