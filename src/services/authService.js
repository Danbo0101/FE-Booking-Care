import axios from "../utils/axiosCustomize"

const postLogin = (email, password) => {
    return axios.post(`v1/api/login`, {
        email,
        password,
    });
}

const postSendOTP = (email, type) => {
    return axios.post(`/v1/api/sent-otp`, {
        email,
        type
    });
}

const postVerifyOTP = (email, otp) => {
    return axios.post(`/v1/api/verify-otp`, {
        email,
        otp
    });
}

const postForgotPassword = (email, newPassword, confirmPassword) => {
    return axios.post(`/v1/api/forgot-password`, {
        email,
        newPassword,
        confirmPassword
    });
}


const postRegister = (name, email, password, address, gender, phone, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('address', address);
    data.append('gender', gender);
    data.append('phone', phone);
    data.append('image', image);
    return axios.post(`/v1/api/register`, data);
}


const postLogout = () => {
    return axios.post(`/v1/api/logout`);
}

const putChangeProfile = (id, name, email, address, gender, phone, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('address', address);
    data.append('gender', gender);
    data.append('phone', phone);
    data.append('image', image);
    return axios.put(`/v1/api/change-profile?id=${id}`, data);
}

const putChangePassword = (id, oldPassword, newPassword, confirmPassword) => {
    const data = new FormData();
    data.append('oldPassword', oldPassword);
    data.append('newPassword', newPassword);
    data.append('confirmPassword', confirmPassword);
    return axios.put(`/v1/api/change-password?id=${id}`, data);
}

export {
    postLogin,
    postLogout,
    putChangeProfile,
    putChangePassword,
    postSendOTP,
    postVerifyOTP,
    postRegister,
    postForgotPassword
}