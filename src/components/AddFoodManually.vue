<template>
    <div id="add-food-manually">
        <div class="input-group mb-3">
        <div class="input-group-prepend">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{timeSlot}}</button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#" @click="changeSlot('早餐')">早餐</a>
                <a class="dropdown-item" href="#">午餐</a>
                <a class="dropdown-item" href="#">晚餐</a>
                <a class="dropdown-item" href="#">點心</a>
            </div>
        </div>
        <input type="text" class="form-control"  placeholder="食物名" v-model="foodName">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="食物重量(g)" aria-describedby="basic-addon2" v-model="foodWeight">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="食物熱量(kcal)" aria-describedby="basic-addon2" v-model="calorie">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="粗脂肪(g)" aria-describedby="basic-addon2" v-model="fat">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="碳水化合物(g)" aria-describedby="basic-addon2" v-model="sugar">
        </div>

        <div class="input-group mb-3">
        <input type="number" class="form-control" placeholder="膳食纖維(g)" aria-describedby="basic-addon2" v-model="fiber">
        </div>
        <button class="btn btn-primary" @click="addFood()">新增食物</button>
        <!-- <button @click="print()">print</button>  -->
        <p>{{logs}}</p>

    </div>
</template>

<script>
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
            logs:''
        }
    },
    methods: {
        changeSlot(slot) {
            this.timeSlot = slot
        },

        async addFood() {
            const userId = (await liff.getProfile()).userId
            this.logs = userId
            try {
                const response = await FoodService.postFoodManually(
                    userId,
                    this.foodName,
                    this.foodWeight,
                    this.calorie,
                    this.fat,
                    this.sugar,
                    this.fiber,
                    this.timeSlot
                )
            } catch (error) {
                this.logs = JSON.stringify(error)
            }
            
            this.logs = JSON.stringify(response)
        },

        print() {
            // console.log(this.timeSlot)
            // console.log(this.foodName)
            // console.log(this.foodweight)
            // console.log(this.fat)
            // console.log(this.carbohydrate)
            // console.log(this.calori)
            // console.log(this.fabric)
        }

    }



}
</script>

<style>
#add-food-manually {
    margin-top: 30px;
}
</style>
