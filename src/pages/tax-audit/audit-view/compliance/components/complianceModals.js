import React, { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessorSpinner } from '../../../../../components/spiner';
import { useRouter } from 'next/router';
import { FiX } from 'react-icons/fi';






export const NonCompliance = ({ isOpen, closeModal, id }) => {

    // const [isFetching, setIsFetching] = useState(() => true);



    return (
        <>
            <ToastContainer />
            {/* {isFetching && <ProcessorSpinner />} */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-120 mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                        <div className="modal-close flex justify-end top-0 right-0 cursor-pointer">
                            <span className="text-3xl" onClick={closeModal}>
                                <FiX
                                    className="stroke-current text-red-500"
                                />
                            </span>
                        </div>
                        <div className="modal-content py-4 text-left px-6">
                            <p className='text-center my-4 font-bold'>Create Non Compliance</p>
                            <form >
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-2">
                                        <label className="block mb-1  text-dark">
                                            Date:
                                        </label>
                                        <input
                                            type="date"
                                            name='notification_date'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block mb-1 text-dark">
                                            Recipient Email:
                                        </label>
                                        <input
                                            name="notification_email"
                                            type="email"
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            File Ref:
                                        </label>
                                        <input type="text"
                                            name='notification_fileno'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Type:
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value="compliance"
                                            name='actionType'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const SpecialNonComp = ({ id, isOpen, closeModal }) => {
    // const [isFetching, setIsFetching] = useState(() => true);

    return (
        <>
            <ToastContainer />
            {/* {isFetching && <ProcessorSpinner />} */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-120 mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                        <div className="modal-close flex justify-end top-0 right-0 cursor-pointer">
                            <span className="text-3xl" onClick={closeModal}>
                                <FiX
                                    className="stroke-current text-red-500"
                                />
                            </span>
                        </div>
                        <div className="modal-content py-4 text-left px-6">
                            <p className='text-center my-4 font-bold'>Create Special non-Compliance</p>
                            <form >
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-2">
                                        <label className="block mb-1  text-dark">
                                            Date:
                                        </label>
                                        <input
                                            type="date"
                                            name='notification_date'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block mb-1 text-dark">
                                            Recipient Email:
                                        </label>
                                        <input
                                            name="notification_email"
                                            type="email"
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            File Ref:
                                        </label>
                                        <input type="text"
                                            name='notification_fileno'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Type:
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value="compliance"
                                            name='actionType'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export const ComplianceModal = ({ isOpen, closeModal }) => {
    // const [isFetching, setIsFetching] = useState(() => true);
    return (
        <>
            <ToastContainer />
            {/* {isFetching && <ProcessorSpinner />} */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-120 mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">

                        <div className="modal-close flex justify-end top-0 right-0 cursor-pointer">
                            <span className="text-3xl" onClick={closeModal}>
                                <FiX
                                    className="stroke-current text-red-500"
                                />
                            </span>
                        </div>
                        <div className="modal-content py-4 text-left px-6">
                            <p className='text-center my-4 font-bold'>Create Compliance</p>
                            <form >
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-2">
                                        <label className="block mb-1  text-dark">
                                            Date:
                                        </label>
                                        <input
                                            type="date"
                                            name='notification_date'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block mb-1 text-dark">
                                            Recipient Email:
                                        </label>
                                        <input
                                            name="notification_email"
                                            type="email"
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            File Ref:
                                        </label>
                                        <input type="text"
                                            name='notification_fileno'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Type:
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value="compliance"
                                            name='actionType'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                            required

                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


