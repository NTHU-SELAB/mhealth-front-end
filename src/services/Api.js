import axios from 'axios';

export default () => {
    return axios.create({
        // baseURL: `https://mhealth.feveral.me/mhealth/`,
        // baseURL: `http://localhost:3004/api/`,
        baseURL: `https://mhealth-service.feveral.me/api/`,
    })
}


