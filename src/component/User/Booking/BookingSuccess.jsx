import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from 'react-router-dom';
import { postBooking } from '../../../services/bookingService';
import { useSelector } from 'react-redux';


const BookingSuccess = () => {

    const account = useSelector(state => state.user.account);

    const location = useLocation();

    // console.log(location.search)

    const scheduleId = localStorage.getItem("scheduleId");
    const paymentMethod = localStorage.getItem("paymentMethod");
    const bookingFee = localStorage.getItem('bookingFee');
    const cosultationFee = localStorage.getItem('cosultationFee');
    const totalPrice = localStorage.getItem("totalPrice");

    // console.log(scheduleId);
    // console.log(paymentMethod);
    // console.log(totalPrice);

    const booking = async () => {
        if (paymentMethod === "online") {
            let result = await postBooking(account.id, scheduleId, bookingFee, cosultationFee, totalPrice)
            console.log(result);
        }
        if (paymentMethod === "offline") {
            let result = await postBooking(account.id, scheduleId, "Chưa thanh toán", cosultationFee, cosultationFee)
            console.log(result);
        }
        setTimeout(() => {

            localStorage.removeItem("scheduleId");
            localStorage.removeItem("paymentMethod");
            localStorage.removeItem("bookingFee");
            localStorage.removeItem("consultationFee");
            localStorage.removeItem("totalPrice");


            window.location.href = "/";
        }, 5000);
    }

    useEffect(() => {
        booking()
    }, [])

    return (
        <div className="max-w-xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg text-center">
            <div className="mb-4">
                <CheckCircleIcon
                    style={{ width: '6rem', height: '6rem', color: 'lightgreen' }} // 96px is equivalent to 6rem in Tailwind's default spacing scale
                />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Đặt Lịch Khám Thành Công!</h2>
            <p className="text-gray-700 mb-4">
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
            </p>
            <a href="/" className="bg-yellow-500 text-white px-4 py-2 rounded-md">
                Trở về trang chủ
            </a>
        </div>
    );
};

export default BookingSuccess;
