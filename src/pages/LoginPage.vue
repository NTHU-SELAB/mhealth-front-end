<template>
    <div>
        <h1>Login Page</h1>
        <form @submit.prevent="login">
            <label>帳號</label>
            <input type="text" v-model="userName" required>
            <br>
            <label>密碼</label>
            <input type="password" v-model="password" required>
            <br>
            <button type="submit">登入</button>
        </form>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        userName: '',
        password: '',
      }
    },
    methods: {
      login(){
        //-- write login authencation logic here! --
        let auth = false;
        if( this.userName === 'selab' && this.password === 'selab'){
            localStorage.setItem('token','Imlogin')
            this.$router.push('/');
        }else{
            alert('login failed')
        } 
      }
    } 
  }
</script>