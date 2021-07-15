<template>
    <div id="sign-in-page">
        <div>       
            <div id="login-frame">
                <h2 class="mt-4 mb-4" style="font-weight: bold; font-size : 37px;">登入頁面</h2>
                <p><label class="label-input">LINE ID</label><input v-model="user_account" class="text-field"></p>
                <p><label class="label-input">密碼</label><input v-model="user_password" class="text-field" type="password"></p>
                
                <button id="btn-login" type="submit" @click = "login()">登入</button>
            </div>


        </div>
    </div>
</template>

<script>
// 吾健康網頁 之 開始畫面
export default {
    data() {
        return {
            title: 'mhealth',
            user_account : '',
            user_password : ''
        }
    },
    methods: {
        login() {
            this.$router.push( { name: 'meal-record-page' } )
        }
    }
}

</script>

<style scoped>

#sign-in-page {
    /* background-image:url('../assets/landing-background.jpeg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    transition-property: opacity;*/
    transition-duration: 1.2s;
    transition-timing-function: ease-in-out;
    color: black;
}

#landing-page::before {
    background: rgba(0, 0, 0, 0.3);
}

.title {
    transition-property: opacity;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
    font-weight: bold;
}

.startbutton {
    transition-property: opacity;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
}

#login-frame {
width: 20%;
height: 350px;
position: absolute;
margin-top: 300px;
margin-left: 40%;
margin-right: 40%;
background-color: cyan;
border: 5px black solid;
text-align: center;
}

.label-input {
font-size: 20px;
font-family: 宋體;
width: 40%;
margin-left: 30%;
margin-right: 30%;
height: 28px;
line-height: 28px;
color: black;
text-align: center;
}

.text-field {
font-size: 20px;
width: 200px;
height: 28px;
}

#btn-login {
font-size: 20px;
font-family: 宋體;
width: 120px;
height: 30px;
padding-top: 1px;
margin-top: 10px;
line-height: 28px;
text-align: center;
color: black;
border-radius: 6px;
border: 2px black solid;
/* float: left; */
}
</style>