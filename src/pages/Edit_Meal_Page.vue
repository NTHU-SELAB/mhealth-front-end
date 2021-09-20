<template>
    <div id = "edit-meal-page" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >Health Chat</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--網頁目錄在router/index內-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="../meal-record">餐點內容</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../shop-info">店家資訊</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">聯絡我們</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="../">登出</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="輸入文字以搜尋..." aria-label="Search">
                    <button class="btn btn-outline-light my-2 my-sm-0" type="submit">搜尋</button>
                </form>
            </div>
        </nav>
        <div class="view-page">          
            <!--新增頁面-->
            <div class="adding-form">
                <h1 style="margin:10px; margin-bottom:20px">編輯餐點</h1>
                <form @submit.prevent="Update_Meal()">
                    <p>                    
                        <label class="label-input-add-meal">餐點名稱：</label>
                        <input v-model="temp_Meal.name" maxlength="20" type="text" class="input-text-add-meal2" required />                
                        <label class="label-input-add-meal">餐點價格：</label>
                        <input v-model="temp_Meal.price" class="input-text-add-meal" type="number" min="0" step="1" required /> 元
                        <label class="label-input-add-meal">餐點份量：</label>
                        <input v-model="temp_Meal.size" class="input-text-add-meal" type="number" min="0" required /> 公克
                    </p>               
                    <p><label class="label-input-add-meal">餐點內容：</label></p>
                    <p><textarea v-model="temp_Meal.Description" maxlength="100" class="input-area-add-meal"></textarea></p>
                    <div style="width:50%; float:left; padding-top: 15px; padding-bottom:15px;">                   
                        <p>
                            <label class="label-input-add-meal">熱量：</label>
                            <input v-model="temp_Meal.calories" class="input-text-add-meal" type="number" min="0" /> 大卡
                        </p>
                        <p>
                            <label class="label-input-add-meal">蛋白質：</label>
                            <input v-model="temp_Meal.protein" class="input-text-add-meal" type="number" min="0" />公克
                        </p>           
                        <p>
                            <label class="label-input-add-meal">碳水化合物：</label>
                            <input v-model="temp_Meal.calories" class="input-text-add-meal" type="number" min="0" /> 公克
                        </p>
                        <p>
                            <label class="label-input-add-meal">糖：</label>
                            <input v-model="temp_Meal.sugar" class="input-text-add-meal" type="number" min="0" /> 公克
                        </p>
                    </div>
                    <div style="width:50%; float:right; padding-top: 15px; padding-bottom:15px;">                   
                        <p>
                            <label class="label-input-add-meal">脂肪：</label>
                            <input v-model="temp_Meal.fat" class="input-text-add-meal" type="number" min="0" /> 公克
                        </p>
                        <p>
                            <label class="label-input-add-meal">飽和脂肪：</label>
                            <input v-model="temp_Meal.saturated_Fat" class="input-text-add-meal" type="number" min="0" /> 公克
                        </p>
                        <p>
                            <label class="label-input-add-meal">反式脂肪：</label>
                            <input v-model="temp_Meal.trans_Fat" class="input-text-add-meal" type="number" min="0" /> 公克
                        </p> 
                        <p>
                            <label class="label-input-add-meal">鈉：</label>
                            <input v-model="temp_Meal.sodium" class="input-text-add-meal" type="number" min="0" /> 毫克
                        </p>        
                    </div>
                    <p><label class="label-input-add-meal">餐點圖片：</label><input name="image" type="file" maxlength="100" class="input-text-add-meal2"></p>                                                  
                    <h1 style="margin:10px; margin-bottom:20px">餐點推薦</h1>
                    <div>
                        <p> 
                                          
                            <label class="label-input-add-meal">推薦年齡：</label>
                            <select v-model="recommend_Meal.target_Age">
                                <option disabled value="">請選擇</option>
                                <option value="-1">不限年齡</option>
                                <option v-for="n in 100" v-bind:key="n">{{n}}</option>
                            </select> 
                        </p>
                        <p>            
                            <label class="label-input-add-meal">推薦性別：</label>
                            <input v-model="recommend_Meal.target_Gender" type="radio" value="male" /><label class="label-input-add-meal">男性</label>
                            <input v-model="recommend_Meal.target_Gender" type="radio" value="female" /><label class="label-input-add-meal">女性</label>
                            <input v-model="recommend_Meal.target_Gender" type="radio" value="none" /><label class="label-input-add-meal">不限性別</label>
                        </p>
                    </div>
                    <p style="text-align:center;">
                        <button id="btn-adding" type="submit">儲存</button>
                        <button id="btn-adding" type="button" @click="Cancel_and_Return()">取消</button>
                    </p>
                </form>
            </div>
        </div>        
    </div>
