
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import MaterialTable, { MTableToolbar } from "material-table";
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
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from "../../functions/setAuthToken";
import { useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";


const fields = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },
  {
    title: "Assesment Id",
    field: "assessment_id",
  },
  {
    title: "Year",
    field: "year",
  },
  {
    title: "KGTIN",
    field: "kgtin",
  },
  {
    title: "Taxpayer Name",
    field: "tp_name",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Gross Income",
    field: "overallGross",
  },

  {
    title: "Total Tax Due",
    field: "totalTaxDue",
  },
  {
    title: "Type",
    field: "assessment_type",
  },

  {
    title: "Created Time",
    field: "createtime",
  },
  {
    title: "Status",
    field: "status",
  }
];



export const ViewBOJTable = ({ bojdata }) => {


  return (
    <div>
      <MaterialTable title="Verified BOJ Assessments"
        data={bojdata}
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
          Filter: Icons.Filter,
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
          window.open(`/view/listverifiedboj/${rowData.assessment_id},${rowData.kgtin}`, "_self")
        }}
      />
    </div>
  );
};

export const ViewSingleBojTable = ({ additionalAsse, payerprop, assId, payerArr, assobj, taxcal,
  childObj, resAddObj, rentIncome, spouseObj, domesticStaff, selfEmployment, vehicles, land, employed, lap, nhis, expenses, pensionDed }) => {
  const [isFetching, setIsFetching] = useState(() => false);
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState(false);

  const [fixedValues, fixValues] = useState({ amount: 0 });
  const [submittedResult, updateResult] = useState({ amount: 0 });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );



  const Approval = [12, 1]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  const kgtinVal = payerArr.map(function (doc) {
    let kgtin = doc.KGTIN
    return kgtin
  })

  const toggleModal = (e) => {
    // e.preventDefault()
    setModal(!modal);
  };

  const kgtinString = String(kgtinVal)
  const items = payerprop;
  const assessment_id = assId
  const createdTime = dateformat(assobj.createtime, "dd mmm yyyy")
  const employedCal = Number(assobj.employed)
  const selfEmployedCal = Number(assobj.self_employed)
  const grossIncCal = employedCal + selfEmployedCal

  const pfcdata = Number(assobj.pension)
  const nhisdata = Number(assobj.nhis)
  const lapdata = Number(assobj.lap)

  const deductionsTotal = (pfcdata + nhisdata + lapdata)

  let addAssAmount

  additionalAsse.forEach((el, i) => (
    addAssAmount = el.amount
  ))

  if (addAssAmount == null || addAssAmount == undefined || addAssAmount == "") {
    addAssAmount = 0
  } else {
    addAssAmount = addAssAmount
  }

  setAuthToken();
  let approveAss = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let apprDataObj = {
      assessment_id: `${assessment_id}`,
      status: "Approved",
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, apprDataObj);
      setIsFetching(false)
      toast.success("Success!");
      router.push('/approvere')
    } catch (error) {
      toast.error("Failed!");
      console.log(error);
      setIsFetching(false)
    }
  }

  setAuthToken();
  let DeclineAss = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let declineDataObj = {
      assessment_id: `${assessment_id}`,
      comment: `${comment}`,
      status: "Declined"
    }
    try {
      let res = await axios.put(`${url.BASE_URL}forma/set-status`, declineDataObj);
      setIsFetching(false)
      router.push('/view/completeddirect')
      toast.success("Success!");
    } catch (error) {
      toast.error("Failed!");
      console.log(error);
      setIsFetching(false)
    }
  }


  return (
    <>
      <ToastContainer />
      {modal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content" width="300">
            <p>Are you sure you want to decline?</p>
            <p>Please state reason why</p>
            <form onSubmit={DeclineAss}>
              <textarea required className="form-control w-full rounded" minlength="10" maxlength="150" onChange={(e) => setComment(e.target.value)}></textarea>
              <div className="mt-2 flex justify-between">
                <button onClick={toggleModal}
                  className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Cancel
                </button>
                <div>

                </div>
                <button
                  className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  Continue
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {isFetching && (
        <div className="flex justify-start item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p className="font-bold">Processing...</p>
        </div>
      )}

      <div>

        <div className="mt-2">
          {assobj.assessment_type === null || assobj.assessment_type === "" || assobj.assessment_type === undefined ? "" :
            <div>
              <p className="font-bold">COMMENT</p>
              <p className="font-bold">{assobj.boj_comment}</p>
            </div>
          }
        </div>

      </div>

      <div className="ml-10">
        {userGroup.some(r => Approval.includes(r)) ?

          <div className="mb-6 flex justify-end">

            <form onSubmit={approveAss} className=" mr-3">
              <button
                className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Approve
              </button>
            </form>

            <button onClick={toggleModal}
              className="btn bg-red-600  mr-3 btn-default text-white btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Decline
            </button>
          </div> :
          ""
        }
      </div>

      <div className="flex justify-around border">
        {payerArr.map((el, i) => (

          <table className="table-auto">
            <tbody className="">
              <tr>
                <td className="font-bold">NAME</td>
                <td className="pl-3" key={i}>{el.tp_name}</td>
              </tr>
              <tr>
                <td className="font-bold">PHONE NUMBER</td>
                <td className="pl-3" key={i}>{el.phone_number}</td>
              </tr>
              <tr>
                <td className="font-bold">ADDRESS</td>
                <td className="pl-3" key={i}>{el.address}</td>
              </tr>
              <tr>
                <td className="font-bold">TYPE</td>
                <td className="pl-3" key={i}>{el.tp_type}</td>
              </tr>
            </tbody>
          </table>

        ))}

        {payerArr.map((data, idx) => (
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-bold">TAX STATION</td>
                {payerArr.map((data, idx) => (
                  <div key={idx}>
                    {data.tax_office === "Okehi/Adavi" ?
                      <p>Adavi/Okehi</p> :
                      <p>{data.tax_office}</p>
                    }
                  </div>
                ))}
              </tr>
              <tr>
                <td className="font-bold">KGTIN</td>
                <td className="pl-3" >{data.KGTIN}</td>
              </tr>
              <tr>
                <td className="font-bold">ASSESSMENT No</td>
                <td className="pl-3">{assessment_id}</td>
              </tr>
              <tr>
                <td className="font-bold">DATE ASSESSED</td>
                <td className="pl-3">{createdTime}</td>
              </tr>
            </tbody>
          </table>

        ))}
      </div>

      <div className="">
        <div className="mt-3 flex justify-center">
          <table className="border divide-y" width={600}>
            <thead>
              <tr>
                <th className="p-3"><h6 className="text-center font-bold">Tax Computations</h6></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="border-r-2 p-1">Source of Income</td>
                <td className="text-right font-bold">₦</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Trade, Professional e.t.c</td>
                {assobj == null || assobj == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(assobj.self_employed)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1">Share of Partnership</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Employment</td>
                {assobj == null || assobj == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(assobj.employed)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1">Other Income</td>
                <td className="p-1 text-right font-bold">{formatNumber(assobj.other_income)}</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Gross Income</td>
                <td className="p-1 text-right font-bold">{formatNumber((grossIncCal) + Number(assobj.other_income))}</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">PFC</td>
                {assobj == null || assobj == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(assobj.pension)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1">NHIS</td>
                {assobj == null || assobj == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(assobj.nhis)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1">NHF</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Life Assurance Premium</td>
                {assobj == null || assobj == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(assobj.lap)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Total</td>
                <td className="p-1 text-right font-bold">{formatNumber(deductionsTotal)}</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Assessable Income</td>
                <td className="p-1 text-right font-bold">{formatNumber((((grossIncCal) + Number(assobj.other_income))) - deductionsTotal)}</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">ADD</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Balancing Charges</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">DEDUCT</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Balancing Allowances</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Lose Relief</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Capital Allowances</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Total Income</td>
                <td className="p-1 text-right font-bold">{formatNumber((((grossIncCal) + Number(assobj.other_income))) - deductionsTotal)}</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1">Consolidated relief Allowance</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.consolidatedRelief)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right">Chargeable Income</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.chargeableIncome)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center font-bold">Tax due for payment</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">7% on 300,000.00</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax7)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">11% on 300,000.00</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax11)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">15% on 500,000.00</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax15)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">19% on 500,000.00</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax19)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">21% on 1,600,000.00</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax21)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">24% on above 3,200,000.00</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax24)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">1%(Minimun Tax)</td>
                <td className="p-1 text-right font-bold">{formatNumber(taxcal.tax1)}</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">Total</td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-center">Dev. Levy</td>
                <td className="p-1 text-right font-bold">{formatNumber(assobj.dev_levy)}</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Total Tax due </td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(taxcal.tax)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Additional Assessment</td>
                {addAssAmount == null || addAssAmount == "" || addAssAmount == 0
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className="p-1 text-right font-bold">{formatNumber(addAssAmount)}</td>
                }
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Set off WHT </td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Set off 1st Assessment </td>
                <td className="p-1 text-right font-bold">0</td>
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Set off Additional Assessment</td>
                <td className="p-1 text-right font-bold">0</td>
                {/* <td className="p-1 text-right font-bold">{formatNumber(addAssAmount)}</td> */}
              </tr>
              <tr>
                <td className="border-r-2 p-1 text-right font-bold">Total Tax Due for Payment</td>
                {taxcal == null || taxcal == ""
                  ? <td className="p-1 text-right font-bold">0</td> :
                  <td className='p-1 text-right font-bold'>{formatNumber(Number(taxcal.tax) + (Number(addAssAmount)) + Number(assobj.dev_levy))}</td>
                }
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-around">
          <div>
            <p>Captured by : {assobj.staffName} </p>
            <p>Date of capture : {createdTime} </p>
          </div>
          {/* <div className="flex">
            <div className="flex flex-col p-2">
              <p className="font-bold">Balance</p>
              <p className="font-bold text-center">{formatNumber(taxcal.payDiff)}</p>
            </div>
            <div className="flex flex-col p-2">
              <p className="font-bold">Payment Status</p>
              <p className="font-bold text-center">{taxcal.paymentStatus}</p>
            </div>
            <div className="flex flex-col p-2">
              <p className="font-bold">Tax Paid</p>
              <p className="font-bold text-center">{formatNumber(taxcal.taxPaid)}</p>
            </div>
          </div> */}
        </div>

        <div className="flex m-10 justify-center">
          <button
            className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          >
            <a href={`/view-doc-assess/${assessment_id},${kgtinString}`}> Download Documents</a>
          </button>
        </div>
      </div>

      <div>
        <div className="mt-5">
          <h6 className="text-center">OTHER DETAILS</h6>
        </div>
        <div className=" p-4 border flex justify-between my-3">
          <div>
            <div className="">
              <h5 className="font-bold">RESIDENTIAL ADDRESS</h5>
            </div>
            <div>
              {resAddObj == null || resAddObj == "" ? "" :

                <table class="table-auto">
                  <tbody className="divide-y border">
                    <tr>
                      <td className="font-bold p-2">Residence Owner</td>
                      {resAddObj == null || resAddObj == ""
                        ? <td></td> :
                        resAddObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.residence_owner}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Type of Residence</td>
                      {resAddObj == null || resAddObj == ""
                        ? <td ></td> :
                        resAddObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.residence_type}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">House no</td>
                      {resAddObj == null || resAddObj == ""
                        ? <td></td> :
                        resAddObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.house_no}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Owner Name</td>
                      {resAddObj == null || resAddObj == ""
                        ? <td></td> :
                        resAddObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.owner_name}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Annual Rent</td>
                      {resAddObj == null || resAddObj == ""
                        ? <td></td> :
                        resAddObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.annual_rent)}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Town</td>
                      {resAddObj == null || resAddObj == ""
                        ? <td></td> :
                        resAddObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.town}</td>
                        )
                      }
                    </tr>
                  </tbody>
                </table>
              }
            </div>

          </div>


          <div className="">
            <div className="">
              <h5 className="font-bold">INCOME ON RENT</h5>
            </div>
            <div>
              {rentIncome == null || rentIncome == "" ? "" :
                <table class="table-auto">
                  <tbody className="divide-y border">
                    <tr>
                      <td className="font-bold p-2">Property Type</td>
                      {rentIncome == null || rentIncome == ""
                        ? <td></td> :
                        rentIncome.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.prop_type}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Address</td>
                      {rentIncome == null || rentIncome == ""
                        ? <td ></td> :
                        rentIncome.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.prop_address}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Rental Type</td>
                      {rentIncome == null || rentIncome == ""
                        ? <td></td> :
                        rentIncome.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.rental_type}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Amount</td>
                      {rentIncome == null || rentIncome == ""
                        ? <td></td> :
                        rentIncome.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.rental_amount)}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Renter Name</td>
                      {rentIncome == null || rentIncome == ""
                        ? <td></td> :
                        rentIncome.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{(el.renter_name)}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Renter Phone</td>
                      {rentIncome == null || rentIncome == ""
                        ? <td></td> :
                        rentIncome.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.renter_phone}</td>
                        )
                      }
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 border">
          <div className="mt-3">
            <div>
              <div className="">
                <h5 className="font-bold">NHIS</h5>
              </div>
              <div>
                {nhis == null || nhis == "" ? "" :
                  <table class="table-auto">
                    <tbody className="divide-y border">
                      <tr>
                        <td className="font-bold  p-2">Company</td>
                        {nhis == null || nhis == ""
                          ? <td></td> :
                          nhis.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.company}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Insurance No</td>
                        {nhis == null || nhis == ""
                          ? <td ></td> :
                          nhis.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.insurance_no}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Amount</td>
                        {nhis == null || nhis == ""
                          ? <td></td> :
                          nhis.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.amount)}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Address</td>
                        {nhis == null || nhis == ""
                          ? <td></td> :
                          nhis.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.addr}</td>
                          )
                        }
                      </tr>
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
          <div className="mt-3">

            <div className="">
              <h5 className="font-bold">LAP</h5>
            </div>
            <table class="table-auto">
              <div>
                {lap == null || lap == "" ? "" :
                  <tbody className="divide-y border">
                    <tr>
                      <td className="font-bold p-2">Company</td>
                      {lap == null || lap == ""
                        ? <td></td> :
                        lap.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.company}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Address</td>
                      {lap == null || lap == ""
                        ? <td ></td> :
                        lap.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.addr}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Amount</td>
                      {lap == null || lap == ""
                        ? <td></td> :
                        lap.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.amount)}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">RSA Number</td>
                      {lap == null || lap == ""
                        ? <td></td> :
                        lap.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.rsa_no}</td>
                        )
                      }
                    </tr>
                  </tbody>
                }
              </div>
            </table>
          </div>
        </div>

        <div className="flex mt-3  justify-between p-4 border">
          <div className="mt-3">
            <div>
              <div className="">
                <h5 className="font-bold">VEHICLES</h5>
              </div>
              <div>
                {vehicles == null || vehicles == "" ? "" :
                  <table class="table-auto">
                    <tbody className="divide-y border">
                      <tr>
                        <td className="font-bold  p-2">Purchase date</td>
                        {vehicles == null || vehicles == ""
                          ? <td></td> :
                          vehicles.map((el, i) =>

                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.purchase_date}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Cost</td>
                        {vehicles == null || vehicles == ""
                          ? <td ></td> :
                          vehicles.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.cost}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Brand</td>
                        {vehicles == null || vehicles == ""
                          ? <td></td> :
                          vehicles.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.brand}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Model</td>
                        {vehicles == null || vehicles == ""
                          ? <td></td> :
                          vehicles.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.model}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Year</td>
                        {vehicles == null || vehicles == ""
                          ? <td></td> :
                          vehicles.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.year}</td>
                          )
                        }
                      </tr>
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="">
              <h5 className="font-bold">LAND</h5>
            </div>
            <div>
              {land == null || land == "" ? "" :

                <table className="table-auto border">
                  <tbody className="divide-y">
                    <tr>
                      <td className="font-bold p-2">Address</td>
                      {land == null || land == ""
                        ? <td></td> :
                        land.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.addr}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Property Type</td>
                      {land == null || land == ""
                        ? <td ></td> :
                        land.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.prop_type}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Completion Date</td>
                      {land == null || land == ""
                        ? <td></td> :
                        land.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.date_completion}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Construction Cost</td>
                      {lap == null || lap == ""
                        ? <td></td> :
                        lap.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.construction_cost}</td>
                        )
                      }
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>


        <div className="mt-3 flex justify-between p-4 border">
          <div>
            <div className="">
              <h5 className="font-bold">PENSION DEDUCTED</h5>
            </div>
            <div>
              {pensionDed == null || pensionDed == "" ? "" :
                <table className="table-auto border">
                  <tbody className="divide-y">
                    <tr>
                      <td className="font-bold p-2">PFA</td>
                      {pensionDed == null || pensionDed == ""
                        ? <td></td> :
                        pensionDed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.pfa}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">PFA Addresss</td>
                      {pensionDed == null || pensionDed == ""
                        ? <td ></td> :
                        pensionDed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.pfa_addr}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">RSA no</td>
                      {pensionDed == null || pensionDed == ""
                        ? <td></td> :
                        pensionDed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.rsa_no}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Amount</td>
                      {pensionDed == null || pensionDed == ""
                        ? <td></td> :
                        pensionDed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.amount)}</td>
                        )
                      }
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>
          <div className="mt-3">
            <div>
              <div className="">
                <h5 className="font-bold">EXPENSES</h5>
              </div>
              <div>
                {expenses == null || expenses == "" ? "" :
                  <table className="table-auto border">
                    <tbody className="divide-y">
                      <tr>
                        <td className="font-bold p-2">Item</td>
                        {expenses == null || expenses == ""
                          ? <td></td> :
                          expenses.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{el.item}</td>
                          )
                        }
                      </tr>
                      <tr>
                        <td className="font-bold p-2">Amount</td>
                        {expenses == null || expenses == ""
                          ? <td ></td> :
                          expenses.map((el, i) =>
                            <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.amount)}</td>
                          )
                        }
                      </tr>
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 mt-3 border">
          <div className="">
            <div className="">
              <h5 className="font-bold">EMPLOYMENT</h5>
            </div>
            <div>
              {employed == null || employed == "" ? "" :
                <table className="table-auto border">
                  <tbody className="divide-y">
                    <tr>
                      <td className="font-bold p-2">Employer</td>
                      {employed == null || employed == ""
                        ? <td></td> :
                        employed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.emp_name}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Employer Address</td>
                      {employed == null || employed == ""
                        ? <td ></td> :
                        employed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.emp_addr}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Start date</td>
                      {employed == null || employed == ""
                        ? <td></td> :
                        employed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.start_date}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Gross Pay</td>
                      {employed == null || employed == ""
                        ? <td></td> :
                        employed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.gross_pay)}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Tax deducted</td>
                      {employed == null || employed == ""
                        ? <td></td> :
                        employed.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.tax_deducted)}</td>
                        )
                      }
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>

          <div>
            <div className="">
              <h5 className="font-bold">SPOUSE</h5>
            </div>
            <div>
              {spouseObj == null || spouseObj == "" ? "" :
                <table class="table-auto">
                  <tbody className="divide-y border">
                    <tr>
                      <td className="font-bold p-2">Name</td>
                      {spouseObj == null || spouseObj == ""
                        ? <td></td> :
                        spouseObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.name}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Date of Birth</td>
                      {spouseObj == null || spouseObj == ""
                        ? <td ></td> :
                        spouseObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.dob}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Employer</td>
                      {spouseObj == null || spouseObj == ""
                        ? <td></td> :
                        spouseObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.employer}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Occupation</td>
                      {spouseObj == null || spouseObj == ""
                        ? <td></td> :
                        spouseObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.occupation}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Employer Address</td>
                      {spouseObj == null || spouseObj == ""
                        ? <td></td> :
                        spouseObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.employer_addr}</td>
                        )
                      }
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 mt-3 border">
          <div className="">
            <div className="">
              <h5 className="font-bold">CHILDREN</h5>
            </div>
            <div>
              {childObj == null || childObj == "" ? "" :

                <table class="table-auto">
                  <tbody>
                    <tr>
                      <td className="font-bold p-2">Date of Birth</td>
                      {childObj == null || childObj == ""
                        ? <td></td> :
                        childObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.dob}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">School Name</td>
                      {childObj == null || childObj == ""
                        ? <td ></td> :
                        childObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.school_name}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">School Address</td>
                      {childObj == null || childObj == ""
                        ? <td></td> :
                        childObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{el.school_addr}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">School Fees</td>
                      {childObj == null || childObj == ""
                        ? <td></td> :
                        childObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.school_fees)}</td>
                        )
                      }
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Tax deducted</td>
                      {childObj == null || childObj == ""
                        ? <td></td> :
                        childObj.map((el, i) =>
                          <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.child_income)}</td>
                        )
                      }
                    </tr>
                  </tbody>
                </table>
              }
            </div>
          </div>


        </div>

        <div className="border  p-4 mt-3">
          <div className="">
            <h5 className="font-bold">DOMESTIC STAFF</h5>
          </div>
          <div>
            {domesticStaff == null || domesticStaff == "" ? "" :

              <table className="table-auto border">
                <tbody className="divide-y">
                  <tr>
                    <td className="font-bold p-2">TItle</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.title}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Name</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td ></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.name}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">House no</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.house_no}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Street</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.street}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Town</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.town}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">LGA</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.lga}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">STATE</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.state}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Amount Paid</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.amount_paid)}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Payer</td>
                    {domesticStaff == null || domesticStaff == ""
                      ? <td></td> :
                      domesticStaff.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.payer}</td>
                      )
                    }
                  </tr>
                </tbody>
              </table>
            }
          </div>
        </div>

        <div className="border  p-4 mt-3">
          <div className="">
            <h5 className="font-bold">SELF EMPLOYMENT</h5>
          </div>
          <table class="table-auto">
            <div>
              {selfEmployment == null || selfEmployment == "" ? "" :
                <tbody className="divide-y border">
                  <tr>
                    <td className="font-bold p-2">Business name</td>
                    {selfEmployment == null || selfEmployment == ""
                      ? <td></td> :
                      selfEmployment.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.business_name}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Address</td>
                    {selfEmployment == null || selfEmployment == ""
                      ? <td ></td> :
                      selfEmployment.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.business_addr}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Start Date</td>
                    {selfEmployment == null || selfEmployment == ""
                      ? <td></td> :
                      selfEmployment.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.business_start_date}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Business Type</td>
                    {selfEmployment == null || selfEmployment == ""
                      ? <td></td> :
                      selfEmployment.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.business_type}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Figures Shown</td>
                    {selfEmployment == null || selfEmployment == ""
                      ? <td></td> :
                      selfEmployment.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{el.figures_estimated}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Income Earned</td>
                    {selfEmployment == null || selfEmployment == ""
                      ? <td></td> :
                      selfEmployment.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.income_earned)}</td>
                      )
                    }
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Other Income</td>
                    {selfEmployment == null || selfEmployment == ""
                      ? <td></td> :
                      selfEmployment.map((el, i) =>
                        <td className="p-2 border-l-2 border-r-2" key={i}>{formatNumber(el.other_income)}</td>
                      )
                    }
                  </tr>

                </tbody>
              }
            </div>

          </table>
        </div>
      </div>

      <style
        jsx>{
          `
        body.active-modal {
          overflow-y: hidden;
      }
      
      // .btn-modal {
      //     padding: 10px 20px;
      //     display: block;
      //     margin: 100px auto 0;
      //     font-size: 18px;
      // }
      
      .modal, .overlay {
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: fixed;
      }
      
      .overlay {
          background: rgba(49,49,49,0.8);
      }
      .modal-content {
          position: absolute;
          top: 20%;
          left: 60%;
          transform: translate(-50%, -50%);
          line-height: 1.4;
          background: #f1f1f1;
          padding: 14px 28px;
          border-radius: 3px;
          max-width: 400px;
          min-width: 300px;
      }
      
      .close-modal {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 7px;
      }
        `
        }
      </style>


    </>
  );
};