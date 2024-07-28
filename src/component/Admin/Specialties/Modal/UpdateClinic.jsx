import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { putUpdateSpecialties } from '../../../../services/specialtiesService';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const UpdateSpecialties = (props) => {
    const { open, dataUpdate } = props

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
        setImage("");
        setPreviewImage("");
        props.setDataUpdate("");
        props.setOpen(false);
    }

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }


    useEffect(() => {
        async function fetchData() {
            if (dataUpdate) {
                setName(dataUpdate.name);
                setDescription(dataUpdate.description);
                setImage(dataUpdate.image);
                const url = await bufferToDataURL(dataUpdate.image);
                setPreviewImage(url);
            }
        }
        fetchData();

    }, [dataUpdate])


    const handleSubmitUpdate = async () => {
        if (!name) {
            toast.warn("Tên không hợp lệ")
            return;
        }
        else if (!description) {
            toast.warn("Mô tả của chuyên khoa không hợp lệ")
            return;
        }




        let result = await putUpdateSpecialties(dataUpdate.id, name, description, image);
        if (result.ER === 0) {
            toast.success("Sửa thông tin Chuyên Khoa Thành Công");
            props.fetchListSpecialties()
            resetData();

        }
        else {
            console.log(result.message)
            toast.error("Sửa thông tin Chuyên Khoa Thất Bại")
        }
    }

    return (
        <>
            {dataUpdate ?
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                        Cập nhật thông tin chuyên khoa {dataUpdate.name}
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className="mx-10 flex flex-col gap-5">
                            <div className='flex gap-2 items-center'>
                                <input
                                    className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

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
                                    <img src={previewImage} className="w-72 h-48" />
                                    :
                                    <></>
                                }
                                {/* <span>Preview Image</span> */}

                            </div>
                            <textarea
                                className="w-full h-20 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                type="text"
                                placeholder="Mô tả"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}

                            />


                        </div>
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
                </BootstrapDialog>
                :
                <></>
            }


        </>
    )
}

export default UpdateSpecialties;