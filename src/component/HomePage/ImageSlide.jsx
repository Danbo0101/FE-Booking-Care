import { useEffect, useRef, useState } from "react";
import img1 from "../../assets/images/1.jpeg"
import img2 from "../../assets/images/2.jpeg"
import img3 from "../../assets/images/3.jpeg"

const ImageSlide = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const items = [
        img1,
        img2,
        img3,
    ];
    const transitionDuration = 700;
    const intervalDuration = 3000;
    const timeoutRef = useRef(null);
    const itemsWithClones = [...items, items[0]];

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === items.length) {
            setCurrentIndex(0);
        }
    };

    useEffect(() => {
        resetTimeout();
        const interval = setInterval(() => {
            goToNext();
        }, intervalDuration);

        return () => {
            clearInterval(interval);
            resetTimeout();
        };
    }, [currentIndex, isTransitioning]);

    return (
        <div id="default-carousel" className="relative w-full overflow-hidden" data-carousel="slide">
            <div
                className={`relative flex transition-transform duration-${transitionDuration} ease-in-out`}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transitionDuration: isTransitioning ? `${transitionDuration}ms` : '0ms'
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {itemsWithClones.map((item, index) => (
                    <div key={index} className="flex-none w-full px-20 ">
                        <img
                            src={item}
                            className="block w-full h-5/6 rounded-xl"
                            alt={`Slide ${index + 1}`}
                        />

                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {items.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === (currentIndex % items.length) ? 'bg-cyan-200' : 'bg-yellow-200'}`}
                        aria-current={index === (currentIndex % items.length)}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                        data-carousel-slide-to={index}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlide;