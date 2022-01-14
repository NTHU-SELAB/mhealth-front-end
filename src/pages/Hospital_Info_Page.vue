<template>
    <div id = "hospital-info-page" >
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
            <div class="edit-form">
                <h1 style="margin:10px; margin-bottom:20px">醫療院所管理</h1>
                <div>
                    <p>
                        <button id="btn-adding" type="submit" @click="Add_Hospital()">新增</button>
                    </p>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-4 col-lg-12 mb-1 pt-2" style="border: 1px black solid;" v-for="hospital in hospital_List" v-bind:key="hospital">
                        <div>
                            <h3>{{hospital.hospital_name}}</h3>
                            
                            <p>地址：{{hospital.hospital_address}}</p>
                            <p>Beacon ID：{{hospital.beaconID}}</p>
                        </div>
                        <div>
                            <button id="btn-adding" @click="To_Eidt_Hospital_Page( hospital )">修改</button>
                            <button id="btn-adding" @click="Delete_Hospital( hospital.ID, hospital.hospital_name )">刪除</button>
                        </div>
                    </div>
                </div>
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
            user_ID : "U77655323afc0252221566348b3558317",
            hospital_List : []
        }
    },  // data()
    async mounted() {
        try {
            await this.Get_Hospital_List()
        }
        catch ( err ) {
            console.log( err )
        }
    },
    methods: {
        async Add_Hospital() {
            this.$router.push( { name: 'add-hospital-page' } )
        },
        async Get_Hospital_List() {
            var temp_List = await HospitalService.Get_Hospitals_By_Owner( this.user_ID )
            this.hospital_List = temp_List.hospital_List
        },
        async To_Eidt_Hospital_Page( hospital ) {
            this.$router.push( { name : 'edit-hospital-page', params : { hospital } } )
        },
        async Delete_Hospital( hos_ID, hos_Name ) {
            var del = confirm( "確定要刪除 " + hos_Name + " 嗎？" )
            if ( ! del )
                return
            var res = await HospitalService.Delete_Hospital( hos_ID )
            if ( res.errorID == 0 )
                alert( "刪除成功！" )
            else
                alert( "Error ID : " + res.errorID + "\nError Msg : " + res.errorMsg )
            await this.Get_Hospital_List()
            window.scrollTo( 0, 0 )
        }
    }
}
</script>