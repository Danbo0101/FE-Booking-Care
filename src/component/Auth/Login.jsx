import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-1.png"
import { useState } from "react";
import { toast } from "react-toastify";
import { postLogin } from "../../services/authService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!email) {
            toast('Vui lòng nhập email');
            return;
        }
        if (!password) {
            toast('Vui lòng nhập mật khẩu');
            return;
        }

        let result = await postLogin(email, password);
        if (result.ER === 0) {
            dispatch(doLogin(result.data));
            toast.success("Đăng nhập thành công");
            if (result.data.roleId === 1) {
                navigate('/admin');
            } else if (result.data.roleId === 3) {
                navigate('/')
            } else {
                navigate('/')
            }
        }
        else {
            toast.error(result.message);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleLogin();
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
                                Đăng nhập
                            </h1>
                            <div className="flex items-center justify-center text-sm font-mono font-light pb-8 text-blue-500">
                                <hr className="flex-grow mx-5" /> Booking Care <hr className="flex-grow mx-5" />
                            </div>
                            <div className="mx-auto max-w-x flex flex-col gap-5">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}

                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}

                                />
                                <span className="text-right text-blue-600 cursor-pointer"
                                    onClick={() => navigate('/forgot-password')}>
                                    Quên mật khẩu ?
                                </span>
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-cyan-500 text-white-500 w-full py-4 rounded-lg hover:bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={() => handleLogin()}
                                >
                                    <span className="ml-">
                                        Đăng nhập
                                    </span>
                                </button>
                                <div className="text-center text-lg">
                                    Bạn chưa có tài khoản ?
                                    <span className="text-blue-600 cursor-pointer ml-1" onClick={() => navigate('/register')} >
                                        Đăng kí
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

export default Login;