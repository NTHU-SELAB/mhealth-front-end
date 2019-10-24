<<<<<<< HEAD
import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `https://mhealth.feveral.idv.tw/mhealth/`,
    })
}


=======
import axios from 'axios';

export default () => {
    return axios.create({
        // baseURL: `https://mhealth.feveral.me/mhealth/`,
        // baseURL: `http://localhost:3004/api/`,
        baseURL: `https://mhealth-service.feveral.me/api/`,
    })
}


>>>>>>> b589115a108980be83dda0ea35a98b5bf78a69f4
