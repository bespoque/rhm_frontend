import React, { useEffect, useState } from 'react';
import { ProcessorSpinner } from '../../../../components/spiner';
import { useRouter } from 'next/router';
import NewAckButton from '../acknowledge/button';
import VisitModal from '../visit/visitmodal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";

const SingleVisit = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [notice, setNotDet] = useState({});
    const [logData, setLogData] = useState([])
    const [visitModal, setVisitModal] = useState(false);
    const [visitId, setVisitId] = useState(false);
    const router = useRouter()
    const [reviewModal, setReviewModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const [reviewDecline, setReviewDecline] = useState('');
    const [approveDecline, setApproveDecline] = useState('');
    const [verifyComment, setComment] = useState('');
    const [approveComment, setApprovedComment] = useState('');

    const { VisitId, JobID } = router?.query

    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

    const openModal = () => {
        setVisitModal(true);
    };

    const closeModal = () => {
        setVisitModal(false);
    }

    const toggleReviewModal = () => {
        setReviewDecline("")
        setReviewModal(!reviewModal);
    };
    const toggleApproveModal = () => {
        setApproveDecline("")
        setApproveModal(!approveModal);
    };


    const VerifyAction = async (e) => {
        setIsFetching(true)
        e.preventDefault()
        toggleReviewModal()
        let formData
        if (reviewDecline === "Decline") {
            formData = {
                job_id: JobID,
                notification_id: VisitId,
                action: "review",
                status: "rejected",
                note: verifyComment || "Declined",
                doneby: emailAdd
            }

        } else {
            formData = {
                job_id: JobID,
                notification_id: VisitId,
                action: "review",
                status: "accepted",
                note: "Verified",
                doneby: emailAdd
            }
        }
        try {
            const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-newnotification-approval.php', {
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
                router.reload()

            }
        } catch (error) {
            setIsFetching(false)
            console.error('Server Error:', error)
        }
    }
    const ApproveAction = async (e) => {
        setIsFetching(true)
        e.preventDefault()
        toggleApproveModal()
        let formData
        if (approveDecline === "Decline") {
            formData = {
                job_id: JobID,
                notification_id: VisitId,
                action: "approve",
                status: "rejected",
                note: approveComment || "Declined",
                doneby: emailAdd
            }

        } else {
            formData = {
                job_id: JobID,
                notification_id: VisitId,
                action: "approve",
                status: "accepted",
                note: "Approved",
                doneby: emailAdd
            }
        }

        try {
            const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-newnotification-approval.php', {
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
                router.reload()

            }
        } catch (error) {
            setIsFetching(false)
            console.error('Server Error:', error)
        }
    }


    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notification-auditlog-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        "visit_id": VisitId,
                    })
                })
                const dataFetch = await res.json()
                setNotDet(dataFetch.body[0])
                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [VisitId, JobID]);


    return (
        <>
            <ToastContainer />

            {reviewModal && (
                <div className="modal">
                    <div className="modal-content" width="300">
                        <form onSubmit={VerifyAction}>
                            <p>Are you sure you want to {reviewDecline || "Verify"}?</p>
                            {reviewDecline === "Decline" && (

                                <textarea required className="form-control w-full rounded" minlength="10" maxlength="50" onChange={(e) => setComment(e.target.value)}></textarea>
                            )}
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
                        <form onSubmit={ApproveAction}>
                            <p>Are you sure you want to {approveDecline || "Approve"}?</p>
                            {approveDecline === "Decline" && (

                                <textarea required className="form-control w-full rounded" minlength="10" maxlength="50" onChange={(e) => setApprovedComment(e.target.value)}></textarea>
                            )}

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
            <VisitModal isOpen={visitModal} visitId={visitId} closeModal={closeModal} Notifid={VisitId} JobID={JobID} />

            {isFetching && <ProcessorSpinner />}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Visit details</h2>
                    <div className="flex">
                        <button onClick={() => router.back()} className="p-2 bg-gray-400 text-white w-20 rounded mr-3">Back</button>
                    </div>

                </div>
                <div className="flex justify-end gap-2 items-center mb-4">
                    {
                        <>
                            {notice?.reviewstatus === "rejected" || notice?.approvestatus === "rejected" ? "" :
                                <>
                                    {notice?.reviewstatus === null ?
                                        <>
                                            <button onClick={() => setReviewModal(true)} className="p-2 bg-purple-400 text-white w-20 rounded">Verify</button>
                                            <button onClick={(e) => {
                                                setReviewModal(true)
                                                setReviewDecline(e.target.value)
                                            }
                                            } className="p-2 bg-red-400 text-white w-20 rounded" value="Decline">Decline</button>
                                        </>
                                        : <>
                                            <>
                                                {
                                                    notice?.approvestatus === "accepted" ?
                                                        "" : <>
                                                            {
                                                                notice?.reviewstatus === "accepted" ? <div>
                                                                    <button onClick={() => setApproveModal(true)} className="p-2 bg-green-400 text-white w-20 rounded">Approve</button>
                                                                    <button onClick={(e) => {
                                                                        setApproveModal(true)
                                                                        setApproveDecline(e.target.value)
                                                                    }

                                                                    } className="p-2 bg-red-400 text-white w-20 rounded ml-2" value="Decline">Decline</button>
                                                                </div> : <> </>
                                                            }
                                                        </>
                                                }
                                            </>
                                        </>


                                    }
                                </>
                            }
                        </>
                    }

                    <div>
                        {
                            notice?.reviewstatus === "rejected" || notice?.approvestatus === "rejected" ? "" : <span></span>

                        }
                    </div>

                </div>

                <p className="">
                    <span className="font-semibold">Personel Met:</span>{' '}
                    {notice?.personnelmet}
                </p>
                <p className="">
                    <span className="font-semibold">Designation:</span>{' '}
                    {notice?.designation}
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
                <p className="">
                    <span className="font-semibold">Note:</span>{' '}
                    {notice?.note}
                </p>
            </div>

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

export default SingleVisit;
