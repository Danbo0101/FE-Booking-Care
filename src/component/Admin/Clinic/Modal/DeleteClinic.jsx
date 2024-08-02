
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useEffect, useRef, useState } from 'react';
import { deleteClinic, getBookingOfClinic } from '../../../../services/clinicService';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteClinic = (props) => {

    const printRef = useRef();

    const { open, dataDelete } = props;

    const [dataClinic, setDataClinic] = useState([]);

    const handleClose = () => {

        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }

    };

    const resetData = () => {
        props.setDataDelete("");
        props.setOpen(false);
    }

    useEffect(() => {
        fetchDataClinic()
    }, [dataDelete])


    const fetchDataClinic = async () => {
        let data = await getBookingOfClinic(dataDelete.id);
        if (data.ER === 0) {
            setDataClinic(data.data);
        }
        else {
            console.log(data.message);
        }
    }


    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const printWindow = window.open('', '_blank');

        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write(`
        <style>
            @media print {
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                .flex { display: flex; }
                .flex-col { flex-direction: column; }
                .text-center { text-align: center; }
                .text-2xl { font-size: 1.5rem; }
                .font-semibold { font-weight: 600; }
                .p-5 { padding: 1.25rem; }
                .mx-10 { margin-left: 2.5rem; margin-right: 2.5rem; }
                .my-5 { margin-top: 1.25rem; margin-bottom: 1.25rem; }
                .mt-10 { margin-top: 2.5rem; }
                .w-full { width: 100%; }
                .rounded-lg { border-radius: 0.5rem; }
                .bg-gray-100 { background-color: #f7fafc; }
                .border { border-width: 1px; }
                .border-gray-200 { border-color: #edf2f7; }
                .placeholder-gray-500 { color: #a0aec0; }
                .text-sm { font-size: 0.875rem; }
                .focus\\:outline-none { outline: none; }
                .focus\\:border-gray-400 { border-color: #cbd5e0; }
                .focus\\:bg-white { background-color: #fff; }
                .px-8 { padding-left: 2rem; padding-right: 2rem; }
                .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
                .gap-2 { gap: 0.5rem; }
                .gap-5 { gap: 1.25rem; }
                .gap-10 { gap: 2.5rem; }
                .gap-14 { gap: 3.5rem; }
                .justify-center { justify-content: center; }
                .justify-between { justify-content: space-between; }
                .items-center { align-items: center; }
                table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; }
                .text-center { text-align: center !important; } /* Ensure centering in print */
            }
        </style>
    `);
        printWindow.document.write('</head><body>');
        printWindow.document.write('<div>');
        printWindow.document.write(printContent);
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.focus(); // For IE compatibility
            printWindow.print();
        };
    };

    const handleDeleteClinic = async () => {
        try {
            // Print the content
            handlePrint();

            // Delay to allow the print dialog to open
            setTimeout(async () => {
                let result = await deleteClinic(dataDelete.id);
                if (result.ER === 0) {
                    toast.success(result.message);
                    props.fetchListClinic();
                    resetData();
                } else {
                    toast.error(result.message);
                    props.fetchListClinic();
                    resetData();
                }
            }, 1000); // Adjust the delay as needed
        } catch (error) {
            // Handle any errors that occur
            toast.error('An error occurred while processing your request.');
            console.error(error);
        }
    };

    console.log(dataDelete)


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
                    <DialogContent dividers hidden>
                        <div ref={printRef}>
                            <div className='flex justify-center items-center text-center  text-2xl font-semibold p-5'>
                                Báo cáo xoá phòng khám {dataDelete.name}
                            </div>
                            <div className="mx-10 my-5 flex flex-col gap-10">
                                <div className='w-full flex flex-col gap-14 justify-center'>
                                    <div className='flex justify-center gap-10'>
                                        <div className="flex flex-col gap-2 items-center">
                                            <label htmlFor="password">Tổng lượt đặt lịch</label>
                                            <input
                                                className="w-full px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type="text"
                                                placeholder=""
                                                value={dataClinic.totalClinicBookings}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='flex flex-col gap-5 mt-10'>
                                <div className='flex justify-between'>
                                    Thông tin lịch đặt của phòng khám
                                </div>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>ID</TableCell>
                                            <TableCell align="center">Tên bệnh nhân</TableCell>
                                            <TableCell align="center">Email bệnh nhân</TableCell>
                                            <TableCell align="center">Số điện thoại bệnh nhân</TableCell>
                                            <TableCell align="center">Tên bác sĩ</TableCell>
                                            <TableCell align="center">Học vị</TableCell>
                                            <TableCell align="center">Chuyên khoa</TableCell>
                                            <TableCell align="center">Giá khám</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataClinic.bookings ?
                                            dataClinic.bookings.map((booking) => (
                                                <TableRow
                                                    key={booking.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {booking.id}
                                                    </TableCell>
                                                    <TableCell align="center">{booking.patientName}</TableCell>
                                                    <TableCell align="center">{booking.patientEmail}</TableCell>
                                                    <TableCell align="center">{booking.patientPhone}</TableCell>
                                                    <TableCell align="center">{booking.doctorName}</TableCell>
                                                    <TableCell align="center">{booking.qualification}</TableCell>
                                                    <TableCell align="center">{booking.specialtiesName}</TableCell>
                                                    <TableCell align="center">{booking.price}</TableCell>
                                                </TableRow>
                                            ))
                                            :
                                            <></>
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </DialogContent>
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