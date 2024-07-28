import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorSlide = (props) => {

    const { listDoctor } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    const visibleSlides = 4;

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? listDoctor.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === listDoctor.length - visibleSlides;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const handleNavigate = (id) => {
        navigate(`/doctor-info/${id}`)
    }



    return (
        <div id="default-carousel" className="relative w-full overflow-hidden " data-carousel="slide" >
            <div className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}>
                {listDoctor && listDoctor.map((doctor, index) => (
                    <div key={index} className="w-1/4 flex-shrink-0 p-4 flex flex-col items-center">
                        <div
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => handleNavigate(doctor.id)}
                        >
                            <div className="w-40 h-40 mb-4">
                                <img
                                    src={bufferToDataURL(doctor.image)}
                                    className="rounded-full h-full w-full object-cover"
                                    alt={doctor.name}
                                />
                            </div>
                            <p className="text-center font-semibold">{doctor.name}</p>
                            <p className="text-center text-gray-500">{doctor.specialty}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="absolute top-1/2 left-0 z-30 transform -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-white rounded-full cursor-pointer shadow-md"
                onClick={goToPrevious}
                data-carousel-prev
            >
                <svg
                    className="w-6 h-6 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                <span className="sr-only">Previous</span>
            </button>
            <button
                type="button"
                className="absolute top-1/2 right-0 z-30 transform -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-white rounded-full cursor-pointer shadow-md"
                onClick={goToNext}
                data-carousel-next
            >
                <svg
                    className="w-6 h-6 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
                <span className="sr-only">Next</span>
            </button>
        </div>
    );
};

export default DoctorSlide;
