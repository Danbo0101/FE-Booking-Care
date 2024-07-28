import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
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
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { getSpecialtiesPagination } from '../../../services/specialtiesService';
import CreateSpecialties from './Modal/CreateSpecialties';
import SpecialtiesInfo from './Modal/SpecialtiesInfo';
import UpdateSpecialties from './Modal/UpdateClinic';
import DeleteSpecialties from './Modal/DeleteSpecialties';


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

const Specialties = (props) => {

    const [listSpecialties, setListSpecialties] = useState([]);

    const [openCreate, setOpenCreate] = useState(false);

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
        fetchListSpecialties();
    }, [currentPage])

    const fetchListSpecialties = async () => {

        let data = await getSpecialtiesPagination(currentPage, LIMIT);
        if (data.ER === 0) {
            setListSpecialties(data);
            setPageCount(data.totalPage);
            return;
        }
        else {
            console.log(data.message)
        }

    }

    const handleViewSpecialties = (id, name, description, image) => {
        setOpenView(true);
        setDataView({
            id,
            name,
            description,
            image
        });
    }

    const handleUpdateSpecialties = (id, name, description, image) => {
        setOpenUpdate(true);
        setDataUpdate({
            id,
            name,
            description,
            image
        });
    }

    const handleDelteSpecialties = (id, name) => {
        setOpenDelete(true);
        setDataDelete({
            id,
            name,

        });
    }

    return (
        <div className="flex flex-col w-full h-full py-10 px-16">
            <div className='flex justify-between items-center text-2xl font-semibold pb-5'>
                Quản lý Chuyên Khoa
                <div onClick={() => setOpenCreate(true)}>
                    <HealthAndSafetyOutlinedIcon sx={{ fontSize: "30px", color: "limegreen", cursor: "pointer" }} />
                </div>
            </div>
            <hr className="my-3 border-t" />
            {
                listSpecialties
                    ?
                    <div className='pt-5'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ID</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listSpecialties.data && listSpecialties.data.length > 0 &&
                                        listSpecialties.data.map((specialties, index) => {
                                            return (
                                                <StyledTableRow
                                                    key={specialties.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <StyledTableCell component="th" scope="row" align='center'>
                                                        {specialties.id}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{specialties.name}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton aria-label="info" color='info'
                                                            onClick={() => handleViewSpecialties(specialties.id, specialties.name, specialties.description, specialties.image)}
                                                        >
                                                            <InfoOutlinedIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="update" color='warning'
                                                            onClick={() => handleUpdateSpecialties(specialties.id, specialties.name, specialties.description, specialties.image)}
                                                        >
                                                            <UpdateOutlinedIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" color='error'
                                                            onClick={() => handleDelteSpecialties(specialties.id, specialties.name)}
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
                    :
                    <>
                    </>

            }

            <CreateSpecialties
                open={openCreate}
                setOpen={setOpenCreate}
                fetchListSpecialties={fetchListSpecialties}
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
            />
            <SpecialtiesInfo
                open={openView}
                setOpen={setOpenView}
                dataView={dataView}
                setDataView={setDataView}
            />
            <UpdateSpecialties
                open={openUpdate}
                setOpen={setOpenUpdate}
                fetchListSpecialties={fetchListSpecialties}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <DeleteSpecialties
                open={openDelete}
                setOpen={setOpenDelete}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchListSpecialties={fetchListSpecialties}
            />

        </div>
    )
}

export default Specialties;