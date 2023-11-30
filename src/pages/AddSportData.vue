<template>
    <div class="container" id="add-health-manually">
        <h5><strong>輸入運動紀錄</strong></h5>
        <form>
            <div class="form-group mb-3">
                <input type="text" class="form-control" v-model="sportname" placeholder="輸入運動名稱">
            </div>
            <div class="form-group mb-3">
                <input type="text" class="form-control"  v-model="cal" placeholder="輸入消耗卡洛里">
            </div>
            <div class="form-group mb-3">
                <input type="text" class="form-control"  v-model="sporttime" placeholder="輸入運動時間">
            </div>
            <button type="submit" class="btn btn-primary" @click="addsportinfo()">確定新增</button>
            </form>
    </div>
</template>

<script>
import FoodService from '@/services/FoodService.js'
export default {
    data() {
        return {
            sportname:"",
            cal:"",
            sporttime:"",
            userID:"",
        }
    },
    mounted() {
        
    },
    methods: {
        async addsportinfo(){
            const userId=this.$route.params.userID;
            try {
                const response = await FoodService.postsportdata(
                    userId,
                    this.sportname,
                    this.cal,
                    this.sporttime,
                    Date.now()+8*60*60*1000
                )
                this.clearnInput()
                console.log(response)
                alert('新增運動資料成功')
            } catch (error) {
                console.log(error)
                this.logs = JSON.stringify(error)
            }
        },
        clearnInput(){
            this.sportname="",
            this.cal="",
            this.sporttime=""
        }
    }
}

</script>

<style scoped>
#add-health-manually {
    margin-top: 30px;
}

</style>