import Widget from "../widget";
import CustomButton from "../CustomButton/CustomButton";
import Link from "next/link";


export const ViewSingleNonIndividualTable = ({ indvdata }) => {
  const items = indvdata;

  return (
    <>
      <Widget>
        {/* <div className="flex justify-start mb-4">
          <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              Print Certificate
            </CustomButton>
          </div>
          <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              Update User
              <Link legacyBehavior href={`/update-user/99`} > Update User</Link>

            </CustomButton>
          </div>
        </div> */}
        <div className="w-2/3 flex mx-auto rounded border">
          <table className="table striped">

            <tbody className="divide-y ">
              <tr className="">
                <td>KGTIN</td>
                <td>{items.KGTIN}</td>
              </tr>
              <tr className="">
                <td>Company TIN</td>
                <td>{items.companytin}</td>
              </tr>
              <tr className="">
                <td>Company Name</td>
                <td>{items.coy_name}</td>
              </tr>
              <tr className="">
                <td>City</td>
                <td>{items.city}</td>
              </tr>
              <tr className="">
                <td>Date of incorporation</td>
                <td>{items.date_of_incorporation}</td>
              </tr>
              <tr className="">
                <td>Line of Business</td>
                <td>{items.line_of_business}</td>
              </tr>
              <tr className="">
                <td>Type of Organization</td>
                <td>{items.type_of_organisation}</td>
              </tr>
              <tr className="">
                <td>Enterprise Reg No</td>
                {items.enterprise_reg_no == null || items.enterprise_reg_no === "" ?
                  <td>-</td>
                  : <td>{items.enterprise_reg_no}</td>}
              </tr>
              <tr className="">
                <td>RC No</td>
                {items.rcno == null || items.rcno === "" ?
                  <td>-</td>
                  : <td>{items.rcno}</td>}
              </tr>
              <tr className="">
                <td>State</td>
                <td>{items.state}</td>
              </tr>
              <tr className="">
                <td>Tax Authority</td>
                <td>{items.tax_authority}</td>
              </tr>
              <tr className="">
                <td>Tax Office</td>
                <td>{items.tax_office}</td>
              </tr>
              <tr className="">
                <td>LGA</td>
                <td>{items.lga}</td>
              </tr>
              <tr className="">
                <td>Phone</td>
                {items.phone_no == null || items.phone_no === "" ?
                  <td>-</td>
                  : <td>{items.phone_no}</td>}
              </tr>
              <tr className="">
                <td>Email</td>
                {items.e_mail == null || items.e_mail === "" ?
                  <td>-</td>
                  : <td>{items.e_mail}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};