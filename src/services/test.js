import axios from "../utils/axiosCustomize";


const getDoctor = () => {
    return axios.get(`/v1/api/doctors`);
}

export {
    getDoctor
}