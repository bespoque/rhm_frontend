import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import SectionTitle from '../../../../components/section-title';
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
import MaterialTable from 'material-table';


const index = () => {
    const [isFetching, setIsFetching] = useState(() => false);
    const [clusterData, setClusterData] = useState(() => []);
    const router = useRouter()
    const { register, handleSubmit, errors } = useForm();
    const formatNumber = (number) => number.toLocaleString('en-US')
    const fields = [
        // {
        //   title: "SN",
        //   field: "serialNo",
        //   filtering: false,
        //   width: "10%"
        // },
        {
            title: "Name",
            field: "cluster_name",
        },
        {
            title: "Cluster Head",
            field: "cluster_head",
        },
        {
            title: "Status",
            field: "cluster_status",
        },
        {
            title: "Created time",
            field: "createtime",
        },

    ];

    useEffect(() => {

        async function fetchPost() {
            setIsFetching(true)

            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/clusters-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "process": "okay",
                    })
                })

                const dataFetch = await response.json()
                setClusterData(dataFetch.body)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, []);



    return (
        <>
            <SectionTitle subtitle="List clusters" />
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

            <MaterialTable title="Cluster List"
                data={clusterData}
                columns={fields}

                options={{
                    search: true,
                    paging: true,
                    // filtering: true,
                    exportButton: {
                        csv: true,
                        pdf: false
                    },
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

                onRowClick={(event, rowData) => {
                    event.stopPropagation();
                    window.open(`/cluster-management/cluster-group/edit?id=${rowData.id}`, "_self")
                }}
            />
        </>
    )
}
export default index