import Api from '@/services/Api.js'


export default {

    async postFoodManually(userID, foodName, foodWeight, calorie, fat, sugar, fiber, meal) {
        const response = await Api().post('food/recordFood.php', {
            'record': 'record',
            'userID': userID,
            'name': name,
            'weight': foodWeight,
            'calorie': calorie,
            'fat': fat,
            'sugar': sugar,
            'fiber': fiber,
            'meal': meal,
            'recordTime': Date.now()/1000
        })
        console.log(response.data)
    },



}
