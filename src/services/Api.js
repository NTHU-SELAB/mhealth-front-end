import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `https://mhealth.feveral.idv.tw/mhealth/`,
    })
}


