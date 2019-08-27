<template>
    <div id="add-food-manually">
        <p>add food manually</p>

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
        <input type="text" class="form-control" placeholder="食物重量(g)" aria-describedby="basic-addon2" v-modle="foodweight">
        </div>

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="食物熱量(kcal)" aria-describedby="basic-addon2" v-modle="calori">
        </div>

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="粗脂肪(g)" aria-describedby="basic-addon2" v-modle="fat">
        </div>

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="碳水化合物(g)" aria-describedby="basic-addon2" v-modle="carbohydrate">
        </div>

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="膳食纖維(g)" aria-describedby="basic-addon2" v-modle="fabric">
        </div>
        
<!--        <button @click="print()">print</button>  -->

    </div>
</template>

<script>

export default {
    name: 'AddFoodManually',
    components: {

    },
    data() {
        return {
            timeSlot: '時段',
            foodName: '',
            foodweight:'',
            fat:'',
            carbohydrate:'',
            calori:'',
            fabric:''

        }
    },
    methods: {
        changeSlot(slot) {
            this.timeSlot = slot
        },

        print() {
            console.log(this.timeSlot)
            console.log(this.foodName)
        }

    }



}
</script>

<style>
#add-food-manually {
    margin-top: 30px;
}
</style>
