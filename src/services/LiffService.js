
import config from '@/config.js'

export default {
    async getUserId() {
        if (liff.getProfile) {
            return (await liff.getProfile()).userId
        } else {
            return config.testUserId
        }
    }
}