import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from 'react-toastify';
import { postLogout, putChangePassword, putChangeProfile } from '../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '../../../redux/action/userAction';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Setting = (props) => {
    const { open } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        props.setOpen(false);
    }
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const account = useSelector(state => state.user.account);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [nameImage, setNameImage] = useState("")
    const [previewImage, setPreviewImage] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        async function fetchData() {
            if (account) {
                setName(account.name);
                setEmail(account.email);
                setAddress(account.address);
                setGender(account.gender);
                setPhone(account.phone);
                setImage(account.image);
                const url = await bufferToDataURL(account.image);
                setPreviewImage(url);
            }
        }
        fetchData();
    }, [])

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }
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

    const handleUpdateProfile = async () => {
        if (!name) {
            toast.warn("Vui lòng nhập tên");
            return;
        }
        else if (!address) {
            toast.warn("Vui lòng nhập địa chỉ");
            return;
        }
        else if (!gender) {
            toast.warn("Vui lòng chọn giới tính");
            return;
        }
        else if (!phone) {
            toast.warn("Vui lòng nhập số điện thoại");
            return;
        }
        else if (!checkPhoneNumber(phone)) {
            toast.warn("Số điện thoại không hợp lệ");
            return;
        }
        else if (!image) {
            toast.warn("Vui lòng chọn ảnh đại diện");
            return;
        }

        let result = await putChangeProfile(account.id, name, email, address, gender, phone, image);
        if (result.ER === 0) {
            let logout = await postLogout();
            if (logout.ER === 0) {
                dispatch(doLogout());
                navigate('/login')
                toast.success("Cập nhật thông tin thành công - Vui lòng đăng nhập lại");
            }
            else {
                console.log(logout.message)
            }
        }
        else {
            toast.error("Cập nhật thông tin thất bại");
        }

    }


    const handleUpdatePassword = async () => {
        if (!oldPassword) {
            toast.warn("Vui lòng nhập mật khẩu cũ");
            return;
        }
        else if (!newPassword) {
            toast.warn("Vui lòng nhập mật khẩu mới");
            return;
        }
        else if (!confirmPassword) {
            toast.warn("Vui lòng nhập lại mật khẩu mới");
            return;
        }
        else if (newPassword !== confirmPassword) {
            toast.warn("Mật khẩu mới và xác nhận mật khẩu mới không khớp");
            return;
        }
        else if (oldPassword === newPassword) {
            toast.warn("Mật khẩu mới không thể trùng với mật khẩu cũ");
            return;
        }

        let result = await putChangePassword(account.id, oldPassword, newPassword, confirmPassword);
        if (result.ER === 0) {
            dispatch(doLogout());
            navigate('/login')
            toast.success("Đổi mật khẩu thành công - Vui lòng đăng nhập lại");
        }
        else {
            toast.error("Đổi mật khẩu thất bại");
        }

    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ m: 0, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                <TabContext value={value}>
                    <Box sx={{ display: 'flex', width: "100%", gap: "20px", borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ width: "100%", display: "flex", paddingLeft: "60px" }}>
                            <Tab label="Sửa thông tin cá nhân" value="1" sx={{ width: "50%" }} />
                            <Tab label="Đổi mật khẩu" value="2" sx={{ width: "50%" }} />
                        </TabList>
                    </Box>
                </TabContext>
            </DialogTitle>
            <DialogContent className="p-8">
                <Box sx={{ width: '100%' }}>
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
                                    disabled
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
                                    <input
                                        className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                        type="text"
                                        placeholder="Số điện thoại"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
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
                            <div className='flex items-center justify-center mt-10'>
                                <Button
                                    variant="outlined"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => handleUpdateProfile()}
                                >
                                    Đổi thông tin cá nhân
                                </Button>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="mx-10 flex flex-col gap-5">
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="password"
                                    placeholder="Mật khẩu cũ"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className='flex items-center justify-center mt-10'>
                                <Button
                                    variant="outlined"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => handleUpdatePassword()}
                                >
                                    Đổi Mật khẩu
                                </Button>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Setting