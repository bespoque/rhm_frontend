import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';

const NotesModal = ({ isOpen, closeModal, id }) => {
    const [isFetching, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

    const onSubmit = async (data) => {
        console.log("data", data);
        setIsLoading(true)

        data.doneby = emailAdd
        data.job_id = id
        data.notification_file = "filepath"
        console.log("data", data);
        try {
            const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-newnotification.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const dataFetch = await res.json()
            toast.success(dataFetch.message);
            setIsLoading(false)
            router.push("/tax-audit/my-jobs")
        } catch (error) {
            setIsLoading(false)
            console.error('Server Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ToastContainer />
            {isFetching && (
                <div className="flex justify-start item mb-2">
                    <Loader
                        visible={isFetching}
                        type="BallTriangle"
                        color="#00FA9A"
                        height={19}
                        width={19}
                        timeout={0}
                        className="ml-2"
                    />
                    <p className="font-bold">Processing...</p>
                </div>
            )}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className="rounded p-4 max-w-sm border mx-auto"
                overlayClassName="fixed inset-0 bg-black opacity-70 z-50"

            // className="fixed inset-0 border max-w-sm p-4 mx-auto"
            // overlayClassName="Overlay fixed inset-0 bg-black bg-opacity-50"
            // contentLabel="New Notification Modal"

            >
                <div className="overflow-y-auto">
                    <h6 className="text-white">New Note</h6>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mb-2">
                            <label htmlFor="notification_date" className="block mb-1 text-right text-white">
                                Note Headline:
                            </label>
                            <input
                                type="date"
                                id="note_headline"
                                name='note_headline'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            />
                        </div>
                        
                        <div className="mb-2">
                            <label htmlFor="notification_file" className="text-white text-right block mb-1">
                                Notification File:
                            </label>
                            <input
                                type="file"
                                id="notification_file"
                                name="notification_file"
                                className="border border-gray-300 text-white rounded px-2 py-1 w-full"
                                // onChange={handleFileChange}
                                required
                                ref={register()}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="notification_note" className="text-white text-right block mb-1">
                                Notification Note:
                            </label>
                            <textarea

                                id="notification_note"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                                name='notification_note'
                            ></textarea>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="notification_body" className="text-white text-right block mb-1">
                                Notification Body:
                            </label>
                            <textarea

                                id="notification_body"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                                name='notification_body'
                            ></textarea>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
                            type="submit"
                        >
                            Submit
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mt-4 ml-2"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default NotesModal;
