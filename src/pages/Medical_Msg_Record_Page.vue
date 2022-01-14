<template>
    <div id = "medical-msg-record-page" >
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
            <!--檢視頁面-->
    
            <div class="" style="padding: 15px; text-align: left; font-size: 20px;">               
                <h1>推播訊息管理</h1>
                <div>
                    <select v-model="selected_hospital" @change="Refresh_Msg_Records()">
                        <option disabled value="">請選擇</option>
                        <option v-for="hospital in hospital_List" v-bind:key="hospital" :value="hospital.ID">{{hospital.hospital_name}}</option>
                    </select>
                    <!-- <p>ID = {{this.error_Msg}}</p> -->
                </div>
                <!--從下拉式清單選擇餐廳後印出它的餐點-->
                <p v-if="selected_hospital != ''">
                    <button id="btn-adding" type="submit" @click="Add_Msg()">新增推播訊息</button>
                </p>
                <p class="text-right" >
                    <input maxlength="20" class="h-100 mr-3 align-middle" />
                    <button class="btn btn-outline-secondary btn-sm align-middle">
                        <span class="glyphicon glyphicon-search"></span>搜尋
                    </button>
                </p>
                <table class="table table-striped table-bordered">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td class="align-middle text-center" style="width: 64%;">推播內容</td>
                        <td class="align-middle text-center" style="width: 8%;">目標年齡</td>
                        <td class="align-middle text-center" style="width: 8%;">目標性別</td>
                        <td class="align-middle text-center" style="width: 8%;">beacon ID</td>
                        <td class="align-middle text-center" style="width: 12%;">動作</td>
                    </tr>
                    <tr v-for="( item, key ) in msg_List" :key="key" style="height: 100px">
                        <td class="align-middle text-left" style="width: 64%;">{{ item.text }}</td>
                        <td class="align-middle text-center" style="width: 8%;">{{ item.age }}</td>
                        <td class="align-middle text-center" style="width: 8%;">{{ item.gender }}</td>
                        <td class="align-middle text-center" style="width: 8%;">{{ item.beacon_ID }}</td>
                        <td class="align-middle text-center" style="width: 12%;">
                            <div class="btn-group btn-group-justified" >
                                <button class="btn btn-primary mr-3" @click="To_Edit_Page( item )" type="" >編輯</button>
                                <button class="btn btn-primary" @click="Delete_Msg( item )" type="" >刪除</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import HospitalService from '@/services/HospitalService.js'
export default {  
    name : 'pushing-setting',
    data() {
        return {
            error_Msg : -1,
            user_ID : "U77655323afc0252221566348b3558317",
            selected_hospital : "",
            hospital_List : [],    // 從DB讀取到的醫療院所清單
            // 根據選擇的醫療院所對應的推播訊息 
            msg_List : []            
        }
    },  // data()
    async mounted() {
        await this.Refresh_Hospital_List()
    },

    methods: {
        async Add_Msg() {
            var hospital_ID = this.selected_hospital
            var beacon_ID = null
            this.hospital_List.forEach( ( hospital ) => {
                if ( hospital.ID == hospital_ID )
                    beacon_ID = hospital.beaconID
            } )
            this.$router.push( { name: 'add-medical-msg-page', params : { hospital_ID, beacon_ID } } )
        },
        async Get_Hospital_List() {
            
        },
        async Refresh_Msg_Records() {
            var temp_List = await HospitalService.GetMessageByHospital( this.selected_hospital )
            this.msg_List = temp_List.msgList
            this.msg_List.forEach( ( item ) => {
                var filter_str = item.filter.split( ",age:" )[1].split( ",gender:" )
                item.age = filter_str[0]
                if ( item.age != "null" )
                    item.age += "歲"
                else
                    item.age = "不限"
                item.gender = filter_str[1].split( "~" )[0]
                if ( item.gender == "1" )
                    item.gender = "男性"
                else if ( item.gender == "2" )
                    item.gender = "女性"
                else
                    item.gender = "不限"
            } )
            
        },
        async Refresh_Hospital_List() {
            var temp_List = await HospitalService.Get_Hospitals_By_Owner( this.user_ID )
            this.hospital_List = temp_List.hospital_List
            if ( this.shop_List.length > 0 )
                this.selected_hospital = this.hospital_List[0].ID
            else
                this.selected_hospital = ""
            this.Refresh_Msg_Records()
        },
        async To_Edit_Page( msg ) {
            // this.error_Msg = meal.mealName
            var hospital_ID = this.selected_hospital
            this.$router.push( { name: 'edit-medical-msg-page', params : { msg, hospital_ID } } )
        },
        async Delete_Msg( oneMsg ) {       
            var del = confirm( "確定要刪除此訊息嗎？" )           
            if ( ! del )
                return
            var res = await HospitalService.Delete_Message( oneMsg.message_ID )
            if ( res.errorID == 0 )
                alert( "刪除成功！" )
            else
                alert( "Error ID : " + res.errorID + "\nError Msg : " + res.errorMsg )
            await this.Refresh_Msg_Records()
            window.scrollTo( 0, 0 )
        }
    }
}
</script>