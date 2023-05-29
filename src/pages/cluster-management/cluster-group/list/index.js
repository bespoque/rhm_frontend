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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [appGrpData, setAPPGrpData] = useState(() => []);
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
        // {
        //     title: "Goal",
        //     field: "cluster_goal",
        //     render: (rowData) => formatNumber(rowData.cluster_goal),
        // },
        // {
        //     title: "Deadline",
        //     field: "cluster_deadline",
        // },
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

        const fetchPost = async () => {
            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-definition-batch.php', {
                    method: "POST",
                    body: JSON.stringify({
                        "process": "okay"
                    }),
                })
                setIsFetching(false);
                const dataFetch = await response.json()
                setAPPGrpData(dataFetch.body)
            } catch (error) {
                console.log(error)
                setIsFetching(false);
            }
        };
        fetchPost();
    }, []);


    async function onSubmit(formData) {
        console.log("data", formData.app_id);
        setIsSubmitting(true)

        try {
            const response = await fetch('https://bespoque.dev/rhm/cluster/clusters-batch.php', {
                method: 'POST',
                body: JSON.stringify({
                    "cluster_definition_id": formData.cluster_definition_id,
                })
            })

            const dataFetch = await response.json()
            setClusterData(dataFetch.body)
            // router.push('/view/access-rights/list/')
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }
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
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mb-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="cluster_status" className="block mb-1">Cluster Definition:</label>
                        <select
                            required
                            id="cluster_definition_id"
                            name="cluster_definition_id"
                            className="border border-gray-300 p-2 w-full"
                            ref={register()}
                        >
                            <option value="">Select Definition</option>
                            {appGrpData.map((app) => <option key={app.id} value={app.id}>{`${app.cluster_name}`}</option>)}
                        </select>
                    </div>
                    <div class="flex self-end">
                        <button
                            className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'
                                } text-white font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Fetching...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </form>

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
                    // if (userGroup.some(r => reportRange.includes(r))) {
                    //   ''

                    // } else {
                    //   window.open(`/view/listverifiedboj/${rowData.assessment_id},${rowData.kgtin}`, "_self")
                    //   event.stopPropagation();
                    // }
                }}
            />
        </>
    )
}
export default index