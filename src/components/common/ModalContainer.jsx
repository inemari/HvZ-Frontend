import React from 'react';

const ModalContainer = ({ children, showModal, handleCloseModal, newBackground }) => {

    return (
        <div className='justify-center  '>
            {/* Background Overlay */}
            {showModal && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-60  overflow-y-auto h-screen w-screen "
                    id="my-modal"
                ></div>
            )}
            {/* Modal */}
            <div
                className={`fixed top-0 left-0 right-0 mx-auto max-w-6xl w-full z-30 ${showModal ? '' : 'hidden'
                    } w-full h-full flex items-center justify-center`}
            >
                <div className={`relative p-5 rounded-2xl shadow-xl min-w-fit h-fit container ${newBackground ? newBackground : 'bg-customLightBrown'}`}>

                    {/* Close (X) Button */}
                    <button
                        type="button"
                        className=" absolute top-3 right-2.5 text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center  dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={handleCloseModal}
                    >
                        <svg className="w-3 h-3 focus:ring-0 focus:outline-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>



                    {children}

                </div>
            </div>
        </div>
    );
};

export default ModalContainer;
