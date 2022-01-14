<template>
    <div id = "edit-medical-msg-page" >
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
                <h1 style="margin:10px; margin-bottom:20px">新增推播訊息</h1>
                <form @submit.prevent="Update_Msg()">              
                    <p><label class="label-input-add-meal">訊息內容：</label></p>
                    <p><textarea v-model="recommend_Msg.description" maxlength="100" class="input-area-add-meal"></textarea></p>
                    <!-- <p>
                        <label class="label-input-add-meal">圖片：</label>
                        <input name="image" ref="fileInput" type="file" maxlength="100" class="input-text-add-meal2" @change="Upload_Image()">
                    </p>    -->
                    <h1 style="margin:10px; margin-bottom:20px">推播對象</h1>
                    <div>
                        <p>                                         
                            <label class="label-input-add-meal">推薦年齡：</label>
                            <input v-model="consider_Age" type="radio" value="false" /><label class="label-input-add-meal">不限年齡</label>
                            <input v-model="consider_Age" type="radio" value="true" /><label class="label-input-add-meal">介於</label>
                            <select v-model="recommend_Msg.target_Age_min">
                                <option disabled value="">請選擇</option>
                                <option v-for="n in recommend_Msg.target_Age_max * 1" v-bind:key="n">{{ ( recommend_Msg.target_Age_max * 1 + 1 ) - n}}</option>
                            </select>
                            &nbsp;&nbsp;至&nbsp;&nbsp;  <!--- 空格 --->
                            <select v-model="recommend_Msg.target_Age_max">
                                <option disabled value="">請選擇</option>
                                <option v-for="n in 101 - recommend_Msg.target_Age_min" v-bind:key="n">{{101 - n}}</option>
                                <option value="150" >101以上</option>
                            </select>
                            &nbsp;歲
                        </p>
                        <p>
                            <label class="label-input-add-meal">推薦性別：</label>
                            <input v-model="recommend_Msg.target_Gender" type="radio" value="1" /><label class="label-input-add-meal">男性</label>
                            <input v-model="recommend_Msg.target_Gender" type="radio" value="2" /><label class="label-input-add-meal">女性</label>
                            <input v-model="recommend_Msg.target_Gender" type="radio" value="null" /><label class="label-input-add-meal">不限性別</label>
                        </p>
                    </div>                       
                    <p style="text-align:center;">
                        <button id="btn-adding" type="submit">儲存</button>
                        <button id="btn-adding" type="button" @click="Cancel_and_Return()">取消</button>
                    </p>
                </form>  
            </div>
            <!-- <p>result = "{{res}}"</p> -->
            <!-- <p>shop_ID = "{{shop_ID}}"</p>
            <p>image = "{{this.temp_Meal.image}}"</p>
            <img :src="this.temp_Meal.image" /> -->
        </div>
    </div>
</template>


<script>
import HospitalService from '@/services/HospitalService.js'
export default {
    name : 'pushing-data',
    data() {
        return {
            recommend_Msg : {
                msg_ID : "",
                target_Age_min : 1,
                target_Age_max : 100,
                target_Gender : null,
                description : "",
                it : 0
            },
            push_type : "text",
            consider_Age : false,
            exist_recmd : false,
            copy_msg_des : false,
            hospital_ID : "",
            res : "",
            path : null
        }
    },  // data()
    async mounted() {
        await this.Set_All_Vars()
    },

    methods: {
        async Update_Msg() {
            // 寫入 DB
            var filter = "bmi:null,"
            if ( this.consider_Age )
                filter += "age:" + this.recommend_Msg.target_Age_min + "~" + this.recommend_Msg.target_Age_max + ","
            else
                filter += "age:null,"

            if ( this.recommend_Msg.target_Gender != null )
                filter += "gender:" + this.recommend_Msg.target_Gender + "~" + this.recommend_Msg.target_Gender
            else
                filter += "gender:null"    
            var temp_res = await HospitalService.Update_Message( this.recommend_Msg.msg_ID, this.push_type, this.recommend_Msg.description, filter, this.recommend_Msg.it )           
            if ( temp_res.errorID == 0 )
                alert( "修改成功！" )
            else
                alert( "Error ID : " + temp_res.errorID + "\nError Msg : " + temp_res.errorMsg )
            this.$router.push( { name: 'medical-msg-record-page' } ) 
        },
        async Cancel_and_Return() {
            this.$router.push( { name: 'medical-msg-record-page' } )
        },
        async Set_All_Vars() {
            this.hospital_ID = this.$route.params.hospital_ID
            var msg = this.$route.params.msg
            this.recommend_Msg.msg_ID = msg.message_ID
            this.recommend_Msg.target_Age_min = parseInt( msg.age.split( "~" )[0] )
            this.recommend_Msg.target_Age_max = parseInt( msg.age.split( "~" )[1] )
            if ( msg.gender == "男性" )
                this.recommend_Msg.target_Gender = 1
            else if ( msg.gender == "女性" )
                this.recommend_Msg.target_Gender = 2
            else
                this.recommend_Msg.target_Gender = null
            this.recommend_Msg.description = msg.text
            this.recommend_Msg.it = msg.it
        },
        async Upload_Image() {
            this.temp_Meal.image = this.$refs.fileInput.files[0]        
        },
        async Reset() {
            this.recommend_Msg.target_Age = -1
            this.recommend_Msg.target_Gender = null
        },
        async Get_Msg_Target() {

            if ( ! this.exist_recmd )
                alert( "推薦內容不存在！" )
        }
    }
}
</script>