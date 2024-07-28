import ClinicSlide from "./ClinicSlide";
import DoctorSlide from "./DoctorSlide";
import ImageSlide from "./ImageSlide";
import Specialties from "./Specialties";
import img4 from "../../assets/images/4.jpeg";
import { useEffect, useState } from "react";
import { getSpecialtiesPagination } from '../../services/specialtiesService';
import { getAllDoctor } from '../../services/doctorService';
import { getAllClinic } from "../../services/clinicService";

const HomePage = (props) => {

    const [listSpecialties, setListSpecialties] = useState([]);
    const [listDoctor, setListDoctor] = useState([]);
    const [listClinic, setListClinic] = useState([]);


    const fetchListSpecialties = async () => {
        let result = await getSpecialtiesPagination(1, 8);
        if (result.ER === 0) {
            setListSpecialties(result.data);
        } else console.log(result.message);
    }

    const fetchListDoctor = async () => {
        let result = await getAllDoctor();
        if (result.ER === 0) {
            setListDoctor(result.data);
        }
        else { console.log(result.message) }
    }

    const fetchListClinic = async () => {
        let result = await getAllClinic();
        if (result.ER === 0) {
            setListClinic(result.data);
        }
    }

    useEffect(() => {
        fetchListSpecialties();
        fetchListDoctor();
        fetchListClinic();
    }, [])


    return (
        <div>
            <div className="flex flex-row px-60 py-16 bg-sky-200 justify-center items-center">
                <h2 className=" fix_text text-xl font-extrabold  sm:text-5xl">Hỗ trợ bạn đặt lịch mọi lúc ?</h2>

                <ImageSlide />
            </div>
            <div className="flex flex-wrap w-full ps-44 py-16 bg-transparent">
                <div className="flex text-3xl font-serif font-bold leading-6 p-3 justify-between items-center w-10/12 text-zinc-500">
                    Chuyên Khoa
                    <a href="/specialties" className=" blue-gradient_text text-xl font-semibold leading-6 p-3 ">
                        Xem Thêm
                    </a>
                </div>
                <Specialties
                    listSpecialties={listSpecialties}
                />
            </div>
            <div className="px-44 pb-16">
                <div className="flex text-3xl font-serif font-bold leading-6 p-3 justify-between items-center w-full text-zinc-500">
                    Phòng khám
                    <a href="/clinics" className=" blue-gradient_text text-xl font-semibold leading-6 p-3  ">
                        Xem Thêm
                    </a>
                </div>
                <ClinicSlide
                    listClinic={listClinic}
                />
            </div>
            <div className="px-44 py-16 bg-opacity-100" style={{
                backgroundImage: `url(${img4})`
            }}>
                <div className="flex text-3xl font-serif font-bold leading-6 p-3 justify-between items-center w-full text-zinc-500">
                    Bác sĩ nổi bật
                    <a href="/doctors" className=" blue-gradient_text text-xl font-semibold leading-6 p-3  ">
                        Xem Thêm
                    </a>
                </div>
                <DoctorSlide
                    listDoctor={listDoctor}
                />
            </div>
            <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24 text-center">

                <h2 className="text-xl font-extrabold fix_text sm:text-5xl">Bạn đang cần hỗ trợ ?</h2>

                <p className="mx-auto mt-4 max-w-sm text-gray-500">
                    Chúng tôi luôn ở đây để lắng nghe bạn bất cứ lúc nào
                </p>

                <a
                    href="#"
                    className="mt-8 inline-block rounded-full border border-sky-600 px-12 py-3 text-sm font-medium text-sky-600 hover:bg-sky-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                >
                    Liên hệ ngay
                </a>
            </div>
        </div>
    )
}

export default HomePage;
