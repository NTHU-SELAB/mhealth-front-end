<<<<<<< HEAD
import Api from '@/services/Api.js'
import qs from 'qs'

export default {

    async postFoodManually(userID, foodName, foodWeight, calorie, fat, sugar, fiber, meal) {
        const response = await Api().post('food/recordFood.php', qs.stringify({
            'record': 'record',
            'userID': userID,
            'name': foodName,
            'weight': foodWeight,
            'calorie': calorie,
            'fat': fat,
            'sugar': sugar,
            'fiber': fiber,
            'meal': meal,
            'recordTime': new Date(Date.now())
        }))
        return response
    },



}
=======
import Api from '@/services/Api.js'
import qs from 'qs'

export default {

    async postFoodManually(userID, foodName, foodWeight, calorie, fat, sugar, fiber, meal) {
        const response = await Api().post('food/recordFood.php', qs.stringify({
            'record': 'record',
            'userID': userID,
            'name': foodName,
            'weight': foodWeight,
            'calorie': calorie,
            'fat': fat,
            'sugar': sugar,
            'fiber': fiber,
            'meal': meal,
            'recordTime': new Date(Date.now())
        }))
        return response
    },

    async getFoodsByKeyword(keyword) {
        const response = await Api().get(`food?keyword=${keyword}`)
        return response.data.foods
    },

    async postFoodRecord(userID, image, name, weight, calorie, fat, sugar, fiber, meal, timestamp) {
        const response = await Api().post('food/record', {
            userID, image, name, weight, calorie, fat, sugar, fiber, meal, timestamp
        })
        return response
    }

}
>>>>>>> b589115a108980be83dda0ea35a98b5bf78a69f4
