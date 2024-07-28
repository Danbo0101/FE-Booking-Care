
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from 'react';
import { deleteClinic } from '../../../../services/clinicService';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteClinic = (props) => {
    const { open, dataDelete } = props

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const resetData = () => {
        props.setDataDelete("");
        props.setOpen(false);
    }

    const handleDeleteClinic = async () => {

        let reult = await deleteClinic(dataDelete.id);

        if (reult.ER === 0) {
            toast.success("Xóa Phòng Khám Thành Công")
            props.fetchListClinic();
            resetData();
        }
        else (
            toast.error("Xóa Phòng Khám Thất Bại")
        )

    }

    return (
        <>
            {dataDelete ?
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{`Vui lòng xác nhận xóa phòng khám số ${dataDelete.id} với tên ${dataDelete.name}?`}</DialogTitle>

                    <DialogActions

                    >
                        <Button onClick={resetData} variant='outlined' color='error'>Không</Button>
                        <Button onClick={handleDeleteClinic} variant='outlined' color='success'>Xác nhận</Button>
                    </DialogActions>
                </Dialog>
                :
                <></>
            }

        </>
    )
}

export default DeleteClinic;