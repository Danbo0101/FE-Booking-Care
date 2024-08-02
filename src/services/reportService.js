import axios from "../utils/axiosCustomize";


const getDoctorReport = (doctorId, month, year) => {
    return axios.get(`/v1/api/doctor-report?doctorId=${doctorId}&month=${month}&year=${year}`);
}

const getClinicReport = (clinicId, month, year) => {
    return axios.get(`/v1/api/clinic-report?clinicId=${clinicId}&month=${month}&year=${year}`);
}

const getSpecialtiesReport = (specialtiesId, month, year) => {
    return axios.get(`/v1/api/specialties-report?specialtiesId=${specialtiesId}&month=${month}&year=${year}`);
}

export {
    getDoctorReport,
    getClinicReport,
    getSpecialtiesReport
}