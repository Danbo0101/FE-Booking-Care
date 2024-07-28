import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import * as React from 'react';
import { getDoctorScheduleDetail } from '../../../../services/scheduleService';







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


    return (

        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "500" }} id="customized-dialog-title">
                Thông tin ca làm {timeTypeName}
            </DialogTitle>
            <DialogContent dividers>
                <div className="mx-10 flex flex-col gap-10">
                    <div className='w-full flex gap-32 justify-center'>
                        <div className="flex flex-col gap-2">
                            <label for="username">Số lượng người đặt lịch</label>
                            <input
                                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                placeholder="Current Number"
                                value={currentNumber}
                                disabled
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label for="password">Số lượng người đặt tối đa</label>
                            <input
                                className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text"
                                placeholder="Max Number"
                                value={maxNumber}
                                disabled
                            />
                        </div>

                    </div>
                </div>
                <div className='flex flex-col gap-5 mt-10'>
                    Thông tin bệnh nhân đặt lịch
                    <Paper style={{ height: "300px", width: '100%' }}>
                        <TableVirtuoso
                            data={rows}
                            components={VirtuosoTableComponents}
                            fixedHeaderContent={fixedHeaderContent}
                            itemContent={rowContent}
                        />
                    </Paper>
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