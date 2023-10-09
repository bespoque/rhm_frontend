import Widget from "../widget";
import * as Icons from '../Icons/index';
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
import { formatNumber } from "../../functions/numbers";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";

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
    field: "tax_station",
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

const fieldsApproved = [
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
    field: "tax_station",
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

const fieldsVerified = [
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
    field: "tax_station",
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



export const ViewDraftPayeTccTable = ({ tccdata }) => {
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
      <MaterialTable title="Draft Tcc List"
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
          window.open(`/view/listpayetcc/alltcc/${rowData.id}`, "_self")
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

export const ViewApprovedTccTable = ({ tccdata }) => {
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
      <MaterialTable title="Approved TCC"
        data={items}
        columns={fieldsApproved}

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
          window.open(`/view/listpayetcc/alltcc/${rowData.id}`, "_self")
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

export const ViewAuditTccTable = ({ tccdata }) => {
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
      <MaterialTable title="Audit Checked"
        data={items}
        columns={fieldsApproved}

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
          window.open(`/view/listpayetcc/alltcc/${rowData.id}`, "_self")
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

export const ViewVerifiedTccTable = ({ tccdata }) => {
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
      <MaterialTable title="Verified TCC"
        data={items}
        columns={fieldsVerified}

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
          window.open(`/view/listpayetcc/alltcc/${rowData.id}`, "_self")
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

export const ViewSinglePayeTcc = ({ tccID, slipYear1, slipYear2, slipYear3, uploads, yrOnePaySl, yrTwoPaySl, yrThreePaySl, payerDetails, statusTCC }) => {
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
  } = useForm()



  const chairman = [1, 9, 39]
  const Approval = [27, 1]
  const verify = [30, 1]
  const Audit = [21, 1]
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
    let verifyTcc = {
      id: tccID,
      status: "Verified"
    }
    try {
      let res = await axios.put(`${url.BASE_URL}paye/tcc-status`, verifyTcc);
      setIsFetching(false)
      router.push('/view/listpayetcc/alltcc')
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
      id: tccID,
      status: "Audit Checked"
    }
    try {
      let res = await axios.put(`${url.BASE_URL}paye/tcc-status`, auditTcc);
      setIsFetching(false)
      router.push('/view/listpayetcc/alltcc/verified')
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
    let printAuth = {
      id: tccID,
      status: "Authorized for print"
    }
    try {
      let res = await axios.put(`${url.BASE_URL}paye/tcc-status`, printAuth);
      setIsFetching(false)
      router.push('/view/listpayetcc/alltcc/approved')
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
      id: tccID,
      status: "Approved"
    }
    try {
      let res = await axios.put(`${url.BASE_URL}paye/tcc-status`, approveTcc);
      setIsFetching(false)
      router.push('/view/listpayetcc/alltcc/audit')
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
      id: tccID,
      decline_comment: data.comment,
      status: "Declined"
    }
    axios.put(`${url.BASE_URL}paye/tcc-status`, declineTcc)
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

      <div>
        {statusTCC === "Declined" ?
          <div className="flex justify-between">
            {/* <button
                className="btn bg-green-600 mb-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
              </button>
              <div>
                <p className="font-bold">Reason for decline</p>
                {payerDetails.map((el) => (
                  <p className="mb-3">{el.comments}</p>
                ))}
              </div> */}
          </div> :
          <div className="mb-6">
            <div>
              {statusTCC === "Draft" ?
                <div className="flex justify-between">
                  <div className="flex mr-3">
                    {/* <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button> */}

                    <button
                      className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      <Link legacyBehavior href={`/tcc/paye/${tccID}_${payerDetails.tp_id}`}> Upload Docs</Link>
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
                    {/* <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button> */}

                    {/* <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/tcc/paye/${tccID}_${payerDetails.tp_id}`}> Upload Docs</Link>
                      </button> */}

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
                    {/* <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button> */}

                    {/* <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/tcc/paye/${tccID}_${payerDetails.tp_id}`}> Upload Docs</Link>
                      </button> */}

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
                    {/* <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button> */}

                    {/* <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/tcc/paye/${tccID}_${payerDetails.tp_id}`}> Upload Docs</Link>
                      </button> */}

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
              {statusTCC === "Authorized for print" ?
                <div className="flex justify-between">
                  <div className="flex mr-3">
                    {/* <button
                        className="btn bg-green-600 mr-2 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/view-tcc-docs/${tccID}`}> View Documents</Link>
                      </button> */}

                    {/* <button
                        className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                      >
                        <Link href={`/tcc/paye/${tccID}_${payerDetails.tp_id}`}> Upload Docs</Link>
                      </button> */}

                  </div>
                </div> :
                ""
              }
            </div>
          </div>

        }

        <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">

          <div className="w-full lg:w-2/3">

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>Taxpayer:</label>
              <div>
                <input readOnly type="text" defaultValue={payerDetails.taxpayer_name} className="form-control w-full rounded"
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>KGTIN:</label>
              <div>
                <input readOnly type="text" defaultValue={payerDetails.tp_id} className="form-control w-full rounded"
                />
              </div>

            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>File no:</label>
              <div>
                <input readOnly type="text" defaultValue={payerDetails.file_ref} className="form-control w-full rounded"
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>Tax Office:</label>
              <div>
                <input readOnly type="text" defaultValue={payerDetails.tax_station} className="form-control w-full rounded"
                />
              </div>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <label>Processing Fee:</label>
              <div>
                <input readOnly type="text" value={formatNumber(payerDetails.prc_fee)} className="form-control w-full rounded"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 border-l p-3">
            <div className="max-w-md mx-auto bg-white rounded-xl  overflow-hidden md:max-w-2xl p-4">
              <div className=" mb-5">
                <p className="font-bold text-center">Uploaded Supporting Documents</p>
              </div>
              {uploads.map((data) => (
                <div className="flex justify-between my-3">
                  <p className="font-bold"><a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/paye/tcc/${data.doc_name}`} target="_blank" className="no-underline hover:underline text-blue-500">{data.doc_title}</a></p>
                  <span className="h-5 w-5 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </span>
                </div>
              ))}
            </div>
            <hr />
            <div className="p-4">
              {slipYear1.map((data) => (
                <div className="flex justify-between my-3">

                  <p className="font-bold"> Year 1 <a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/paye/payslip/${data.doc_name}`} target="_blank" className="no-underline hover:underline text-blue-500">{data.doc_title}</a></p>
                  <span className="h-5 w-5 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </span>

                </div>
              ))}
              {slipYear2.map((data) => (
                <div className="flex justify-between my-3">

                  <p className="font-bold"> Year 2 <a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/paye/payslip/${data.doc_name}`} target="_blank" className="no-underline hover:underline text-blue-500">{data.doc_title}</a></p>
                  <span className="h-5 w-5 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </span>

                </div>
              ))}
              {slipYear3.map((data) => (
                <div className="flex justify-between my-3">

                  <p className="font-bold"> Year 3 <a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/paye/payslip/${data.doc_name}`} target="_blank" className="no-underline hover:underline text-blue-500">{data.doc_title}</a></p>
                  <span className="h-5 w-5 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </span>

                </div>
              ))}

            </div>
          </div>
        </div>

        <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>
          <div className="p-3">

            <h6 className="text-right mb-6">Year 1</h6>

            <div className="mb-6 grid grid-cols-2 ">
              <label>Income year </label>
              <div>
                <input readOnly type="text" defaultValue={payerDetails.assmtYr_1} className="form-control w-full rounded"
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Gross Income </label>
              <div>
                <input readOnly value={formatNumber(payerDetails.incYr_1)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Consolidated Relief</label>
              <div>
                <input readOnly value={formatNumber(yrOnePaySl.consolidated_relief)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Taxable Income</label>
              <div>
                <input readOnly value={formatNumber(Number(payerDetails.incYr_1) - (Number(yrOnePaySl.consolidated_relief) + Number(yrOnePaySl.other_relief)))} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Tax Payable</label>
              <div>
                <input readOnly value={formatNumber(payerDetails.taxYr_1)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>
            {statusTCC === "Draft" ?
              <div className="mb-6 grid grid-cols-2 gap-3">
                <label></label>
                <button
                  className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  <Link legacyBehavior href={`/pita/payslip/${yrOnePaySl.payroll_year}_${yrOnePaySl.id}`}> Upload Payslip</Link>
                </button>
              </div>
              : ""
            }
            {statusTCC === "Draft" ?
              <div className="mb-6 grid grid-cols-2 gap-3">
                <label></label>
                <button
                  className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
                  type="submit"
                >
                  <Link legacyBehavior href={`/pita/payslip/${yrOnePaySl.payroll_year}_${yrOnePaySl.id}`}> Upload Payslip</Link>
                </button>
              </div>

              : ""}
          </div>

          <div className="p-3">
            <h6 className="text-center mb-6">Year 2</h6>
            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={payerDetails.assmtYr_2} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={formatNumber(payerDetails.incYr_2)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={yrTwoPaySl === undefined || yrTwoPaySl === "" ? null : formatNumber(yrTwoPaySl.consolidated_relief)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>


            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={formatNumber(yrTwoPaySl === undefined || yrTwoPaySl === "" ? null : formatNumber(Number(payerDetails.incYr_2) - (Number(yrTwoPaySl.consolidated_relief) + Number(yrTwoPaySl.other_relief))))} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={formatNumber(payerDetails.taxYr_2)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            {statusTCC === "Draft" ?
              <div className="mb-6 justify-self-center">
                <button
                  className="btn bg-green-600 btn-default text-white btn-outlined w-full bg-transparent rounded-md"
                  type="submit"
                >
                  <Link legacyBehavior href={`/pita/payslip/${yrTwoPaySl.payroll_year}_${yrTwoPaySl.id}`}> Upload Payslip</Link>
                </button>
              </div>
              : ""
            }
            {statusTCC === "Draft" ?
              <div className="mb-6 justify-self-center">
                <button
                  className="btn bg-green-600 btn-default text-white btn-outlined w-full bg-transparent rounded-md"
                  type="submit"
                >
                  <Link legacyBehavior href={`/pita/payslip/${yrTwoPaySl.payroll_year}_${yrTwoPaySl.id}`}> Upload Payslip</Link>
                </button>
              </div>

              : ""}
          </div>

          <div className="p-3">
            <h6 className="text-center mb-6">Year 3</h6>
            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly defaultValue={payerDetails.assmtYr_3} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={formatNumber(payerDetails.incYr_3)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={yrThreePaySl === undefined || yrThreePaySl === "" ? null : formatNumber(yrThreePaySl.consolidated_relief)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>
            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={(yrThreePaySl === undefined || yrThreePaySl === "" ? null : formatNumber(Number(payerDetails.incYr_3) - (Number(yrThreePaySl.consolidated_relief) + Number(yrThreePaySl.other_relief))))} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            <div className="mb-6 justify-self-center">
              <div>
                <input readOnly value={formatNumber(payerDetails.taxYr_3)} className="form-control w-full rounded" type="text"
                />
              </div>
            </div>

            {statusTCC === "Draft" ?
              <div className="mb-6 ">
                <button
                  className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent w-full rounded"
                  type="submit"
                >
                  <Link legacyBehavior href={`/pita/payslip/${yrThreePaySl.payroll_year}_${yrThreePaySl.id}`}> Upload Payslip</Link>
                </button>
              </div>
              : ""
            }
            {statusTCC === "Draft" ?
              <div className="mb-6 ">
                <button
                  className="btn bg-green-600 btn-default text-white btn-outlined bg-transparent w-full rounded"
                  type="submit"
                >
                  <Link legacyBehavior href={`/pita/payslip/${yrThreePaySl.payroll_year}_${yrThreePaySl.id}`}> Upload Payslip</Link>
                </button>
              </div>
              : ""
            }

          </div>
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