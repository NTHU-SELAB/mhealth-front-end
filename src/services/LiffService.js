
import config from '@/config.js'
import liff from '@line/liff'

export default {
    async getUserId() {
        if (liff.getProfile) {
            return (await liff.getProfile()).userId
        } else {
            return config.testUserId
        }
    }
}