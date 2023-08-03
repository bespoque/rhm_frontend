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
import { } from '../../../functions/numbers';
import { MoreHoriz, Payment } from "@material-ui/icons";
import SectionTitle from '../../../components/section-title';
import MaterialTable from '@material-table/core';
// import MaterialTable from 'material-table';
import { Pie } from 'react-chartjs-2';
import { formatNumber } from 'accounting';
import { ProcessorSpinner } from '../../../components/spiner';


const Assessment = () => {
    const [isFetching, setIsFetching] = useState(() => false);
    const [clusterData, setClusterData] = useState(() => []);
    const [clustRec, setClustRec] = useState(() => []);
    const [targRec, setTargRec] = useState(() => []);
    const [reportHeader, setReportHeader] = useState(() => []);
    const [perform, setPer] = useState(() => (0))
    const router = useRouter()
    const { targetID, clusterID, targN } = router?.query

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
                let reportArray = dataFetch.body
                const totalAmount = reportArray.reduce((sum, obj) => parseInt(sum) + parseInt(obj.amount || 0), 0);
                setPer(totalAmount)
                const targRecFetch = await result.json()
                const clustRecFetch = await res.json()
                setTargRec(targRecFetch.body[0])
                setClustRec(clustRecFetch.body[0])
                setClusterData(dataFetch.body)
                let headerMsg = (dataFetch?.reportHeader).slice(8);
                setReportHeader(headerMsg)


            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [router]);

    const targetGoal = targRec.target_goal || 0


    const data = {
        labels: ['Goal', 'Performance'],
        datasets: [
            {
                data: [targetGoal, perform],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <>
            {isFetching && <ProcessorSpinner />}
            <SectionTitle subtitle={reportHeader} />
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full flex items-center lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

                    <article className="p-6">
                        <p className="font-bold"><span className="text-base">Target</span> : <span>{targN}</span></p>
                        <p className="font-bold"><span className="text-base">Start</span> : <span>{targRec?.target_startdate}</span></p>
                        <p className="font-bold"> <span className="text-base">Deadline</span>: <span>{targRec?.target_deadline}</span></p>
                        <p className="font-bold"><span className="text-base">Cluster</span> : <span>{clustRec?.cluster_name}</span></p>
                        <p className="font-bold"><span className="text-base">Head</span> : <span>{clustRec?.cluster_head}</span></p>
                    </article>

                </div>
                <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <Pie data={data} />
                    <p>Goal: <span className="font-bold">{formatNumber(targetGoal)}</span></p>
                    <p>Performance: <span className="font-bold">{formatNumber(perform)}</span> ({`${(((parseInt(perform) / parseInt(targetGoal)) * 100).toFixed(2))}%`})</p>
                    <p>Remaining: <span className="font-bold">{formatNumber(Number(targetGoal - perform))}</span>  ({`${((100 - (parseInt(perform) / parseInt(targetGoal)) * 100).toFixed(2))}%`}) </p>
                </div>
            </div>


            <MaterialTable
                title="Cluster assessment report"
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

                options={
                    {
                        search: true,
                        paging: true,
                        filtering: true,
                        actionsColumnIndex: -1
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
            />
        </>
    )
}
export default Assessment