</template>

<script>
// import MealService from '@/services/MealService.js'
export default {
    name : 'pushing-data',
    data() {
        return {
            temp_Meal : {
                user_ID : "U77655323afc0252221566348b3558317",
                shop_ID : 1,
                name : "",             // 餐點名稱 char[20]        
                calories : 0,          // 熱量
                carbohydrates : 0,     // 碳水化合物
                sugar : 0,
                protein : 0,           // 蛋白質
                fat : 0,
                saturated_Fat : 0,     // 飽和脂肪
                trans_Fat : 0,         // 反式脂肪
                sodium : 0,            // 鈉
                size : 0,              // 餐點份量
                description : "",      // 餐點內容 char[100]     
                price : 0,
                image :`https://mhealth-service.feveral.me/${this.$route.query.image}`   // 圖片路徑 char[100]
            },

            recommend_Meal : {
                shop_ID : 1,
                meal_ID : 0,
                target_ID : 0,
                target_Age : 0,
                target_Gender : "none"
            }
        }
    },  // data()
    async mounted() {
        await this.Set_All_Vars()
    },

    methods: {
        async Update_Meal() {
            // TODO 寫入 DB
            this.$router.push( { name: 'meal-record-page' } ) 
        },
        async Cancel_and_Return() {
            this.$router.push( { name: 'meal-record-page' } )
        },
        async Set_All_Vars() {
            var meal = this.$route.params.meal
            this.temp_Meal.name = meal.mealName
            this.temp_Meal.calories = meal.calorie
            this.temp_Meal.carbohydrates = meal.carbohydrate
            this.temp_Meal.sugar = meal.sugars
            this.temp_Meal.protein = meal.protein
            this.temp_Meal.fat = meal.fat
            this.temp_Meal.saturated_Fat = meal.satFat
            this.temp_Meal.trans_Fat = meal.transFat
            this.temp_Meal.sodium = meal.sodium
            this.temp_Meal.size = meal.size
            this.temp_Meal.description = meal.des
            this.temp_Meal.price = meal.price
            this.temp_Meal.image = meal.img
        }
    }
}
</script>

<style>
.view-page {
    height: auto;
    min-height: 200px;
    width: 80%;
    min-width: 600px;
    max-width: 1600px;
    border: 5px black solid;
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.adding-form {
    padding: 15px;
    text-align: left;
    font-size: 20px;
}

.label-input-add-meal {
    font-size: 20px;
    font-family: 宋體;
    width: 150px;
    height: 28px;
    margin-left: 50px;
    line-height: 28px;
    text-align:left;
    color: black;
    float:initial;
}
.input-text-add-meal {
    font-size: 20px;
    width: 75px;
    float:inline-start;
}
.input-text-add-meal2 {
    font-size: 20px;
    width: 250px;
    float:inherit;
}
.input-area-add-meal {
    font-size: 20px;
    font-family: 宋體;
    min-height: 100px;
    height:auto;
    width: 770px;
    float:inline-start;
    margin-left: 50px;
    resize: none;
}

#btn-adding {
    font-size: 20px;
    font-family: 宋體;
    width: 120px;
    height: 30px;
    margin: 25px;
    line-height: 28px;
    text-align: center;
    color: black;
    border-radius: 6px;
    border: 2px black solid;
}
</style>