import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `https://selab1.cs.nthu.edu.tw/mhealth/`,
        // baseURL: `https://mhealth.feveral.me/mhealth/`,
        // baseURL: `http://localhost:3004/api/`,
        // baseURL: `https://mhealth-service.feveral.me/api/`
        // baseURL:'http://localhost:8080/api/'
        // baseURL:'http://192.168.43.199:8080/'
    })
}


