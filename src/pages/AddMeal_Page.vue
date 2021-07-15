<template>
    <div id = "pushing-setting-page" >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="../" >mhealth</a>
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
                        <a class="nav-link" href="../add-meal">新增餐點</a>
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
                <h1 style="margin:10px; margin-bottom:20px">新增餐點</h1>
                <form @submit="checkForm">
                    <p>                    
                        <label class="label-input">餐點名稱：</label>
                        <input v-model="temp_Name" maxlength="20" type="text" class="input-text2" required />                
                        <label class="label-input">餐點價格：</label>
                        <input v-model="temp_Price" class="input-text" type="number" min="0" step="1" required /> 元
                        <label class="label-input">餐點份量：</label>
                        <input v-model="temp_Size" class="input-text" type="number" min="0" required /> 公克
                    </p>               
                    <p><label class="label-input">餐點內容：</label></p>
                    <p><textarea v-model="temp_Description" maxlength="100" class="input-area"></textarea></p>
                    <div style="width:50%; float:left; padding-top: 15px; padding-bottom:15px;">                   
                        <p>
                            <label class="label-input">熱量：</label>
                            <input v-model="temp_Calories" class="input-text" type="number" min="0" /> 大卡
                        </p>
                        <p>
                            <label class="label-input">蛋白質：</label>
                            <input v-model="temp_Protein" class="input-text" type="number" min="0" />公克
                        </p>           
                        <p>
                            <label class="label-input">碳水化合物：</label>
                            <input v-model="temp_Calories" class="input-text" type="number" min="0" /> 公克
                        </p>
                        <p>
                            <label class="label-input">糖：</label>
                            <input v-model="temp_Sugar" class="input-text" type="number" min="0" /> 公克
                        </p>
                    </div>
                    <div style="width:50%; float:right; padding-top: 15px; padding-bottom:15px;">                   
                        <p>
                            <label class="label-input">脂肪：</label>
                            <input v-model="temp_Fat" class="input-text" type="number" min="0" /> 公克
                        </p>
                        <p>
                            <label class="label-input">飽和脂肪：</label>
                            <input v-model="temp_Saturated_Fat" class="input-text" type="number" min="0" /> 公克
                        </p>
                        <p>
                            <label class="label-input">反式脂肪：</label>
                            <input v-model="temp_Trans_Fat" class="input-text" type="number" min="0" /> 公克
                        </p> 
                        <p>
                            <label class="label-input">鈉：</label>
                            <input v-model="temp_Sodium" class="input-text" type="number" min="0" /> 毫克
                        </p>        
                    </div>
                    <p><label class="label-input">餐點圖片：</label><input name="image" type="file" maxlength="100" class="input-text2"></p>                              
                    <p style="text-align:center;">
                        <button id="btn-adding" type="submit" @click="Add_Meal()">新增</button>  
                        <button id="btn-adding" type="reset">重設</button>
                    </p>
                </form>  
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    name : 'pushing-setting',
    data() {
        return {
            temp_Meal_ID : 0,           // ID int(11)
            temp_Name : "",             // 餐點名稱 char[20]        
            temp_Calories : 0,          // 熱量
            temp_Carbohydrates : 0,     // 碳水化合物
            temp_Sugar : 0,
            temp_Protein : 0,           // 蛋白質
            temp_Fat : 0,
            temp_Saturated_Fat : 0,     // 飽和脂肪
            temp_Trans_Fat : 0,         // 反式脂肪
            temp_Sodium : 0,            // 鈉
            temp_Size : 0,              // 餐點份量
            temp_Description : "",      // 餐點內容 char[100]
            temp_Image_Path : "",       // 圖片路徑 char[100]
            temp_Price : 0,
        }
    },  // data()

    methods: {
        async Add_Meal() {
            this.meals_data.push( { name : this.temp_Name } )
            // this.meals_data.push( { name :
            // this.temp_Meal_ID,           // ID int(11)
            // this.temp_Name,              // 餐點名稱 char[20]        
            // this.temp_Calories,          // 熱量
            // this.temp_Carbohydrates,     // 碳水化合物
            // this.temp_Sugar,
            // this.temp_Protein,           // 蛋白質
            // this.temp_Fat,
            // this.temp_Saturated_Fat,     // 飽和脂肪
            // this.temp_Trans_Fat,         // 反式脂肪
            // this.temp_Sodium,            // 鈉
            // this.temp_Size,              // 餐點份量
            // this.temp_Description,       // 餐點內容 char[100]
            // this.temp_Image_Path,        // 圖片路徑 char[100]
            // this.temp_Price } )
            // this.page_state = 'view'           
        },
        async Edit_Meal() {
            
        },
        async Delete_Meal() {

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
    border: 2px black solid;
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 15px;
    margin-bottom: 15px;
}

.adding-form {
    padding: 15px;
    text-align: left;
    font-size: 20px;
}

.label-input {
    font-size: 20px;
    font-family: 宋體;
    width: 120px;
    height: 28px;
    margin-left: 50px;
    line-height: 28px;
    text-align:left;
    color: black;
    float:initial;
}
.input-text {
    font-size: 20px;
    width: 75px;
    float:inline-start;
}
.input-text2 {
    font-size: 20px;
    width: 250px;
    float:inherit;
}
.input-area {
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
