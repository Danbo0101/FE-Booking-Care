import { useEffect, useState } from "react";
import Breadcrumb from "../../General/Breadcrumb";
import Pagination from '@mui/material/Pagination';
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorSpecialties, getSpecialtiesInfo } from "../../../services/specialtiesService";



const DoctorSpecialties = (props) => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [indexBreadcrumb, setIndexBreadcrumb] = useState(3);
    const [listDoctor, setListDoctor] = useState([]);
    const [nameSpecialties, setNameSpecialties] = useState("");
    const [descriptionSpecialties, setDescriptionSpecialties] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const pageCount = Math.ceil(listDoctor.length / itemsPerPage);
    const currentData = listDoctor.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const handleNavigate = (id) => {
        navigate(`/doctor-info/${id}`)
    }

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const fetchDataSpecialties = async () => {

        let resultInfo = await getSpecialtiesInfo(id)
        if (resultInfo.ER === 0) {
            setNameSpecialties(resultInfo.data.name);
            setDescriptionSpecialties((resultInfo.data.description).split('\r\n'));
        }
        else {
            console.log(resultInfo.message);
        }

        let resultDoctor = await getDoctorSpecialties(id);
        if (resultDoctor.ER === 0) {
            setListDoctor(resultDoctor.data);
        }
        else {
            console.log(resultDoctor.message);
        }
    }


    useEffect(() => {
        fetchDataSpecialties();
    }, [])

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }


    return (
        <div className="py-10 px-32">
            <div >
                <Breadcrumb
                    indexBreadcrumb={indexBreadcrumb}
                />
            </div>
            <div className="bg-white p-8 rounded shadow-lg w-full ">
                <section>
                    <h2 className="text-2xl font-semibold mb-2">Bệnh {nameSpecialties}</h2>
                    <ul className="list-disc list-inside ml-4">
                        {Array.isArray(descriptionSpecialties) && descriptionSpecialties.length > 0 ? (
                            descriptionSpecialties.slice(0, showDetails ? descriptionSpecialties.length : 3).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))
                        ) : (
                            <li>No specialties available</li>
                        )}
                    </ul>
                    <u
                        className="px-6 py-2 text-blue-500"
                        onClick={toggleDetails}
                    >
                        {showDetails ? 'Ẩn bớt' : 'Xem thêm'}
                    </u>
                </section>
            </div>
            <div className="text-xl font-serif font-bold pt-10">
                Danh sách bác sĩ
            </div>

            {currentData && currentData.length > 0 ?
                currentData.map((doctor, index) => {
                    return (
                        <>
                            <div className="flex py-10 items-center cursor-pointer"
                                onClick={() => handleNavigate(doctor.id)}
                            >
                                <img src={bufferToDataURL(doctor.image)} className="w-32 h-28" />
                                <div className="flex flex-col ml-5 gap-1 ">
                                    <a className="text-xl font-semiblod text-sky-600">
                                        {doctor.qualification}  {doctor.name}
                                    </a>

                                </div>
                            </div>
                            <hr />
                        </>

                    )
                })
                :
                <div className="text-center text-xl">Không có bác sĩ thuộc chuyên khoa</div>
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
    )
}

export default DoctorSpecialties;