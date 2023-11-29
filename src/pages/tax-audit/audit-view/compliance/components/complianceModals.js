import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessorSpinner } from '../../../../../components/spiner';
import { useRouter } from 'next/router';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '../../../../../components/CustomButton/CustomButton';
import { Select, Space } from 'antd';





export const NonCompliance = ({ isOpen, closeModal, JobID, doneby }) => {
    const router = useRouter()
    const [isFetching, setIsFetching] = useState(() => false);
    const { handleSubmit, register } = useForm();

    const handleCompliance = async (data) => {
        data.doneby = doneby
        data.job_id = JobID
        data.notification_status = "Pending"
        data.notification_delivery = "Email"
        setIsFetching(true)
        try {
            const response = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-newcompliance.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })

            setIsFetching(false)
            const dataFetch = await response.json()
            if (dataFetch.status === "400") {
                toast.error(dataFetch.message);
            } else {
                toast.success(dataFetch.message);
            }
            closeModal()
            router.reload()
        } catch (error) {
            setIsFetching(false)
            console.error('Server Error:', error)
        }
    }


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
                            <form onSubmit={handleSubmit(handleCompliance)}>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-2">
                                        <label className="block mb-1  text-dark">
                                            Date:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="date"
                                            name='notification_date'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block mb-1 text-dark">
                                            Recipient Email:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            name="notification_email"
                                            type="email"
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            File Ref:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            name='notification_fileno'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Addressee:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            name='notification_addressee'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Type:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            readOnly
                                            value="Non-Compliance"
                                            name='actionType'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"


                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <SubmitButton type="submit"
                                        disabled={isFetching}>
                                        {isFetching ? 'Submitting...' : 'Submit'}
                                    </SubmitButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const SpecialNonComp = ({ JobID, doneby, isOpen, closeModal }) => {
    const [checkListData, setCheckData] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [isFetching, setIsFetching] = useState(() => false);
    const { Option } = Select;
    const { handleSubmit, register } = useForm();
    const router = useRouter()
    const handleChange = selectedItems => {

        // Map the selected items to an array of objects with value set to 'YES'
        const selectedItemsWithValues = checkListData?.map(item =>
            selectedItems.includes(item.checklist_item) ? 'YES' : 'NO'
        );

        setSelectedItems(selectedItemsWithValues);
    };
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-jobchecklist.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        job_id: JobID
                    })
                })
                const dataFetchJobDet = await response.json()
                setCheckData(dataFetchJobDet.checklists)
            } catch (error) {
                console.error('Server Error:', error)
            }
        }
        fetchPost();
    }, [JobID]);

    const handleSpecialNoneCompliance = async (data) => {
        data.doneby = doneby
        data.job_id = JobID
        data.notification_status = "Pending"
        data.notification_delivery = "Email"
        data.checklists = String(selectedItems)
        console.log("data", data);
        setIsFetching(true)
        try {
            const response = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-newcompliance.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })

            setIsFetching(false)
            const dataFetch = await response.json()
            if (dataFetch.status === "400") {
                toast.error(dataFetch.message);
            } else {
                toast.success(dataFetch.message);
            }
            closeModal()
            router.reload()
        } catch (error) {
            setIsFetching(false)
            console.error('Server Error:', error)
        }
    }


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
                            <form onSubmit={handleSubmit(handleSpecialNoneCompliance)}>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-2">
                                        <label className="block mb-1  text-dark">
                                            Date:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="date"
                                            name='notification_date'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block mb-1 text-dark">
                                            Recipient Email:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            name="notification_email"
                                            type="email"
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            File Ref:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            name='notification_fileno'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Addressee:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            name='notification_addressee'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Type:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            readOnly
                                            value="Special Non-Compliance"
                                            name='actionType'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"


                                        />
                                    </div>
                                    <div className='mb-1 w-72'>
                                        <label className="text-dark  block mb-1">
                                            Documents:
                                        </label>
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select
                                                required
                                                size={'middle'}
                                                mode="multiple"
                                                placeholder="Select checklist items"
                                                onChange={handleChange}
                                                style={{ width: '100%' }}
                                            >
                                                {checkListData.map(item => (
                                                    <Option key={item.checklist_id} value={item.checklist_item}>
                                                        {item.checklist_item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Space>

                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <div className="flex justify-center mt-4">
                                        <SubmitButton type="submit"
                                            disabled={isFetching}>
                                            {isFetching ? 'Submitting...' : 'Submit'}
                                        </SubmitButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export const ComplianceModal = ({ isOpen, closeModal, doneby, JobID }) => {
    const router = useRouter()
    const [isFetching, setIsFetching] = useState(() => false);
    const { handleSubmit, register } = useForm();

    const handleCompliance = async (data) => {
        data.doneby = doneby
        data.job_id = JobID
        data.notification_status = "Pending"
        data.notification_delivery = "Email"
        console.log("data", data);
        setIsFetching(true)
        try {
            const response = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-newcompliance.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })

            setIsFetching(false)
            const dataFetch = await response.json()
            if (dataFetch.status === "400") {
                toast.error(dataFetch.message);
            } else {
                toast.success(dataFetch.message);
            }
            closeModal()
            router.reload()
            // router.reload()
        } catch (error) {
            setIsFetching(false)
            console.error('Server Error:', error)
        }
    }


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
                            <form onSubmit={handleSubmit(handleCompliance)}>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-2">
                                        <label className="block mb-1  text-dark">
                                            Date:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="date"
                                            name='notification_date'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="block mb-1 text-dark">
                                            Recipient Email:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            name="notification_email"
                                            type="email"
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            File Ref:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            name='notification_fileno'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"
                                        />

                                    </div>
                                    <div className="mb-1">
                                        <label className="text-dark  block mb-1">
                                            Type:
                                        </label>
                                        <input
                                            required
                                            ref={register()}
                                            type="text"
                                            readOnly
                                            value="compliance"
                                            name='actionType'
                                            className="border border-gray-300 rounded px-2 py-1 w-full"


                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <SubmitButton type="submit"
                                        disabled={isFetching}>
                                        {isFetching ? 'Submitting...' : 'Submit'}
                                    </SubmitButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


