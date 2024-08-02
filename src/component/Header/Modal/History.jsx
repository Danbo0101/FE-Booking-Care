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
import { useEffect, useState } from 'react';
import { deleteCancelBooking, getBookingHistory } from '../../../services/bookingService';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const History = (props) => {
    const { open } = props;

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
    }, [id])

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
            // Người dùng đã huỷ hành động, không làm gì cả
        }
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
                                        disabled={new Date() > new Date(booking.date.split('/').reverse().join('-')) || booking.statusName === "Đã hủy"}
                                        onClick={() => hanldeCancelBooking(booking)}
                                    >
                                        {booking.statusName}
                                    </Button>
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