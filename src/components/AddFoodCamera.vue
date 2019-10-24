<<<<<<< HEAD
<template>
    <div id="add-food-camera">
<!-- 
       <div class="row justify-content-center" style="margin-top: 80px;">
            <div class="col-4 open-camera-button"><a href="line://nv/camera">拍攝照片</a></div>
            <div class="col-1"></div>
            <div class="col-4 open-camera-button"><a href="line://nv/cameraRoll/single">相簿上傳</a></div>
        </div>
-->
        
        <div  class="row justify-content-center" style="margin-top: 30px;">
            <div class="card col-11" style="width: 18rem;">
              <img class="card-img-top" src="https://i.imgur.com/WuVvwzl.jpg/100px180/?text=Image cap" alt="Card image cap">
              <!--image holder-->
              <div class="card-body">
                 <select class="browser-default custom-select col-6">
                     <option selected>辨識結果</option>
                     <option value="1">奶油</option>
                     <option value="2">蛋糕</option>
                     <option value="3">冰淇淋</option>
                 </select>
                 <select class="browser-default custom-select col-6" v-model="food">
                     <option selected>選擇食物</option>
                     <option v-for="option in options" v-bind:key="option.value">
                     {{option.text}}
                     </option>
                 </select>
             </div>
             <!--food select-->
               <ul class="list-group list-group-flush">
                   <li class="list-group-item">
                       <label>重量:{{foodweight}}(g) /熱量:{{foodweight*foodcalori}}(kcal)</label>
                       <input type="range" class="custom-range" min="0" max="500" v-model="foodweight">
                    </li>
                    <!--food weight and calori caculator-->
                    <li class="list-group-item">
                        <button class="col-5 btn btn-primary " type="submit">新增紀錄</button>
                        <a class="col-1"></a>
                        <button class="col-5 btn btn-primary " type="submit" @click="cancelCamera()">取消</button>
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
            foodweight:0,
            foodcalori:4,
            food:'選擇食物',
            options: [
                { text: '奶油蛋糕', value: '1' },
                { text: '戚風蛋糕', value: '2' },
                { text: '水果蛋糕', value: '3' },
                { text: '起司蛋糕', value: '4' },
                { text: '蜂蜜蛋糕', value: '5' }
            ]
        }
    },
    methods: {
        cancelCamera() {
            console.log("cancel camera add food")
            liff.closeWindow();
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

</style>
=======
<template>
    <div id="add-food-camera">
<!-- 
       <div class="row justify-content-center" style="margin-top: 80px;">
            <div class="col-4 open-camera-button"><a href="line://nv/camera">拍攝照片</a></div>
            <div class="col-1"></div>
            <div class="col-4 open-camera-button"><a href="line://nv/cameraRoll/single">相簿上傳</a></div>
        </div>
-->
        
        <div  class="row justify-content-center" style="margin-top: 30px;">
            <div class="card col-11" style="width: 18rem;">
              <img class="card-img-top" src="https://i.imgur.com/WuVvwzl.jpg/100px180/?text=Image cap" alt="Card image cap">
              <!--image holder-->
              <div class="card-body">
                 <select class="browser-default custom-select col-6" style="border:2px #ccc solid; border-radius:20px 0px 0px 20px;">
                     <option selected>辨識結果</option>
                     <option value="1">奶油</option>
                     <option value="2">蛋糕</option>
                     <option value="3">冰淇淋</option>
                 </select>
                 <select class="browser-default custom-select col-6" style="border:2px #ccc solid; border-radius:0px 20px 20px 0px;">
                     <option selected>選擇食物</option>
                     <option value="1">奶油蛋糕</option>
                     <option value="2">戚風蛋糕</option>
                     <option value="3">水果蛋糕</option>
                     <option value="3">起司蛋糕</option>
                     <option value="3">蜂蜜蛋糕</option>
                 </select>
             </div>
             <!--food select-->
               <ul class="list-group list-group-flush">
                   <li class="list-group-item">
                       <label>重量:{{foodweight}}(g) /熱量:{{foodweight*foodcalori}}(kcal)</label>
                       <input type="range" class="custom-range" min="0" max="500" v-model="foodweight">
                    </li>
                    <!--food weight and calori caculator-->
                    <li class="list-group-item">
                        <button class="col-5 btn btn-primary " style="border:2px #ccc solid; border-radius:20px;" type="submit">新增紀錄</button>
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
            foodweight:0,
            foodcalori:4
        }
    },
    methods: {
        cancelCamera() {
            console.log("cancel camera add food")
            liff.closeWindow();
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

</style>
>>>>>>> cbf7592b729c36e19e8df33e38a894b9a7a72343
