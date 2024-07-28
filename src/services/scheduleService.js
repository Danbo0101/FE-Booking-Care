import axios from "../utils/axiosCustomize";


const getDoctorSchedule = (date, doctorId) => {
    return axios.get(`/v1/api/schedules?date=${date}&doctorId=${doctorId}`);
}

const getDoctorScheduleBooking = (date, doctorId) => {
    return axios.get(`/v1/api/schedules-booking?date=${date}&doctorId=${doctorId}`);
}

const putUpdateDoctorSchedule = (id, statusId, maxNumber) => {
    const data = new FormData();
    data.append('statusId', statusId);
    data.append('maxNumber', maxNumber);
    return axios.put(`/v1/api/schedules?scheduleId=${id}`, data);
}

const getDoctorScheduleDetail = (id) => {
    return axios.get(`/v1/api/schedules-detail?scheduleId=${id}`);
}

const getTimeType = () => {
    return axios.get(`/v1/api/time-type`);
}

const postCreateDoctorSchedule = (doctoId, timeTypeId, date, maxNumber) => {
    return axios.post(`/v1/api/schedules?doctorId=${doctoId}`, {
        timeTypeId,
        date,
        maxNumber
    });
}


export {
    getDoctorSchedule,
    putUpdateDoctorSchedule,
    getDoctorScheduleDetail,
    getTimeType,
    postCreateDoctorSchedule,
    getDoctorScheduleBooking
}