<template>
    <div id="add-food-manually">
        <h3>輸入食物紀錄</h3>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <select class="browser-default custom-select p-2" v-model="timeSlot" style="border:2px #ccc solid; border-radius:20px 0px 0px 20px;">
                    <option timeSlot >時段</option>
                    <option>早餐</option>
                    <option >午餐</option>
                    <option >晚餐</option>
                    <option>點心</option>
                </select>
            </div>
            <input type="text" class="form-control" placeholder="食物名" v-model="foodName" style="border:2px #ccc solid; border-radius:0px 20px 20px 0px;">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" style="border:2px #ccc solid; border-radius:20px;" placeholder="食物重量(g)" aria-describedby="basic-addon2" v-model="foodWeight">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" style="border:2px #ccc solid; border-radius:20px;" placeholder="食物熱量(kcal)" aria-describedby="basic-addon2" v-model="calorie">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" style="border:2px #ccc solid; border-radius:20px;" placeholder="粗脂肪(g)" aria-describedby="basic-addon2" v-model="fat">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" style="border:2px #ccc solid; border-radius:20px;" placeholder="碳水化合物(g)" aria-describedby="basic-addon2" v-model="sugar">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" style="border:2px #ccc solid; border-radius:20px;" placeholder="膳食纖維(g)" aria-describedby="basic-addon2" v-model="fiber">
        </div>

        <div>
        <button class="btn btn-primary col-5"  style="border:2px #ccc solid; border-radius:20px;" @click="addFood()">新增紀錄</button>
        <a class="col-1"></a>
        <button class="btn btn-primary col-5" style="border:2px #ccc solid; border-radius:20px;" @click="cancelManual()">取消</button>
        </div>
        <p>{{logs}}</p>

    </div>
</template>

<script>  // LINE記錄飲食的選單
import FoodService from '@/services/FoodService.js'

export default {
    name: 'AddFoodManually',
    components: {

    },
    data() {
        return {
            timeSlot: '時段',
            foodName: '',
            foodWeight:'',
            fat:'',
            sugar:'',
            calorie:'',
            fiber:'',
            logs: ''
        }
    },
    methods: {
        changeSlot(slot) {
            this.timeSlot = slot
        },

        async addFood() {
            if (this.timeSlot == '時段') {
                alert('請選擇時段')
            }
            //const userId = (await liff.getProfile()).userId
            const userId=this.$route.params.userID;
            try {
                const response = await FoodService.postFoodRecord(
                    userId,
                    null,
                    this.foodName,
                    this.foodWeight,
                    this.calorie,
                    this.fat,
                    this.sugar,
                    this.fiber,
                    this.timeSlot,
                    Date.now()+8*60*60*1000
                )
                this.clearnInput()
                console.log(response)
                alert('新增飲食成功')
            } catch (error) {
                console.log(error)
                this.logs = JSON.stringify(error)
            }
        },

        clearnInput() {
            this.timeSlot = '時段'
            this.foodName = ''
            this.foodWeight = ''
            this.fat = ''
            this.sugar = ''
            this.calorie = ''
            this.fiber = ''
        },

        cancelManual() {
            //liff.closeWindow()
        }
    }



}
</script>

<style>
#add-food-manually {
    margin-top: 30px;
}
</style>
