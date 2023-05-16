import SectionTitle from "../section-title";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import * as Icons from '../Icons/index';
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";

const AppGroupList = () => {
  const [userGrpData, setUserGrpData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  useEffect(() => {

    let num = 1
    const fetchPost = async () => {
      try {
        const response = await fetch('https://bespoque.dev/rhm/get-appgroups-batch.php')
        setIsFetching(false);
        const data = await response.json()
        console.log("data", data.body)
        // for (let i = 0; i < res.length; i++) {
        //   let rec = data.body[i]

        // }
        setUserGrpData(data.body)
      } catch (error) {
        console.log(error.message)
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);




  const fields = [
    // {
    //   title: "SN",
    //   field: "serialNo",
    //   filtering: false,
    //   width: "10%"
    // },
    {
      title: "App name",
      field: "app_name",
    },
    {
      title: "App type",
      field: "app_type",
    },
    {
      title: "Can Sign",
      field: "can_sign",
    },

    
  ];


  return (
    <>
      <SectionTitle subtitle="App group list" />

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

      <MaterialTable title="App groups"
        data={userGrpData}
        columns={fields}

        options={{
          search: true,
          paging: true,
          filtering: true,
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
          window.open(`/view/app-group/edit?id=${rowData.id}`, "_self")
          event.stopPropagation();
          // if (userGroup.some(r => reportRange.includes(r))) {
          //   ''

          // } else {
          //   window.open(`/view/listverifiedboj/${rowData.assessment_id},${rowData.kgtin}`, "_self")
          //   event.stopPropagation();
          // }
        }}
      />
      {/* <ViewGroupTable userGrpData={userGrpData} /> */}
    </>
  );
};

export default AppGroupList;
