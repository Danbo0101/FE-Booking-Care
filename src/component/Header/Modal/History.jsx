import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { deleteCancelBooking, getBookingHistory } from '../../../services/bookingService';
import { toast } from 'react-toastify';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import IconButton from '@mui/material/IconButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const History = (props) => {
    const { open } = props;

    const printRefs = useRef([]);



    const handleClose = () => {
        props.setOpen(false);
    }

    const id = useSelector(state => state.user.account.id);

    const [listBookingHistory, setListBookingHistory] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState('date');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchHistoryBooking = async () => {
        let result = await getBookingHistory(id);
        if (result.ER === 0) {
            setListBookingHistory(result.data);
        }
        else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        fetchHistoryBooking();
    }, [open])

    const pageCount = Math.ceil(listBookingHistory.length / itemsPerPage);
    const currentData = listBookingHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (column) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
    };
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const sortedData = [...currentData].sort((a, b) => {
        const dateA = parseDate(a[sortColumn]);
        const dateB = parseDate(b[sortColumn]);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const hanldeCancelBooking = async (booking) => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn hủy lịch hẹn ngày ${booking.date} của bác sĩ ${booking.doctorName} không?`);

        if (userConfirmed) {
            try {
                let result = await deleteCancelBooking(id, booking.bookingId);
                if (result.ER === 0) {
                    handleClose()
                    toast.success('Hủy lịch hẹn thành công');
                    fetchHistoryBooking();
                } else {
                    toast.error('Hủy lịch hẹn thất bại');
                }
            } catch (error) {
                toast.error('Đã xảy ra lỗi khi hủy lịch hẹn');
            }
        } else {
        }
    }

    const formatToVND = (amount) => {

        let amountStr = amount.toString();
        let formattedAmount = '';
        while (amountStr.length > 3) {
            formattedAmount = '.' + amountStr.slice(-3) + formattedAmount;
            amountStr = amountStr.slice(0, amountStr.length - 3);
        }
        formattedAmount = amountStr + formattedAmount;
        return `${formattedAmount} VNĐ`;
    }

    const handlePrint = (printContent) => {
        const printWindow = window.open('', '_blank');

        const htmlTemplate = `
        <html>
        <head>
            <title>Print</title>
            <style>
                @media print {
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .print-container {
                        max-width: 100%;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        font-size: 24px;
                        font-weight: 800;
                        color: #1a202c;
                        text-align: center;
                        margin-bottom: 24px;
                    }
                    .mb-6 {
                        margin-bottom: 24px;
                    }
                    .font-semibold {
                        font-weight: 600;
                    }
                    .text-gray-700 {
                        color: #4a5568;
                    }
                    .text-gray-600 {
                        color: #718096;
                    }
                    .text-base {
                        font-size: 16px;
                    }
                    .text-lg {
                        font-size: 18px;
                    }
                    .block {
                        display: block;
                    }
                    .mt-1 {
                        margin-top: 8px;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin-top: 1rem;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f9f9f9;
                    }
                    .text-center {
                        text-align: center !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                ${printContent}
            </div>
        </body>
        </html>
    `;

        printWindow.document.open();
        printWindow.document.write(htmlTemplate);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };


    if (!printRefs.current.length) {
        printRefs.current = sortedData.map(() => React.createRef());
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>STT</TableCell>
                            <TableCell align="center">Ca khám bệnh</TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={sortColumn === 'date'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('date')}
                                >
                                    Ngày đặt
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Tên bác sĩ</TableCell>
                            <TableCell align="center">Chuyên khoa khám</TableCell>
                            <TableCell align="center">Tên phòng khám</TableCell>
                            <TableCell align="center">Địa chỉ phòng khám</TableCell>
                            <TableCell align="center">Trạng thái lịch hẹn</TableCell>
                            <TableCell align="center">Trạng thái lịch hẹn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((booking, index) => (
                            <TableRow
                                key={booking.bookingId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{booking.timeTypeName}</TableCell>
                                <TableCell align="center">{booking.date}</TableCell>
                                <TableCell align="center">{booking.doctorName}</TableCell>
                                <TableCell align="center">{booking.specialtiesName}</TableCell>
                                <TableCell align="center">{booking.clinicName}</TableCell>
                                <TableCell align="center">{booking.clinicAddress}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        disabled={new Date() > new Date(booking.date.split('/').reverse().join('-')) || booking.statusName === "Bị huỷ" || booking.statusName === "Đã hủy" || booking.statusName === "Đã thanh toán"}
                                        onClick={() => hanldeCancelBooking(booking)}
                                    >
                                        {booking.statusName}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={() => handlePrint(printRefs.current[index].current.innerHTML)}
                                        className="text-blue-500 hover:text-blue-700"
                                        disabled={new Date() > new Date(booking.date.split('/').reverse().join('-')) || booking.statusName === "Bị huỷ" || booking.statusName === "Đã hủy"}
                                    >
                                        <LocalPrintshopOutlinedIcon />
                                    </IconButton>
                                    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-4"
                                        ref={printRefs.current[index]}
                                        hidden
                                    >
                                        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Hoá Đơn Dịch Vụ Khám Bệnh</h2>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Ca khám bệnh:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.timeTypeName}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Ngày đặt lịch:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.date}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Tên bác sĩ:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.doctorName}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Chuyên khoa khám:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.specialtiesName}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Tên phòng khám:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.clinicName}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Địa chỉ phòng khám:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.clinicAddress}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Phí dịch vụ:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{formatToVND(booking.cosultatioFee)}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Phí đặt lịch:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.bookingFee === "Chưa thanh toán" ? "Chưa thanh toán" : formatToVND(booking.bookingFee)}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Tổng phí đã thanh toán:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{formatToVND(booking.feePaid)}</span>
                                        </div>

                                        <div className="mb-6">
                                            <label className="block font-semibold text-gray-700 text-lg">Ngày thanh toán:</label>
                                            <span className="block mt-1 text-gray-600 text-base">{booking.dateFee}</span>
                                        </div>
                                    </div>
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

                {sortedData.length > 0 ?
                    <div className=' flex items-center justify-center p-8'>
                        <Pagination
                            count={pageCount}
                            variant="outlined"
                            color="primary"
                            page={currentPage}
                            onChange={(e, value) => setCurrentPage(value)}
                        />
                    </div>
                    :
                    <div className="flex justify-center py-5 text-red-400">Không tìm thấy lịch hẹn</div>
                }

            </DialogContent>
        </Dialog >
    )
}

export default History;