import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAssignDoctor, putUpdateAssignDoctor, putUpdateDoctor } from '../../../../services/doctorService';
import { getAllSpecialties } from '../../../../services/specialtiesService';
import { getAllClinic } from '../../../../services/clinicService';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const UpdateDoctor = (props) => {
    const { open, dataUpdate } = props

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [qualification, setQualification] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [nameImage, setNameImage] = useState("")
    const [previewImage, setPreviewImage] = useState("");

    const [optionSpecialties, setOptionSpecialties] = useState({});
    const [optionClinic, setOptionClinic] = useState({});

    const [specialties, setSpecialties] = useState("");
    const [clinic, setClinic] = useState("");


    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setNameImage(event.target.files[0].name);
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const checkPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^\d]/g, '');
        let PhonePattern = /^(0|(\+84))9\d{8}$/;
        return PhonePattern.test(phoneNumber);
    }



    const resetData = () => {
        setName("");
        setEmail("");
        setAddress("");
        setGender("");
        setPhone("");
        setQualification("");
        setPrice("");
        setNameImage("");
        setImage("");
        setPreviewImage("");
        setOptionSpecialties({});
        setOptionClinic({});
        setSpecialties("");
        setClinic("");
        setValue('1')
        props.setOpen(false);
    }


    useEffect(() => {
        async function fetchData() {
            if (dataUpdate) {
                setName(dataUpdate.name);
                setEmail(dataUpdate.email);
                setAddress(dataUpdate.address);
                setGender(dataUpdate.gender);
                setPhone(dataUpdate.phone);
                setQualification(dataUpdate.qualification);
                setPrice(dataUpdate.price);
                setImage(dataUpdate.image);
                const url = await bufferToDataURL(dataUpdate.image);
                setPreviewImage(url);
            }
        }
        fetchData();
        fectchAssignDoctor();
        fetchOptionSpecialties();
        fetchOptionClinic();

    }, [dataUpdate])

    const fectchAssignDoctor = async () => {

        let result = await getAssignDoctor(dataUpdate.id);
        console.log(result)
        if (result.ER === 0) {
            setClinic(result.data.clinicId,);
            setSpecialties(result.data.specialtiesId);
        }
        else {
            console.log(result.message);
        }
    }

    const fetchOptionSpecialties = async () => {
        let result = await getAllSpecialties();
        if (result.ER === 0) {
            let options = result.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            setOptionSpecialties(options);
        } else {
            console.log(result.message);
        }
    }

    const fetchOptionClinic = async () => {
        let result = await getAllClinic();
        if (result.ER === 0) {
            let options = result.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            setOptionClinic(options);
        } else {
            console.log(result.message);
        }
    }


    const handleSubmitUpdate = async () => {
        switch (value) {
            case "1":
                if (!name) {
                    toast.warn("Không được bỏ trống Tên")
                    return;
                }
                else if (!email) {
                    toast.warn("Không được bỏ trống Email")
                    return;
                }
                else if (!address) {
                    toast.warn("Không được bỏ trống địa chỉ")
                    return;
                }
                else if (!gender) {
                    toast.warn("Vui lòng chọn giới tính")
                    return;
                }
                else if (!phone) {
                    toast.warn("Không được bỏ trống số điện thoại")
                    return;
                }
                else if (!checkPhoneNumber(phone)) {
                    toast.warn("Số điện thoại không hợp lệ")
                    return;
                }
                else if (!qualification) {
                    toast.warn("Vui lòng chọn trình độ")
                    return;
                }
                else if (!price) {
                    toast.warn("Không được bỏ trống giá khám")
                    return;
                }

                let resultInfo = await putUpdateDoctor(dataUpdate.id, name, email, address, gender, phone, qualification, price, image);
                if (resultInfo.ER === 0) {
                    toast.success("Sửa thông tin Bác Sĩ Thành Công");
                    props.fetchListDoctor();
                    resetData();
                }
                else {
                    toast.error("Sửa thông tin Bác Sĩ Thất Bại");
                }
                break;
            case "2":
                let resultAssign = await putUpdateAssignDoctor(dataUpdate.id, clinic, specialties);
                if (resultAssign.ER === 0) {
                    toast.success("Sửa gán Bác Sĩ Thành Công");
                    props.fetchListDoctor();
                    resetData();
                }
                else {
                    toast.error("Sửa gán Bác Sĩ Thất Bại");
                }
            default:
                break;
        }
    }

    console.log(optionClinic);

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                <TabContext value={value}>
                    <Box sx={{ display: 'flex', width: "100%", gap: "20px", borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ width: "100%", display: "flex", paddingLeft: "60px" }}>
                            <Tab label="Sửa thông tin bác sĩ" value="1" sx={{ width: "50%" }} />
                            <Tab label="Sửa thông tin gán bác sĩ" value="2" sx={{ width: "50%" }} />
                        </TabList>
                    </Box>
                </TabContext>
            </DialogTitle>
            <DialogContent dividers>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <TabPanel value="1">
                            <div className="mx-10 flex flex-col gap-5">
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <select
                                        id="qualification"
                                        name="qualification"
                                        value={qualification}
                                        onChange={(e) => setQualification(e.target.value)}
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
                                        onChange={(e) => setGender(e.target.value)}
                                        className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="" disabled>Giới tính</option>
                                        <option value="nam">Nam</option>
                                        <option value="nu">Nữ</option>
                                        <option value="khac">Khác</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <input
                                        className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                        type="text"
                                        placeholder="Giá khám"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className='flex item-center text-sm' >
                                    <label className='"form-label label-upload' htmlFor='labelUpload'>
                                        <AddPhotoAlternateIcon
                                            sx={{ fontSize: "30px", color: "deepskyblue", cursor: "pointer" }}
                                        />
                                        {nameImage ? nameImage : "Thêm hình ảnh"}
                                    </label>
                                    <input
                                        type='file'
                                        id='labelUpload'
                                        hidden
                                        onChange={(event) => handleUploadImage(event)}
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
                        </TabPanel>
                        <TabPanel value="2" sx={{ paddingLeft: '70px' }}>
                            {clinic && specialties ?
                                <>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 300, marginRight: '50px' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Chuyên khoa</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={specialties}
                                            onChange={(e) => setSpecialties(e.target.value)}
                                            label="Chuyên khoa"
                                        >
                                            {optionSpecialties.length > 0 && optionSpecialties.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Phòng khám</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={clinic}
                                            onChange={(e) => setClinic(e.target.value)}
                                            label="Phòng khám"
                                        >
                                            {optionClinic.length > 0 && optionClinic.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </>
                                :
                                <></>
                            }
                        </TabPanel>
                    </TabContext>
                </Box>


            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='success'
                    onClick={() => handleSubmitUpdate()}
                >
                    Cập nhật
                </Button>
                <Button
                    variant="outlined"
                    color='inherit'
                    onClick={() => resetData()}
                >
                    Đóng
                </Button>

            </DialogActions>
        </BootstrapDialog >
    )
}

export default UpdateDoctor;