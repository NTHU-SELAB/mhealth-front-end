<template>
    <div id="add-food-camera">

        <div  class="row justify-content-center" style="margin-top: 30px;">
            <div class="card col-11" style="width: 18rem;">
            <img class="card-img-top" :src="foodimage" alt="Card image cap">
            <!--image holder-->
            <div class="card-body">
                <select class="browser-default custom-select col-6" style="border:2px #ccc solid; border-radius:20px 0px 0px 20px;" v-model="foodName" @change="onFoodChange()">
                    <option selected>{{foodName}}</option>
                    <option v-for="(f,index) in foodNameList" :key="index">{{f}}</option>
                </select>
                <select class="browser-default custom-select col-6" style="border:2px #ccc solid; border-radius:0px 20px 20px 0px;" v-model="subFoodName" @change="onSubFoodChange()">
                    <option selected>{{ subFoodName || '辨識結果' }}</option>
                    <option v-for="(f,index) in subFoodList" :key="index">{{f.name}}</option>
                </select>
            </div>
            <!--food select-->
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <label>重量:{{foodweight}}(g) /熱量:{{Math.round(foodweight*foodcalori) /100}}(kcal)</label>
                    <input type="range" class="custom-range" min="0" max="500" v-model="foodweight">
                    </li>
                    <li id="food-info" class="list-group-item">
                        <ul><label>脂肪:{{Math.round(foodweight*foodfat) /100}}(g)</label></ul>
                        <ul><label>膳食纖維:{{Math.round(foodweight*foodfiber) /100}}(g)</label></ul>
                        <ul><label>碳水化合物:{{Math.round(foodweight*foodcarbon) /100}}(g)</label></ul>
                    </li>
                    <!--food weight and calori caculator-->
                    <li class="list-group-item">
                        <button class="col-5 btn btn-primary " style="border:2px #ccc solid; border-radius:20px;" type="submit" @click="addFoodRecord()">新增紀錄</button>
                        <a class="col-1"></a>
                        <button class="col-5 btn btn-primary " style="border:2px #ccc solid; border-radius:20px;" type="submit" @click="cancelCamera()">取消</button>
                    </li>
                    <!--submit button-->
                </ul>
            </div>
        </div>
    </div>


</template>

<script>
import Camera from '@/components/Camera.vue'
import FoodService from '../services/FoodService.js'

export default {
    name: 'AddFoodCamera',
    components: {
    
    },

    data() {
        return {
            foodimage:`https://mhealth-service.feveral.me/${this.$route.query.image}`, 
            foodweight:20,
            foodcalori:0,
            foodprotein:0,
            foodfat:0,
            foodfiber:0,
            foodcarbon:0,
            foodName: '選擇食物',
            subFoodName: '辨識結果',
            foodNameList: ['qwe', 'hquwai', 'qwkjopi'], 
            subFoodList : ['法式吐司','熱壓吐司']
        }
    },

    mounted() {
        this.foodNameList = [this.$route.query.food1, this.$route.query.food2, this.$route.query.food3]
    },

    methods: {
        cancelCamera() {
            liff.closeWindow();
        },

        calculateMeal(date) {
            if (3 <= date.getHours() && date.getHours() <= 11) return '早餐'
            else if (11 <= date.getHours() && date.getHours() <= 15) return '午餐'
            else return '晚餐'
        },

        async addFoodRecord() {
            const userID = (await liff.getProfile()).userId;
            const meal = calculateMeal(new Date())
            await FoodService.postFoodRecord(
                userID, this.foodimage, this.foodName, this.foodweight, this.foodcalori, this.foodfat,
                this.foodcarbon, this.foodfiber, meal, Date.now()
            )
            alert("新增飲食成功")
        },

        async onFoodChange() {
            this.subFoodList = await FoodService.getFoodsByKeyword(this.foodName)
        },

        onSubFoodChange() {
            this.subFoodList.forEach(f => {
                this.foodcalori = f.carolie;
                this.foodprotein = 0.4
                this.foodfiber = f.fiber
                this.foodfat = f.fat;
                this.foodcarbon = f.sugar;
            })
        },
    }

}
</script>

<style>
#add-food-camera {
    margin-top: 30px;
}

.open-camera-button {
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
}

.open-camera-button > a{
    text-decoration: none;
    color: white;
}

.open-camera-button > a:hover{
    text-decoration: none;
    color: white;
}

#food-info > ul {
    padding-inline-start: 0px;
}

</style>
