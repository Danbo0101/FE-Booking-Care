import Breadcrumb from "../../General/Breadcrumb";
import imgtest from "../../../assets/images/Untitled.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSpecialties } from "../../../services/specialtiesService";
import Pagination from '@mui/material/Pagination';

const ListSpecialties = (props) => {

    const navigate = useNavigate();


    const [indexBreadcrumb, setIndexBreadcrumb] = useState(2);
    const [listSpecialties, setListSpecialties] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const pageCount = Math.ceil(listSpecialties.length / itemsPerPage);
    const currentData = listSpecialties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



    const handleClickDoctor = (id) => {
        navigate(`/doctors-specialties/${id}`);
    };

    const fetchListSpecialties = async () => {
        let result = await getAllSpecialties();
        if (result.ER === 0) {
            setListSpecialties(result.data);
        } else console.log(result.message);
    }

    useEffect(() => {
        fetchListSpecialties();
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
                Chuyên khoa khám
            </div>
            {currentData && currentData.length > 0 &&
                currentData.map((specialties, index) => {
                    return (
                        <>
                            <div className="flex py-10 items-center cursor-pointer"
                                onClick={() => handleClickDoctor(specialties.id)}
                            >
                                <img src={bufferToDataURL(specialties.image)} className="w-36 h-28" />
                                <a className="text-xl font-medium ml-5">
                                    {specialties.name}
                                </a>
                            </div>
                            <hr />
                        </>
                    )
                })
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

export default ListSpecialties;