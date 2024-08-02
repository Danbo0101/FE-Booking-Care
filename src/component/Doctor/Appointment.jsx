import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { getDoctorSchedule } from '../../services/scheduleService';
import DoctorScheduleInfo from '../Admin/Doctor/Modal/DoctorScheduleInfo';


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


const Appointment = (props) => {

    const account = useSelector(state => state.user.account);

    const [dateSelected, setDateSelected] = useState(dayjs());

    const [listSchedule, setListSchedule] = useState([])

    const fetchDoctorSchedule = async () => {

        let formattedDate = dateSelected.format('YYYY-MM-DD');
        let result = await getDoctorSchedule(formattedDate, account.id);
        if (result.ER === 0) {
            setListSchedule(result.data);
            console.log(result.message);
        }
        else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        fetchDoctorSchedule();
    }, [dateSelected])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const pageCount = Math.ceil(listSchedule.length / itemsPerPage);
    const currentData = listSchedule.length > 0
        ? listSchedule.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    const handleViewDoctorSchedule = (data) => {
        setOpenView(true);
        setDataView(data);
    }

    const [openView, setOpenView] = useState(false);
    const [dataView, setDataView] = useState();

    return (
        <div className="flex flex-col w-full h-full py-10 px-16">
            <div className='flex justify-between items-center text-2xl font-semibold pb-5'>
                Lịch đặt của bác sĩ {account.name}
                <Tooltip title="Chọn thời gian">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Ngày"
                                value={dateSelected}
                                onChange={(newDateSelected) => setDateSelected(newDateSelected)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Tooltip>
            </div>
            <hr className="my-3 border-t" />
            <div className='pt-5'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>ID</StyledTableCell>
                                <StyledTableCell align="center">Ca làm</StyledTableCell>
                                <StyledTableCell align="center">Số lượng đã đặt</StyledTableCell>
                                <StyledTableCell align="center">Số lượng tối đa</StyledTableCell>
                                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData && currentData.length > 0 ?
                                currentData.map((schedule, index) => {
                                    return (
                                        <StyledTableRow
                                            key={schedule.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell component="th" scope="row" align='center'>
                                                {schedule.id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{schedule.timeTypeName}</StyledTableCell>
                                            <StyledTableCell align="center">{schedule.currentNumber}</StyledTableCell>
                                            <StyledTableCell align="center">{schedule.maxNumber}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {(() => {
                                                    switch (schedule.statusId) {
                                                        case 1:
                                                            return "Còn Lịch";
                                                        case 2:
                                                            return "Hết Lịch";
                                                        case 5:
                                                            return "Lịch bị hủy";
                                                        case 6:
                                                            return "Quá Hạn";
                                                        default:
                                                            return "Trạng thái không xác định";
                                                    }
                                                })()}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton
                                                    aria-label="info"
                                                    color='info'
                                                    onClick={() => handleViewDoctorSchedule(schedule)}
                                                >
                                                    <InfoOutlinedIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })
                                :
                                <TableRow>
                                    <TableCell colSpan={6} align='center'>Không tìm thấy lịch khám nào</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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

            </div>
            <DoctorScheduleInfo
                open={openView}
                setOpen={setOpenView}
                dataView={dataView}
                setDataView={setDataView}
            />
        </div>
    )
}

export default Appointment;