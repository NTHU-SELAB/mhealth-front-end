import Api from '@/services/Api.js'

export default {

    // async postFoodManually(userID, foodName, foodWeight, calorie, fat, sugar, fiber, meal) {
    //     const response = await Api().post('food/recordFood.php', qs.stringify({
    //         'record': 'record',
    //         'userID': userID,
    //         'name': foodName,
    //         'weight': foodWeight,
    //         'calorie': calorie,
    //         'fat': fat,
    //         'sugar': sugar,
    //         'fiber': fiber,
    //         'meal': meal,
    //         'recordTime': new Date(Date.now())
    //     }))
    //     return response
    // },

    async getFoodsByKeyword(keyword) {
        const response = await Api().get(`food?keyword=${keyword}`)
        return response.data.foods
    }

}
