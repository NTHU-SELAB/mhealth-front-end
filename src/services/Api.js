import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `https://mhealth.feveral.idv.tw/mhealth/`,
        withCredentials: true // 有這行 cookie 才可使用
    })
}


