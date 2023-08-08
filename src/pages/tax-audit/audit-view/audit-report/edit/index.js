import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
    const { register, handleSubmit } = useForm();
    const [isFetching, setIsLoading] = useState(false);
    const router = useRouter()
    const { JobID } = router?.query

    const onSubmit = async (data) => {
        setIsLoading(true)

        // data.doneby = emailAdd
        data.job_id = JobID
        data.notification_file = "filepath"
        try {
            const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-newnotification.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const dataFetch = await res.json()
            toast.success(dataFetch.message);
            setIsLoading(false)
            router.push(`/tax-audit/audit-view?id=${JobID}`)
        } catch (error) {
            setIsLoading(false)
            console.error('Server Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-2 gap-6 max-w-md p-6 bg-white border rounded shadow-md">
                    <div className="col-span-2">
                        <h2 className="text-2xl text-center font-semibold mb-4">Update Notification</h2>
                    </div>
                    <div>
                        <label className="block">
                            <span className="text-gray-700">Notification Date:</span>
                            <input
                                type="date"
                                id="notification_date"
                                name="notification_date"
                                className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block">
                            <span className="text-gray-700">Delivery Method:</span>
                            <select
                                id="notification_delivery"
                                name="notification_delivery"
                                className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="Mail">Mail</option>
                                <option value="Email">Email</option>
                                <option value="SMS">SMS</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="block">
                            <span className="text-gray-700">Notification File:</span>
                            <input
                                type="file"
                                id="notification_file"
                                name="notification_file"
                                className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block">
                            <span className="text-gray-700">Notification Status:</span>
                            <select
                                id="notification_status"
                                name="notification_status"
                                className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="Started">Started</option>
                            </select>
                        </label>
                    </div>
                    <div className="col-span-2">
                        <label className="block">
                            <span className="text-gray-700">Type:</span>
                        </label>
                        <select
                            id="notification_type"
                            name="actionType"
                            className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="Initial">Initial</option>
                            <option value="Audit">Audit</option>
                            <option value="Due">Due</option>
                            <option value="Overdue">Overdue</option>
                            <option value="Objection">Objection</option>
                            <option value="Completion">Completion</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="block">
                            <span className="text-gray-700">Notification Note:</span>
                            <textarea
                                id="notification_note"
                                className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                                name="notification_note"
                            ></textarea>
                        </label>
                    </div>
                    <div className="col-span-2">
                        <label className="block">
                            <span className="text-gray-700">Notification Body:</span>
                            <textarea
                                id="notification_body"
                                className="mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                required
                                name="notification_body"
                            ></textarea>
                        </label>
                    </div>
                    <div className="col-span-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                            type="submit"
                        >
                            Update Notification
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Index