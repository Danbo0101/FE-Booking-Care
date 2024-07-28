import axios from "../utils/axiosCustomize";


const getSpecialtiesPagination = (page, limit) => {
    return axios.get(`/v1/api/specialties?page=${page}&limit=${limit}`);
}

const getAllSpecialties = () => {
    return axios.get(`/v1/api/specialties`);
}

const getSpecialtiesInfo = (id) => {
    return axios.get(`/v1/api/specialties-info?specialtiesId=${id}`);
}

const getDoctorSpecialties = (id) => {
    return axios.get(`/v1/api/doctors-specialties?specialtiesId=${id}`);
}

// const getSpecialtiesInfo = (id) => {
//     return axios.get(`/v1/api/clinic-info?clinicId=${id}`);
// }

const postCreateNewSpecialties = (name, description, specialtiesImage) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('image', specialtiesImage);
    return axios.post('/v1/api/specialties', data);
}

const putUpdateSpecialties = (id, name, description, specialtiesImage) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('image', specialtiesImage);
    return axios.put(`/v1/api/specialties?id=${id}`, data);
}

const deleteSpecialties = (id) => {
    return axios.delete(`/v1/api/specialties?id=${id}`);
}

export {
    getAllSpecialties,
    getSpecialtiesPagination,
    postCreateNewSpecialties,
    putUpdateSpecialties,
    deleteSpecialties,
    getSpecialtiesInfo,
    getDoctorSpecialties
}