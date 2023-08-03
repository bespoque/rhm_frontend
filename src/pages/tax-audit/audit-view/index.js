import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ProcessorSpinner } from '../../../components/spiner';
import SectionTitle from '../../../components/section-title';
import Search from '@material-ui/icons/Search'
import * as Icons from '../../../components/Icons/index'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { MoreHoriz, NextWeekRounded } from "@material-ui/icons";
import MaterialTable from '@material-table/core';
import NewNotificationButton from './notification/button';


const Index = () => {
    const [isFetching, setIsFetching] = useState(() => true);
    const [job, setJob] = useState(() => []);
    const [notificationData, setNotificationData] = useState(() => []);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const router = useRouter()
    const { id } = router?.query

    const fields = [
        {
            title: "Date",
            field: "notification_date",
        },
        {
            title: "Status",
            field: "notification_status",
        },
        {
            title: "Delivery",
            field: "notification_delivery",
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
            title: "Action type",
            field: "actionType"
        }
    ];

    function getIndividualYears(startDate, endDate) {
        // Parse start date components
        const startComponents = startDate.split("-");
        const startYear = parseInt(startComponents[2]);
        const startMonth = parseInt(startComponents[1]);
        const startDay = parseInt(startComponents[0]);

        // Parse end date components
        const endComponents = endDate.split("-");
        const endYear = parseInt(endComponents[2]);
        const endMonth = parseInt(endComponents[1]);
        const endDay = parseInt(endComponents[0]);

        // Initialize the array to store the individual years
        const years = [];

        // Loop through the years and add them to the array
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }

        return years;
    }

    // Example usage:
    const startDate = "01-01-2019";
    const endDate = "30-12-2022";
    const individualYears = getIndividualYears(startDate, endDate);
    console.log(individualYears);


    // function getIndividualYears(startDate, endDate) {
    //     // Parse start date components
    //     const startComponents = startDate.split("-");
    //     const startYear = parseInt(startComponents[2]);
    //     const startMonth = parseInt(startComponents[1]);
    //     const startDay = parseInt(startComponents[0]);

    //     // Parse end date components
    //     const endComponents = endDate.split("-");
    //     const endYear = parseInt(endComponents[2]);
    //     const endMonth = parseInt(endComponents[1]);
    //     const endDay = parseInt(endComponents[0]);

    //     // Initialize the array to store the individual years
    //     const years = [];

    //     // Loop through the years and add them to the array
    //     for (let year = startYear + 1; year < endYear; year++) {
    //         years.push(year);
    //     }

    //     return years;
    // }

    // // Example usage:
    // const startDate = "01-01-2019";
    // const endDate = "30-12-2022";
    // const individualYears = getIndividualYears(startDate, endDate);
    // console.log(individualYears);


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCloseModal = (event) => {
        event.stopPropagation(); // Prevent event bubbling
        closeModal();
    };

    console.log("modalIsOpen", modalIsOpen);
    useEffect(() => {

        async function fetchPost() {

            try {
                const response = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-fetch-singlejob.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "param1": "id",
                        "param2": id,
                    })
                })


                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-notifications-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": id,
                    })
                })
                const dataFetch = await res.json()
                setNotificationData(dataFetch.body)

                const dataFetchJobDet = await response.json()
                setJob(dataFetchJobDet.body[0])
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

            <SectionTitle title="Audit view" />


            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-2">
                <div className="w-full flex items-center lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-2">
                    <article className="p-2">
                        <p className="font-bold"><span className="text-base">Tax Id</span> : <span>{job.job_kgtin}</span></p>
                        <p className="font-bold"><span className="text-base">Auditor</span> : <span>{job.job_user}</span></p>
                        <p className="font-bold"> <span className="text-base">Type</span>: <span>{job.job_job_type}</span></p>
                        <p className="font-bold"><span className="text-base">Job start status</span> : <span>{job.job_start_status}</span></p>
                        <p className="font-bold"><span className="text-base">Job progress status</span> : <span>{job.job_progress_status}</span></p>
                        <p className="font-bold"><span className="text-base">Job start date</span> : <span>{job.job_startdate}</span></p>
                        <p className="font-bold"><span className="text-base">Job audit start</span> : <span>{job.job_auditdate_start}</span></p>
                        <p className="font-bold"><span className="text-base">Job audit end</span> : <span>{job.job_auditdate_end}</span></p>
                        <p className="font-bold"><span className="text-base">Job initiator</span> : <span>{job.job_initiator}</span></p>
                    </article>

                </div>
                <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <div className="accordion border border-gray-300 mb-10">
                        <div
                            className=' accordion-header text-center bg-gray-100 p-4 cursor-pointer bg-gray-200 '
                        >
                            <div className="flex justify-between">
                                <span>
                                    Job Menu
                                </span>
                            </div>
                        </div>

                        <div className="accordion-content p-4">
                            <button className="btn block p-2 bg-gray-100 w-full m-2"
                                onClick={openModal}
                            > Assessment

                                {modalIsOpen && (
                                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-opacity-50">
                                        <div className="bg-white p-4 rounded-lg border">
                                            <p className="font-bold">Assessment Years</p>
                                            <div className="grid grid-cols-4 gap-4">
                                                {individualYears.map((year) => (
                                                    <button
                                                        key={year}
                                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                                                    >
                                                        {year}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                                    onClick={handleCloseModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </button>
                            <button className="btn block p-2 bg-blue-100 w-full m-2">Notification letter</button>
                            <button className="btn block p-2 bg-gray-100 w-full m-2"
                                onClick={() => router.push(`/tax-audit/audit-view/acknowledge/list/jobacklist?JobID=${id}`)}>
                                Acknowledgements
                            </button>
                            <button className="btn block p-2 bg-gray-100 w-full m-2"
                                onClick={() => router.push(`/tax-audit/audit-view/audit-report/list?JobID=${id}`)}
                            >
                                Audit Reoprt
                            </button>
                            <button className="btn block p-2 bg-gray-100 w-full m-2"
                                onClick={() => router.push(`/tax-audit/audit-view/notes/list?JobID=${id}`)}
                            >Notes</button>
                            <button className="btn block p-2 bg-gray-100 w-full m-2">Compliance</button>
                            <button className="btn block p-2 bg-gray-100 w-full m-2">Objections</button>
                        </div>
                    </div>
                </div>
            </div>



            <p className="flex justify-end m-2">
                <NewNotificationButton id={id} />
            </p>
            <MaterialTable title="Job notifications"
                data={notificationData}
                columns={fields}

                actions={
                    [

                        {
                            icon: MoreHoriz,
                            tooltip: 'Notification',
                            onClick: (event, rowData) => router.push(`/tax-audit/audit-view/notification?Notifid=${rowData.id}&JobID=${rowData.job_id}`),
                        },
                        {
                            icon: NextWeekRounded,
                            tooltip: 'Acknowledgement',
                            onClick: (event, rowData) => router.push(`/tax-audit/audit-view/acknowledge/list/notifacklist?Notifid=${rowData.id}&JobID=${rowData.job_id}`),

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
export default Index