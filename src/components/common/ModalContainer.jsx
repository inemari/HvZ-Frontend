import React from 'react';

const ModalContainer = ({ children, showModal, closeModal }) => {
    return (
        <div>
            {/* Background Overlay */}
            {showModal && (
                <div
                    className="fixed  inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full"
                    id="my-modal"
                ></div>
            )}
            {/* Modal */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 ${showModal ? '' : 'hidden'
                    } w-full h-full flex items-center justify-center`}
            >
                <div className="relative w-full max-w-md">
                    <div className="relative rounded-lg shadow bg-customLightBrown">
                        {/* Close (X) Button */}
                        <button
                            type="button"
                            className=" absolute top-3 right-2.5 text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center  dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                            onClick={closeModal}
                        >
                            <svg className="w-3 h-3 focus:ring-0 focus:outline-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>



                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalContainer;
