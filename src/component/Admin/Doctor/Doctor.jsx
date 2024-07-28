import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
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
import { getDoctorPagination } from '../../../services/doctorService';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useEffect, useState } from 'react';
// import CreateDoctor from './Modal/CreateDoctor';
import Pagination from '@mui/material/Pagination';
import CreateDoctor from './Modal/CreateDoctor';
import DoctorInfo from './Modal/DoctorInfo';
import AssignDoctor from './Modal/AssignDoctor';
import DeleteDoctor from './Modal/DeleteDoctor';
import UpdateDoctor from './Modal/UpdateDoctor';
// import DoctorInfo from './Modal/DoctorInfo';
// import UpdateDoctor from './Modal/UpdateDoctor';
// import DeleteDoctor from './Modal/DeleteDoctor';

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

const Doctor = (props) => {

    const [listDoctor, setListDoctor] = useState([]);

    const [openCreate, setOpenCreate] = useState(false);

    const [openAssign, setOpenAssign] = useState(false);

    const [openView, setOpenView] = useState(false);
    const [dataView, setDataView] = useState();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();

    const [openDelete, setOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState();

    const LIMIT = 5;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetchListDoctor();
    }, [currentPage])

    const fetchListDoctor = async () => {

        let data = await getDoctorPagination(currentPage, LIMIT);
        if (data.ER === 0) {
            setListDoctor(data);
            setPageCount(data.totalPage);
            return;
        }
        else {
            console.log(data.message)
        }

    }

    const handleViewDoctor = (id) => {
        setOpenView(true);
        setDataView(id);
    }

    const handleUpdateDoctor = (data) => {
        setOpenUpdate(true);
        setDataUpdate(data);
    }

    const handleDelteDoctor = (id, name) => {
        setOpenDelete(true);
        setDataDelete({
            id,
            name,
        });
    }

    return (
        <div className="flex flex-col w-full h-full py-10 px-16">
            <div className='flex justify-between items-center text-2xl font-semibold pb-5'>
                Quản lý Bác Sĩ
            </div>
            <hr className="my-3 border-t" />
            <div className='pt-5'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>ID</StyledTableCell>
                                <StyledTableCell align="center">Tên</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Trình độ chuyên môn</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listDoctor.data && listDoctor.data.length > 0 &&
                                listDoctor.data.map((doctor, index) => {
                                    return (
                                        <StyledTableRow
                                            key={doctor.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell component="th" scope="row" align='center'>
                                                {doctor.id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{doctor.name}</StyledTableCell>
                                            <StyledTableCell align="center">{doctor.email}</StyledTableCell>
                                            <StyledTableCell align="center">{doctor.qualification}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton
                                                    aria-label="info"
                                                    color='info'
                                                    onClick={() => handleViewDoctor(doctor.id)}
                                                >
                                                    <InfoOutlinedIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="update"
                                                    color='warning'
                                                    onClick={() => handleUpdateDoctor(doctor)}
                                                >
                                                    <UpdateOutlinedIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    color='error'
                                                    onClick={() => handleDelteDoctor(doctor.id, doctor.name)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className=' flex items-center justify-center p-8'>
                    <Pagination
                        count={pageCount}
                        variant="outlined"
                        color="primary"
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                    />
                </div>

            </div>

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 50 }}
                icon={<SpeedDialIcon

                />}
            >
                <SpeedDialAction
                    key="add-doctor"
                    icon={<PersonAddAlt1OutlinedIcon />}
                    tooltipTitle="Thêm Bác sĩ"
                    onClick={() => setOpenCreate(true)}
                ></SpeedDialAction>
                <SpeedDialAction
                    key="assign-doctor"
                    icon={<AssignmentIndOutlinedIcon />}
                    tooltipTitle="Gán Bác sĩ "
                    onClick={() => setOpenAssign(true)}
                ></SpeedDialAction>

            </SpeedDial>

            <CreateDoctor
                open={openCreate}
                setOpen={setOpenCreate}
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
                fetchListDoctor={fetchListDoctor}
            />
            <AssignDoctor
                open={openAssign}
                setOpen={setOpenAssign}
                fetchListDoctor={fetchListDoctor}
            />
            <DoctorInfo
                open={openView}
                setOpen={setOpenView}
                id={dataView}
                setDataView={setDataView}
            />
            <UpdateDoctor
                open={openUpdate}
                setOpen={setOpenUpdate}
                fetchListDoctor={fetchListDoctor}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <DeleteDoctor
                open={openDelete}
                setOpen={setOpenDelete}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchListDoctor={fetchListDoctor}
            />

        </div>
    )
}

export default Doctor;