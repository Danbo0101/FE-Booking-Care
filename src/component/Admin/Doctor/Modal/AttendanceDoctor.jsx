import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';
import { getAllDoctorNotMarkToday } from '../../../../services/doctorService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#C0C0C0",
        color: theme.palette.common.black,
        fontSize: 15,
        fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const AttendanceDoctor = (props) => {

    const { open } = props;

    const handleClose = () => {
        props.setOpen(false);
    };

    const [doctorList, setDoctorList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const pageCount = Math.ceil(doctorList.length / itemsPerPage);
    const currentData = doctorList.length > 0
        ? doctorList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    useEffect(() => {
        fetchListDoctorNotAttendance()
    }, [])

    const fetchListDoctorNotAttendance = async () => {
        let reuslt = await getAllDoctorNotMarkToday();
        if (reuslt.ER === 0) {
            setDoctorList(reuslt.data);
        }
        else {
            console.log(reuslt.message);
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Danh sách bác sĩ chưa điểm danh trong ngày </DialogTitle>
            <DialogContent>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>ID</StyledTableCell>
                            <StyledTableCell align="center">Tên bác sĩ</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Số điện thoại liên hệ</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData && currentData.length > 0 ?
                            currentData.map((doctor, index) => {
                                return (
                                    <StyledTableRow
                                        key={doctor.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" align='center'>
                                            {doctor.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{doctor.name}</StyledTableCell>
                                        <StyledTableCell align="center">{doctor.phone}</StyledTableCell>
                                        <StyledTableCell align="center">{doctor.phone}</StyledTableCell>

                                    </StyledTableRow>
                                )
                            })
                            :
                            <TableRow>
                                <TableCell colSpan={6} align='center'>Không có bác sĩ nào chưa điểm danh</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                {currentData && currentData.length > 0 ?
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
                    <></>
                }
            </DialogContent>
        </Dialog>
    )
}

export default AttendanceDoctor