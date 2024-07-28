import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from 'react';
import { postCreateNewClinic } from '../../../../services/clinicService';
import { toast } from 'react-toastify';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CreateClinic = (props) => {
    const { open, pageCount } = props

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const resetData = () => {
        setName("");
        setDescription("");
        setAddress("");
        setImage("");
        setPreviewImage("");
        props.setOpen(false);
    }

    const handleSubmitCreate = async () => {
        if (!name) {
            toast.warn("Vui lòng nhập Tên")
            return;
        }
        else if (!description) {
            toast.warn("Vui lòng nhập mô tả cảu phòng khám")
            return;
        }
        else if (!address) {
            toast.warn("Vui lòng nhập địa chỉ")
            return;
        }
        console.log(name);
        console.log(description);
        console.log(address);
        let result = await postCreateNewClinic(name, description, address, image);

        if (result.ER === 0) {
            toast.success("Thêm Phòng Khám Thành Công");
            props.fetchListClinic();
            props.setCurrentPage(pageCount);
            resetData();

        }
        else {
            toast.error("Thêm Phòng Khám Thất Bại")
        }
    }


    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                Tạo mới Phòng khám
            </DialogTitle>
            <DialogContent dividers>
                <div className="mx-10 flex flex-col gap-5">
                    <input
                        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        className="w-full h-20 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                        type="text"
                        placeholder="Mô tả"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className='flex gap-2 items-center'>
                        <input
                            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                            type="text"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label className='"form-label label-upload' htmlFor='labelUpload'>
                            <AddPhotoAlternateIcon
                                sx={{ fontSize: "30px", color: "deepskyblue", cursor: "pointer" }}
                            />
                        </label>
                        <input
                            type='file'
                            id='labelUpload'
                            hidden
                            onChange={(event) => handleUploadImage(event)}
                        />
                    </div>
                    <div className='w-full flex justify-center'>
                        {previewImage ?
                            <img src={previewImage} className="w-60 h-48" />
                            :
                            <></>
                        }
                        {/* <span>Preview Image</span> */}

                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='success'
                    onClick={() => handleSubmitCreate()}
                >
                    Tạo mới
                </Button>
                <Button
                    variant="outlined"
                    color='inherit'
                    onClick={() => resetData()}
                >
                    Đóng
                </Button>

            </DialogActions>
        </BootstrapDialog>
    )
}

export default CreateClinic;