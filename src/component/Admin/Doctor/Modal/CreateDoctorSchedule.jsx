import { useEffect, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAllDoctor } from '../../../../services/doctorService';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { getDoctorSchedule, getTimeType, postCreateDoctorSchedule } from '../../../../services/scheduleService';
import { toast } from 'react-toastify';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
}

const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const union = (a, b) => {
    return [...a, ...not(b, a)];
}

const CreateDoctorSchedule = (props) => {

    const { open } = props;

    const handleClose = () => {
        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }
        props.setOpen(false);
    };

    const resetData = () => {
        setDoctorSelected("");
        setNumberBooked("");
        setDateSelected(dayjs().add(1, 'day'));
        setMaxNumber("");
        setChecked([]);
        setLeft([]);
        setRight([]);
        props.setOpen(false);
    }

    const [doctorSelected, setDoctorSelected] = useState('');
    const [optionDoctor, setOptionDoctor] = useState({});
    const [dateSelected, setDateSelected] = useState(dayjs().add(1, 'day'));
    const [maxNumber, setMaxNumber] = useState("");
    const [numberBooked, setNumberBooked] = useState("");

    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

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
    }, [open]);


    const fetchDoctorSchedule = async () => {
        const formattedDate = dateSelected.format('YYYY-MM-DD');
        let resultDoctorSchedule = await getDoctorSchedule(formattedDate, doctorSelected);
        if (resultDoctorSchedule.ER === 0) {
            let timeTypeIds = resultDoctorSchedule.data.length > 0 ?
                resultDoctorSchedule.data.map(item => item.timeTypeId)
                :
                []
                ;
            console.log(timeTypeIds);
            let resultTimeType = await getTimeType();
            if (resultTimeType.ER === 0) {
                const filteredTimetype = resultTimeType.data.filter(item => !timeTypeIds.includes(item.id));
                let options = filteredTimetype.map(item => ({
                    id: item.id,
                    name: item.name,
                }));
                setLeft(options)
            }
        }
        else {
            console.log(resultDoctorSchedule.message);
        }

    }

    useEffect(() => {
        fetchDoctorSchedule();
    }, [dateSelected, doctorSelected])


    const leftChecked = intersection(checked, left.map(item => item.id));
    const rightChecked = intersection(checked, right.map(item => item.id));

    const handleToggle = (id) => () => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items.map(item => item.id)).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items.map(item => item.id)));
        } else {
            setChecked(union(checked, items.map(item => item.id)));
        }
    };

    const handleCheckedRight = () => {
        const movedItems = left.filter(item => leftChecked.includes(item.id));
        setRight(right.concat(movedItems));
        setLeft(not(left, movedItems));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        const movedItems = right.filter(item => rightChecked.includes(item.id));
        setLeft(left.concat(movedItems));
        setRight(not(right, movedItems));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} ca làm đã chọn`}
            />
            <Divider />
            <List
                sx={{
                    width: 300,
                    height: 200,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((item) => {
                    const labelId = `transfer-list-all-item-${item.id}-label`;

                    return (
                        <ListItemButton
                            key={item.id}
                            role="listitem"
                            onClick={handleToggle(item.id)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(item.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    const handleCreateDoctorSchedule = async () => {
        if (!doctorSelected) {
            toast.warn("Vui lòng chọn bác sĩ");
            return;
        }
        if (!dateSelected) {
            toast.warn("Vui lòng chọn ngày");
            return;
        }
        if (!maxNumber) {
            toast.warn("Vui lòng nhập số lượng bệnh nhân");
            return;
        }

        const formattedDate = dateSelected.format('YYYY-MM-DD');

        // Log the inputs to check if they are correct
        console.log("Doctor Selected:", doctorSelected);
        console.log("Formatted Date:", formattedDate);
        console.log("Max Number:", maxNumber);
        console.log("Right Array:", right);

        try {
            const results = await Promise.allSettled(
                right.map(item => {
                    return postCreateDoctorSchedule(+doctorSelected, item.id, formattedDate, maxNumber, numberBooked);
                })
            );

            let successCount = 0;

            results.forEach(result => {
                if (result.status === "fulfilled") {
                    if (result.value.ER === 0) {
                        successCount++;
                        console.log("API call successful for item:", result.value);
                    } else {
                        toast.warn(result.value.message);
                        console.log("API call returned an error for item:", result.value);
                    }
                } else {
                    toast.error("Có lỗi xảy ra khi tạo lịch trình bác sĩ.");
                    console.log("API call failed for item:", result.reason);
                }
            });

            if (successCount = right.length) {
                toast.success("Thêm lịch khám thành công");
                resetData();
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo lịch trình bác sĩ.");
            console.error("Error in handleCreateDoctorSchedule:", error);
        }
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
                Tạo mới lịch làm
            </DialogTitle>
            <DialogContent dividers>
                <div className='flex  mb-1 gap-2'>
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
                    <input
                        className="w-1/3 px-8 h-14 mt-auto rounded-lg font-mediu border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Số lượng bệnh nhân tối đa"
                        value={maxNumber}
                        onChange={(e) => setMaxNumber(e.target.value)}
                    />

                </div>
                <div className='flex items-center justify-center py-10'>
                    <input
                        className="w-1/2 px-8 h-14 mt-auto rounded-lg font-mediu border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Số lượng bệnh nhân đặt lịch trước"
                        value={numberBooked}
                        onChange={(e) => setNumberBooked(e.target.value)}
                    />
                </div>

                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>{customList('Chọn ca làm', left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList('Ca làm đã chọn', right)}</Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => resetData()}>Huỷ</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleCreateDoctorSchedule();
                    }}
                >
                    Tạo lịch mới
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}

export default CreateDoctorSchedule;