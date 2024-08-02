import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { TableVirtuoso } from 'react-virtuoso';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { getAllClinic } from '../../../services/clinicService';
import { getClinicReport } from '../../../services/reportService';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ClinicReport = (props) => {
    const { open } = props;

    const handleClose = () => {
        setClinicSelected('');
        setTotalBookingOfMonth('');
        setDoctorList([])
        props.setOpen(false)
        // onClose(event, reason);
    };

    const printRef = useRef();

    const [clinicSelected, setClinicSelected] = useState('');
    const [optionClinic, setOptionClinic] = useState([]);
    const [dateSelected, setDateSelected] = useState(dayjs().add(1, 'day'));

    const [totalBookingOfMonth, setTotalBookingOfMonth] = useState('');
    const [doctorList, setDoctorList] = useState([]);

    const fetchOptionClinic = async () => {
        let result = await getAllClinic();
        if (result.ER === 0) {
            let options = result.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            setOptionClinic(options);
        } else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        fetchOptionClinic();
    }, []);

    const handleSearchClinicSchedule = async () => {

        if (!clinicSelected) {
            toast.warn("Vui lòng chọn phòng khám");
            return;
        }
        if (!dateSelected) {
            toast.warn("Vui lòng chọn ngày");
            return;
        }

        let formattedMonth = dateSelected.format('MM');
        let formattedYear = dateSelected.format('YYYY');

        let result = await getClinicReport(clinicSelected, formattedMonth, formattedYear);
        if (result.ER === 0) {

            setDoctorList(result.data.dataDoctor);
            setTotalBookingOfMonth(result.data.totalBookings);
            return;
        } else {
            toast.warn(result.message);
        }
    }



    const createData = (id, doctorName, qualificationDoctor, specialtiesName, totalBookingDoctor) => {
        return { id, doctorName, qualificationDoctor, specialtiesName, totalBookingDoctor };
    };

    const rows = doctorList.map((doctor, index) =>
        createData(index, doctor.doctorName, doctor.qualificationDoctor, doctor.specialtiesName, doctor.totalBookingDoctor)
    );

    // console.log(rows)

    const columns = [
        {
            width: 50,
            label: 'ID',
            dataKey: 'id',
        },
        {
            width: 200,
            label: 'Tên bác sĩ',
            dataKey: 'doctorName',
        },
        {
            width: 200,
            label: 'Học vị',
            dataKey: 'qualificationDoctor',
        },
        {
            width: 150,
            label: 'Chuyên khoa',
            dataKey: 'specialtiesName',
        },
        {
            width: 150,
            label: 'Tổng số lượt đặt',
            dataKey: 'totalBookingDoctor',
        },
    ];

    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
        TableRow,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };

    const fixedHeaderContent = () => {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align="center"
                        style={{ width: column.width }}
                        sx={{
                            backgroundColor: 'background.paper',
                        }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    };

    const rowContent = (_index, row) => {
        return (
            <React.Fragment>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align="center"
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    };

    const getNameById = (id) => {
        if (optionClinic.length > 0) {
            const item = optionClinic.find(obj => obj.id === id);
            return item ? item.name : '';
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
            printWindow.print();
        };
    };




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
            <DialogTitle>
                <div className='flex items-center gap-5 '>
                    <Box sx={{ minWidth: 120, width: "300px", marginTop: "auto", marginLeft: "100px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Phòng khám</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={clinicSelected}
                                label="Phòng khám"
                                onChange={(event) => setClinicSelected(event.target.value)}
                            >
                                {optionClinic.length > 0 && optionClinic.map((item, index) => {
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
                                views={['month', 'year']}
                                value={dateSelected}
                                onChange={(newDateSelected) => setDateSelected(newDateSelected)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <IconButton
                        aria-label="info"
                        color='info'
                        sx={{ marginTop: "5px", marginLeft: "20px" }}
                        onClick={() => handleSearchClinicSchedule()}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div ref={printRef}>
                    <div className='flex justify-center items-center text-center  text-2xl font-semibold p-5'>
                        Báo cáo phòng khám {getNameById(clinicSelected)}
                    </div>
                    <div className="mx-10 my-5 flex flex-col gap-10">
                        <div className='w-full flex flex-col gap-14 justify-center'>
                            <div className='flex justify-center gap-10'>
                                <div className="flex flex-col gap-2 items-center">
                                    <label htmlFor="password">Thời gian</label>
                                    <input
                                        className="w-full px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder=""
                                        value={dateSelected.format('MM-YYYY')}
                                        disabled
                                    />
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <label htmlFor="password">Tổng lượt đặt lịch</label>
                                    <input
                                        className="w-full px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder=""
                                        value={totalBookingOfMonth}
                                        disabled
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col gap-5 mt-10'>
                        <div className='flex justify-between'>
                            Thông tin lịch đặt của bác sĩ
                            <IconButton
                                onClick={handlePrint}
                            >
                                <LocalPrintshopOutlinedIcon />
                            </IconButton>
                        </div>
                        <Paper style={{ height: "300px", width: '100%' }}>
                            <TableVirtuoso
                                data={rows}
                                components={VirtuosoTableComponents}
                                fixedHeaderContent={fixedHeaderContent}
                                itemContent={rowContent}
                            />
                        </Paper>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    );
}

export default ClinicReport;