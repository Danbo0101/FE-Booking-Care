import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { putUpdateDoctorSchedule } from '../../../../services/scheduleService';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const UpdateDoctorSchedule = (props) => {
    const { open, dataUpdate } = props

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const [maxNumber, setMaxNumber] = useState("");
    const [timeType, setTimeType] = useState("");

    const resetData = () => {
        setMaxNumber("");
        props.setOpen(false);
    }


    useEffect(() => {
        async function fetchData() {
            if (dataUpdate) {
                setTimeType(dataUpdate.timeTypeName)
                setMaxNumber(dataUpdate.maxNumber);
            }
        }
        fetchData();
    }, [dataUpdate])




    const handleSubmitUpdate = async () => {
        if (!maxNumber) {
            toast.warn("Vui lòng nhập Số lượng bệnh nhân tối đa")
            return;
        }

        let reult = await putUpdateDoctorSchedule(dataUpdate.id, "", maxNumber);
        if (reult.ER === 0) {
            toast.success("Cập nhật Thành Công")
            props.handleSearchDoctorSchedule();
            resetData();
        }
        else {
            toast.error("Cập nhật Thất Bại")
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                Cập nhật số lượng bệnh nhân  tối đa của ca {timeType}
            </DialogTitle>
            <DialogContent dividers>

                <input
                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                    type="text"
                    placeholder="Phone"
                    value={maxNumber}
                    onChange={(e) => setMaxNumber(e.target.value)}
                />

            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='success'
                    onClick={() => handleSubmitUpdate()}
                >
                    Cập nhật
                </Button>
                <Button
                    variant="outlined"
                    color='inherit'
                    onClick={() => resetData()}
                >
                    Đóng
                </Button>

            </DialogActions>
        </BootstrapDialog >
    )
}

export default UpdateDoctorSchedule;