import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-1.png"
import { useState } from "react";
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { postRegister, postSendOTP, postVerifyOTP } from "../../services/authService";
import { toast } from "react-toastify";


const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState("");
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [inputOTP, setInputOTP] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState('');
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const checkPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^\d]/g, '');
        let PhonePattern = /^(0|(\+84))9\d{8}$/;
        return PhonePattern.test(phoneNumber);
    }

    const handleSendOtp = async () => {
        let result = await postSendOTP(email, "Register");
        if (result.ER === 0) {
            setInputOTP(true);
        }
        else {
            toast.warn(result.message);
        }
    }
    console.log(inputOTP)

    const handleVerifyOTP = async () => {
        let result = await postVerifyOTP(email, OTP);
        if (result.ER === 0) {
            toast.success(result.message);
            setInputOTP(false);
            setVerifyOTP(true);
        }
        else {
            toast.warn(result.message);
        }
    }

    const handleRegister = async () => {
        if (!name) {
            toast.warn("Vui lòng nhập tên")
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
        else if (!phone) {
            toast.warn("Vui lòng nhập số điện thoại")
            return;
        }
        else if (!checkPhoneNumber(phone)) {
            toast.warn("Số điện thoại không h��p lệ")
            return;
        }
        else if (!gender) {
            toast.warn("Vui lòng chọn giới tính")
            return;
        }

        let result = await postRegister(name, email, password, address, gender, phone, image)
        if (result.ER === 0) {
            toast.success("Đăng ký thành công");
            navigate('/login');
        }
        else {
            toast.warn(result.message);
        }


    }


    return (
        <div className="min-h-screen bg-white-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-gradient-to-r from-cyan-100 to-blue-100  shadow sm:rounded-lg flex justify-center items-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex justify-center">
                        <img src={logo}
                            className="w-mx-auto cursor-pointer"
                            onClick={() => navigate('/')}

                        />
                    </div>

                    <div className="flex flex-col items-center ">
                        <div className="w-full flex-1">
                            <h1 className=" text-2xl xl:text-3xl font-extrabold text-center my-8">
                                Đăng kí
                            </h1>
                            <div className="flex items-center justify-center text-sm font-mono font-light pb-8 text-blue-500">
                                <hr className="flex-grow mx-5" /> Booking Care <hr className="flex-grow mx-5" />
                            </div>

                            <div className="mx-auto max-w-x flex flex-col gap-5">
                                {verifyOTP ?
                                    <input
                                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    />
                                    :
                                    <div className="flex gap-2">
                                        <input
                                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            sx={{
                                                fontWeight: 600,
                                                '&:hover': {
                                                    backgroundColor: 'red',
                                                    color: "white"
                                                },
                                            }}
                                            onClick={() => handleSendOtp()}
                                        >
                                            Gửi mã OTP
                                        </Button>
                                    </div>
                                }

                                {inputOTP ?
                                    <input
                                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Nhập OTP"
                                        value={OTP}
                                        onChange={(e) => setOTP(e.target.value)}
                                    />
                                    :
                                    <>
                                    </>
                                }
                                {verifyOTP ?
                                    <>
                                        <input
                                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                            type="password"
                                            placeholder="Mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="flex items-center gap-1">
                                            <input
                                                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                                type="text"
                                                placeholder="Tên"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}

                                            />
                                            <label className='"form-label label-upload' htmlFor='labelUpload'>
                                                <AddPhotoAlternateIcon
                                                    sx={{ fontSize: "30px", color: "deepskyblue", cursor: "pointer" }}
                                                />
                                            </label>
                                            <input
                                                type='file'
                                                id='labelUpload'
                                                hidden
                                                onChange={(event) => handleUploadImage(event)}
                                            />
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            {previewImage ?
                                                <img src={previewImage} className="w-2/3 h-32" />
                                                :
                                                <></>
                                            }
                                            {/* <span>Preview Image</span> */}

                                        </div>

                                        <input
                                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                            type="text"
                                            placeholder="Địa chỉ"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />

                                        <div className="flex gap-2">
                                            <input
                                                className="w-1/2 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                                type="text"
                                                placeholder="Số điện thoại"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="block custom-select px-8 py-3 w-1/2 mt-1 bg-gray-100 border border-gray-100 font-medium text-sm text-gray-500  rounded-lg shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            >
                                                <option value="" disabled>Giới tính</option>
                                                <option value="2">Nam</option>
                                                <option value="1">Nữ</option>
                                            </select>
                                        </div>
                                        <p className="mt-3 text-xs text-gray-600 text-center">
                                            I agree to abide by Booking Care <span
                                                className="text-blue-500"
                                            >
                                                Terms of Service and its  Privacy Policy
                                            </span>

                                        </p>
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-cyan-500 text-white-500 w-full py-4 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            onClick={() => handleRegister()}
                                        >
                                            <span className="ml-">
                                                Đăng ký
                                            </span>
                                        </button>
                                    </>
                                    :
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-cyan-500 text-white-500 w-full py-4 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        onClick={() => handleVerifyOTP()}
                                    >
                                        <span className="ml-">
                                            Xác nhận OTP
                                        </span>
                                    </button>
                                }


                                <div className="text-center text-lg">
                                    Bạn đã có tài khoản ?
                                    <span className="text-blue-600 cursor-pointer ml-1" onClick={() => navigate('/login')} >
                                        Đăng nhập
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Register;