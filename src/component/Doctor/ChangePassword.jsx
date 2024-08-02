import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { putChangePassword } from "../../services/authService";

const ChangePassword = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const account = useSelector(state => state.user.account);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            toast.error(result.message);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdatePassword();
    }

    return (
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
            <div
                className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-gradient-to-r from-cyan-100 to-blue-200">

                <div className="">
                    <h1
                        className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-slate-700">
                        Thay đổi mật khẩu
                    </h1>
                    <form>
                        <div className="w-full px-32  mb-4 lg:mt-6">
                            <label htmlFor="" className=" dark:text-slate-700">Mật khẩu cũ</label>
                            <input type="password"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-900 dark:border-gray-600 dark:bg-gray-100"
                                placeholder="Mật khẩu cũ"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-full px-32  mb-4 lg:mt-6">
                            <label htmlFor="" className=" dark:text-slate-700">Mật khẩu mới</label>
                            <input type="password"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-900 dark:border-gray-600 dark:bg-gray-100"
                                placeholder="Mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-full px-32  mb-4 lg:mt-6">
                            <label htmlFor="" className=" dark:text-slate-700">Xác nhận mật khẩu</label>
                            <input type="password"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-900 dark:border-gray-600 dark:bg-gray-100"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-full px-32 mb-4 lg:mt-6 ">
                            <button
                                type="submit"
                                className="w-full p-4 rounded-lg bg-gradient-to-r from-cyan-500 text-slate-700 hover:bg-blue-500 transition-all duration-300 ease-in-out mt-4 text-white text-lg font-semibold"
                                onClick={(e) => handleSubmit(e)}
                            >Đổi thông tin</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >

    )
}

export default ChangePassword;