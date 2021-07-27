import Api from '@/services/Api.js'
import qs from 'qs'

export default {

    async Post_Meal_Manually( meal_ID, name, calories, carbohydrates, sugar, protein, fat, saturated_Fat, trans_Fat, sodium, size, description, price ) {
        const response = await Api().post( 'shop/InsertMeal.php', qs.stringify({
            'meal' : meal_ID,
            'name' : name,
            'cal' : calories,
            'carb' : carbohydrates,
            'sugars' : sugar,
            'protein' : protein,
            'fat' : fat,
            'sFat' : saturated_Fat,
            'tFat' : trans_Fat,
            'sod' : sodium,
            'size' : size,
            'price' : price,
            'des' : description
        }))
        return response
    },
    async Get_Meal_Records( meal_ID ) {
        const response = await Api().get(`meal/record?mealID=${meal_ID}`)
        return response.data.mealRecords
    },

    // async getFoodsByKeyword(keyword) {
    //     const response = await Api().get(`food?keyword=${keyword}`)
    //     return response.data.foods
    // },

    async Post_Meal_Record( meal_ID, name, calories, carbohydrates, sugar, protein, fat, saturated_Fat, trans_Fat, sodium, size, description, price ) {
        const response = await Api().post('food/record', {
            meal_ID, name, calories, carbohydrates, sugar, protein, fat, saturated_Fat, trans_Fat, sodium, size, description, price
        })
        return response
    }
}