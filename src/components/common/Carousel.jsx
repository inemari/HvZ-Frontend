import React, { useState } from 'react';

const Carousel = ({ children }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = React.Children.count(children);

    const handleSlideChange = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const nextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    return (
        <div className="relative aspect-square">
            <div className="relative overflow-hidden rounded-lg aspect-square ">
                {React.Children.map(children, (child, index) => (
                    <div key={index} className={`duration-700 ease-in-out ${index === activeSlide ? '' : 'hidden'}`} data-carousel-item style={{ width: '100%', height: '100%' }}>
                        {child}
                    </div>
                ))}
            </div>

            <div className="absolute flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
                {React.Children.map(children, (_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-gray-600' : 'bg-gray-300'}`}
                        aria-current={index === activeSlide}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => handleSlideChange()}  // Added onClick to handle indicator clicks
                    ></button>
                ))}
            </div>
            <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={prevSlide}>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50   group-focus:ring-white  group-focus:outline-none">
                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={nextSlide}>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 0 group-hover:bg-white/50   group-focus:ring-white  group-focus:outline-none">
                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>

        </div>
    );
};

export default Carousel;
