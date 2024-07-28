import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SpecialtiesInfo = (props) => {
    const { open, dataView } = props

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
        props.setDataView("");
        props.setOpen(false);
    }

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    useEffect(() => {
        async function fetchData() {
            if (dataView) {
                setName(dataView.name);
                setDescription(dataView.description);
                const url = await bufferToDataURL(dataView.image);
                setPreviewImage(url);
            }
        }
        fetchData();

    }, [dataView])

    return (
        <>
            {dataView ?
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                        Thông tin Chuyên Khoa {dataView.name}
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className="mx-10 flex flex-col gap-5">
                            <input
                                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                placeholder="Tên"
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                                disabled
                            />
                            <textarea
                                className="w-full h-20 px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-1"
                                type="text"
                                placeholder="Mô tả"
                                value={description}
                                // onChange={(e) => setDescription(e.target.value)}
                                disabled
                            />
                            <div className='w-full flex justify-center'>
                                {previewImage ?
                                    <img src={previewImage} className="w-72 h-48" />
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

export default SpecialtiesInfo;