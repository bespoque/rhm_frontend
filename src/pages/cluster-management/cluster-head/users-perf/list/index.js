import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
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
import MaterialTable from 'material-table';
import { formatNumber } from '../../../../../functions/numbers';
import { BarChart } from "@material-ui/icons";



const Index = () => {
    const [isFetching, setIsFetching] = useState(() => false);
    const [clusterData, setClusterData] = useState(() => []);
    const [userClusters, setUserClusters] = useState(() => []);

    const router = useRouter()
    const { userEmail, clustId } = router?.query
    const fields = [
        {
            title: "Cluster name",
            field: "cluster_name",
        },
        {
            title: "Target name",
            field: "target_name",
        },
        {
            title: "Target goal",
            field: "target_goal",
            render: (rowData) => {
                return formatNumber(rowData.target_goal)
            },
        },
        {
            title: "Start date",
            field: "target_startdate",
        },
        {
            title: "Deadline",
            field: "target_deadline",
        },
        {
            title: "Target type",
            field: "target_type",
        },
        {
            title: "Status",
            field: "target_status",
        },

    ];



    useEffect(() => {
        async function fetchPost() {
            setIsFetching(true)
            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/target-user-batch.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "user_email": userEmail
                    })
                })

                const dataFetch = await response.json()
                setClusterData(dataFetch.body)
                const filteredData = (dataFetch.body).filter(item => item.cluster_id === clustId);
                setUserClusters(filteredData)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [clustId, userEmail]);




    return (
        <>
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

            <MaterialTable title="cluster member target list"
                data={userClusters}
                columns={fields}

                actions={
                    [
                        {
                            icon: BarChart,
                            tooltip: 'report',
                            onClick: (event, rowData) => {
                                router.push(`/cluster-management/cluster-head/users-perf/dash?targetID=${rowData.target_id}&userEmail=${userEmail}&clusterID=${rowData.target_cluster_id}&targN=${rowData.target_name}&targType=${rowData.target_type}`)
                            }
                        },
                    ]
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
export default Index