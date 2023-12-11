
import React, { useEffect, useState } from 'react'
import Search from '@material-ui/icons/Search'
import * as Icons from '../../../../../components/Icons/index'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../../components/spiner';
import { HomeRounded } from '@material-ui/icons'
import { useForm } from 'react-hook-form'
import jwt from "jsonwebtoken";
import Modal from 'react-modal';
import MaterialTable from '@material-table/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallowEqual, useSelector } from 'react-redux'
import { SignatureCol } from '../../../../../components/Images/Images'


export default function Notifiacklist() {
    const [isFetching, setIsFetching] = useState(() => true);
    const [notifAck, setNotifAck] = useState([]);
    const [ackId, setAckId] = useState('');
    const router = useRouter()
    const [formState, setFormState] = useState('')
    const [formData, setFormData] = useState({})
    const [letterState, setLetterState] = useState('hidden')
    const { JobID, Notifid } = router?.query
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const [scopeData, setUploadCheck] = useState([]);
    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fields = [
        {
            title: "Relationship",
            field: "ack_relationship",
        },
        {
            title: "Acknowledged by",
            field: "ack_by",
        },
        {
            title: "Channel",
            field: "ack_channel",
        },
        {
            title: "Created time",
            field: "createtime",
        },
    ];



    const onSubmit = async () => {
        formData.doneby = emailAdd
        formData.job_id = JobID
        formData.notification_id = Notifid
        formData.actionType = "Accepted"
        setIsFetching(true)

        try {
            const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-newreschedule.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const dataFetch = await res.json()
            setIsFetching(false)
            if (dataFetch.status === "400") {
                toast.error(dataFetch.message);
            } else {
                toast.success(dataFetch.message);
                closeModal()
                router.push(`/tax-audit/audit-view/acknowledge/list/reschedulelist?Notifid=${Notifid}&JobID=${JobID}`)
            }
        } catch (error) {
            setIsFetching(false)
            console.error('Server Error:', error)
        } finally {
            setIsFetching(false)
        }
    }

    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-jobchecklist.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID
                    })
                })
                const dataFetchJobDet = await response.json()
                console.log("dataFetchJobDet", dataFetchJobDet);
                const check = await dataFetchJobDet.checklists
                setUploadCheck(check)
            } catch (error) {
                console.error('Server Error:', error)
            }
        }
        fetchPostData();
    }, [JobID]);

    useEffect(() => {

        async function fetchPost() {

            try {
                const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notification-ack-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        "notification_id": Notifid,
                    })
                })
                const dataFetch = await res.json()
                setNotifAck(dataFetch.body)
                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [JobID, Notifid]);

    console.log("scopeData", scopeData);
    console.log("formData", formData);
    function Letter() {
        return (
            <div>
                <div>
                    <div className="text-justify" >
                        <p className="flex justify-between mt-3">   </p>
                        <p>Ref - {formData?.reschedule_lettersource}</p>
                        <p>Date - {formData?.reschedule_date}</p>
                        <p className="w-64">{"Address"}</p>
                        <p className="font-bold">Dear {formData?.reschedule_adressee},</p><br />
                        <div>
                            {/* <p className="font-bold">NOTIFICATION OF BACKDUTY TAX AUDIT EXERCISE {` (Jan ${auditStartYr} - Dec ${auditEndYr})`}</p><br /> */}
                        </div>
                        <p>The above Subject refers;</p>
                        <p>
                            This is to notify you that the Kogi State Internal Revenue Service (KGIRS) wishes to carry
                            out Tax Audit of all Taxes due from your Organization to the Kogi State Government for
                            the period stated above. The exercise is instituted pursuant to section 46, 47 (4) and (4)
                            of the Personal Income Tax Act, Cap P8, and Laws of the Federation of Nigeria as
                            amended. The Audit will cover the following Taxes/Levies;
                        </p><br />
                        {/* <div className="p-4">
                            <ol style={{ listStyle: "i" }} >
                                {selectedItems.map((item) => (
                                    <li>{item}</li>

                                ))}
                            </ol>
                        </div> */}

                        <br />

                        <p>
                            The date scheduled for the commencement of the audit exercise at your Organization is
                            two (2) weeks from the date of receipt of this letter. We hope that you will provide all
                            necessary documents and support to the audit team to facilitate the exercise as required
                            by law.

                        </p><br />
                        <p>
                            It is pertinent to apprise you that exercise is for information gathering only and the
                            auditors are not authorized to assess your Organization to tax. All reports are subjected to
                            further checks and falsified or unsatisfactory reports will be rejected and investigated in
                            the course of the assessment.

                        </p><br />
                        <p>
                            Kindly note that in the event of any obstruction to this exercise, submission of incorrect or
                            false information/reports, or any other action that may delay this exercise, the Chairman
                            and/or the Directors of your Organization would be vicariously held liable and penalized in
                            accordance with the statutory provisions of Personal Income Tax 1993 and as amended to
                            date.
                        </p><br />
                        <p>
                            In case of any undue advances to connive on the part of our representatives, please get in
                            touch with Executive Chairman, Kogi State Internal Revenue Service immediately.
                            Attached is the list of documents required for the Audit Exercise.
                        </p><br />
                        <div className="p-4">
                            <ol style={{ listStyle: "i" }} >
                                {scopeData?.map((item) => (
                                    <li>{item.checklist_item}</li>

                                ))}
                            </ol>
                        </div><br />
                        <p>Thank you for the anticipated cooperation.</p> <br />
                        <p>
                            Yours Faithfully..
                        </p>
                        <p>For: <span className="font-bold">KOGI STATE INTERNAL REVENUE SERVICE </span></p><br />
                        <SignatureCol />
                        <p className="font-bold">Sule Salihu Enehe</p>
                        Executive Chairman

                    </div>

                </div>
            </div>
        )
    }


    const Proceed = (data) => {
   
        setFormData(data)
        setLetterState('')
        setFormState('hidden')

    }

    return (
        <>
            <ToastContainer />
            {isFetching && <ProcessorSpinner />}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 bg-white border max-w-sm p-4 mx-auto overflow-y-scroll"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"

            >
                <div className={`${letterState}`}>
                    <Letter />
                </div>
                <div className={`${formState}`}>
                    <h6 className="text-dark text-center">Reschedule Visit</h6>
                    <form onSubmit={handleSubmit(Proceed)}>
                        <div className="p-2">
                            <div className="mb-2">
                                <label className="block mb-1">
                                    Reschedule Date:
                                </label>
                                <input
                                    type="date"
                                    id="reschedule_date"
                                    name="reschedule_date"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                    required
                                    ref={register()}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">
                                    Addressee:
                                </label>
                                <input
                                    type="text"
                                    name="reschedule_adressee"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                    required
                                    ref={register()}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">
                                    Letter Source:
                                </label>
                                <select
                                    name="reschedule_lettersource"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                    required
                                    ref={register()}
                                >
                                    <option value="KGIRS/1234/Audit/9575">KGIRS/1234/Audit/9575</option>
                                    <option value="KGIRS/1234/Audit/9545">KGIRS/1234/Audit/9453</option>
                                    <option value="KGIRS/1234/Audit/9588">KGIRS/1234/Audit/9585</option>
                                </select>
                            </div>
                        </div>

                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-dark py-2 px-4 rounded mt-4"
                        >
                            Procced
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mt-4 ml-2"
                            onClick={closeModal}
                        >
                            Close
                        </button>

                    </form>
                </div>
                <div className={`${letterState} flex justify-evenly`}>
                    <button
                        className="bg-green-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mt-4 ml-2"
                        onClick={onSubmit}
                    >
                        Send
                    </button>
                    <button
                        className="bg-red-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mt-4 ml-2"
                        onClick={() => {
                            setFormState('')
                            setLetterState('hidden')
                            closeModal()
                        }}
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <MaterialTable title="Notification acknowledegements"
                data={notifAck}
                columns={fields}
                actions={
                    [
                        {
                            icon: HomeRounded,
                            tooltip: 'Reschedule Visit',
                            onClick: (event, rowData) => {
                                setAckId(rowData.id)
                                openModal()
                            }
                        },

                    ]
                }
                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    actionsColumnIndex: -1
                }}
                icons={{
                    Check: Check,
                    DetailPanel: ChevronRight,
                    Export: SaveAlt,
                    Filter: () => <Icons.Filter />,
                    FirstPage: FirstPage,
                    LastPage: LastPage,
                    NextPage: ChevronRight,
                    PreviousPage: ChevronLeft,
                    Search: Search,
                    ThirdStateCheck: Remove,
                    Clear: Clear,
                    SortArrow: ArrowDownward
                }}

            />

        </>
    )
}
