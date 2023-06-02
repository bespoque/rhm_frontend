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
import {ExportCsv, ExportPdf} from '@material-table/exporters/csv'


const Assessment = () => {
    const [isFetching, setIsFetching] = useState(() => false);
    const [clusterData, setClusterData] = useState(() => []);
    const [reportHeader, setReportHeader] = useState(() => []);
    const router = useRouter()
    const { targetID } = router.query

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
            render: (rowData) => {
                return formatNumber(rowData.amount)
            },
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

                const dataFetch = await response.json()
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


    return (
        <>
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

            // onRowClick={(event, rowData) => {
            //     event.stopPropagation();
            //     window.open(`/cluster-management/cluster-target/edit?id=${rowData.target_id}`, "_self")
            // }}
            />
        </>
    )
}
export default Assessment