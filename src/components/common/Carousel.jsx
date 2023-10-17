import React, { useState, useEffect } from 'react';

const Carousel = ({ children }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = React.Children.count(children);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 15000); // Change the slide every 15 seconds

        return () => clearInterval(interval);
    }, [totalSlides]);

    const handleSlideChange = (index) => {
        setActiveSlide(index);
    };

    const prevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const nextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    return (
        <div className="relative h-auto aspect-square col-span-2">
            <div className="relative overflow-hidden rounded-lg h-auto aspect-square">
                {React.Children.map(children, (child, index) => (
                    <div key={index} className={`duration-700 ease-in-out ${index === activeSlide ? '' : 'hidden'}`} data-carousel-item style={{ width: '100%', height: '100%' }}>
                        {child}
                    </div>
                ))}
            </div>

            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                {React.Children.map(children, (_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-gray-600' : 'bg-gray-300'}`}
                        aria-current={index === activeSlide}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => handleSlideChange(index)}
                    ></button>
                ))}
            </div>

            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={prevSlide}>
                {/* Previous button content */}
                &lt;
            </button>

            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={nextSlide}>
                {/* Next button content */}
                &gt;
            </button>
        </div>
    );
};

export default Carousel;
