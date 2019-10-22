<template>
    <div id="add-food-camera">

       <div class="row justify-content-center" v-if="!this.$route.query.image" style="margin-top: 80px;">
            <div class="col-4 open-camera-button"><a href="line://nv/camera">拍攝照片{{this.$route.query.id}}</a></div>
            <div class="col-1"></div>
            <div class="col-4 open-camera-button"><a href="line://nv/cameraRoll/single">相簿上傳</a></div>
        </div>

        
        <div  class="row justify-content-center" v-if="this.$route.query.image" style="margin-top: 30px;">
            <div class="card col-11" style="width: 18rem;">
              <img class="card-img-top" :src="foodimage" alt="Card image cap">
              <!--image holder-->
              <div class="card-body">
                 <select class="browser-default custom-select col-6" style="border:2px #ccc solid; border-radius:20px 0px 0px 20px;">
                     <option selected>辨識結果</option>
                     <option value="1">麵包</option>
                     <option value="2">三明治</option>
                     <option value="3">吐司</option>
                 </select>
                 <select class="browser-default custom-select col-6" style="border:2px #ccc solid; border-radius:0px 20px 20px 0px;" v-model="foodName" @change="FoodonChange()">
                     <option selected>{{foodName}}</option>
                     <option v-for="list in lists" :key="list.value">{{list.item}}</option>
                 </select>
             </div>
             <!--food select-->
               <ul class="list-group list-group-flush">
                   <li class="list-group-item">
                       <label>重量:{{foodweight}}(g) /熱量:{{Math.round(foodweight*foodcalori*100) /100}}(kcal)</label>
                       <input type="range" class="custom-range" min="0" max="500" v-model="foodweight">
                    </li>
                    <li id="food-info" class="list-group-item">
                        <ul><label>脂肪:{{Math.round(foodweight*foodfat*100) /100}}(g)</label></ul>
                        <ul><label>蛋白質:{{Math.round(foodweight*foodprotein*100) /100}}(g)</label></ul>
                        <ul><label>碳水化合物:{{Math.round(foodweight*foodcarbon*100) /100}}(g)</label></ul>
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


export default {
    name: 'AddFoodCamera',
    components: {
    },
    data() {
        return {
            foodimage:'https://mhealth-service.feveral.me/'+this.$route.query.image, 
            foodweight:20,
            foodcalori:0,
            foodprotein:0,
            foodfat:0,
            foodcarbon:0,
            foodName:'選擇食物',
            lists : [
                {val:1,item:'法式吐司'},
                {val:2,item:'熱壓吐司'},
                {val:3,item:'蜜糖吐司'},
                {val:4,item:'碳烤吐司'},
                {val:5,item:'果醬吐司'},
            ]
        }
    },
    methods: {
        cancelCamera() {
            console.log("cancel camera add food")
            liff.closeWindow();
        },

        addFoodRecord() {
            alert("新增飲食成功")
        },

        FoodonChange() {
            console.log("food change")
            this.foodcalori=4.45;
            this.foodprotein=0.125;
            this.foodfat=0.06;
            this.foodcarbon=0.85;
        }

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
