import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import { MoreHoriz, Payment } from "@material-ui/icons";
// import MaterialTable from 'material-table';
import { ExportCsv, ExportPdf } from '@material-table/exporters/csv'

import { formatNumber } from 'accounting';
import { ProcessorSpinner } from '../../../../components/spiner/index';


const Index = () => {
    const [isFetching, setIsFetching] = useState(() => true);
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
                // setClusterData(dataFetch.body)
                // let headerMsg = (dataFetch?.reportHeader).slice(8);
                // setReportHeader(headerMsg)

                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [router]);

    const targetGoal = targRec.target_goal || 0


    return (
        <>
            {isFetching && <ProcessorSpinner />}
            {/* <SectionTitle subtitle={reportHeader} /> */}
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
                    <div className="grid grid-cols-2 gap-4 content-between">
                        <button className="bg-blue-600 p-4 text-white rounded-xl shadow-md">Registration </button>
                        <button className="bg-pink-600 p-4 text-white rounded-xl shadow-md">Assessment</button>
                        <button className="bg-green-600 p-4 text-white rounded-xl shadow-md">Collection</button>
                        <button className="bg-purple-600 p-4 text-white rounded-xl shadow-md"> Over view</button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Index