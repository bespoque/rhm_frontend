import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../components/spiner';
import Loader from 'react-loader-spinner';

const VisitModal = ({ isOpen, closeModal, visitId, JobID, Notifid }) => {
    const [isFetching, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [visitData, setVisitData] = useState([]);
    const [checkListData, setCheckListData] = useState([]);
    const [formLoader, handleFormloader] = useState(false);

    const [selectedValues, setSelectedValues] = useState(
        checkListData.reduce((acc, checklist) => {
            acc[checklist.checklist_id] = checklist.checklist_item_value;
            return acc;
        }, {})
    );

    const selectedValuesArray = Object.values(selectedValues);

    console.log("selectedValuesArray", selectedValuesArray);

    const handleRadioChange = (checklistId, value) => {
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [checklistId]: value,
        }));
    };



    const router = useRouter()

    let data = {
        "status": "200",
        "message": "Records fetched successfully",
        "body": [
            {
                "id": "1",
                "job_id": "14",
                "actionType": "Audit Visit",
                "visit_team": "",
                "visit_date": "2023-09-11",
                "visit_compliance": "Pending",
                "visit_status": "Completed",
                "visit_docs": null,
                "visit_docsstatus": null,
                "visit_log": "Tax payer was easy to communicate with and all documents were sighted",
                "reviewby": "kelvins@bespoque.dev",
                "reviewdate": "2023-09-12",
                "approveby": "prince.u@bespoque.ng",
                "approvedate": "2023-09-12",
                "doneby": "prince.u@bespoque.ng",
                "createtime": "2023-09-11 17:43PM"
            }
        ],
        "checklists": [
            {
                "checklist_id": "36",
                "checklist_item": "Payment Voucher / Cheque / Cash Book",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "37",
                "checklist_item": "Petty Cash Voucher",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "38",
                "checklist_item": "Bank Statement",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "39",
                "checklist_item": "Audited Financial Statement / Management Account",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "40",
                "checklist_item": "Schedule of Tax Remittance / Receipts",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "41",
                "checklist_item": "Schedule of Interest Payment on Fixed Deposit and Savings Account",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "42",
                "checklist_item": "Trial balance of the company (for the relevant years under consideration)",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "43",
                "checklist_item": "List of Suppliers/Contractors (Hard & Soft copy)",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "44",
                "checklist_item": "Rent Schedule",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "45",
                "checklist_item": "Names/Address of Directors with copies of their Tax Clearance Certificate",
                "checklist_item_value": "YES",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "46",
                "checklist_item": "Copy of Certificate of Incorporation",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "47",
                "checklist_item": "Last Clearance Letter of Tax Audit from KGIRS",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "48",
                "checklist_item": "Letter of Expatriate Quota / monthly immigration returns (if any)",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "49",
                "checklist_item": "Staff list with designation",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "50",
                "checklist_item": "Debtors and Creditors Ledger",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "51",
                "checklist_item": "Staff salary structure - Annual (Soft & Hard copies)",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "52",
                "checklist_item": "Evidence of Payment in respect of Business Premises\nRegistration/Renewal",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "53",
                "checklist_item": "Copy of certificate of Approved Pension Fund",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "54",
                "checklist_item": "Evidence of registration with NHF",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "55",
                "checklist_item": "Evidence of NHIS and LAP remittances",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "56",
                "checklist_item": "Fixed Asset Register",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "57",
                "checklist_item": "Schedule of asset Disposal",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "58",
                "checklist_item": "Schedule of Commission paid",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "59",
                "checklist_item": "Schedule of WHT paid",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "60",
                "checklist_item": "General Ledger",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "61",
                "checklist_item": "Analysis of Staff Cost",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "62",
                "checklist_item": "All receipts booklet issued Stub or duplicates",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "63",
                "checklist_item": "All business agreement enter with a third party",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "64",
                "checklist_item": "Certificate of Occupancy and other relevant documents to the Land",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "65",
                "checklist_item": "Evidence of remittance of Ground Rent for the year under review",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "66",
                "checklist_item": "Deed of Assignment relating to the Land",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "67",
                "checklist_item": "Documents relating to Leasehold properties",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "68",
                "checklist_item": "Evidence of remittance of Stamp duty",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "69",
                "checklist_item": "Delivery Note/ Register/Waybills",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            },
            {
                "checklist_id": "70",
                "checklist_item": "All other documents as may be required for the audit exercise",
                "checklist_item_value": "NO",
                "checklist_item_comment": "Pending"
            }
        ],
        "redirect": "false"
    }

    useEffect(() => {
        async function fetchPost() {

            try {
                // const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notification-visits-single.php', {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         "job_id": JobID,
                //         "notification_id": Notifid,
                //         "visit_id": visitId

                //     })
                // })
                // const dataFetch = await res.json()
                // setVisitData(dataFetch)
                // handleFormloader(false)
                setVisitData(data.body[0])
                setCheckListData(data.checklists)

            } catch (error) {
                console.error('Server Error:', error)
                handleFormloader(false)
            }
        }
        fetchPost();
    }, [Notifid, JobID, visitId]);



    const onSubmit = async (data) => {


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

    console.log("formLoader", formLoader);

    const handleAllYesClick = () => {
        const updatedValues = {};
        for (const checklist of checkListData) {
            updatedValues[checklist.checklist_id] = 'YES';
        }
        setSelectedValues(updatedValues);
    };

    // Handle "All No" button click
    const handleAllNoClick = () => {
        const updatedValues = {};
        for (const checklist of checkListData) {
            updatedValues[checklist.checklist_id] = 'NO';
        }
        setSelectedValues(updatedValues);
    };

    const handleClearAllClick = () => {
        const updatedValues = {};
        for (const checklist of checkListData) {
            updatedValues[checklist.checklist_id] = ''; // Clear the value
        }
        setSelectedValues(updatedValues);
    };

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
                <div>


                    <h6 className="my-3 text-center">Update Visit log</h6>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mb-2">
                            <label className="block mb-1  ">
                                Type:
                            </label>
                            <input
                                type="text"
                                name='actionType'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                value={visitData?.actionType}
                                required
                                ref={register()}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block  mb-1 ">
                                Visit Date:
                            </label>
                            <input
                                type="date"
                                name='visit_date'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                defaultValue={visitData?.visit_date}
                                required
                                ref={register()}
                            />
                        </div>
                        <div className="mb-2">

                            <label className="block  mb-1 ">
                                Compliance:
                            </label>
                            <select

                                name='visit_compliance'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value={visitData?.visit_compliance}>{visitData?.visit_compliance}</option>
                                <option value={"Compliant"}>Compliant</option>
                            </select>
                        </div>

                        <div className="mb-2">

                            <label className="block  mb-1 ">
                                Visit Status:
                            </label>
                            <select

                                name='visit_status'
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                            >
                                <option value={visitData?.visit_status}>{visitData?.visit_status}</option>
                                <option value={"Started"}>Started</option>
                            </select>
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1">
                                Visit Note:
                            </label>
                            <textarea
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                required
                                ref={register()}
                                name='visit_log'
                                defaultValue={visitData?.visit_log}
                            ></textarea>
                        </div>

                        <hr />

                        <h6 className="text-center my-4">Checklist</h6>
                        <div className="flex justify-center my-3">
                            <div>
                                <label className="mr-4">
                                    All Yes
                                    <input
                                        className="m-1"
                                        type="radio"
                                        value="All Yes"
                                        // name='all'
                                        checked={""}
                                        onChange={handleAllYesClick}
                                    />
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="All No"
                                        // name='all'
                                        className="m-1"
                                        checked={""}
                                        onChange={handleAllNoClick}
                                    />
                                    All No
                                </label>
                                <label className="ml-4">
                                    <input
                                        className="m-1"
                                        type="radio"
                                        value="Clear All"
                                        checked={""}
                                        onChange={handleClearAllClick}
                                    />
                                    Clear All
                                </label>

                            </div>
                        </div>
                        <div>
                            {checkListData.map((checklist) => (
                                <div key={checklist.checklist_id}>
                                    <label className="font-bold">{checklist.checklist_item}</label>
                                    <div className="my-2">
                                        <label className="p-3">
                                            Yes
                                            <input
                                                className="m-1"
                                                required
                                                type="radio"
                                                value="YES"
                                                checked={selectedValues[checklist.checklist_id] === 'YES'}
                                                onChange={() => handleRadioChange(checklist.checklist_id, 'YES')}
                                            />
                                        </label>

                                        <label>
                                            No
                                            <input
                                                required
                                                className="m-1"
                                                type="radio"
                                                value="NO"
                                                checked={selectedValues[checklist.checklist_id] === 'NO'}
                                                onChange={() => handleRadioChange(checklist.checklist_id, 'NO')}
                                            />
                                        </label>
                                    </div>
                                    <hr />
                                </div>
                            ))}
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
