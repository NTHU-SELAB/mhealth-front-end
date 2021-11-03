<template>
    <div id="sign-in-page">
        <div>       
            <div id="login-frame">
                <h2 class="mt-4 mb-4" style="font-weight: bold; font-size : 37px;">登入頁面</h2>
                <p><label class="label-input">LINE ID</label>
                <!--<input v-model="user_account" class="text-field">-->
                <select v-model="user_account">
                    <option value="">請選擇</option>
                    <option v-for="account in accounts_lists" v-bind:key=account value="{{ account.userId }}">{{account.name}}</option>
                </select>
                </p>
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
            title: '智慧e療健康',
            user_account : '',
            user_password : '',
            accounts_lists:[
                {userId:'U0110609f3c48837dfb9df7374e3aebab',name:'cyhuangtw'},
                {userId:'U172daf328b95252095d060276e834fe9',name:'劉煥澤'},
                {userId:'U75c4b2e55fa747525f77df0ce12f0045',name:'大強(盛,舜,斌)'},
                {userId:'U77655323afc0252221566348b3558317',name:'祝傳旻'},
                {userId:'U81aa8a8d31959c94187c4869bb1eeddf',name:'梁湘梅'},

                {userId:'U909d5192ca0d1ffe8ea13f763de78233',name:'王傳鈞'},
                {userId:'U97869230e28dc9e551649434a6eab4a8',name:'減薪於'},
                {userId:'U9d21c99c9f4a4e44d1f27069bfb59449',name:'Huang, CY'},
                {userId:'U9dd8575e0b9e010e17918b7988f45aac',name:'陳楷文'},
                {userId:'U9ef2ad0929a603cbd6bbe5ac7dcd1c15',name:'昱榮'},

                {userId:'Ub7e0024bbe778f67528ed7ae297fecb7',name:'ㄌㄒ'},
                {userId:'Ubc4d4b44be2ff6c7ab189ef2fa450ef7',name:'胖虎     '},
                {userId:'Uedd9e265d4663947057bdf33a6dec9e0',name:'楊宗翰'},
                {userId:'Uee345a4d3f9efb85a7ae2d1608895d82',name:'Chelsy 真華'},
                {userId:'Ufda8d1787b0074dd932c401fc9df793e',name:'亞泰電機技師事務所'},
            ]
        }
    },
    methods: {
        login() {
            console.log(this.user_account)
            if(this.user_password=='selab')
                this.$router.push( { name: 'landing-page' } )
            else
                alert("Wrong Password") 
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