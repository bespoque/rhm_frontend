import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { formatNumber } from 'accounting';
import { ProcessorSpinner } from '../../../../../components/spiner/index';
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
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from "@material-table/exporters";


const Index = () => {
    const [isFetching, setIsFetching] = useState(() => true);
    const [TotalAssAmt, setTotalAssAmt] = useState(() => "");
    const [TotalReg, setTotalReg] = useState(() => "");
    const [clustRec, setClustRec] = useState(() => []);
    const [targRec, setTargRec] = useState(() => []);
    const [showAssmt, setShowAssmt] = useState(false);
    const [showReg, setShowReg] = useState(false);
    const [showAssmtTab, setAssmtTab] = useState(false);
    const [showRegTab, setShowRegTab] = useState(false);
    const [assReport, setAssReport] = useState(() => [])
    const [tpList, setTpList] = useState(() => [])
    const [regcol, SetregCol] = useState(() => "")
    const [assmtCol, SetAssmtCol] = useState(() => "")
    const router = useRouter()
    const { targetID, clusterID, targN, targType, userEmail } = router?.query



    const fields = [
        {
            title: "KGTIN",
            field: "KGTIN",
        },
        {
            title: "Name",
            field: "FullNames",
        },
        {
            title: "Gender",
            field: "Gender",
        },
        {
            title: "Phone",
            field: "telephone",
        },
        {
            title: "Tax Office",
            field: "tax_office",
        },
        {
            title: "Created date",
            field: "enter_date",
        },

    ];

    const Assfields = [
        {
            title: "KGTIN",
            field: "KGTIN",
        },
        {
            title: "Assessment ID",
            field: "assessment_id",
        },
        {
            title: "Ref",
            field: "ref",
        },
        {
            title: "Amount",
            field: "amount",
            render: (rowData) => {
                return formatNumber(rowData.amount)
            },
        },
        {
            title: "Channel",
            field: "channel_id",
        },
        {
            title: "Transaction date",
            field: "trans_date",
        },

    ];


    useEffect(() => {

        async function fetchPost() {

            try {
                const res = await fetch('https://bespoque.dev/rhm/cluster/cluster-details.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "id": clusterID,
                    })
                })
                const result = await fetch('https://bespoque.dev/rhm/cluster/target-details.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "target_id": targetID,
                    })
                })
                const targRecFetch = await result.json()
                const clustRecFetch = await res.json()
                setTargRec(targRecFetch.body[0])
                setClustRec(clustRecFetch.body[0])
                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [router]);

    const AssessmentRep = async (button) => {
        setIsFetching(true)
        try {
            const res = await fetch('https://bespoque.dev/rhm/cluster/target-revenueofficer-assessment.php', {
                method: 'POST',
                body: JSON.stringify({
                    "target_id": targetID,
                    "user_id": userEmail
                })
            })
            const assReportFetch = await res.json()
            setTotalAssAmt(assReportFetch.totalAmount)
            setAssReport(assReportFetch.body)
            setIsFetching(false)
            if (button === "list") {
                setAssmtTab(true)
                setShowAssmt(!true)
            } else {
                setAssmtTab(!true)
                setShowAssmt(true)
            }
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsFetching(false)
        }
    }
    const RegRep = async (button) => {
        setIsFetching(true)
        try {
            const res = await fetch('https://bespoque.dev/rhm/cluster/target-revenueofficer-registration.php', {
                method: 'POST',
                body: JSON.stringify({
                    "target_id": targetID,
                    "user_id": userEmail
                })
            })
            const regReportFetch = await res.json()
            setTpList(regReportFetch.body)
            setTotalReg(regReportFetch.totalRec)
            SetregCol(regReportFetch.collection)
            SetAssmtCol(regReportFetch.collection)
            setIsFetching(false)
            if (button === "list") {
                setShowRegTab(true)
                setShowReg(!true)
            } else {
                setShowRegTab(!true)
                setShowReg(true)
            }
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsFetching(false)
        }
    }



    return (
        <>
            {isFetching && <ProcessorSpinner />}
                <h6>Cluster member report</h6>
                <p>{userEmail}</p>
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full flex items-center lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

                    <article className="p-6">

                        <p className="font-bold"><span className="text-base">Target</span> : <span>{targN}</span></p>
                        <p className="font-bold"><span className="text-base">Target Type</span> : <span>{targRec.target_type}</span></p>
                        <p className="font-bold"><span className="text-base">Target Goal</span> : <span>{formatNumber(targRec?.target_goal)}</span></p>
                        <p className="font-bold"><span className="text-base">Start</span> : <span>{targRec?.target_startdate}</span></p>
                        <p className="font-bold"> <span className="text-base">Deadline</span>: <span>{targRec?.target_deadline}</span></p>
                        <p className="font-bold"><span className="text-base">Cluster</span> : <span>{clustRec?.cluster_name}</span></p>
                        <p className="font-bold"><span className="text-base">Cluster Head</span> : <span>{clustRec?.cluster_head}</span></p>
                    </article>

                </div>
                <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    {targType === "Assessment" ?
                        <div className="grid grid-cols-2 gap-4 content-between">
                            <button className="bg-pink-600 p-4 text-white rounded-xl shadow-md" onClick={() => AssessmentRep("overview")}>Overview</button>
                            <button className="bg-purple-600 p-4 text-white rounded-xl shadow-md" onClick={() => AssessmentRep("list")}>List</button>
                        </div> :
                        <div>
                            {targType === "Taxpayers" ?
                                <div className="grid grid-cols-2 gap-4 content-between">
                                    <button className="bg-blue-600 p-4 text-white rounded-xl shadow-md" onClick={() => RegRep("overview")}>Overview </button>
                                    <button className="bg-purple-600 p-4 text-white rounded-xl shadow-md" onClick={() => RegRep("list")}>List</button>
                                </div> :
                                <div>
                                    {targType === "Collection" ?
                                        <div className="grid grid-cols-2 gap-4 content-between">
                                            <button className="bg-yellow-600 p-4 text-white rounded-xl shadow-md">Overview</button>
                                            <button className="bg-purple-600 p-4 text-white rounded-xl shadow-md">List</button>
                                        </div> : ""
                                    }
                                </div>
                            }

                        </div>
                    }

                </div>
            </div>

            {
                showAssmt && (
                    <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl  overflow-hidden md:max-w-2xl p-4">
                        <p className="my-3 text-center">Assessment Performance</p>
                        <div className="grid grid-cols-2 gap-4 content-between">
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Total Number of Assessment: {formatNumber(assReport?.length)}</button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Total Assessment Amount: {formatNumber(TotalAssAmt)} </button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Percentage Performance: {`${((Number(TotalAssAmt) / Number(targRec?.target_goal)) * 100).toFixed(2)} %`}</button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Collection from Assessments: {formatNumber(assmtCol)}</button>
                        </div>
                    </div>
                )

            }

            {
                showReg && (
                    <div className="w-full lg:w-2/2 w-full max-w-md mx-auto bg-white rounded-xl  overflow-hidden md:max-w-2xl p-4">
                        <p className="my-3 text-center">Taxpayer Registration Performance</p>
                        <div className="grid grid-cols-3 gap-4 content-between">
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Total Number of Registration: {formatNumber(TotalReg)}</button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Percentage Performance: {`${((Number(TotalReg) / Number(targRec?.target_goal)) * 100).toFixed(2)} %`}</button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Total Collection Amount: {formatNumber(regcol)}</button>
                        </div>
                    </div>
                )

            }

            {
                showRegTab && (
                    <div>
                        <MaterialTable title="Taxpayer List"
                            data={tpList}
                            columns={fields}

                            options={{
                                search: true,
                                paging: true,
                                filtering: true,
                                actionsColumnIndex: -1,
                                exportMenu: [
                                    {
                                        label: "Export PDF",
                                        exportFunc: (cols, datas) =>
                                            ExportPdf(cols, datas, "myPdfFileName"),
                                    },
                                    {
                                        label: "Export CSV",
                                        exportFunc: (cols, datas) =>
                                            ExportCsv(cols, datas, "myCsvFileName"),
                                    },
                                ],
                                exportAllData: true,

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
                    </div>

                )

            }

            {
                showAssmtTab && (
                    <div>
                        <MaterialTable title="Assessment List"
                            data={assReport}
                            columns={Assfields}

                            options={{
                                search: true,
                                paging: true,
                                filtering: true,
                                actionsColumnIndex: -1,
                                exportMenu: [
                                    {
                                        label: "Export PDF",
                                        exportFunc: (cols, datas) =>
                                            ExportPdf(cols, datas, "myPdfFileName"),
                                    },
                                    {
                                        label: "Export CSV",
                                        exportFunc: (cols, datas) =>
                                            ExportCsv(cols, datas, "myCsvFileName"),
                                    },
                                ],
                                exportAllData: true,

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
                    </div>

                )

            }
        </>
    )
}
export default Index