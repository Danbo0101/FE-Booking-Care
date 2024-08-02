import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import noImage from "../../../assets/images/No_Image_Available.jpg"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const Profile = (props) => {
    const { open } = props;

    const handleClose = () => {
        props.setOpen(false);
    }

    const account = useSelector(state => state.user.account);

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
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
            <DialogContent className="lg:w-[100%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-gradient-to-r from-cyan-100 to-blue-200">

                <div className="">
                    <h1
                        className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-slate-700">
                        Profile
                    </h1>
                    <form>
                        {account.image ?
                            <div
                                className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full"
                                style={{
                                    backgroundImage: `url(${bufferToDataURL(account.image)})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                            </div>

                            :
                            <div
                                className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full"
                                style={{
                                    backgroundImage: `url(${noImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                            </div>
                        }
                        <h2 className="text-center mt-1 font-semibold dark:text-slate-700">{account.email}
                        </h2>

                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            <div className="w-full  mb-4 mt-6">
                                <label htmlFor="" className="mb-2 dark:text-slate-700">Họ và Tên</label>
                                <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-700 dark:border-gray-600 dark:bg-white"
                                    value={account.name}
                                    disabled
                                />
                            </div>
                            <div className="w-full  mb-4 lg:mt-6">
                                <label htmlFor="" className=" dark:text-slate-700">Số điện thoại</label>
                                <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-700 dark:border-gray-600 dark:bg-white"
                                    value={account.phone}
                                />
                            </div>
                        </div>

                        <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                            <div className="w-full  mb-4 mt-1">
                                <label htmlFor="" className="mb-2 dark:text-slate-700">Giới tính</label>
                                <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-700 dark:border-gray-600 dark:bg-white"
                                    value={account.gender === "male" ? "Nam" : "Nữ"}
                                    disabled
                                />
                            </div>
                            <div className="w-full  mb-4 lg:mt-1">
                                <label htmlFor="" className=" dark:text-slate-700">Địa chỉ</label>
                                <input type="text"
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-700 dark:border-gray-600 dark:bg-white"
                                    value={account.address}
                                />
                            </div>
                        </div>
                    </form>
                </div>


            </DialogContent >
        </Dialog >
    )
}

export default Profile