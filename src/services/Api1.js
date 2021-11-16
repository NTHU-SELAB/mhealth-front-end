import axios from 'axios';

export default () => {
    return axios.create({
        // baseURL: `http://localhost:3004/api/`,
        baseURL: `https://selab1.cs.nthu.edu.tw/mhealth/`,
    })
}


