import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import { getDoctorInfoDetail } from '../../../../services/doctorService';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DoctorInfo = (props) => {
    const { open, id } = props;

    const [doctorInfo, setDoctorInfo] = useState({});

    const handleClose = () => {
        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [qualification, setQualification] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [nameClinic, setNameClinic] = useState("");
    const [nameSpecialties, setNameSpecialties] = useState("");

    // const handleUploadImage = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         setPreviewImage(URL.createObjectURL(event.target.files[0]))
    //         setImage(event.target.files[0])
    //     }
    // }

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const resetData = () => {
        setName("");
        setEmail("");
        setAddress("");
        setGender("");
        setPhone("");
        setQualification("");
        setPrice("");
        setImage("");
        setPreviewImage("");
        setNameClinic("");
        setNameSpecialties("");
        props.setDataView("");
        props.setOpen(false);
    }

    const fetchDoctorInfoDetail = async () => {

        let result = await getDoctorInfoDetail(id);
        if (result.ER === 0 || result.ER === 100) {
            setDoctorInfo(result.data);
        }
        else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        fetchDoctorInfoDetail();
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            if (doctorInfo.doctor) {
                setName(doctorInfo.doctor.name);
                setEmail(doctorInfo.doctor.email);
                setAddress(doctorInfo.doctor.address);
                setGender(doctorInfo.doctor.gender);
                setPhone(doctorInfo.doctor.phone);
                setQualification(doctorInfo.doctor.qualification);
                setPrice(doctorInfo.doctor.price);
                const url = await bufferToDataURL(doctorInfo.doctor.image);
                setPreviewImage(url);
                setNameClinic(doctorInfo.clinic.name);
                setNameSpecialties(doctorInfo.specialties.name);
            } else {
                setName(doctorInfo.name);
                setEmail(doctorInfo.email);
                setAddress(doctorInfo.address);
                setGender(doctorInfo.gender);
                setPhone(doctorInfo.phone);
                setQualification(doctorInfo.qualification);
                setPrice(doctorInfo.price);
                const url = await bufferToDataURL(doctorInfo.image);
                setPreviewImage(url);
            }
        }
        fetchData();

    }, [doctorInfo])

    return (

        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                Thông tin Bác Sĩ {name}
            </DialogTitle>
            <DialogContent dividers>
                <div className="mx-10 flex flex-col gap-5">
                    <input
                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Tên"
                        value={name}
                        disabled
                    // onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        value={email}
                        disabled
                    // onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Địa chỉ"
                        value={address}
                        disabled
                    // onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <select
                            id="qualification"
                            name="qualification"
                            value={qualification}
                            disabled
                            // onChange={(e) => setQualification(e.target.value)}
                            className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="" disabled>Trình độ chuyên môn</option>
                            <option value="Thạc sĩ">Thạc sĩ</option>
                            <option value="Tiến sĩ">Tiến sĩ</option>
                            <option value="Phó giáo sư">Phó giáo sư</option>
                            <option value="Giáo sư">Giáo sư</option>
                        </select>
                        <select
                            id="gender"
                            name="gender"
                            value={gender}
                            disabled
                            // onChange={(e) => setGender(e.target.value)}
                            className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="" disabled>Giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                            <option value="khac">Khác</option>
                        </select>
                    </div>
                    {doctorInfo.doctor ?
                        <div className="flex gap-2">
                            <input
                                className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                type="text"
                                placeholder="Tên chuyên khoa"
                                value={nameSpecialties}
                                disabled
                            // onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                type="text"
                                placeholder="Tên Phòng khám"
                                value={nameClinic}
                                disabled
                            // onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        :
                        <></>
                    }
                    <div className="flex gap-2">
                        <input
                            className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                            type="text"
                            placeholder="Số điện thoại"
                            value={phone}
                            disabled
                        // onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                            type="text"
                            placeholder="Giá khám"
                            value={price}
                            disabled
                        // onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='w-full flex justify-center outline-dotted outline-slate-200'>
                        {previewImage ?
                            <img src={previewImage} className="w-32 h-32 p-2" />
                            :
                            <></>
                        }
                        {/* <span>Preview Image</span> */}

                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='inherit'
                    onClick={() => resetData()}
                >
                    Đóng
                </Button>

            </DialogActions>
        </BootstrapDialog>

    )
}

export default DoctorInfo;