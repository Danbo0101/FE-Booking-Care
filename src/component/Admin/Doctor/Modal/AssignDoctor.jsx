import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { getAllDoctor, postAssignDoctor } from '../../../../services/doctorService';
import { getAllClinic } from '../../../../services/clinicService';
import { getAllSpecialties } from '../../../../services/specialtiesService';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AssignDoctor = (props) => {
    const { open } = props;

    const handleClose = () => {
        if (reason !== 'backdropClick') {
            onClose(event, reason);
        }
    };

    const resetData = () => {
        setOptionDoctor({});
        setOptionSpecialties({});
        setOptionClinic({});
        setDoctor("");
        setSpecialties("");
        setClinic("");
        props.setOpen(false);
    }

    const [optionDoctor, setOptionDoctor] = useState({});
    const [optionSpecialties, setOptionSpecialties] = useState({});
    const [optionClinic, setOptionClinic] = useState({});

    const [doctor, setDoctor] = useState('');
    const [specialties, setSpecialties] = useState('');
    const [clinic, setClinic] = useState('');


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

    const fetchOptionSpecialties = async () => {
        let result = await getAllSpecialties();
        if (result.ER === 0) {
            let options = result.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            setOptionSpecialties(options);
        } else {
            console.log(result.message);
        }
    }

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
        fetchOptionDoctor();
        fetchOptionSpecialties();
        fetchOptionClinic();
    }, [open])


    const handleSubmitAssign = async () => {
        if (!doctor) {
            toast.warn("Vui lòng chọn bác sĩ");
            return;
        } else if (!specialties) {
            toast.warn("Vui lòng chọn chuyên khoa");
            return;
        } else if (!clinic) {
            toast.warn("Vui lòng chọn phòng khám");
            return;
        }

        let result = await postAssignDoctor(doctor, clinic, specialties);
        if (result.ER === 0) {
            toast.success("Gán bác sĩ thành công");
            props.fetchListDoctor();
            resetData();
        }
        else {
            toast.error("Bác sĩ đã được gán")
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Gán bác sĩ</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Bác sĩ</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                            label="Bác sĩ"
                        >
                            {optionDoctor.length > 0 && optionDoctor.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Chuyên khoa</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={specialties}
                            onChange={(e) => setSpecialties(e.target.value)}
                            label="Chuyên khoa"
                        >
                            {optionSpecialties.length > 0 && optionSpecialties.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Phòng khám</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={clinic}
                            onChange={(e) => setClinic(e.target.value)}
                            label="Phòng khám"
                        >
                            {optionClinic.length > 0 && optionClinic.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='success'
                    onClick={() => handleSubmitAssign()}
                >
                    Gán
                </Button>
                <Button
                    variant="outlined"
                    color='inherit'
                    onClick={() => resetData()}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default AssignDoctor;