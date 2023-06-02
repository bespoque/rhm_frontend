import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import Search from '@material-ui/icons/Search'
import * as Icons from '../../../components/Icons/index';
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { formatNumber } from '../../../functions/numbers';
import { MoreHoriz, Payment } from "@material-ui/icons";
import SectionTitle from '../../../components/section-title';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters/csv'


const Assessment = () => {
    const [isFetching, setIsFetching] = useState(() => false);
    const [clusterData, setClusterData] = useState(() => []);
    const [clustRec, setClustRec] = useState(() => []);
    const [targRec, setTargRec] = useState(() => []);
    const [reportHeader, setReportHeader] = useState(() => []);
    const router = useRouter()
    const { targetID, clusterID, targN } = router?.query
    console.log("targetID", targetID);
    console.log("clusterID", clusterID);
    console.log("targN", targN);
    const fields = [
        {
            title: "Cluster",
            field: "cluster_name",
        },
        {
            title: "Assessment Id",
            field: "assessment_id",
        },
        {
            title: "KGTIN",
            field: "KGTIN",
        },
        {
            title: "Amount",
            field: "amount",
            render: rowData => formatNumber(rowData.amount),
            // customTotal: (data) => data.reduce((acc, current) => Number(acc) + Number(current.amount || 0), 0)
        },
        {
            title: "Captured by",
            field: "done_by",
        },
        {
            title: "Transaction date",
            field: "trans_date",
        },

    ];


    useEffect(() => {

        async function fetchPost() {
            setIsFetching(true)

            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/target-report-assessment.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "target_id": targetID
                    })
                })
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
                const dataFetch = await response.json()
                const targRecFetch = await result.json()
                const clustRecFetch = await res.json()
                setTargRec(targRecFetch.body[0])
                setClustRec(clustRecFetch.body[0])
                setClusterData(dataFetch.body)
                let headerMsg = (dataFetch?.reportHeader).slice(8);
                setReportHeader(headerMsg)
                console.log("dataFetch?.reportHeader", dataFetch.reportHeader);


            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [router]);

    console.log("clustRec", clustRec);
    return (
        <>
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <div className="flex justify-center">
                        <div>
                            <p className="font-bold"><span>Target</span> : <span>{targN}</span></p>
                            <p className="font-bold"><span>Start</span> : <span>{targRec?.target_startdate}</span></p>
                            <p className="font-bold"> <span>Deadline</span>: <span>{targRec?.target_deadline}</span></p>
                            <p className="font-bold"><span>Cluster</span> : <span>{clustRec?.cluster_name}</span></p>
                            <p className="font-bold"><span>Head</span> : <span>{clustRec?.cluster_head}</span></p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    Right side
                </div>
            </div>
            <SectionTitle subtitle={reportHeader} />
            {isFetching && (
                <div className="flex justify-center item mb-2">
                    <Loader
                        visible={isFetching}
                        type="BallTriangle"
                        color="#00FA9A"
                        height={19}
                        width={19}
                        timeout={0}
                        className="ml-2"
                    />
                    <p>Fetching data...</p>
                </div>
            )}

            <MaterialTable title="Cluster assessment report"
                data={clusterData}
                columns={fields}

                renderSummaryRow={({ column, data }) =>
                    column.field === "amount"
                        ? {
                            value: formatNumber(
                                data.reduce((agg, row) => Number(agg) + (Number(row?.amount)), 0)
                                // data.reduce("100000")
                                // data.reduce((acc, current) => acc + (current.amount || 0 ), 0)
                            ),
                            style: { fontWeight: "bold" },
                        }
                        : undefined
                }

                actions={
                    [

                        {
                            icon: MoreHoriz,
                            tooltip: 'View Assessment',
                            onClick: (event, rowData) => router.push(`/view/approvedasses/${rowData.assessment_id},${rowData.KGTIN}`),

                        },
                        {
                            icon: Payment,
                            tooltip: 'View Receipt',
                            onClick: (event, rowData) => router.push(`/collection-receipt/${rowData.assessment_id}`),

                        },
                    ]
                }

                options={
                    {
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

                    }
                }

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

            // onRowClick={(event, rowData) => {
            //     event.stopPropagation();
            //     window.open(`/cluster-management/cluster-target/edit?id=${rowData.target_id}`, "_self")
            // }}
            />
        </>
    )
}
export default Assessment