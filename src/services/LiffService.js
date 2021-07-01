
import config from '@/config.js'
import liff from './LiffService'

export default {
    async getUserId() {
        if (liff.getProfile) {
            return (await liff.getProfile()).userId
        } else {
            return config.testUserId
        }
    }
}