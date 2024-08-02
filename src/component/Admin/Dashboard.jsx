import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { useEffect, useState } from 'react';
import { getBookingClinic, getBookingMonthly, getBookingSpecialties } from '../../services/bookingService';
import DoctorReport from './Report/DoctorReport';
import ClinicReport from './Report/ClinicReport';
import SpecialtiesReport from './Report/SpecialtiesReport';




const xLabels = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];


const Dashboard = (props) => {

    const [bookingMonthly, setBookingMonthly] = useState([]);
    const [bookingClinic, setBookingClinic] = useState([]);
    const [bookingSpecialties, setBookingSpecialties] = useState([]);

    const [openDoctorReport, setOpenDoctorReport] = useState(false);
    const [openClinicReport, setOpenClinicReport] = useState(false);
    const [openSpecialtiesReport, setOpenSpecialtiesReport] = useState(false);

    const fetchDataBookingMonthly = async () => {
        let result = await getBookingMonthly(2024);
        if (result.ER === 0) {
            setBookingMonthly(result.data);
        } else {
            console.log(result.message);
        }
    };

    const fetchDataBookingClinic = async () => {
        let result = await getBookingClinic();
        console.log('Fetch result:', result);  // Add log here
        if (result.ER === 0) {
            setBookingClinic(result.data);
        } else {
            console.log(result.message);
        }
    };

    const fetchDataBookingSpecialties = async () => {
        let result = await getBookingSpecialties();
        if (result.ER === 0) {
            setBookingSpecialties(result.data);
        } else {
            console.log(result.message);
        }
    };

    useEffect(() => {
        fetchDataBookingMonthly();
        fetchDataBookingClinic();
        fetchDataBookingSpecialties();
    }, []);




    return (
        <div className="flex flex-col w-full h-full py-10 px-16">
            <div className='flex justify-between items-center text-2xl font-semibold pb-5'>
                DashBoard
            </div>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{ position: 'absolute', bottom: 730, right: 60 }}
                icon={<LocalPrintshopOutlinedIcon
                    sx={{ color: "black", fontSize: "30px" }}
                />}
                direction='left'
                FabProps={{ style: { backgroundColor: "transparent", boxShadow: 'none' } }}
            >
                <SpeedDialAction
                    key="Doctor"
                    icon={<MasksOutlinedIcon />}
                    tooltipTitle="Báo cáo khám bệnh của bác sĩ theo tháng"
                    onClick={() => setOpenDoctorReport(true)}
                />
                <SpeedDialAction
                    key="Clinic"
                    icon={<GiteOutlinedIcon />}
                    tooltipTitle="Báo cáo khám bệnh của phòng khám theo tháng"
                    onClick={() => setOpenClinicReport(true)}
                />
                <SpeedDialAction
                    key="Specialties"
                    icon={<VaccinesOutlinedIcon />}
                    tooltipTitle="Báo cáo khám bệnh của chuyên khoa theo tháng"
                    onClick={() => setOpenSpecialtiesReport(true)}
                />

            </SpeedDial>
            <hr className="my-3 border-t" />
            <div className='pt-5 flex flex-wrap'>

                <div className='px-14 shadow-lg'>
                    <LineChart
                        width={900}
                        height={300}

                        series={[
                            {
                                data: bookingMonthly,
                                label: 'Số lượng đặt lịch trong năm 2024',
                                color: "#4e79a7"
                            },
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                    />
                </div>

                <div className='mt-16 ml-40 flex flex-col'>
                    <PieChart
                        series={[
                            {
                                data: bookingClinic,
                            },
                        ]}
                        slotProps={{ legend: { hidden: true } }}
                        height={200}
                        width={300}
                        sx={{ marginLeft: "60px" }}
                    />
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                        Số lượng đặt lịch theo phòng khám
                    </div>
                </div>
                <div className='mt-16 ml-32 flex flex-col'>
                    <PieChart
                        series={[
                            {
                                data: bookingSpecialties,
                            },
                        ]}
                        slotProps={{ legend: { hidden: true } }}
                        height={200}
                        width={300}
                        sx={{ marginLeft: "60px" }}
                    />
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                        Số lượng đặt lịch theo chuyên khoa
                    </div>





                </div>
            </div>

            <DoctorReport
                open={openDoctorReport}
                setOpen={setOpenDoctorReport}
            />
            <ClinicReport
                open={openClinicReport}
                setOpen={setOpenClinicReport}
            />

            <SpecialtiesReport
                open={openSpecialtiesReport}
                setOpen={setOpenSpecialtiesReport}
            />

        </div>



    )
}

export default Dashboard;