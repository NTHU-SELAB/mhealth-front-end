import Api from '@/services/Api.js'
import Api1 from '@/services/Api1.js'
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

    async getFoodRecords(userID, timestamp) {
        const response = await Api().get(`food/record?userID=${userID}&timestamp=${timestamp}`)
        return response.data.foodRecords        
    },

    async getFoodRecordsByDay(userID, timestamp) {
        const response = await Api().get(`food/record/today?userID=${userID}&timestamp=${timestamp}`)
        return response.data.foodRecords
    },

    async getFoodsByKeyword(keyword) {
		console.log(keyword)
        const response = await Api().get(`food?keyword=${keyword}`)
        return response.data.foods
    },

    async postFoodRecord(userID, image, name, weight, calorie, fat, sugar, fiber, meal, timestamp) {
        const response = await Api().post('food/record', {
            userID, image, name, weight, calorie, fat, sugar, fiber, meal, timestamp
        })
        return response
    },

    async getAllUserInfo(){
        const response = await Api1().post('lineUser/queryUserInfo.php')
        return response.data    
    },
    async getBloodPressure(){
        var formdata = new FormData()
        formdata.append( "userID", this.userID )
        formdata.append( "getGraph", true)
        formdata.append( "queryTime", Date.now())
        const response = await Api1().post('graph/blood_pressure_warn.php',formdata)
        return response.data    
    }
}
