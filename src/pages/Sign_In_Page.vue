<template>
    <div id="sign-in-page" :style="{opacity: allOpacity}">
        <div>
            <h1 class="display-4 title mb-4" :style="{opacity: titleOpacity, 'padding-top': '233px'}">{{title}}</h1>        
            <div id="login-frame">
                <h2 class="mt-4 mb-4" style="font-weight: bold;">登入頁面</h2>
                <p><label class="label-input">LINE ID：</label><input v-model="user_account" class="text-field"></p>
                <p><label class="label-input">密碼：</label><input v-model="user_password" class="text-field" type="password"></p>
                
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
            this.$router.push( { name: 'pushing-page' } )
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
width: 400px;
height: 350px;
padding: 13px;
position: absolute;
left: 50%;
top: 50%;
margin-left: -200px;
margin-top: -200px;
background-color: cyan;
border: 5px black solid;
border-radius: 10px;
text-align: center;
}

.label-input {
font-size: 20px;
font-family: 宋體;
width: 100px;
height: 28px;
line-height: 28px;
text-align: center;
color: black;
}

.text-field {
font-size: 20px;
width: 278px;
height: 28px;
}

#btn-login {
font-size: 20px;
font-family: 宋體;
width: 120px;
height: 28px;
margin-top: 5px;
line-height: 28px;
text-align: center;
color: black;
border-radius: 6px;
border: 2px black solid;
/* float: left; */
}
</style>