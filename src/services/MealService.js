import Api from '@/services/Api.js'
// import qs from 'qs'

export default {
    async Insert_Meal( meal ) {
        var json_Obj = {
            'name' : meal.name,
            'cal' : meal.calories,
            'carb' : meal.carbohydrates,
            'sugars' : meal.sugar,
            'protein' : meal.protein,
            'fat' : meal.fat,
            'sFat' : meal.saturated_Fat,
            'tFat' : meal.trans_Fat,
            'sod' : meal.sodium,
            'size' : meal.size,
            'price' : meal.price,
            'des' : meal.description
        }

        json_Obj = JSON.stringify( json_Obj )

        var formdata = new FormData()
        formdata.append( "meal", json_Obj )
        const response = await Api().post('Shop/InsertMeal.php', json_Obj )
        return response.data
    },
    async Insert_Target( target ) {
        var formdata = new FormData()
        formdata.append( "shopID", target.shop_ID )
        formdata.append( "targetAge", target.target_Age )
        formdata.append( "targetGender", target.target_Gender )
        formdata.append( "mealID", target.mealID )
        const response = await Api().post('Shop/InsertTarget.php', formdata )
        return response.data
    },
    async Get_Meal_By_Shop( shop_ID ) {
        var formdata = new FormData()
        formdata.append( "shopID", shop_ID )
        const response = await Api().post(`Shop/GetMealsByShop.php`, formdata )
        return response.data
    },
    async Update_Meal( meal ) {
        var json_Obj = {
            'name' : meal.name,
            'cal' : meal.calories,
            'carb' : meal.carbohydrates,
            'sugars' : meal.sugar,
            'protein' : meal.protein,
            'fat' : meal.fat,
            'sFat' : meal.saturated_Fat,
            'tFat' : meal.trans_Fat,
            'sod' : meal.sodium,
            'size' : meal.size,
            'price' : meal.price,
            'des' : meal.description
        }

        json_Obj = JSON.stringify( json_Obj )

        var formdata = new FormData()
        formdata.append( "meal", json_Obj )
        const response = await Api().post('Shop/UpdateMeal.php', json_Obj )
        return response.data
    },
    async Update_Target( target ) {
        var formdata = new FormData()
        formdata.append( "targetID", target.target_ID )
        formdata.append( "shopID", target.shop_ID )
        formdata.append( "targetAge", target.target_Age )
        formdata.append( "targetGender", target.target_Gender )
        formdata.append( "mealID", target.mealID )
        const response = await Api().post('Shop/UpdateTarget.php', formdata )
        return response.data
    }
}