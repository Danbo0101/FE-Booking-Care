import axios from "../utils/axiosCustomize";


const getClinicPagination = (page, limit) => {
    return axios.get(`/v1/api/clinics?page=${page}&limit=${limit}`);
}

const getAllClinic = () => {
    return axios.get(`/v1/api/clinics`);
}

const getClinicInfo = (id) => {
    return axios.get(`/v1/api/clinic-info?clinicId=${id}`);
}

const getDoctorClinic = (id) => {
    return axios.get(`/v1/api/doctors-clinic?clinicId=${id}`);
}
const postCreateNewClinic = (name, description, address, clinicImage) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('address', address);
    data.append('image', clinicImage);
    return axios.post('/v1/api/clinics', data);
}
const putUpdateClinic = (id, name, description, address, clinicImage) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('address', address);
    data.append('image', clinicImage);
    return axios.put(`/v1/api/clinics?id=${id}`, data);
}

const deleteClinic = (id) => {
    return axios.delete(`/v1/api/clinics?id=${id}`);
}

export {
    getAllClinic,
    getClinicPagination,
    postCreateNewClinic,
    getClinicInfo,
    putUpdateClinic,
    deleteClinic,
    getDoctorClinic
}