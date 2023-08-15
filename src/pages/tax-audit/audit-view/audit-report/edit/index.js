import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessorSpinner } from '../../../../../components/spiner';
import { useForm } from 'react-hook-form';

function Index() {
    const [isFetching, setIsLoading] = useState(false);
    const router = useRouter()
    const [data, setData] = useState()
    const { register, handleSubmit } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { jobId, reportId } = router?.query

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    
    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-auditreports-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": jobId,
                        "auditreport_id": reportId,
                    })
                })
                const dataFetch = await res.json()

                setData(dataFetch.body[0])
                setIsLoading(false)
            } catch (error) {
                console.log('Server Error:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPost();
    }, [jobId, reportId]);

    const onSubmit = async (data) => {
      
        setIsLoading(true)

        try {
            const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-newacknowledment.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const dataFetch = await res.json()
            toast.success(dataFetch.message);
            setIsLoading(false)
            // router.push(`/tax-audit/audit-view/acknowledge/list/jobacklist?JobID=${JobID}`)
        } catch (error) {
            setIsLoading(false)
            console.error('Server Error:', error)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div>
            {isFetching && <ProcessorSpinner />}
            <ToastContainer />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 bg-white border max-w-sm p-4 mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
                <div className="overflow-y-auto">
                    <h6 className="my-3">New Acknowledgement</h6>
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
                                <option value="ups">UPS Door Delivery</option>
                                <option value="dhl">DHL Door Delivery</option>
                            </select>
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
                                <option value="Brother">Brother</option>
                                <option value="Mother">Mother</option>
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
                                <option value="Initial">Initial</option>
                                <option value="Audit">Audit</option>
                                <option value="Due">Due</option>
                                <option value="Overdue">Overdue</option>
                                <option value="Objection">Objection</option>
                                <option value="Completion">Completion</option>
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
            <div>
                {data ?
                    <div className="container mx-auto mt-8 px-4">
                        <div className="flex justify-between  mb-6">
                            <h6 className="font-semibold">Audit Report Information</h6>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={openModal}>
                                New Report Review
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p><strong>Resolution:</strong> {data?.resolution}</p>
                            <p><strong>Status:</strong> {data?.status}</p>
                            <p><strong>Created Date:</strong> {data?.createdate}</p>
                        </div>
                    </div>
                    : <p>No Assessment data found</p>
                }
            </div>
        </div>
    )
}

export default Index