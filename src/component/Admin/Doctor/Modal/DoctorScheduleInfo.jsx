import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { TableVirtuoso } from 'react-virtuoso';
import * as React from 'react';
import { getDoctorScheduleDetail } from '../../../../services/scheduleService';
import { IconButton } from '@mui/material';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DoctorScheduleInfo = (props) => {
    const { open, dataView, onClose } = props;

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }
    };

    const [timeTypeName, setTimeTypeName] = useState("");
    const [currentNumber, setCurrentNumber] = useState("");
    const [maxNumber, setMaxNumber] = useState("");
    const [date, setDate] = useState("");
    const [patientList, setPatientList] = useState([]);

    const resetData = () => {
        setTimeTypeName("");
        setCurrentNumber("");
        setMaxNumber("");
        setDate("");
        setPatientList([]);
        props.setDataView("");
        props.setOpen(false);
    };

    const fetchDoctorScheduleInfoDetail = async () => {
        let result = await getDoctorScheduleDetail(dataView.id);
        if (result.ER === 0) {
            setDate(result.data.date);
            setPatientList(result.data.patientList);
        } else {
            console.log(result.message);
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (dataView) {
                setTimeTypeName(dataView.timeTypeName);
                setCurrentNumber(dataView.currentNumber);
                setMaxNumber(dataView.maxNumber);
            }
        }
        fetchData();
        fetchDoctorScheduleInfoDetail();
    }, [dataView]);

    const createData = (id, patientName, patientEmail, patientPhone) => {
        return { id, patientName, patientEmail, patientPhone };
    };

    const rows = patientList.map((patient, index) =>
        createData(index, patient.patientName, patient.patientEmail, patient.patientPhone)
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

    const printRef = useRef();

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write(`
        <style>
            body { font-family: Arial, sans-serif; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .gap-2 { gap: 0.5rem; }
            .gap-5 { gap: 1.25rem; }
            .gap-10 { gap: 2.5rem; }
            .gap-32 { gap: 8rem; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .items-center { align-items: center; }
            .text-2xl { font-size: 1.5rem; }
            .font-semibold { font-weight: 600; }
            .p-5 { padding: 1.25rem; }
            .mx-10 { margin-left: 2.5rem; margin-right: 2.5rem; }
            .mt-5 { margin-top: 1.25rem; }
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

        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >

            <DialogContent dividers>
                <div ref={printRef}>
                    <div className='flex justify-center items-center  text-2xl font-semibold p-5'>
                        Thông tin ca làm {timeTypeName}
                    </div>
                    <div className="mx-10 mt-5 flex flex-col gap-10">
                        <div className='w-full flex gap-32 justify-center'>
                            <div className="flex flex-col gap-2 items-center">
                                <label htmlFor="username">Số lượng người đặt lịch</label>
                                <input
                                    className="w-full px-8 text-center py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Current Number"
                                    value={currentNumber}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <label htmlFor="password">Số lượng người đặt tối đa</label>
                                <input
                                    className="w-full px-8 py-3 text-center rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Max Number"
                                    value={maxNumber}
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
                    {/* <button onClick={handlePrint} className="mt-5 px-4 py-2 bg-blue-500 text-white rounded">Print</button> */}
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='inherit'
                    onClick={() => resetData()}
                >
                    Đóng
                </Button>

            </DialogActions>
        </BootstrapDialog>

    )
}

export default DoctorScheduleInfo;