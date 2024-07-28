import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import imgtest from "../../../assets/images/1.jpeg"
import { useNavigate, useParams } from 'react-router-dom';
import { getDoctorInfoDetail } from '../../../services/doctorService';
import { getDoctorSchedule, getDoctorScheduleBooking } from '../../../services/scheduleService';

const DoctorInfo = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [doctorSchedule, setDoctorSchedule] = useState([]);
    const [doctorName, setDoctorName] = useState("");
    const [doctorImage, setDoctorImage] = useState("");
    const [doctorQualification, setDoctorQualification] = useState("");
    const [doctorPrice, setDoctorPrice] = useState("");
    const [doctorSpecialty, setDoctorSpecialty] = useState("");
    const [doctorClinic, setDoctorClinic] = useState("");
    const [clinicAddress, setClinicAddress] = useState("");


    const [dates, setDates] = useState([]);
    const [dateSelected, setDateSelected] = useState("");


    const fetchDataDoctorInfo = async () => {
        let resultInfo = await getDoctorInfoDetail(id);
        if (resultInfo.ER === 0) {
            setDoctorName(resultInfo.data?.doctor?.name);
            setDoctorImage(resultInfo.data?.doctor?.image);
            setDoctorQualification(resultInfo.data?.doctor?.qualification);
            setDoctorPrice(resultInfo.data?.doctor?.price);
            setDoctorSpecialty(resultInfo.data?.specialties?.name);
            setDoctorClinic(resultInfo.data?.clinic?.name);
            setClinicAddress(resultInfo.data?.clinic?.address);
        } else {
            console.log(resultInfo.message);
        }
    }

    const fetchDataSchedule = async () => {
        let resultSchedule = await getDoctorScheduleBooking(dateSelected, id)
        if (resultSchedule.ER === 0) {
            setDoctorSchedule(resultSchedule.data);
        } else {
            setDoctorSchedule(resultSchedule.data);
        }
    }

    useEffect(() => {
        const today = dayjs();
        let nextDays = [];
        let daysToAdd = 1;

        while (nextDays.length < 3) {
            let nextDay = today.add(daysToAdd, 'day');
            if (nextDay.day() !== 0) {
                nextDays.push(nextDay);
            }
            daysToAdd++;
        }

        setDates(nextDays);
        if (nextDays.length > 0) {
            setDateSelected(nextDays[0].format("YYYY-MM-DD"));
        }
        fetchDataDoctorInfo();
    }, []);

    useEffect(() => {
        fetchDataSchedule();
    }, [dateSelected])

    const getDayOfWeek = (date) => {
        const daysOfWeek = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return daysOfWeek[date.day()];
    };


    const handleChange = (event) => {
        setDateSelected(event.target.value);
    };

    const handleBookingForm = (scheduleId) => {
        navigate(`/booking-form/${scheduleId}`)
    }
    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    return (
        <div className="pt-10 px-32">

            <div className="flex items-center mb-6">
                <img
                    src={bufferToDataURL(doctorImage)}
                    className="rounded-full w-28 h-28 mr-6"
                />
                <div>
                    <h1 className="text-2xl font-bold">{doctorQualification}  {doctorName}</h1>
                    <p className='font-light'>{doctorSpecialty}</p>
                </div>
            </div>

            <div className='flex gap-16'>
                <div className="mb-4 w-4/6">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "150px", height: "60px" }}>
                        <InputLabel id="select-standard-label">Date</InputLabel>
                        <Select
                            labelId="select-standard-label"
                            id="select-standard"
                            value={dateSelected}
                            onChange={handleChange}
                            label="Date"
                        >
                            {dates.map((date, index) => (
                                <MenuItem
                                    key={index}
                                    value={date.format("YYYY-MM-DD")}>
                                    <em>{getDayOfWeek(date)}, {date.format("DD-MM")} </em>
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <h3 className="text-base font-semibold mb-2">
                        <CalendarMonthIcon className="mr-2" />
                        LỊCH KHÁM
                    </h3>
                    {doctorSchedule && doctorSchedule.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {doctorSchedule.map((time, index) => (
                                <div key={index}
                                    className="border p-2 rounded text-center bg-gray-100 cursor-pointer"
                                    onClick={() => handleBookingForm(time.id)}
                                >
                                    {time.timeTypeName}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">Chưa có lịch khám nào trong ngày này</div>
                    )}
                </div>

                <div className='w-3/6 mt-16 border-l p-4'>
                    <div>
                        <h3 className="text-base text-slate-400 font-semibold mb-2 ">ĐỊA CHỈ KHÁM</h3>
                        <p>{doctorClinic}</p>
                        <p>{clinicAddress}</p>
                    </div>
                    <div className='flex gap-3 mt-6'>
                        <h3 className="text-base text-slate-400 font-semibold mb-2 ">GIÁ KHÁM: </h3>
                        <p>{doctorPrice}</p>
                    </div>
                </div>



            </div>

        </div>
    );
};

export default DoctorInfo;
