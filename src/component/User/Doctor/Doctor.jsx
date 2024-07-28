import { useEffect, useState } from "react";
import Breadcrumb from "../../General/Breadcrumb";
import imgtest from "../../../assets/images/Untitled.png"
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { getAllDoctor } from "../../../services/doctorService";




const ListDoctor = (props) => {

    const navigate = useNavigate();

    const [indexBreadcrumb, setIndexBreadcrumb] = useState(1);
    const [listDoctor, setListDoctor] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const pageCount = Math.ceil(listDoctor.length / itemsPerPage);
    const currentData = listDoctor.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const handleDoctorInfo = (id) => {
        navigate(`/doctor-info/${id}`);
    }

    useEffect(() => {
        const fetchDataDoctor = async () => {
            let result = await getAllDoctor();
            if (result.ER === 0) {
                setListDoctor(result.data);
            }
        };

        fetchDataDoctor();
    }, []);

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
            <div className="text-xl font-serif font-bold pt-10">
                Danh sách bác sĩ
            </div>
            {
                currentData && currentData.length > 0 ?
                    currentData.map((doctor, index) => {
                        return (
                            <>
                                <div className="flex pt-10 items-center cursor-pointer"
                                    onClick={() => handleDoctorInfo(doctor.id)}
                                >
                                    <img src={bufferToDataURL(doctor.image)} className="w-36 h-28" />
                                    <div className="flex flex-col ml-5 gap-1 ">
                                        <a className="text-xl font-normal">
                                            {doctor.qualification} {doctor.name}
                                        </a>
                                        <a className="text-base font-extralight">{doctor.specialty}</a>
                                    </div>
                                </div>
                                <hr />
                            </>
                        )
                    })
                    :
                    <div className="text-center text-xl">Không có bác sĩ</div>
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

export default ListDoctor;