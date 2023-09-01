
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




export default function Notifiacklist() {
    const [isFetching, setIsFetching] = useState(() => true);
    const [notifAck, setNotifAck] = useState([]);
    const [ackId, setAckId] = useState('');
    const router = useRouter()

    const { JobID, Notifid } = router?.query
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();

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

    console.log("ackId", ackId);
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

  

    const onSubmit = async (data) => {
        data.doneby = emailAdd
        data.job_id = JobID
        data.notification_id = Notifid
        data.ack_previd = ackId
        data.ack_note = " "
        data.ack_channel = " "
        data.ack_datetime = " "
        data.ack_relationship = " "
        data.ack_by = " "
        data.ack_reschedule = "YES"
        setIsFetching(true)

        try {
            const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-newacknowledment.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const dataFetch = await res.json()
            setIsFetching(false)
            if (dataFetch.status === "400") {
                toast.error(dataFetch.message);
            } else {
                toast.success(dataFetch.message);
                closeModal()
                router.reload()
                
            }
        } catch (error) {
            setIsFetching(false)
            console.error('Server Error:', error)
        } finally {
            setIsFetching(false)
        }
    }

    useEffect(() => {

        async function fetchPost() {

            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-notification-ack-batch.php', {
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

    const filteredData = notifAck?.filter(item => {
        const ack_reschedule = item.ack_reschedule;
        return ack_reschedule.toLowerCase() !== "yes";
    });
console.log("filteredData", filteredData);
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
                <div>
                    <h6 className="text-dark text-center">Reschedule Visit</h6>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-2">
                            <div className="mb-2">
                                <label className="block mb-1">
                                    Reschedule Date:
                                </label>
                                <input
                                    type="date"
                                    id="ack_reschedule_date"
                                    name="ack_reschedule_date"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                    required
                                    ref={register()}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">
                                    Reschedule Reason:
                                </label>
                                <textarea
                                    id="ack_reschedule_reason"
                                    name="ack_reschedule_reason"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                    required
                                    ref={register()}
                                > </textarea>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">
                                    Reschedule Status:
                                </label>
                                <select

                                    id="ack_reschedule_status"
                                    name="ack_reschedule_status"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                    required
                                    ref={register()}
                                >
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="REJECTED">Rejected</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block mb-1">
                                    Type:
                                </label>
                                <select
                                    name="actionType"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                    required
                                    ref={register()}
                                >
                                    <option value="Tax Audit">Tax Audit</option>
                                </select>
                            </div>
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

            <MaterialTable title="Notification acknowledegements"
                data={filteredData}
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
