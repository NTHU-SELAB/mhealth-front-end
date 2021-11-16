import Api from '@/services/Api.js'
// import qs from 'qs'

export default {
    async Insert_Meal( meal, shop_ID ) {
        var formdata = new FormData()
        formdata.append( "mealName", meal.name )
        formdata.append( "calorie", meal.calories )
        formdata.append( "carbohydrate", meal.carbohydrates )
        formdata.append( "sugars", meal.sugar )
        formdata.append( "protein", meal.protein )

        formdata.append( "fat", meal.fat )
        formdata.append( "satFat", meal.saturated_Fat )
        formdata.append( "transFat", meal.trans_Fat )
        formdata.append( "sodium", meal.sodium )
        formdata.append( "size", meal.size )

        formdata.append( "price", meal.price )
        formdata.append( "description", meal.description )
        formdata.append( "shopID", shop_ID )
        formdata.append( "foodImage", meal.image )
        const response = await Api().post('Shop/InsertMeal.php', formdata )
        return response.data
    },
    async Insert_Target( target ) {
        var formdata = new FormData()
        formdata.append( "shopID", target.shop_ID )
        formdata.append( "targetAge", target.target_Age )
        formdata.append( "targetGender", target.target_Gender )
        formdata.append( "pushMsg", target.description )
        formdata.append( "isPush", target.want_to_recmd )
        formdata.append( "mealID", target.meal_ID )
        const response = await Api().post('Shop/InsertTargets.php', formdata )
        return response.data
    },
    async Get_Targets_By_Shop( shop_ID ) {
        var formdata = new FormData()
        formdata.append( "shopID", shop_ID )
        const response = await Api().post(`Shop/GetTargetsByShop.php`, formdata )
        return response.data
    },
    async Get_Meal_By_Shop( shop_ID ) {
        var formdata = new FormData()
        formdata.append( "shopID", shop_ID )
        const response = await Api().post(`Shop/GetMealsByShop.php`, formdata )
        return response.data
    },
    async Update_Meal( meal, shop_ID ) {
        var formdata = new FormData()
        formdata.append( "mealID", meal.meal_ID )
        formdata.append( "mealName", meal.name )
        formdata.append( "calorie", meal.calories )
        formdata.append( "carbohydrate", meal.carbohydrates )
        formdata.append( "sugars", meal.sugar )
        formdata.append( "protein", meal.protein )

        formdata.append( "fat", meal.fat )
        formdata.append( "satFat", meal.saturated_Fat )
        formdata.append( "transFat", meal.trans_Fat )
        formdata.append( "sodium", meal.sodium )
        formdata.append( "size", meal.size )

        formdata.append( "price", meal.price )
        formdata.append( "description", meal.description )
        formdata.append( "shopID", shop_ID )
        if ( meal.image != null )
            formdata.append( "foodImage", meal.image )
        console.log( meal.image )
        // formdata.append( "imagePath", image_Path )
        const response = await Api().post('Shop/UpdateMeal.php', formdata )
        return response.data
    },
    async Delete_Meal( meal_ID ) {
        var formdata = new FormData()
        formdata.append( "mealID", meal_ID ) 
        const response = await Api().post( 'Shop/DeleteMeal.php', formdata )
        return response.data
    },
    async Update_Target( target ) {
        var formdata = new FormData()
        formdata.append( "targetID", target.target_ID )
        formdata.append( "shopID", target.shop_ID )
        formdata.append( "targetAge", target.target_Age )
        formdata.append( "targetGender", target.target_Gender )
        formdata.append( "mealID", target.meal_ID )
        const response = await Api().post('Shop/UpdateTarget.php', formdata )
        return response.data
    },
    async Update_Push_Message( target ) {
        var formdata = new FormData()
        formdata.append( "targetID", target.target_ID )
        formdata.append( "pushMsg", target.description )
        formdata.append( "isPush", target.want_to_recmd )
        const response = await Api().post('Shop/UpdatePushMessage.php', formdata )
        return response.data
    },
    async Delete_Target( target_ID ) {
        var formdata = new FormData()
        formdata.append( "targetID", target_ID )
        const response = await Api().post('Shop/DeleteTarget.php', formdata )
        return response.data
    }
}