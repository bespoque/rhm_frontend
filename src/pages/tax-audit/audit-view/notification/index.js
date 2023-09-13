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
import { Edit } from '@material-ui/icons';
import VisitModal from '../visit/visitmodal';

const Notification = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [notice, setNotDet] = useState({});
    const [logData, setLogData] = useState([])
    const [visitModal, setVisitModal] = useState(false);
    const [visitId, setVisitId] = useState(false);
    const router = useRouter()
    const { Notifid, JobID } = router?.query

    const openModal = () => {
        setVisitModal(true);
    };

    const closeModal = () => {
        setVisitModal(false);
    }

    const fields = [
        {
            title: "Visit date",
            field: "visit_date",
        },
        {
            title: "Status",
            field: "visit_status",
        },

        {
            title: "Action type",
            field: "actionType"
        },
        {
            title: "Compliance",
            field: "visit_compliance"
        },
        {
            title: "Created by",
            field: "doneby",
        },
        {
            title: "Reviewed by",
            field: "reviewby",
        },
        {
            title: "Created time",
            field: "createtime",
        },
    ];

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
                const response = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-notification-visits-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        "notification_id": Notifid,
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
            <VisitModal isOpen={visitModal} visitId={visitId} closeModal={closeModal} Notifid={Notifid} JobID={JobID}/>

            {isFetching && <ProcessorSpinner />}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                <h2 className="text-xl font-semibold">Notification Details</h2>
                <div className="flex justify-end gap-2 items-center mb-4">
                    <p><a href={notice?.notification_file} rel="noreferrer" target="_blank" className="p-2 bg-green-400 text-white rounded">View letter</a></p>
                    <NewNotificationButton id={JobID} />
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

            <MaterialTable title="Visit Log"
                data={logData}
                columns={fields}

                actions={
                    [

                        {
                            icon: Edit,
                            tooltip: 'Details',
                            onClick: (event, rowData) => {setVisitId(rowData.id); openModal() }
                            // onClick: (event, rowData) =>  <AcknModal isOpen={openModal} closeModal={closeModal} Notifid={Notifid} JobID={JobID}/>,
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
    );
};

export default Notification;
