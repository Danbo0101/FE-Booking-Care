
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from 'react';
import { toast } from 'react-toastify';
import { deleteSpecialties } from '../../../../services/specialtiesService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteSpecialties = (props) => {
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

    const handleDeleteSpecialties = async () => {

        let reult = await deleteSpecialties(dataDelete.id);

        if (reult.ER === 0) {
            toast.success("Xóa Chuyên Khoa Thành Công")
            props.fetchListSpecialties();
            resetData();
            return;
        }
        else {
            console.log(reult.message);
            toast.error("Xóa Chuyên Khoa Thất Bại")
        }



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
                    <DialogTitle>{`Vui lòng xác nhận xóa chuyên khoa ${dataDelete.name}?`}</DialogTitle>

                    <DialogActions

                    >
                        <Button onClick={resetData} variant='outlined' color='error'>Không</Button>
                        <Button onClick={handleDeleteSpecialties} variant='outlined' color='success'>Xác nhận</Button>
                    </DialogActions>
                </Dialog>
                :
                <></>
            }

        </>
    )
}

export default DeleteSpecialties;