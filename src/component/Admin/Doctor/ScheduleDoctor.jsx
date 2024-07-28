import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { getAllDoctor } from '../../../services/doctorService';
import { getDoctorSchedule } from '../../../services/scheduleService';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import DeleteDoctorSchedule from './Modal/DeleteDoctorSchedule';
import UpdateDoctorSchedule from './Modal/UpdateDoctorSchedule';
import DoctorScheduleInfo from './Modal/DoctorScheduleInfo';
import CreateDoctorSchedule from './Modal/CreateDoctorSchedule';



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

const ScheduleDoctor = (props) => {


    const [doctorSelected, setDoctorSelected] = useState('');
    const [optionDoctor, setOptionDoctor] = useState({});
    const [dateSelected, setDateSelected] = useState(dayjs().add(1, 'day'));

    const [listDoctorSchedule, setListDoctorSchedule] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const pageCount = Math.ceil(listDoctorSchedule.length / itemsPerPage);
    const currentData = listDoctorSchedule.length > 0
        ? listDoctorSchedule.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    const [openCreate, setOpenCreate] = useState(false);

    const [openView, setOpenView] = useState(false);
    const [dataView, setDataView] = useState();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();

    const [openDelete, setOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState();

    const fetchOptionDoctor = async () => {
        let result = await getAllDoctor();
        if (result.ER === 0) {
            let options = result.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            setOptionDoctor(options);
        } else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        fetchOptionDoctor();
    }, []);

    const handleSearchDoctorSchedule = async () => {

        if (!doctorSelected) {
            toast.warn("Vui lòng chọn bác sĩ");
            return;
        }
        if (!dateSelected) {
            toast.warn("Vui lòng chọn ngày");
            return;
        }

        let formattedDate = dateSelected.format('YYYY-MM-DD');
        let result = await getDoctorSchedule(formattedDate, doctorSelected);
        if (result.ER === 0) {
            setListDoctorSchedule(result.data);
            return;
        } else {
            toast.warn(result.message);
        }
    }

    const handleViewDoctorSchedule = (data) => {
        setOpenView(true);
        setDataView(data);
    }

    const handleUpdateDoctor = (data) => {
        setOpenUpdate(true);
        setDataUpdate(data);
    }

    const handleDelteDoctorSchedule = (id, timeTypeName) => {
        setOpenDelete(true);
        setDataDelete({
            id,
            timeTypeName,
        });
    }


    // console.log(listDoctorSchedule);

    return (
        <div className="flex flex-col w-full h-full py-10 px-16">
            <div className='flex justify-between items-center text-2xl font-semibold pb-5'>
                Quản lý Lịch Làm Của Bác Sĩ
                <Tooltip title="Tạo mới lịch làm">
                    <IconButton
                        aria-label="info"
                        color='info'
                        sx={{ fontSize: "40px", color: "limegreen", cursor: "pointer" }}
                        onClick={() => setOpenCreate(true)}
                    >
                        <EditCalendarOutlinedIcon />
                    </IconButton>
                </Tooltip>

            </div>
            <hr className="my-3 border-t" />
            <div className='flex items-center gap-5 '>
                <Box sx={{ minWidth: 120, width: "300px", marginTop: "auto", marginLeft: "20px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Bác Sĩ</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={doctorSelected}
                            label="Bác Sĩ"
                            onChange={(event) => setDoctorSelected(event.target.value)}
                        >
                            {optionDoctor.length > 0 && optionDoctor.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Ngày"
                            value={dateSelected}
                            onChange={(newDateSelected) => setDateSelected(newDateSelected)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <IconButton
                    aria-label="info"
                    color='info'
                    sx={{ marginTop: "5px", marginLeft: "20px" }}
                    onClick={() => handleSearchDoctorSchedule()}
                >
                    <SearchIcon />
                </IconButton>
            </div>


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
                                                {(() => {
                                                    switch (schedule.statusId) {
                                                        case 1:
                                                            return (<>
                                                                <IconButton
                                                                    aria-label="info"
                                                                    color='info'
                                                                    onClick={() => handleViewDoctorSchedule(schedule)}
                                                                >
                                                                    <InfoOutlinedIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    aria-label="update"
                                                                    color='warning'
                                                                    onClick={() => handleUpdateDoctor(schedule)}
                                                                >
                                                                    <UpdateOutlinedIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    color='error'
                                                                    onClick={() => handleDelteDoctorSchedule(schedule.id, schedule.timeTypeName)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton></>)
                                                        case 2:
                                                            return (<>
                                                                <IconButton
                                                                    aria-label="info"
                                                                    color='info'
                                                                    onClick={() => handleViewDoctorSchedule(schedule)}
                                                                >
                                                                    <InfoOutlinedIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    color='error'
                                                                    onClick={() => handleDelteDoctorSchedule(schedule.id, schedule.timeTypeName)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </>);
                                                        case 5:
                                                            return (
                                                                <IconButton
                                                                    aria-label="info"
                                                                    color='info'
                                                                    onClick={() => handleViewDoctorSchedule(schedule)}
                                                                >
                                                                    <InfoOutlinedIcon />
                                                                </IconButton>
                                                            );
                                                        case 6:
                                                            return (
                                                                <IconButton
                                                                    aria-label="info"
                                                                    color='info'
                                                                    onClick={() => handleViewDoctorSchedule(schedule)}
                                                                >
                                                                    <InfoOutlinedIcon />
                                                                </IconButton>
                                                            );
                                                        default:
                                                            return "Trạng thái không xác định";
                                                    }
                                                })()}
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

                <CreateDoctorSchedule
                    open={openCreate}
                    setOpen={setOpenCreate}
                />


                <DoctorScheduleInfo
                    open={openView}
                    setOpen={setOpenView}
                    dataView={dataView}
                    setDataView={setDataView}
                />

                <UpdateDoctorSchedule
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    handleSearchDoctorSchedule={handleSearchDoctorSchedule}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />

                <DeleteDoctorSchedule
                    open={openDelete}
                    setOpen={setOpenDelete}
                    dataDelete={dataDelete}
                    setDataDelete={setDataDelete}
                    handleSearchDoctorSchedule={handleSearchDoctorSchedule}
                />

            </div>


        </div>
    )
}

export default ScheduleDoctor;