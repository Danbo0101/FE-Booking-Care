import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
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
import { getClinicPagination } from '../../../services/clinicService';
import { useEffect, useState } from 'react';
import CreateClinic from './Modal/CreateClinic';
import Pagination from '@mui/material/Pagination';
import ClinicInfo from './Modal/ClinicInfo';
import UpdateClinic from './Modal/UpdateClinic';
import DeleteClinic from './Modal/DeleteClinic';


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

const Clinic = (props) => {

    const [listClinic, setListClinic] = useState([]);

    const [openCreate, setOpenCreate] = useState(false);

    const [openView, setOpenView] = useState(false);
    const [dataView, setDataView] = useState();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();

    const [openDelete, setOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState();

    const LIMIT = 4;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetchListClinic();
    }, [currentPage])

    const fetchListClinic = async () => {

        let data = await getClinicPagination(currentPage, LIMIT);
        if (data.ER === 0) {
            setListClinic(data);
            setPageCount(data.totalPage);
            return;
        }
        else {
            console.log(data.message)
        }

    }

    const handleViewClinic = (id, name, address, description, image) => {
        setOpenView(true);
        setDataView({
            id,
            name,
            address,
            description,
            image
        });
    }

    const handleUpdateClinic = (id, name, address, description, image) => {
        setOpenUpdate(true);
        setDataUpdate({
            id,
            name,
            address,
            description,
            image
        });
    }


    const handleDelteClinic = (id, name) => {
        setOpenDelete(true);
        setDataDelete({
            id,
            name,

        });
    }

    return (
        <div className="flex flex-col w-full h-full py-10 px-16">
            <div className='flex justify-between items-center text-2xl font-semibold pb-5'>
                Quản lý Phòng Khám
                <div onClick={() => setOpenCreate(true)}>
                    <AddBusinessOutlinedIcon sx={{ fontSize: "30px", color: "limegreen", cursor: "pointer" }} />
                </div>
            </div>
            <hr className="my-3 border-t" />
            <div className='pt-5'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>ID</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Address</StyledTableCell>
                                {/* <StyledTableCell align="center">Description</StyledTableCell> */}
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listClinic.data && listClinic.data.length > 0 &&
                                listClinic.data.map((clinic, index) => {
                                    return (
                                        <StyledTableRow
                                            key={clinic.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell component="th" scope="row" align='center'>
                                                {clinic.id}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{clinic.name}</StyledTableCell>
                                            <StyledTableCell align="center">{clinic.address}</StyledTableCell>
                                            {/* <StyledTableCell align="center">{clinic.description}</StyledTableCell> */}
                                            <StyledTableCell align="center">
                                                <IconButton aria-label="info" color='info' onClick={() => handleViewClinic(clinic.id, clinic.name, clinic.address, clinic.description, clinic.image)}>
                                                    <InfoOutlinedIcon />
                                                </IconButton>
                                                <IconButton aria-label="update" color='warning' onClick={() => handleUpdateClinic(clinic.id, clinic.name, clinic.address, clinic.description, clinic.image)}>
                                                    <UpdateOutlinedIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" color='error' onClick={() => handleDelteClinic(clinic.id, clinic.name)}>
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
            <CreateClinic
                open={openCreate}
                setOpen={setOpenCreate}
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
                fetchListClinic={fetchListClinic}
            />
            <ClinicInfo
                open={openView}
                setOpen={setOpenView}
                dataView={dataView}
                setDataView={setDataView}
            />
            <UpdateClinic
                open={openUpdate}
                setOpen={setOpenUpdate}
                fetchListClinic={fetchListClinic}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <DeleteClinic
                open={openDelete}
                setOpen={setOpenDelete}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchListClinic={fetchListClinic}
            />

        </div>
    )
}

export default Clinic;