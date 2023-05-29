import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import MaterialTable from "@material-table/core";
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

const AccessList = () => {
    const [clusterDef, setClusterDef] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => true);

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
        // },
        // {
        //     title: "Deadline",
        //     field: "cluster_deadline",
        // },
        {
            title: "Status",
            field: "cluster_status",
        },

    ];

    useEffect(() => {
        let num = 1
        const fetchPost = async () => {

            try {
                const response = await fetch('https://bespoque.dev/rhm/cluster/cluster-definition-batch.php', {
                    method: "POST",
                    body: JSON.stringify({
                        "process": "okay"
                    }),
                })
                setIsFetching(false);
                const data = await response.json()
                console.log("data", data.body)
                // for (let i = 0; i < res.length; i++) {
                //   let rec = data.body[i]

                // }
                setClusterDef(data.body)
            } catch (error) {
                console.log(error.message)
                setIsFetching(false);
            }
        };
        fetchPost();
    }, []);



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

            <MaterialTable title="Cluster Definitions"
                data={clusterDef}
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
                    //   window.open(`/view/access-rights/edit?id=${rowData.id}`, "_self")
                    // if (userGroup.some(r => reportRange.includes(r))) {
                    //   ''

                    // } else {
                    //   window.open(`/view/listverifiedboj/${rowData.assessment_id},${rowData.kgtin}`, "_self")
                    //   event.stopPropagation();
                    // }
                }}
            />
        </>
    );
};

export default AccessList;