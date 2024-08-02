import { useDispatch, useSelector } from "react-redux";
import bg from "../../assets/images/bg-profile.jpeg"
import { useEffect, useState } from "react";
import { postLogout, putChangeProfile } from "../../services/authService";
import { doLogout } from "../../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileAdmin = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = useSelector(state => state.user.account);
    // console.log(account)

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            console.log((event.target.files[0]))
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const checkPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^\d]/g, '');
        let PhonePattern = /^(0|(\+84))9\d{8}$/;
        return PhonePattern.test(phoneNumber);
    }

    useEffect(() => {
        const fetchData = async () => {
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
        // console.log(image);

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

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        handleUpdateProfile();
    }

    return (
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
            <div
                className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-gradient-to-r from-cyan-100 to-blue-200">

                <div className="">
                    <h1
                        className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-slate-700">
                        Profile
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div
                                className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full"
                                style={{
                                    backgroundImage: `url(${previewImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            >
                                <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                                    <input
                                        type="file"
                                        name="profile"
                                        id="upload_profile"
                                        hidden
                                        onChange={(event) => handleUploadImage(event)}
                                    />

                                    <label htmlFor="upload_profile">
                                        <svg data-slot="icon" className="w-6 h-5 text-blue-700 cursor-pointer" fill="none"
                                            strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                            </path>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                            </path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-center mt-1 font-semibold dark:text-slate-700">{email}
                        </h2>
                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            <div className="w-full  mb-4 mt-6">
                                <label htmlFor="" className="mb-2 dark:text-slate-700">Họ và Tên</label>
                                <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="Họ và Tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-full  mb-4 lg:mt-6">
                                <label htmlFor="" className=" dark:text-slate-700">Số điện thoại</label>
                                <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            <div className="w-full mb-4 lg:mt-1">
                                <h3 className="dark:text-slate-700 mb-2">Giới tính</h3>
                                <select
                                    className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option disabled value="">Chọn giới tính</option>
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                </select>
                            </div>
                            <div className="w-full mb-4 lg:mt-1">
                                <h3 className="dark:text-slate-700 mb-2">Địa chỉ</h3>
                                <input type="text"
                                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="Địa chỉ"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full rounded-lg bg-gradient-to-r from-cyan-500 text-slate-700 hover:bg-blue-500 transition-all duration-300 ease-in-out mt-4 text-white text-lg font-semibold">
                            <button
                                type="submit"
                                className="w-full p-4"
                            >
                                Đổi thông tin</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default ProfileAdmin;