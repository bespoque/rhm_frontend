import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ProcessorSpinner } from '../../../../components/spiner';
import SectionTitle from '../../../../components/section-title';
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
import { MoreHoriz, NextWeekRounded, Email } from "@material-ui/icons";
import MaterialTable from '@material-table/core';
import NewNotificationButton from './../notification/button';
import Modal from '@material-ui/core/Modal';



const AuditNotice = () => {
    const [isFetching, setIsFetching] = useState(() => true);
    const [job, setJob] = useState(() => []);
    const [notificationData, setNotificationData] = useState(() => []);
    const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
    const [isModalOpenPDF, setIsModalOpenPDF] = useState(false);


    const router = useRouter()
    const { id } = router?.query

    const fields = [
        {
            title: "Notice Date",
            field: "notification_date",
        },
        {
            title: "Verify status",
            field: "reviewstatus",
        },
        {
            title: "Approve status",
            field: "approvestatus",
        },
        {
            title: "Created by",
            field: "doneby",
        },
        {
            title: "Created time",
            field: "createtime",
        },
        {
            title: "Type",
            field: "actionType"
        }
    ];


    const startDate = job?.job_auditdate_start || "";
    const endDate = job?.job_auditdate_end || "";

    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    const auditStartYr = dateStart.getFullYear()
    const auditEndYr = dateEnd.getFullYear()



    const usersArr = String(job.job_user).split(',')

    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-fetch-singlejob.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "param1": "id",
                        "param2": id
                    })
                })

                const dataFetchJobDet = await response.json()
                setJob(dataFetchJobDet.body[0])

                const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notifications-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": id,
                    })
                })
                const dataFetch = await res.json()
                setNotificationData(dataFetch.body)


                setIsFetching(false)
            } catch (error) {
                setIsFetching(false)
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [id]);



    return (
        <>
            {isFetching && <ProcessorSpinner />}

            <SectionTitle title="Notifications" />


            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-2">
                <div className="w-full lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-2">
                    <div className="p-2 max-w-xs">
                        <p className="font-semibold text-gray-500">Taxpayer Details</p>
                        <hr />
                        <div className="flex justify-between">
                            <p>Taxpayer: <p></p> </p>
                            <p>Tax Id <p className="font-semibold">{job?.job_kgtin}</p></p>
                        </div>
                        <p className="font-semibold text-gray-500">Job Details</p>
                        <hr />
                        <div className="flex justify-between my-2">
                            <p>Type: <p className="font-semibold">{job?.job_job_type}</p> </p>
                            <p>Start date <p className="font-semibold">{job?.job_startdate}</p></p>
                        </div>
                        <div>
                            <p>Audit Period</p>
                            <p className="font-semibold">Jan, {auditStartYr} - Dec, {auditEndYr}</p>
                        </div>
                        <div className="mt-2 mb-4">
                            <p>Status</p>
                            <p className="font-semibold">{job.job_progress_status}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between gap-2">
                            <p>Auditor
                                {usersArr.map((user) => (
                                    <p className="font-semibold">{user}</p>
                                ))
                                }
                            </p>
                            <p>Initiator <p className="font-semibold">{job.job_initiator}</p></p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

                    <div className="max-w-xs">
                        <p className="font-semibold text-gray-500">Menu</p>
                        <hr />
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view?id=${id}`)}
                        >Home</button>
                        <button className="btn block p-2 bg-gray-100 rounded-tr-lg m-2">Notifications</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tl-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/acknowledge/list/jobacklist?JobID=${id}`)}>
                            Job Acknowledgements
                        </button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/correspondence/correspondence?id=${id}`)}
                        >
                            Correspondence
                        </button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Visit log</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Compliance</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Audit Report</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Assessment</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Demand Notice</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Objection</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Tarc</button>

                        {/* <button className="btn block p-2 bg-blue-200 rounded-tl-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/acknowledge/list/jobacklist?JobID=${id}`)}>
                            Visit Log
                        </button> */}
                        {/* <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/audit-report/list?JobID=${id}`)}
                        >
                            Audit Report
                        </button>
                        <button className="btn block p-2 bg-blue-100 rounded-tl-lg m-2"
                            onClick={() => router.push(`/tax-audit/audit-view/notes/list?JobID=${id}`)}
                        >Notes</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tr-lg m-2">Compliance</button>
                        <button className="btn block p-2 bg-blue-100 rounded-tl-lg m-2">Objections</button> */}
                    </div>

                </div>
            </div>

            <div className="flex justify-end m-2">
                <NewNotificationButton id={id} auditStartYr={auditStartYr} auditEndYr={auditEndYr} />
            </div>
            <MaterialTable title="Notifications"
                data={notificationData}
                columns={fields}

                actions={
                    [

                        {
                            icon: MoreHoriz,
                            tooltip: 'Details',
                            onClick: (event, rowData) => router.push(`/tax-audit/audit-view/notification?Notifid=${rowData.id}&JobID=${rowData.job_id}`),
                        },
                        {
                            icon: NextWeekRounded,
                            tooltip: 'Acknowledgement',
                            onClick: (event, rowData) => router.push(`/tax-audit/audit-view/acknowledge/list/notifacklist?Notifid=${rowData.id}&JobID=${rowData.job_id}`),

                        },
                        {
                            icon: Email,
                            tooltip: 'Letter',
                            onClick: (event, rowData) => {
                                setSelectedPdfUrl(`https://test.rhm.backend.bespoque.ng/notification-file-pdf.php?fileno=${rowData.notification_fileno}`);
                                setIsModalOpenPDF(true);
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
            <Modal
                open={isModalOpenPDF}
                onClose={() => setIsModalOpenPDF(false)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <iframe
                    title="PDF Viewer"
                    src={selectedPdfUrl}
                    width="50%"
                    height="600"
                />
            </Modal>

        </>
    )
}
export default AuditNotice