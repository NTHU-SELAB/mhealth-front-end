import Api from '@/services/Api.js'
// import qs from 'qs'

export default {
    async Get_Hospitals_By_Owner( user_ID ) {
        var formdata = new FormData()
        formdata.append( "ownerID", user_ID )
        const response = await Api().post(`Hospital/GetHospitalsByOwner.php`, formdata )
        return response.data
    },

    async Insert_new_Hospital( hospital_Name, hospital_Address, hospital_Description, user_ID, beacon_ID ) {
        var formdata = new FormData()       
        formdata.append( "name", hospital_Name )       
        formdata.append( "address", hospital_Address )
        formdata.append( "description", hospital_Description )
        formdata.append( "userID", user_ID )
        formdata.append( "beaconID", beacon_ID )
        const response = await Api().post( 'Hospital/InsertHospital.php', formdata )
        return response.data
    },

    async Update_Hospital( hospital_ID, beacon_ID, user_ID, hospital_Name, hospital_Address, hospital_Description ) {
        var formdata = new FormData() 
        formdata.append( "ID", hospital_ID )     
        formdata.append( "name", hospital_Name )       
        formdata.append( "address", hospital_Address )
        formdata.append( "description", hospital_Description )
        formdata.append( "ownerID", user_ID )
        formdata.append( "beaconID", beacon_ID )
        const response = await Api().post( 'Hospital/UpdateHospital.php', formdata )
        return response.data
    },

    async Delete_Hospital( hospital_ID ) {
        var formdata = new FormData()
        formdata.append( "ID", hospital_ID ) 
        const response = await Api().post( 'Hospital/DeleteHospital.php', formdata )
        return response.data
    },

    async InsertMessage( type, beacon_ID, text, filter, it, hospital_ID ) {
        var formdata = new FormData() 
        formdata.append( "type", type ) 
        formdata.append( "beaconID", beacon_ID )    
        formdata.append( "text", text )       
        formdata.append( "filter", filter )
        formdata.append( "it", it )
        formdata.append( "hospitalID", hospital_ID )

        const response = await Api().post( 'Hospital/InsertMessage.php', formdata )
        return response.data
    },

    async GetMessageByHospital( hospital_ID ) {
        var formdata = new FormData()
        formdata.append( "hospitalID", hospital_ID )
        const response = await Api().post(`Hospital/GetMessageByHospital.php`, formdata )
        return response.data
    },

    async Update_Message( message_ID, type, beacon_ID, text, filter, it, hospital_ID ) {
        var formdata = new FormData() 
        formdata.append( "message_ID", message_ID )
        formdata.append( "type", type ) 
        formdata.append( "beaconID", beacon_ID )
        formdata.append( "text", text )
        formdata.append( "filter", filter )
        formdata.append( "it", it )
        formdata.append( "hospitalID", hospital_ID )
        const response = await Api().post( 'Hospital/UpdateMessage.php', formdata )
        return response.data
    },

    async Delete_Message( msgID ) {
        var formdata = new FormData()
        formdata.append( "msgID", msgID )
        const response = await Api().post(`Hospital/DeleteMessage.php`, formdata )
        return response.data
    }


}