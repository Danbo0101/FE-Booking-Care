import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';

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
            maxWidth="sm"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent className="p-8 bg-gradient-to-r from-slate-200 via-sky-200 to-blue-300">
                <div className="text-center mb-8">
                    {account.image ?
                        <img
                            src={bufferToDataURL(account.image)}
                            alt={`${account.name}'s profile`}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-gray-300"
                        />
                        :
                        <></>
                    }

                    <h2 className="text-2xl font-bold">{account.name}</h2>
                    <p className="text-gray-500">{account.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Tên</h3>
                        <p className="text-lg font-bold">{account.name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Giới tính</h3>
                        <p className="text-lg font-bold">{account.gender}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Email</h3>
                        <p className="text-lg font-bold">{account.email}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Địa chỉ</h3>
                        <p className="text-lg font-bold">{account.address}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Số điện thoại</h3>
                        <p className="text-lg font-bold">{account.phone}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Profile