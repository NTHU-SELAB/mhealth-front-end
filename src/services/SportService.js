import Api from '@/services/Api.js'
import qs from 'qs'

export default {

    async postFoodManually(userID, sportName, calorie, totalTime ) {
        const response = await Api().post('sport/recordSport.php', qs.stringify({
            'record': 'record',
            'userID': userID,
            'name': sportName,
            'calorie': calorie,
            'totalTime': totalTime,
            'recordTime': new Date(Date.now())
        }))
        return response
    },

    async getSportRecords(userID, timestamp) {
        const response = await Api().get(`sport/record?userID=${userID}&timestamp=${timestamp}`)
        return response.data.sportRecords        
    },

    async getSportRecordToday(userID) {
        const response = await Api().get(`sport/record?userID=${userID}&timestamp=${Date.now()}`)
        return response.data.sportRecords
    },

    async getSportsByKeyword(keyword) {
        const response = await Api().get(`sport?keyword=${keyword}`)
        return response.data.sports
    },

    async postFoodRecord(userID, name, calorie, totalTime, timestamp) {
        const response = await Api().post('sport/record', {
            userID, name, calorie, totalTime, timestamp
        })
        return response
    }

}
