import React, { useEffect, useState } from 'react';
import { ProcessorSpinner } from '../../../../components/spiner';
import { useRouter } from 'next/router';
import NewNotificationButton from './button';
import NewAckButton from '../acknowledge/button';
import Search from '@material-ui/icons/Search'
import * as Icons from '../../../../components/Icons/index'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import MaterialTable from '@material-table/core';
import { CheckBox, Edit, RateReview } from '@material-ui/icons';
import VisitModal from '../visit/visitmodal';

const Notification = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [notice, setNotDet] = useState({});
    const [logData, setLogData] = useState([])
    const [visitModal, setVisitModal] = useState(false);
    const [visitId, setVisitId] = useState(false);
    const router = useRouter()
    const [reviewModal, setReviewModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const { Notifid, JobID } = router?.query

    const openModal = () => {
        setVisitModal(true);
    };

    const closeModal = () => {
        setVisitModal(false);
    }

    const toggleReviewModal = () => {
        setReviewModal(!reviewModal);
    };
    const toggleApproveModal = () => {
        setApproveModal(!approveModal);
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
            title: "Type",
            field: "actionType"
        },
        {
            title: "Created time",
            field: "createtime",
        },
        // {
        //     title: "Visit date",
        //     field: "visit_date",
        // },
        // {
        //     title: "Status",
        //     field: "visit_status",
        // },

        // {
        //     title: "Type",
        //     field: "actionType"
        // },
        // {
        //     title: "Compliance",
        //     field: "visit_compliance"
        // },
        // {
        //     title: "Created by",
        //     field: "doneby",
        // },
        // {
        //     title: "Reviewed by",
        //     field: "reviewby",
        // },
        // {
        //     title: "Created time",
        //     field: "createtime",
        // },
    ];

    const FormAct = (e) => {
        e.preventDefault()
    }


    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-notifications-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        "id": Notifid,
                    })
                })
                const dataFetch = await res.json()
                setNotDet(dataFetch.body[0])
                setIsFetching(false)
                // const response = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-notification-visits-batch.php', {
                const response = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-jobs-ack-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        // "notification_id": Notifid,
                    })
                })
                const logData = await response.json()
                setLogData(logData.body)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [Notifid, JobID]);


    return (
        <>

            {reviewModal && (
                <div className="modal">
                    <div className="modal-content" width="300">
                        <form onSubmit={FormAct}>
                            <p>Are you sure you want to Review this visit Log?</p>
                            {/* <textarea required className="form-control w-full rounded" minlength="10" maxlength="50" onChange={(e) => setComment(e.target.value)}></textarea> */}
                            <div className="mt-2 flex justify-between">
                                <button onClick={toggleReviewModal}
                                    className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                                >
                                    Cancel
                                </button>
                                <div>

                                </div>
                                <button
                                    className="btn w-32 bg-purple-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                                    type="submit"
                                >
                                    Continue
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
            {approveModal && (
                <div className="modal">
                    <div className="modal-content" width="300">
                        <form onSubmit={FormAct}>
                            <p>Are you sure you want to Approve this visit Log?</p>
                            {/* <textarea required className="form-control w-full rounded" minlength="10" maxlength="50" onChange={(e) => setComment(e.target.value)}></textarea> */}
                            <div className="mt-2 flex justify-between">
                                <button onClick={toggleApproveModal}
                                    className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                                >
                                    Cancel
                                </button>
                                <div>

                                </div>
                                <button
                                    className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                                    type="submit"
                                >
                                    Continue
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
            <VisitModal isOpen={visitModal} visitId={visitId} closeModal={closeModal} Notifid={Notifid} JobID={JobID} />

            {isFetching && <ProcessorSpinner />}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                <h2 className="text-xl font-semibold">Notification Details</h2>
                <div className="flex justify-end gap-2 items-center mb-4">
                    <button onClick={() => router.back()} className="p-2 bg-gray-400 text-white rounded">Back</button>
                    <p><a href={notice?.notification_file} rel="noreferrer" target="_blank" className="p-2 bg-green-400 text-white rounded">View letter</a></p>
                    {/* <NewNotificationButton id={JobID} /> */}
                    <NewAckButton Notifid={Notifid} JobID={JobID} />
                </div>
                <p className="">
                    <span className="font-semibold">Notification Date:</span>{' '}
                    {notice?.notification_date}
                </p>
                <p className="">
                    <span className="font-semibold">Notification Status:</span>{' '}
                    {notice?.notification_status}
                </p>
                <p className="">
                    <span className="font-semibold">Notification Delivery:</span>{' '}
                    {notice?.notification_delivery}
                </p>
                <p className="">
                    <span className="font-semibold">Done By:</span> {notice?.doneby}
                </p>
                <p className="">
                    <span className="font-semibold">Create Time:</span>{' '}
                    {notice?.createtime}
                </p>
            </div>

            <MaterialTable title="Acknowledgements"
                data={logData}
                columns={fields}

                // actions={
                //     [

                //         rowData => ({
                //             icon: Edit,
                //             tooltip: 'Update',
                //             onClick: (event, rowData) => { setVisitId(rowData.id); openModal() },
                //             hidden: rowData.visit_compliance === "Review" || rowData.visit_compliance === "Compliance"
                //         }),

                //         rowData => ({
                //             icon: RateReview,
                //             tooltip: 'Review',
                //             onClick: (event, rowData) => { setReviewModal(true) },
                //             hidden: rowData.visit_compliance === "Pending" || rowData.visit_compliance === "Review"
                //         }),
                //         rowData => ({
                //             icon: CheckBox,
                //             tooltip: 'Approve',
                //             onClick: (event, rowData) => { setApproveModal(true) },
                //             hidden: rowData.visit_compliance === "Pending" || rowData.visit_compliance === "Compliance"
                //         })

                //     ]
                // }

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
            <style
                jsx>{
                    `
        body.active-modal {
          overflow-y: hidden;
      }
      
      // .btn-modal {
      //     padding: 10px 20px;
      //     display: block;
      //     margin: 100px auto 0;
      //     font-size: 18px;
      // }
      
      .modal, .overlay {
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: fixed;
      }
      
      .overlay {
          background: rgba(49,49,49,0.8);
      }
      .modal-content {
          position: absolute;
          top: 20%;
          left: 60%;
          transform: translate(-50%, -50%);
          line-height: 1.4;
          background: #f1f1f1;
          padding: 14px 28px;
          border-radius: 3px;
          max-width: 400px;
          min-width: 300px;
      }
      
      .close-modal {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 7px;
      }
        `
                }
            </style>
        </>
    );
};

export default Notification;
