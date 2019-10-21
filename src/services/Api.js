import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `https://mhealth.feveral.me/mhealth/`,
    })
}


