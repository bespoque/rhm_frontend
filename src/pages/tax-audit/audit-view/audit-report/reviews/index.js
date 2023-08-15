
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../../../components/spiner';


export default function Reviews() {
    const [isFetching, setIsLoading] = useState(() => true);
    const [data, setData] = useState()
    const router = useRouter()
    const { jobId, reportId } = router?.query

    const fields = [
        {
            title: "Details",
            field: "details",
        },
        {
            title: "Status",
            field: "status",
        },
        {
            title: "Created time",
            field: "createdate",
        }
    ];


    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-auditreports-reviews-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": jobId,
                        "auditreport_id": reportId,
                    })
                })
                const dataFetch = await res.json()

                setData(dataFetch.body)
                setIsLoading(false)
            } catch (error) {
                console.log('Server Error:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPost();
    }, [jobId, reportId]);

    return (
        <>
            {isFetching && <ProcessorSpinner />}
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded my-2" onClick={() => router.back()}>
               Back
            </button>
            <MaterialTable title="Audit Report Reviews"
                data={data}
                columns={fields}

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