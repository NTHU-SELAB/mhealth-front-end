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
    async posthealthdata(userID, sbp, dbp, water,tep) {
        const response = await Api1().post('chartdata/healthdata.php', qs.stringify({
            'record': 'record',
            'userID': userID,
            'sbp': sbp,
            'dbp': dbp,
            'water': water,
            'tep': tep,
            'recordTime': new Date(Date.now())
        }))
        return response
    },
    async postsportdata(userID, sportname, cal, sporttime) {
        const response = await Api1().post('chartdata/sportdata.php', qs.stringify({
            'record': 'record',
            'userID': userID,
            'sportname': sportname,
            'cal': cal,
            'sporttime': sporttime,
            'recordTime': new Date(Date.now())
        }))
        return response
    },

    async getFoodRecords(userID, timestamp) {
        const response = await Api().get(`food/record?userID=${userID}&timestamp=${timestamp}`)
        return response.data.foodRecords        
    },
    async getFoodRecordsRecent(userID, timestamp) {
        console.log(timestamp);
        var formdata = new FormData()
        formdata.append( "userID", userID )
        formdata.append( "getGraph", 1)
        let timeNow = new Date()
        let t = `${timeNow.getFullYear()}-${timeNow.getMonth()+1}-${timeNow.getDate()} 00:00:00`
        formdata.append( "queryTime", t)
        const response = await Api1().post('chartdata/foodrecord.php',formdata)
        return response.data    

        // const response = await Api().get(`food/record/today?userID=${userID}&timestamp=${timestamp}`)
        // return response.data.foodRecords
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
    async getBloodPressure(userID){
        var formdata = new FormData()
        formdata.append( "userID", userID )
        formdata.append( "getGraph", 1)
        let timeNow = new Date()
        let t = `${timeNow.getFullYear()}-${timeNow.getMonth()+1}-${timeNow.getDate()} 00:00:00`
        formdata.append( "queryTime", t)
        const response = await Api1().post('chartdata/bloodchart.php',formdata)
        return response.data    
    },
    async getWater(userID){
        var formdata = new FormData()
        formdata.append( "userID", userID )
        formdata.append( "getGraph", 1)
        let timeNow = new Date()
        let t = `${timeNow.getFullYear()}-${timeNow.getMonth()+1}-${timeNow.getDate()} 00:00:00`
        formdata.append( "queryTime", t)
        const response = await Api1().post('chartdata/waterchart.php',formdata)
        return response.data    
    },
    async getTemperature(userID){
        var formdata = new FormData()
        formdata.append( "userID", userID )
        formdata.append( "getGraph", 1)
        let timeNow = new Date()
        let t = `${timeNow.getFullYear()}-${timeNow.getMonth()+1}-${timeNow.getDate()} 00:00:00`
        formdata.append( "queryTime", t)
        const response = await Api1().post('chartdata/tepchart.php',formdata)
        return response.data
    },
    async getSportPicture(userID){
        var formdata = new FormData()
        formdata.append( "userID", userID )
        formdata.append( "getGraph", 1)
        let timeNow = new Date()
        let t = `${timeNow.getFullYear()}-${timeNow.getMonth()+1}-${timeNow.getDate()} 00:00:00`
        formdata.append( "queryTime", t)
        const response = await Api1().post('chartdata/sportchart.php',formdata)
        return response.data    
    },
}
