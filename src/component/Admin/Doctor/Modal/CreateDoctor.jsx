import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postCreateNewDoctor } from '../../../../services/doctorService';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CreateDoctor = (props) => {
    const { open, pageCount } = props

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [qualification, setQualification] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [nameImage, setNameImage] = useState("")
    const [previewImage, setPreviewImage] = useState("");


    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setNameImage(event.target.files[0].name);
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const checkPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^\d]/g, '');
        let PhonePattern = /^(0|(\+84))9\d{8}$/;
        return PhonePattern.test(phoneNumber);
    }

    const resetData = () => {
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setGender("");
        setPhone("");
        setQualification("");
        setPrice("");
        setImage("");
        setNameImage("");
        setPreviewImage("");
        props.setOpen(false);
    }

    const handleSubmitCreate = async () => {
        if (!name) {
            toast.warn("Vui lòng nhập Tên")
            return;
        }
        else if (!email) {
            toast.warn("Vui lòng nhập Email")
            return;
        }
        else if (!password) {
            toast.warn("Vui lòng nhập mật khẩu")
            return;
        }
        else if (!address) {
            toast.warn("Vui lòng nhập địa chỉ")
            return;
        }
        else if (!gender) {
            toast.warn("Vui lòng chọn giới tính")
            return;
        }
        else if (!phone) {
            toast.warn("Vui lòng nhập số điện thoại")
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
            toast.warn("Vui lòng nhập giá khám")
            return;
        }
        else if (!image) {
            toast.warn("Vui lòng upload ảnh")
            return;
        }

        let result = await postCreateNewDoctor(name, email, password, address, gender, phone, qualification, price, image);
        if (result.ER === 0) {
            toast.success("Thêm Bác Sĩ Thành Công");
            props.fetchListDoctor();
            props.setCurrentPage(pageCount);
            resetData();

        }
        else {
            toast.error(result.message)
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                Tạo mới Bác sĩ
            </DialogTitle>
            <DialogContent dividers>
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
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            <option value="Bác sĩ">Bác sĩ</option>
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
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='success'
                    onClick={() => handleSubmitCreate()}
                >
                    Tạo mới
                </Button>
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

export default CreateDoctor;