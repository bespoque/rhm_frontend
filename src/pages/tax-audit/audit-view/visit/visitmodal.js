import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../components/spiner';
import Loader from 'react-loader-spinner';

const VisitModal = ({ isOpen, closeModal, visitId, JobID, Notifid }) => {
    const [isFetching, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [visitData, setVisitData] = useState([]);
    const [formLoader, handleFormloader] = useState(true);

    const router = useRouter()

    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    console.log("props", visitId, JobID, Notifid);

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user


    useEffect(() => {
        async function fetchPost() {
            
            try {
                const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notification-visits-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        "notification_id": Notifid,
                        "visit_id": visitId

                    })
                })
                const dataFetch = await res.json()
                console.log("dataFetch", dataFetch);
                setVisitData(dataFetch)
                handleFormloader(false)

            } catch (error) {
                console.error('Server Error:', error)
                handleFormloader(false)
            } finally {
                handleFormloader(false)
            }
        }
        fetchPost();
    }, [Notifid, JobID, visitId]);

    const onSubmit = async (data) => {
        data.doneby = emailAdd
        data.job_id = JobID
        data.notification_id = Notifid

        setIsLoading(true)

        try {
            const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-newacknowledment.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const dataFetch = await res.json()
            setIsLoading(false)
            if (dataFetch.status === "400") {
                toast.error(dataFetch.message);
            } else {
                toast.success(dataFetch.message);
                router.reload()
                // router.push(`/tax-audit/audit-view/acknowledge/list/jobacklist?JobID=${JobID}`)
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
                className="fixed inset-0 bg-white border max-w-sm p-4 mx-auto overflow-y-scroll"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"
                ariaHideApp={false}
            >
                {formLoader && (
                    <div className="flex justify-center item mb-2">
                        <Loader
                            visible={formLoader}
                            type="BallTriangle"
                            color="#00FA9A"
                            height={19}
                            width={19}
                            timeout={0}
                            className="ml-2"
                        />
                        <p className="font-bold">Processing ...</p>
                    </div>
                )}
                <div >
                    <h6 className="my-3">Update Visit log</h6>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mb-2">
                            <label className="block mb-1  ">
                                Acknowledgement Date:
                            </label>
                            <input
                                type="date"
                                id="ack_datetime"
                                name='ack_datetime'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block  mb-1 ">
                                Delivery Method:
                            </label>
                            <select
                                id="ack_channel"
                                name='ack_channel'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value="courier">Courier</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="block  mb-1 ">
                                Acknowledged by:
                            </label>
                            <input type="text" name="ack_by"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block  mb-1 ">
                                Relationship:
                            </label>
                            <select
                                id="ack_relationship"
                                name='ack_relationship'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value="">Please Select</option>
                                <option value="staff">Staff</option>
                                <option value="relative">Relative</option>
                                <option value="colleague">Colleague</option>
                                <option value="neighbour">Neighbour</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="mb-2">
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
                            <label className="block mb-1">
                                Note:
                            </label>
                            <textarea

                                id="ack_note"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                                name='ack_note'
                            ></textarea>
                        </div>

                        <button
                            className="bg-blue-500 hover:bg-blue-600  py-2 px-4 rounded mt-4"
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

export default VisitModal;