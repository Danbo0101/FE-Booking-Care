import axios from "../utils/axiosCustomize";

const getBookingToConfirm = (scheduleId) => {
    return axios.get(`/v1/api/bookings?scheduleId=${scheduleId}`)
}

const postBooking = (patientId, scheduleId) => {
    return axios.post(`/v1/api/bookings?patientId=${patientId}`, { scheduleId })
}

const getBookingHistory = (patientId) => {
    return axios.get(`/v1/api/history-bookings?patientId=${patientId}`)
}

const deleteCancelBooking = (patientId, bookingId) => {
    return axios.delete(`/v1/api/bookings?patientId=${patientId}&bookingId=${bookingId}`)
}

const getBookingMonthly = (year) => {
    return axios.get(`/v1/api/booking-monthly?year=${year}`)
}

const getBookingClinic = () => {
    return axios.get(`/v1/api/booking-clinic`)
}

const getBookingSpecialties = () => {
    return axios.get(`/v1/api/booking-specialties`)
}

const postCreatePaymentUrl = (amount, orderId) => {
    return axios.post(`/v1/api/create_payment_url`, {
        amount,
        orderId
    })
}

export {
    getBookingToConfirm,
    postBooking,
    getBookingHistory,
    deleteCancelBooking,
    getBookingMonthly,
    getBookingClinic,
    getBookingSpecialties,
    postCreatePaymentUrl
}