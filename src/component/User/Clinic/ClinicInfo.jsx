import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Breadcrumb from "../../General/Breadcrumb";
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClinicInfo, getDoctorClinic } from "../../../services/clinicService";

const ClinicInfo = (props) => {

    const isBreadcumb = false;
    const { id } = useParams();
    const navigate = useNavigate();

    const [value, setValue] = useState('1');
    const [nameClinic, setNameClinic] = useState("");
    const [addressClinic, setAddressClinic] = useState("");
    const [descriptionClinic, setDescriptionClinic] = useState("");
    const [imageClinic, setImageClinic] = useState("");
    const [listDoctor, setListDoctor] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const fetchDataClinic = async () => {

        let resultInfo = await getClinicInfo(id);
        if (resultInfo.ER === 0) {
            setNameClinic(resultInfo.data.name);
            setAddressClinic(resultInfo.data.address);
            setDescriptionClinic((resultInfo.data.description).split('\r\n'));
            setImageClinic(bufferToDataURL(resultInfo.data.image));
        }
        else { console.log(resultInfo.message) };

        let resultDoctor = await getDoctorClinic(id);
        if (resultDoctor.ER === 0) {
            console.log(resultDoctor)
            setListDoctor(resultDoctor.data);
        }
        else { console.log(resultDoctor.message) };

    }

    useEffect(() => {
        fetchDataClinic();

    }, []);

    const handleNavigate = (id) => {
        navigate(`/doctor-info/${id}`)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const pageCount = Math.ceil(listDoctor.length / itemsPerPage);
    const currentData = listDoctor.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    console.log(listDoctor)

    return (
        <>
            <div className='pt-10 px-32'>
                <Breadcrumb
                    indexBreadcrumb={4}
                />
            </div>
            <div className="flex flex-col items-center">
                <div className="mt-10 w-10/12 h-48 bg-teal-50 bg-opacity-35 flex items-center px-4 sm:px-8 shadow-md">
                    <img src={imageClinic} className="w-56 h-36 mb-2" />
                    <div className="ml-4 sm:ml-8">
                        <h1 className="text-xl sm:text-2xl font-bold">{nameClinic}</h1>
                        <p className="text-sm sm:text-base">{addressClinic}</p>
                    </div>
                </div>
                <div className="bg-white shadow-md w-10/12 cursor-pointer">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="clinic info tabs" variant="fullWidth">
                                    <Tab label="Giới thiệu" value="1" sx={{ flex: 1, maxWidth: '50%' }} />
                                    <Tab label="Đặt lịch khám" value="2" sx={{ flex: 1, maxWidth: '50%' }} />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {Array.isArray(descriptionClinic) && descriptionClinic.length > 0 ? (
                                    descriptionClinic.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))
                                ) : (
                                    <li>No specialties available</li>
                                )}
                            </TabPanel>
                            <TabPanel value="2">
                                <div className="py-1 px-2">
                                    <div className="text-xl font-serif font-bold pt-10">
                                        Danh sách bác sĩ
                                    </div>
                                    {currentData && currentData.length > 0 ?
                                        currentData.map((doctor, index) => {
                                            return (
                                                <>
                                                    <div className="flex pt-10 items-center"
                                                        onClick={() => handleNavigate(doctor.id)}
                                                    >
                                                        <img src={bufferToDataURL(doctor.image)} className="w-36 h-28" />
                                                        <div className="flex flex-col ml-5 gap-1 ">
                                                            <a className="text-xl font-light">
                                                                {doctor.qualification} {doctor.name}
                                                            </a>
                                                            <a className="text-base font-extralight">{doctor.specialtiesName}</a>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </>
                                            )
                                        })
                                        :
                                        <div>Không có bác sĩ thuộc phòng khám</div>
                                    }
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
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </>

    );
};



export default ClinicInfo;
