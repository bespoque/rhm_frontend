import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessorSpinner } from '../../../../components/spiner';
import { useRouter } from 'next/router';


const checks = {
    "checklists": [
        {
            "checklist_id": "1",
            "checklist_item": "Payment Voucher / Cheque / Cash Book"
        },
        {
            "checklist_id": "2",
            "checklist_item": "Petty Cash Voucher"
        },
        {
            "checklist_id": "3",
            "checklist_item": "Bank Statement"
        },
        {
            "checklist_id": "4",
            "checklist_item": "Audited Financial Statement / Management Account"
        },
        {
            "checklist_id": "5",
            "checklist_item": "Schedule of Tax Remittance / Receipts"
        },
        {
            "checklist_id": "6",
            "checklist_item": "Schedule of Interest Payment on Fixed Deposit and Savings Account"
        },
        {
            "checklist_id": "7",
            "checklist_item": "Trial balance of the company (for the relevant years under consideration)"
        },
        {
            "checklist_id": "8",
            "checklist_item": "List of Suppliers/Contractors (Hard & Soft copy)"
        },
        {
            "checklist_id": "9",
            "checklist_item": "Rent Schedule"
        },
        {
            "checklist_id": "10",
            "checklist_item": "Names/Address of Directors with copies of their Tax Clearance Certificate"
        },
        {
            "checklist_id": "11",
            "checklist_item": "Copy of Certificate of Incorporation"
        },
        {
            "checklist_id": "12",
            "checklist_item": "Last Clearance Letter of Tax Audit from KGIRS"
        },
        {
            "checklist_id": "13",
            "checklist_item": "Letter of Expatriate Quota / monthly immigration returns (if any)"
        },
        {
            "checklist_id": "14",
            "checklist_item": "Staff list with designation"
        },
        {
            "checklist_id": "15",
            "checklist_item": "Debtors and Creditors Ledger"
        },
        {
            "checklist_id": "16",
            "checklist_item": "Staff salary structure - Annual (Soft & Hard copies)"
        },
        {
            "checklist_id": "17",
            "checklist_item": "Evidence of Payment in respect of Business Premises\nRegistration/Renewal"
        },
        {
            "checklist_id": "18",
            "checklist_item": "Copy of certificate of Approved Pension Fund"
        },
        {
            "checklist_id": "19",
            "checklist_item": "Evidence of registration with NHF"
        },
        {
            "checklist_id": "20",
            "checklist_item": "Evidence of NHIS and LAP remittances"
        },
        {
            "checklist_id": "21",
            "checklist_item": "Fixed Asset Register"
        },
        {
            "checklist_id": "22",
            "checklist_item": "Schedule of asset Disposal"
        },
        {
            "checklist_id": "23",
            "checklist_item": "Schedule of Commission paid"
        },
        {
            "checklist_id": "24",
            "checklist_item": "Schedule of WHT paid"
        },
        {
            "checklist_id": "25",
            "checklist_item": "General Ledger"
        },
        {
            "checklist_id": "26",
            "checklist_item": "Analysis of Staff Cost"
        },
        {
            "checklist_id": "27",
            "checklist_item": "All receipts booklet issued Stub or duplicates"
        },
        {
            "checklist_id": "28",
            "checklist_item": "All business agreement enter with a third party"
        },
        {
            "checklist_id": "29",
            "checklist_item": "Certificate of Occupancy and other relevant documents to the Land"
        },
        {
            "checklist_id": "30",
            "checklist_item": "Evidence of remittance of Ground Rent for the year under review"
        },
        {
            "checklist_id": "31",
            "checklist_item": "Deed of Assignment relating to the Land"
        },
        {
            "checklist_id": "32",
            "checklist_item": "Documents relating to Leasehold properties"
        },
        {
            "checklist_id": "33",
            "checklist_item": "Evidence of remittance of Stamp duty"
        },
        {
            "checklist_id": "34",
            "checklist_item": "Delivery Note/ Register/Waybills"
        },
    ],
}

const NotificationModal = ({ isOpen, closeModal, id }) => {
    const [isFetching, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [checkboxes, setCheckboxes] = useState(new Array(checks.checklists.length).fill(false));
    const router = useRouter()

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    // Function to get the values of all checkboxes
    const getCheckboxValues = () => {
        return checkboxes.map((isChecked) => (isChecked ? 'YES' : 'NO'));
    };

    let checkValues = getCheckboxValues()
    console.log("getCheckboxValues", String(checkValues));

  
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
        data.notification_status = "Delivered"
        data.notification_delivery = "Email"
        data.notification_note = "Audit Visit"
        data.checklists = String(checkValues)
        console.log("data", data);
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
                closeModal()
                router.reload()

            }
        } catch (error) {
            setIsLoading(false)
            console.error('Server Error:', error)
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

            >
                <div className="">
                    <h6 className="text-dark text-center">Notice of Audit</h6>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mb-2">
                            <label htmlFor="notification_date" className="block mb-1  text-dark">
                                Visit Date:
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
                            <label className="block  mb-1 text-dark">
                                Recipient Email:
                            </label>
                            <input
                                name="notification_email"
                                type="email"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="notification_status" className="text-dark  block mb-1">
                                File Ref:
                            </label>
                            <input type="text"
                                id="notification_fileno"
                                name='notification_fileno'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            />

                        </div>
                        <div className="mb-1">
                            <label className="text-dark  block mb-1">
                                Addresse:
                            </label>
                            <input type="text"
                                name='notification_addressee'
                                placeholder="Eg. Managing director"
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            />

                        </div>
                        <div className="mb-1">
                            <label htmlFor="notification_delivery" className="block  mb-1 text-dark">
                                Notice Type
                            </label>
                            <select
                                id="notification_delivery"
                                name='actionType'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value="Audit Visit">Audit Visit</option>
                                {/* <option value="Demand Notice">Demand Notice</option>
                                <option value="Assessment">Assessment</option> */}
                            </select>
                        </div>
                        <div className="my-4">
                            <hr />
                        </div>
                                <p className="font-bold my-4 text-center">Audit Checklist</p>
                        <div className="grid grid-cols-2 gap-4">
                            {checks.checklists.map((checklist, index) => (
                                <div key={checklist.checklist_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${checklist.checklist_id}`}
                                        className="form-checkbox h-5 w-5 text-indigo-600"
                                        checked={checkboxes[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label htmlFor={`checkbox-${checklist.checklist_id}`} className="ml-2">
                                        {checklist.checklist_item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* <div className="grid grid-cols-2 gap-4">
                            {checkboxes.map((isChecked, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        className="form-checkbox h-5 w-5 text-indigo-600"
                                    />
                                    <label htmlFor={`checkbox-${index}`} className="ml-2">
                                        Checkbox {index + 1}
                                    </label>
                                </div>
                            ))}
                        </div> */}
                        {/* <div className="mb-2">
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
                        </div> */}
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
