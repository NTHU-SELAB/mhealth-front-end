<template>
    <div v-if="readyLogin">       
        <div class="container">
            <h2 class="p-5"><strong>登入頁面</strong></h2><br>
            <div class="form-group">
                <h5><label><strong>LINE ID</strong></label></h5>
                <div class="form-group">
                    <select class="form-control mb-3" v-model="user_account">
                        <option value="">請選擇</option>
                        <option v-for="account in accounts_lists" v-bind:key=account.lineID v-bind:value="account.lineID">{{account.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <h5><label><strong>密碼</strong></label></h5><br>
                <input v-model="user_password" class="form-control" type="password">
            </div><br>
            <button class="btn btn-primary" type="submit" @click = "login()">登入</button>
        </div><br>
        <div id="footer">
            <footer class="flex-shrink-0 py-4 bg-dark text-white-50">
                <div class="container text-center">
                    <small>Copyright &copy; 2023 NTHU Software Engineering Lab</small><br>
                    <small>版權所有</small>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import FoodService from '../services/FoodService'
// 吾健康網頁 之 開始畫面
export default {
    data() {
        return {
            title: '健談HealthTalker',
            user_account : '',
            user_password : '',
            /*accounts_lists:[
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
            ]*/
            accounts_lists: [],
            readyLogin : false
        }
    },
    async mounted(){
        await this.refreshAccountList()
        await this.showLogin()
        //console.log("showLogin")
    },
    methods: {
        login() {
            if(this.user_password=='selab')
                this.$router.push(`land/${this.user_account}`)
            else
                alert("Wrong Password") 
        },
        async showLogin(){
            this.readyLogin = true
        },
        async refreshAccountList(){
            var tempList = await FoodService.getAllUserInfo()
            this.accounts_lists = tempList
        }
    }
}

</script>

<style scoped>
#footer{
 position:fixed;
 bottom:0;
 width: 100%;
}
</style>