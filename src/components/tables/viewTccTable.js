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
    title: "File Ref",
    field: "file_ref",
  },
  {
    title: "KGTIN",
    field: "tp_id",
  },
  {
    title: "Taxpayer Name",
    field: "taxpayer_name",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Create Time",
    field: "crt_time",
  },
  {
    title: "Status",
    field: "status",
  }
];



export const ViewTccTable = ({ tccdata }) => {
  let items = tccdata;

  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const reportRange = [39]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  return (
    <>
      <MaterialTable title="Tcc List"
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
          window.open(`/view/listtcc/${rowData.id}`, "_self")
          event.stopPropagation();
          // if (userGroup.some(r => reportRange.includes(r))) {
          //   ''

          // } else {

          //   window.open(`/view/listtcc/${rowData.id}`, "_self")
          //   event.stopPropagation();
          // }
        }}
      />
    </>
  );
};

export const ViewSingleTccTable = ({ tccID, payerDetails, assessmentData, assessmentData2, assessmentData3 }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [declineModal, setDeclineModal] = useState(false);
  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const TCCStatus = payerDetails.map((data, i) => {
    let stat = data.status
    return stat
  })
  const statusTCC = String(TCCStatus)
  // console.log(statusTCC);

  const admin = [1]
  const chairman = [1, 9, 39]
  const Approval = [12, 1]
  const verify = [2, 3, 1]
  const Audit = [20, 1]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups


  const declinePopup = (e) => {
    // e.preventDefault()
    setDeclineModal(!declineModal);
  };

  setAuthToken();
  let VerifyTcc = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let approveTcc = {
      id: `${tccID}`,
      comments: "",
      status: "Verified"
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/tcc-status`, approveTcc);
      setIsFetching(false)
      router.push('/view/listtcc')
      toast.success("Success!");
    } catch (error) {
      toast.error("Failed!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const AuditChecked = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let auditTcc = {
      id: `${tccID}`,
      comments: "",
      status: "Audit Checked"
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/tcc-status`, auditTcc);
      setIsFetching(false)
      router.push('/view/listtcc')
      toast.success("Success!");
    } catch (error) {
      toast.error("Failed!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const PrintAuthorized = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let printTcc = {
      id: `${tccID}`,
      comments: "",
      status: "Print Authorized"
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/tcc-status`, printTcc);
      setIsFetching(false)
      router.push('/view/listtcc')
      toast.success("Success!");
    } catch (error) {
      toast.error("Failed!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const Approve = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    let approveTcc = {
      id: `${tccID}`,
      comments: "",
      status: "Approved"
    }
    try {
      let res = await axios.post(`${url.BASE_URL}forma/tcc-status`, approveTcc);
      setIsFetching(false)
      router.push('/view/listtcc')
      toast.success("Success!");
    } catch (error) {
      toast.error("Failed!");
      console.log(error);
      setIsFetching(false)
    }
  }

  const Decline = (data) => {
    setIsFetching(true)
    let declineTcc = {
      id: `${tccID}`,
      comments: data.comment,
      status: "Declined"
    }
    axios.post(`${url.BASE_URL}forma/tcc-status`, declineTcc)
      .then(function (response) {
        setIsFetching(false)
        toast.success("Success!");
        router.push('/view/listtcc')
        console.log(response);
      })
      .catch(function (error) {
        toast.error("Failed!");
        setIsFetching(false)
      })
  }

  return (
    <>
      <ToastContainer />

      {declineModal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content" width="300">
            <div className="text-center">
              <p>Are you sure you want to Decline ?</p>
              <p>Please state reason why</p>
            </div>

            <form onSubmit={handleSubmit(Decline)}>
              <textarea name="comment" ref={register()} required className="form-control w-full rounded" minlength="10" maxlength="50" placeholder="comment"></textarea>
              <div className="mt-2 flex justify-between">
                <button onClick={declinePopup}
                  className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                >
                  Cancel
                </button>

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
      <Widget>
        <div>
          {statusTCC === "Declined" ?
            <div className="flex justify-between">
              <button
                className="btn bg-green-600 mb-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                <Link legacyBehavior href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
              </button>
              <div>
                <p className="font-bold">Reason for decline</p>
                {payerDetails.map((el) => (
                  <p className="mb-3">{el.comments}</p>
                ))}
              </div>
            </div> :
            <div className="mb-6">
              <div>
                {statusTCC === "Draft" ?
                  <div className="flex justify-between">
                    <div className="flex mr-3">
                      <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button>

                      <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/tcc/${tccID}`}> Upload Docs</Link>
                      </button>

                    </div>
                    {userGroup.some(r => verify.includes(r)) ?
                      <div className="flex">

                        <form onSubmit={VerifyTcc} className=" mr-3">
                          <button
                            className="btn bg-purple-400 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Verify
                          </button>
                        </form>
                        <div className=" mr-3">
                          <button onClick={declinePopup}
                            className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"

                          >
                            Decline
                          </button>
                        </div>
                      </div>
                      : ""}

                  </div> : ""
                }
              </div>
              <div>
                {statusTCC === "Verified" ?
                  <div className="flex justify-between">
                    <div className="flex mr-3">
                      <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button>

                      <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/tcc/${tccID}`}> Upload Docs</Link>
                      </button>

                    </div>
                    {userGroup.some(r => Audit.includes(r)) ?
                      <div className="flex">
                        <form onSubmit={AuditChecked} className=" mr-3">
                          <button
                            className="btn bg-green-400  mr-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Audit Check
                          </button>
                        </form>
                        <div className=" mr-3">
                          <button onClick={declinePopup}
                            className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"

                          >
                            Decline
                          </button>
                        </div>
                      </div>

                      : ""}
                  </div> : ""
                }
              </div>
              <div>
                {statusTCC === "Audit Checked" ?
                  <div className="flex justify-between">
                    <div className="flex mr-3">
                      <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button>

                      <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/tcc/${tccID}`}> Upload Docs</Link>
                      </button>

                    </div>
                    {userGroup.some(r => Approval.includes(r)) ?
                      <div className="flex">
                        <form onSubmit={Approve} className=" mr-3">
                          <button
                            className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Approve
                          </button>
                        </form>
                        <div className=" mr-3">
                          <button onClick={declinePopup}
                            className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"

                          >
                            Decline
                          </button>
                        </div>
                      </div> : ""}
                  </div>
                  : ""
                }
              </div>
              <div>
                {statusTCC === "Approved" ?
                  <div className="flex justify-between">
                    <div className="flex mr-3">
                      <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button>

                      <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/tcc/${tccID}`}> Upload Docs</Link>
                      </button>

                    </div>
                    {userGroup.some(r => chairman.includes(r)) ?
                      <div className="flex">
                        <form onSubmit={PrintAuthorized} className=" mr-3">
                          <button
                            className="btn bg-green-400  mr-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                          >
                            Sign
                          </button>
                        </form>
                        <div className=" mr-3">
                          <button onClick={declinePopup}
                            className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"

                          >
                            Decline
                          </button>
                        </div>
                      </div>

                      : ""}
                  </div> : ""
                }
              </div>
              <div>
                {statusTCC === "Print Authorized" ?
                  <div className="flex justify-between">
                    <div className="flex mr-3">
                      <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button>

                      <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link legacyBehavior href={`/tcc/${tccID}`}> Upload Docs</Link>
                      </button>

                    </div>
                  </div> :
                        // <div className="flex mr-3">
                  //   <button
                  //     className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                  //     type="submit"
                  //   >
                  //     <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                  //   </button>

                  //   <button
                  //     className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  //     type="submit"
                  //   >
                  //     <Link href={`/tcc/${tccID}`}> Upload Docs</Link>
                  //   </button>
                  // </div>
                  ""
                }
              </div>
            </div>

          }

          <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">

            <div className="">

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>Taxpayer:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="taxpayername" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="taxpayername" readOnly type="text" defaultValue={ind.taxpayer_name} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>KGTIN:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="tp_id" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tp_id" readOnly type="text" defaultValue={ind.tp_id} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label>File no:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly name="tp_id" type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input readOnly type="text" defaultValue={ind.file_ref} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <label htmlFor="employername">Tax Office:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tax_office" readOnly type="text" defaultValue={ind.tax_office} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <label htmlFor="employername">Processing Fee:</label>
                {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {payerDetails.map((ind, i) => (
                      <input name="tax_office" readOnly type="text" defaultValue={formatNumber(ind.prc_fee)} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>

          <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>

            <div className="p-3">
              <h6 className="text-right mb-6">Year 1</h6>
              <div className="mb-6 grid grid-cols-2 ">
                <label>Assessment year </label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly type="text" />
                  :
                  <div>

                    {assessmentData.map((ind, i) => (
                      <input readOnly type="text" defaultValue={ind.year} className="form-control w-full rounded"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Tax Payable </label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly className="form-control w-full rounded" type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}

                  </div>
                }

              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Income from employment</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Income from Trade/Professional</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Other Income</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3">
                <label>Assessment ID</label>
                {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData.map((ele, i) => (
                      <input readOnly name="assmt_1" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>
            </div>

            <div className="p-3 grid justify-items-stretch">
              <h6 className="text-center mb-6">Year 2</h6>
              <div className="mb-6 justify-self-center">
                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>
                    {assessmentData2.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={ele.year} type="text"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 justify-self-center">
                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>


              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_2" type="text" />
                  :
                  <div>

                    {assessmentData2.map((ele, i) => (
                      <input readOnly name="assmt_2" className="form-control w-full rounded" key={i} defaultValue={ele.assessment_id} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

            </div>

            <div className="p-3 grid justify-items-stretch">
              <h6 className="text-center mb-6">Year 3</h6>
              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly className="form-control w-full rounded" key={i} defaultValue={(ele.year)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.tax)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} type="text"
                      />
                    ))}
                  </div>
                }
              </div>
              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" defaultValue={0} />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>

              <div className="mb-6 justify-self-center">

                {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_3" type="text" />
                  :
                  <div>

                    {assessmentData3.map((ele, i) => (
                      <input readOnly name="assmt_3" className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                      />
                    ))}

                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Widget>

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