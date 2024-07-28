import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-1.png"
import { useState } from "react";
import Button from '@mui/material/Button';
import { postForgotPassword, postRegister, postSendOTP, postVerifyOTP } from "../../services/authService";
import { toast } from "react-toastify";


const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState("");
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [inputOTP, setInputOTP] = useState(false);
    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendOtp = async () => {
        if (!email) {
            toast.warn("Vui lòng nhập Email")
            return;
        }
        let result = await postSendOTP(email, "Forgot");
        if (result.ER === 0) {
            setInputOTP(true);
        }
        else {
            toast.warn(result.message);
        }
    }

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

    const handleForgot = async () => {
        if (!newpassword) {
            toast.warn("Vui lòng nhập mật khẩu mới")
            return;
        }
        else if (!confirmPassword) {
            toast.warn("Vui lòng nhập lại mật khẩu mới")
            return;
        }
        else if (newpassword !== confirmPassword) {
            toast.warn("Mật khẩu mới và xác nhận mật khẩu mới không khớp");
            return;
        }

        let result = await postForgotPassword(email, newpassword, confirmPassword);
        if (result.ER === 0) {
            toast.success("Đổi mật khẩu thành công");
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
                                Quên Mật Khẩu
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
                                            placeholder="Mật khẩu mới"
                                            value={newpassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <input
                                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                            type="password"
                                            placeholder="Xác nhận mật khẩu"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-cyan-500 text-white-500 w-full py-4 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            onClick={() => handleForgot()}
                                        >
                                            <span className="ml-">
                                                Đổi mật khẩu mới
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

export default ForgotPassword;