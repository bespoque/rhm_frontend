import Widget from "../widget";
import * as Icons from '../Icons/index';
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";
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
import MaterialTable from "material-table";

const columns = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "KGTIN",
    field: "KGTIN",
  },
  {
    title: "First Name",
    field: "first_name",
  },
  {
    title: "Last Name",
    field: "surname",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Phone",
    field: "phone_number",
  },
];


export const ViewIndividualTable = ({ individualData }) => {
  let data = individualData;
  return (
    
    <>
      <MaterialTable title="Individual Taxpayers List"
        columns={columns}
        data={data}

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
          window.open(`/view/individual/${rowData.KGTIN}`, "_self")
          event.stopPropagation();
        }}
      />
    </>
  );
};



export const ViewIndividualSingleTable = ({ indvdata, payerKgtin }) => {
  const items = indvdata;
  return (
    <>
      <Widget>
        <div className="flex justify-start mb-4">
          {/* <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              Print Certificate
            </CustomButton>
          </div> */}
          <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              <Link legacyBehavior href={`/update-individual/${payerKgtin}`}> Update Taxpayer</Link>
            </CustomButton>
          </div>
        </div>

        <div className="w-2/3 flex mx-auto rounded border">

          <table className="table striped">

            <tbody className="divide-y ">
              <tr className="">
                <td>KGTIN</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.KGTIN}</td>
                ))}
              </tr>

              <tr className="">
                <td>Title</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.indv_title}</td>
                ))}
              </tr>

              <tr className="">
                <td>Gender</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.gender}</td>
                ))}
              </tr>

              <tr className="">
                <td>Marital Status</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.marital_status}</td>
                ))}
              </tr>

              <tr className="">
                <td>Surname</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.surname}</td>
                ))}
              </tr>

              <tr className="">
                <td>First Name</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.first_name}</td>
                ))}
              </tr>

              <tr className="">
                <td>Middle Name</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.middle_name}</td>
                ))}
              </tr>

              <tr className="">
                <td>Date of Birth</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.birth_date}</td>
                ))}
              </tr>

              <tr className="">
                <td>Place of Birth</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.birth_place}</td>
                ))}
              </tr>

              <tr className="">
                <td>Nationality</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.nationality}</td>
                ))}
              </tr>

              <tr className="">
                <td>State of Origin</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.stateOfOrigin}</td>
                ))}
              </tr>

              <tr className="">
                <td>State of Residence</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.stateOfResidence}</td>
                ))}
              </tr>

              <tr className="">
                <td>Occupation</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.occupation}</td>
                ))}
              </tr>

              <tr className="">
                <td>Phone</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.phone_number}</td>
                ))}
              </tr>

              <tr className="">
                <td>Email</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.email}</td>
                ))}
              </tr>

              <tr className="">
                <td>Tax Office</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.tax_office}</td>
                ))}
              </tr>

              <tr className="">
                <td>Tax Authority</td>
                {items.map((ind, i) => (
                  <td key={i}>{ind.tax_authority}</td>
                ))}
              </tr>

            </tbody>
          </table>

        </div>
        
      </Widget>
    </>
  );
};