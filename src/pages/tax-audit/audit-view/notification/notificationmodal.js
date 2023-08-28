import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../components/spiner';

const NotificationModal = ({ isOpen, closeModal, id }) => {
    const [isFetching, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
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
        setIsLoading(true)

        data.doneby = emailAdd
        data.job_id = id
        data.notification_file = "filepath"
        try {
            const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-newnotification.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const dataFetch = await res.json()
            setIsLoading(false)
            if (dataFetch.status === "400") {
                toast.error(dataFetch.message);
            } else {
                toast.success(dataFetch.message);
                router.push(`/tax-audit/audit-view?id=${id}`)
            }
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
            {isFetching && <ProcessorSpinner />}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 bg-white border max-w-sm p-4 mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"

            >
                <div className="overflow-y-auto">
                    <h6 className="text-dark">New Notification</h6>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mb-2">
                            <label htmlFor="notification_date" className="block mb-1  text-dark">
                                Notification Date:
                            </label>
                            <input
                                type="date"
                                id="notification_date"
                                name='notification_date'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="notification_delivery" className="block  mb-1 text-dark">
                                Delivery Method:
                            </label>
                            <select
                                id="notification_delivery"
                                name='notification_delivery'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value="Mail">Mail</option>
                                <option value="Email">Email</option>
                                <option value="SMS">SMS</option>
                            </select>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="notification_status" className="text-dark  block mb-1">
                                Notification Status:
                            </label>
                            <select
                                id="notification_status"
                                name='notification_status'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Started">Started</option>
                            </select>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="notification_delivery" className="block  mb-1 text-dark">
                                Type
                            </label>
                            <select
                                id="notification_delivery"
                                name='actionType'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value="Audit Visit">Audit Visit</option>
                                <option value="Demand Notice">Demand Notice</option>
                                <option value="Assessment">Assessment</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="notification_note" className="text-dark  block mb-1">
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
                            <label htmlFor="notification_body" className="text-dark  block mb-1">
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
                            className="bg-blue-500 hover:bg-blue-600 text-dark py-2 px-4 rounded mt-4"
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

export default NotificationModal;
