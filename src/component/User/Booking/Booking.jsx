import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { checkDoctorBooking, checkTimeBooking, getAllBookings, getBookingToConfirm, postBooking, postCreatePaymentUrl } from '../../../services/bookingService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BookingForm = () => {

    const { scheduleId } = useParams();

    const navigate = useNavigate();

    const account = useSelector(state => state.user.account);

    // console.log(account)

    const [doctorName, setDoctorName] = useState('');
    const [doctorImage, setDoctorImage] = useState('');
    const [clinicName, setClinicName] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [specialtiesName, setSpecialtiesName] = useState('');
    const [date, setDate] = useState('');
    const [timeTypeName, setTimeTypeName] = useState('');
    const [qualification, setQualification] = useState('');
    const [price, setPrice] = useState('');
    const [bookingFee, setBookingFee] = useState('10000');
    const [totalPrice, setTotalPrice] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [orderId, setOrderId] = useState()

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    useEffect(() => {
        const fetchDataBooking = async () => {
            let result = await getBookingToConfirm(scheduleId);
            if (result.ER === 0) {
                setDoctorName(result.data.doctorName)
                setDoctorImage(bufferToDataURL(result.data.doctorImage))
                setClinicName(result.data.clinicName)
                setClinicAddress(result.data.clinicAddress)
                setSpecialtiesName(result.data.specialtiesName)
                setDate(result.data.date)
                setTimeTypeName(result.data.timeTypeName)
                setQualification(result.data.qualification)
                setPrice(result.data.price)
            } else {
                console.log(result.message);
            }

            let allBookings = await getAllBookings();
            if (allBookings.ER === 0) {
                console.log(allBookings.data.length)
                if (allBookings.data.length < 1) {
                    setOrderId(12)
                }
                else {
                    setOrderId(allBookings.data.id + 12)
                }
            }
        }
        fetchDataBooking();
    }, [])


    useEffect(() => {
        calculateTotal();
    }, [price])

    const formatPrice = (price) => {
        return parseFloat(price.replace("vnđ", "").replace(/\./g, ""));
    };

    const calculateTotal = () => {
        const total = formatPrice(price) + formatPrice(bookingFee);
        const formattedTotal = total.toLocaleString('vi-VN') + "VNĐ";
        setTotalPrice(formattedTotal);
    };

    const handleSubmitForm = async () => {
        let resultTime = await checkTimeBooking(account.id, +scheduleId);
        if (resultTime.data) {
            toast.error("Bạn đã đặt lịch trong thời gian này.");
            return;
        }
        let resultDoctor = await checkDoctorBooking(account.id, scheduleId);
        if (resultDoctor.data) {
            toast.error("Bạn đã đặt lịch với bác sĩ này trong ngày hôm nay.");
            return;
        }

        const newWindow = window.open();
        if (paymentMethod === "online") {
            let resultOnline = await postCreatePaymentUrl(formatPrice(totalPrice), orderId, `Thanh toán hoá đơn khám bệnh ${orderId}`)
            if (resultOnline) {
                newWindow.location.href = resultOnline;
                localStorage.setItem("scheduleId", scheduleId);
                localStorage.setItem("paymentMethod", paymentMethod);
                localStorage.setItem("bookingFee", formatPrice(price));
                localStorage.setItem("cosultationFee", formatPrice(bookingFee));
                localStorage.setItem("totalPrice", formatPrice(totalPrice));
                setPaymentMethod("online");
            }
            else {
                toast.error(resultOnline);
            }
        }
        else {
            let resultOffline = await postCreatePaymentUrl(formatPrice(bookingFee), orderId, `Thanh toán đặt lịch ${orderId}`)
            if (resultOffline) {
                newWindow.location.href = resultOffline;
                localStorage.setItem("scheduleId", scheduleId);
                localStorage.setItem("paymentMethod", paymentMethod);
                localStorage.setItem("bookingFee", formatPrice(price));
                localStorage.setItem("cosultationFee", formatPrice(bookingFee));
                localStorage.setItem("totalPrice", formatPrice(totalPrice));
                setPaymentMethod("online");
            }
            else {
                toast.error(resultOffline);
            }
        }

    }

    const formatToVND = (amount) => {

        let amountStr = amount.toString();
        let formattedAmount = '';
        while (amountStr.length > 3) {
            formattedAmount = '.' + amountStr.slice(-3) + formattedAmount;
            amountStr = amountStr.slice(0, amountStr.length - 3);
        }
        formattedAmount = amountStr + formattedAmount;
        return `${formattedAmount} VNĐ`;
    }

    return (
        <div className="pt-16 px-96 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-8">
                <img className="w-32 h-32 rounded-full mr-4" src={doctorImage} alt="Doctor" />
                <div>
                    <h2 className="text-2xl font-semibold">{qualification}  {doctorName}</h2>
                    <p className="text-gray-500 flex gap-2 items-center">
                        <AccessTimeOutlinedIcon fontSize='smail' />
                        {date} - {timeTypeName}
                    </p>
                    <p className="text-gray-500 flex gap-2 items-center">
                        <ApartmentOutlinedIcon fontSize='smail' />
                        {clinicName}
                    </p>
                    <p className="text-gray-500 flex gap-2 items-center">
                        <PlaceOutlinedIcon fontSize='smail' />
                        {clinicAddress}
                    </p>
                </div>
            </div>
            <div className="mb-4">
                <input type="radio" name="appointment_type" checked className="mr-2" />Giá khám {specialtiesName} : {price}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={account.name}
                    disabled
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
            </div>

            {account.gender === "male" ?
                <div className="mb-4">
                    <input type="radio" name="gender" id="male" className="mr-2" checked disabled />Nam
                    <input type="radio" name="gender" id="female" className="mr-2 ml-4" disabled />Nữ
                </div>
                :
                <div className="mb-4">
                    <input type="radio" name="gender" id="male" className="mr-2" disabled />Nam
                    <input type="radio" name="gender" id="female" className="mr-2 ml-4" checked disabled />Nữ
                </div>
            }
            <div className="mb-4">
                <input
                    type="text"
                    value={account.phone}
                    disabled
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    value={account.email}
                    disabled
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={account.address}
                    disabled
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
            </div>
            <div>
                <div className="mb-4">
                    <input
                        type="radio"
                        name="payment_method"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod(event.target.value)}
                        className="mr-2"
                    />
                    <label>Thanh toán online</label>
                </div>
                <div className="mb-4">
                    <input
                        type="radio"
                        name="payment_method"
                        value="offline"
                        checked={paymentMethod === "offline"}
                        onChange={() => setPaymentMethod(event.target.value)}
                        className="mr-2"
                    />
                    <label>Thanh toán tại bệnh viện</label>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex justify-between py-2">
                    <span>Giá khám</span>
                    <span>{formatToVND(price)}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span>Phí đặt lịch</span>
                    <span>{formatToVND(bookingFee)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold">
                    <span>Tổng cộng</span>
                    <span>{totalPrice}</span>
                </div>
            </div>
            <div className="mb-4 bg-blue-100 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">LƯU Ý</p>
                <ul className="list-disc pl-5">
                    <li>Vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</li>
                </ul>
            </div>
            <Button
                variant="outlined"
                className="w-full cursor-pointer"
                onClick={() => handleSubmitForm()}
            >
                Xác nhận đặt khám
            </Button>
            <p className="text-center text-gray-500 mt-4">
                Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với <a href="#" className="text-blue-500">Điều khoản sử dụng</a> dịch vụ của chúng tôi.
            </p>
        </div>
    );
};

export default BookingForm;
