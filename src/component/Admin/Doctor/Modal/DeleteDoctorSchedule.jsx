
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from 'react';
import { toast } from 'react-toastify';
import { putUpdateDoctorSchedule } from '../../../../services/scheduleService';
import { result } from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteDoctorSchedule = (props) => {
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

    const handleDeleteDoctorSchedule = async () => {

        let reult = await putUpdateDoctorSchedule(dataDelete.id, 5,);

        if (reult.ER === 0) {
            toast.success(result.message)
            props.handleSearchDoctorSchedule();
            resetData();
        }
        else (
            toast.error(result.message)
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
                    <DialogTitle>{`Vui lòng xác nhận hủy lịch làm của bác sĩ ca ${dataDelete.timeTypeName} ?`}</DialogTitle>

                    <DialogActions

                    >
                        <Button onClick={resetData} variant='outlined' color='error'>Không</Button>
                        <Button onClick={handleDeleteDoctorSchedule} variant='outlined' color='success'>Xác nhận</Button>
                    </DialogActions>
                </Dialog>
                :
                <></>
            }

        </>
    )
}

export default DeleteDoctorSchedule;