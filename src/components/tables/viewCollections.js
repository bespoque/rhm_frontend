import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";
import MaterialTable, { MTableToolbar } from "material-table";
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

const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "Name",
    field: "taxpayerName",
  },
  {
    title: "MDA",
    field: "mda",
  },
  {
    title: "Revenue Item",
    field: "revenueItem",
  },
  {
    title: "Amount",
    field: "amount",
  },
  // {
  //   title: "Assessment ID",
  //   field: "assessment_id",
  // },
  {
    title: "Address",
    field: "taxpayerAddress",
  },
  {
    title: "Station",
    field: "station",
  },
  {
    title: "Transaction Date",
    field: "tran_date",
  },
];

export const ViewCollectionsTable = ({ remittance }) => {
  let items = remittance;
  return (
    <>
      <MaterialTable title="Collections List"
        data={items}
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
          window.open(`collections/${rowData.idpymt}`)
          event.stopPropagation();
        }}
      />
    </>
  );
};


export const ViewCollectionsSingleTable = ({ collections }) => {
  const items = collections;
  console.log(items);

  return (
    <>
      <Widget>
        <div className="flex justify-start mb-4">
          {/* <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              Print Collection
            </CustomButton>
          </div> */}
        </div>
        <div className=" flex mx-auto">

          <table className="table border rounded striped">
            <tbody className="divide-y ">
              <tr className="">
                <td className="font-bold">TaxPayer Name</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.taxpayerName}</td>
                ))}
              </tr>

              <tr className="">
                <td className="font-bold">Taxpayer Address</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.taxpayerAddress}</td>
                ))}
              </tr>
              <tr className="">
                <td className="font-bold">Station</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.station}</td>
                ))}
              </tr>
              <tr className="">
                <td className="font-bold">Reference Id</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.ref}</td>
                ))}
              </tr>
              <tr className="">
                <td className="font-bold">Assessment Id</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.assessment_id}</td>
                ))}
              </tr>
              <tr className="">
                <td className="font-bold">Payment Channel</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.channel_id}</td>
                ))}
              </tr>

              <tr className="">
                <td className="font-bold">Amount</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.amount}</td>
                ))}
              </tr>

              <tr className="">
                <td className="font-bold">Transaction Date</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.tran_date}</td>
                ))}
              </tr>

              <tr className="">
                <td className="font-bold">MDA</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.mda}</td>
                ))}
              </tr>
              <tr className="">
                <td className="font-bold">Revenue Item</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.revenueItem}</td>
                ))}
              </tr>
              <tr className="">
                <td className="font-bold">Details</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.details}</td>
                ))}
              </tr>

              <tr className="">
                <td className="font-bold">Payment Method</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.pmt_meth}</td>
                ))}
              </tr>
              <tr className="">
                <td className="font-bold">Bank</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.bank}</td>
                ))}
              </tr>

              <tr className="">
                <td className="font-bold">Create Time</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.createtime}</td>
                ))}
              </tr>
            </tbody>
          </table>

        </div>
      </Widget>
    </>
  );
};