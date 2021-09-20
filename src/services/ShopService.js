import Api from '@/services/Api.js'
// import qs from 'qs'

export default {
    async Post_New_Shop( shop_Name, shop_Address, user_ID, beacon_ID ) {
        var formdata = new FormData()       
        formdata.append( "shopName", shop_Name )       
        formdata.append( "shopAddress", shop_Address )
        formdata.append( "userID", user_ID )
        formdata.append( "beaconID", beacon_ID )
        const response = await Api().post( 'Shop/InsertShop.php', formdata )
        return response.data
    },
    
    // async Get_Shop_By_Owner( user_ID ) {
    //     const response = await Api().get(`Shop/GetShopsByOwner.php?shopOwner=${user_ID}`)
    //     return response.data
    // },
    async Get_Shop_By_Owner( user_ID ) {
        var formdata = new FormData()
        formdata.append( "shopOwner", user_ID )
        const response = await Api().post(`Shop/GetShopsByOwner.php`, formdata )
        return response.data
    },

    async Get_Targets_By_Shop( shop_ID ) {
        const response = await Api().get(`Shop/GetTargetsByShop.php?shopOwner=${shop_ID}}`)
        return response.data
    },

    async Update_Shop( shop_ID, beacon_ID, user_ID, shop_Name, shop_Address ) {
        var formdata = new FormData() 
        formdata.append( "shopID", shop_ID )     
        formdata.append( "shopName", shop_Name )       
        formdata.append( "shopAddress", shop_Address )
        formdata.append( "shopOwner", user_ID )
        formdata.append( "beaconID", beacon_ID )
        const response = await Api().post( 'Shop/UpdateShop.php', formdata )
        return response.data
    },
    async Delete_Shop() {
        
    }

}