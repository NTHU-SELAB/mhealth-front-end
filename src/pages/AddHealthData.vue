<template>
    <div class="container" id="add-health-manually">
        <h5><strong>輸入健康紀錄</strong></h5>
        <form>
            <div class="form-row">
                <div class="form-group col-6 mb-3">
                    <input class="form-control" v-model="sbp" placeholder="輸入血壓高">
                </div>
                <div class="form-group col-6 mb-3">
                    <input class="form-control"  v-model="dbp" placeholder="輸入血壓低">
                </div>
            </div>
            <div class="form-group mb-3">
                <input type="text" class="form-control" v-model="water" placeholder="輸入飲水量">
            </div>
            <div class="form-group mb-3">
                <input type="text" class="form-control"  v-model="tep" placeholder="輸入體溫">
            </div>
            <button type="submit" class="btn btn-primary" @click="addhealthinfo()">確定新增</button>
            </form>
    </div>
</template>

<script>
import FoodService from '@/services/FoodService.js'
export default {
    data() {
        return {
            tep:"",
            water:"",
            sbp:"",
            dbp:"",
            userID:"",
        }
    },
    mounted() {
        
    },
    methods: {
        async addhealthinfo(){
            const userId=this.$route.params.userID;
            try {
                const response = await FoodService.posthealthdata(
                    userId,
                    this.sbp,
                    this.dbp,
                    this.water,
                    this.tep,
                    Date.now()+8*60*60*1000
                )
                this.clearnInput()
                console.log(response)
                alert('新增健康資料成功')
            } catch (error) {
                console.log(error)
                this.logs = JSON.stringify(error)
            }
        },
        clearnInput(){
            this.sbp="",
            this.dbp="",
            this.water="",
            this.tep=""
        }
    }
}

</script>

<style scoped>
#add-health-manually {
    margin-top: 30px;
}

</style>