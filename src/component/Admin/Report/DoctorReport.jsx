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
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { getAllDoctor } from '../../../services/doctorService';
import { getDoctorReport } from '../../../services/reportService';
import { TableVirtuoso } from 'react-virtuoso';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DoctorReport = (props) => {
    const { open } = props;

    const handleClose = () => {
        setDoctorSelected('');
        setTotalBookingOfMonth('');
        setPatientList([]);
        props.setOpen(false)
        // onClose(event, reason);
    };

    const printRef = useRef();

    const [doctorSelected, setDoctorSelected] = useState('');
    const [optionDoctor, setOptionDoctor] = useState([]);
    const [dateSelected, setDateSelected] = useState(dayjs().add(1, 'day'));

    const [totalBookingOfMonth, setTotalBookingOfMonth] = useState('');
    const [patientList, setPatientList] = useState([]);

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

        let formattedMonth = dateSelected.format('MM');
        let formattedYear = dateSelected.format('YYYY');

        let result = await getDoctorReport(doctorSelected, formattedMonth, formattedYear);
        if (result.ER === 0) {
            setPatientList(result.data.patientList);
            setTotalBookingOfMonth(result.data.totalBookingOfMonth);
            return;
        } else {
            toast.warn(result.message);
        }
    }

    const createData = (id, patientName, patientEmail, patientPhone, date) => {
        return { id, patientName, patientEmail, patientPhone, date };
    };

    const rows = patientList.map((patient, index) =>
        createData(index, patient.patientName, patient.patientEmail, patient.patientPhone, patient.date)
    );

    const columns = [
        {
            width: 50,
            label: 'ID',
            dataKey: 'id',
        },
        {
            width: 200,
            label: 'Tên bệnh nhân',
            dataKey: 'patientName',
        },
        {
            width: 200,
            label: 'Email',
            dataKey: 'patientEmail',
        },
        {
            width: 150,
            label: 'Số điện thoại',
            dataKey: 'patientPhone',
        },
        {
            width: 150,
            label: 'Ngày đặt lịch',
            dataKey: 'date',
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
        if (optionDoctor.length > 0) {
            const item = optionDoctor.find(obj => obj.id === id);
            return item ? item.name : '';
        }
    }

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write(`
        <style>
            body { font-family: Arial, sans-serif; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .gap-10 { gap: 10px; }
            .gap-14 { gap: 14px; }
            .gap-2 { gap: 2px; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .items-center { align-items: center; }
            .text-2xl { font-size: 1.5rem; }
            .font-semibold { font-weight: 600; }
            .p-5 { padding: 1.25rem; }
            .mx-10 { margin-left: 2.5rem; margin-right: 2.5rem; }
            .my-5 { margin-top: 1.25rem; margin-bottom: 1.25rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .bg-gray-100 { background-color: #f7fafc; }
            .border { border-width: 1px; }
            .border-gray-200 { border-color: #edf2f7; }
            .placeholder-gray-500 { color: #a0aec0; }
            .text-sm { font-size: 0.875rem; }
            .focus\\:outline-none { outline: none; }
            .focus\\:border-gray-400 { border-color: #cbd5e0; }
            .focus\\:bg-white { background-color: #fff; }
            .mt-10 { margin-top: 2.5rem; }
            .w-full { width: 100%; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .text-center { text-align: center; }
            .font-medium { font-weight: 500; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
        </style>
    `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
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
                        onClick={() => handleSearchDoctorSchedule()}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div ref={printRef}>
                    <div className='flex justify-center items-center  text-2xl font-semibold p-5'>
                        Báo cáo đặt lịch của bác sĩ
                    </div>
                    <div className="mx-10 my-5 flex flex-col gap-10">
                        <div className='w-full flex gap-14 justify-center'>
                            <div className="flex flex-col gap-2 items-center">
                                <label htmlFor="username">Tên bác sĩ</label>
                                <input
                                    className="w-full px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder=""
                                    value={getNameById(doctorSelected)}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <label htmlFor="password">Thời gian</label>
                                <input
                                    className="w-2/3 px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder=""
                                    value={dateSelected.format('MM-YYYY')}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <label htmlFor="password">Tổng lượt đặt lịch</label>
                                <input
                                    className="w-2/3 px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder=""
                                    value={totalBookingOfMonth}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 mt-10'>
                        <div className='flex justify-between'>
                            Thông tin bệnh nhân đặt lịch
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

export default DoctorReport;