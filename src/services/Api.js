import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `http://mhealth.feveral.idv.tw/mhealth/`,
    })
}


