import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClinicSlide = (props) => {

    const { listClinic } = props;

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const visibleSlides = 3;

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? listClinic.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === listClinic.length - visibleSlides;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const handleNavigate = (id) => {
        navigate(`/clinic-info/${id}`)
    }

    return (
        <div id="default-carousel" className="relative w-full overflow-hidden" data-carousel="slide">
            <div className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}>
                {listClinic && listClinic.map((clinic, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0 p-4">
                        <div
                            className="h-80 border rounded-lg flex flex-col justify-center items-center cursor-pointer"
                            onClick={() => handleNavigate(clinic.id)}
                        >
                            {clinic.image ?
                                <img
                                    src={bufferToDataURL(clinic.image)}
                                    className="h-48 w-auto mb-4"
                                    alt={`Slide ${index + 1}`}
                                />
                                : <></>
                            }

                            <p className="text-center">{clinic.name}</p>
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

export default ClinicSlide;
