
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from "jsonwebtoken";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
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
import { FiCheck } from "react-icons/fi";

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
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Income",
    field: "income",
  },

  {
    title: "Proposed Tax",
    field: "tax",
  },
  {
    title: "Status",
    field: "status",
  },


  {
    title: "Created Time",
    field: "createtime",
  },

];

export const ViewDraftObjectionTable = ({ submittedData }) => {
  let items = submittedData;

  const { auth } = useSelector(
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
      <MaterialTable title="Draft Objection List"
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
          if (userGroup.some(r => reportRange.includes(r))) {
            console.log("not permitted");
          } else {
            window.open(`/revise-assessment/${rowData.kgtin}_${rowData.assessment_id}`, "_self")
            event.stopPropagation();
          }
        }}
      />
    </>
  );
};

export const ViewVerifiedObjection = ({ tpKgtin, objUploads, objectionData }) => {
  const [payerDetails, setpayerDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const [routerAssId, setAssessId] = useState('');
  const [approveModal, setapproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const { auth } = useSelector(
    (state) => ({
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  // const Approval = [2, 3, 1]
  const Approval = [27, 1]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups

  let daAssessmentId = objectionData.da_assessment_id
  let objectionStatus = objectionData.status


  const approvePopup = () => {
    setapproveModal(!approveModal);
  };
  const declinePopup = () => {
    setDeclineModal(!declineModal);
  };

  const ApproveObjection = (data) => {
    setIsFetching(true)
    data.assessment_id = routerAssId
    data.status = "Approved"

    axios.put(`${url.BASE_URL}forma/objection`, data)
      .then(function (response) {
        setIsFetching(false)
        toast.success("Success!");
        router.push('/view/objection/submitted')
      })
      .catch(function (error) {
        toast.error("Failed!");
        setIsFetching(false)
      })
  }

  setAuthToken();
  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let kgtin = routerData.split('_').pop()
      let assessId = routerData.split('_').shift()
      setAssessId(assessId)
      const fetchPost = async () => {
        setIsFetching(true)
        await axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, { KGTIN: kgtin })
          .then(function (response) {
            let IndData = response.data.body
            setIsFetching(false);
            setpayerDetails(IndData)

          }).catch(function (error) {
            setIsFetching(false);
            console.log(error);
          })


      };
      fetchPost();
    }
  }, [router]);

  const DeclineObjection = (data) => {
    setIsFetching(true)
    data.assessment_id = routerAssId
    data.status = "Declined"

    axios.put(`${url.BASE_URL}forma/objection`, data)
      .then(function (response) {
        setIsFetching(false)
        toast.success("Success!");
        router.push('/view/objection/submitted')
      })
      .catch(function (error) {
        toast.error("Failed!");
        setIsFetching(false)
      })
  }


  return (
    <>
      <ToastContainer />
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
          <p>Please wait...</p>
        </div>
      )}
      {approveModal && (
        <div className="modal">
          <div className="modal-content" width="300">
            <div className="text-center">
              <p>Please add a comment</p>
            </div>

            <form onSubmit={handleSubmit(ApproveObjection)}>
              <textarea name="approvedcomment" ref={register()} required className="form-control mt-3 w-full rounded" minlength="5" maxlength="150" placeholder="comment"></textarea>
              <div className="mt-2 flex justify-between">
                <button onClick={approvePopup}
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

      {declineModal && (
        <div className="modal">
          <div className="modal-content" width="300">
            <div className="text-center">
              <p>Are you sure you want to decline?</p>
              <p>Please add a comment</p>
            </div>

            <form onSubmit={handleSubmit(DeclineObjection)}>
              <textarea name="declinedcomment" ref={register()} required className="form-control mt-3 w-full rounded" minlength="10" maxlength="150" placeholder="comment"></textarea>
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

      <div>
        {objectionStatus === "Verified" ?
          <div className="flex justify-between">
            {userGroup.some(r => Approval.includes(r)) ?
              <>
                <div>
                  <p className="font-bold">Verifier Comment</p>
                  <p>{objectionData.verifiedcomment}</p>
                  <div>
                    <p className="font-bold">Revised Tax</p>
                    <p className="font-bold">{formatNumber(objectionData.tax)}</p>
                  </div>
                </div>

                <div className="flex my-2">
                  <div className=" mr-3">
                    <button onClick={approvePopup}
                      className="btn bg-green-400  mr-3 btn-default text-white btn-outlined bg-transparent rounded-md"
                      type="submit"
                    >
                      Approve
                    </button>
                  </div>
                  <div className=" mr-3">
                    <button onClick={declinePopup}
                      className="btn bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md"

                    >
                      Decline
                    </button>
                  </div>
                </div>
              </>
              :
              ""

            }
          </div> : ""
        }
      </div>

      <div className="border mb-3 block p-8 rounded-lg bg-white w-full">
        <div className="flex">
          <h6 className="p-2">Taxpayer Information</h6>
        </div>
        <p className="mb-3 font-bold"></p>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <p>Name</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tp_name} disabled />
            </div>

            <div className="form-group mb-6">
              <p>KGTIN</p>

              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.KGTIN} disabled />
            </div>

            <div className="form-group mb-6">
              <p>Email</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.email} disabled />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <p>Phone</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.phone_number} disabled />
            </div>

            <div className="form-group mb-6">
              <p>Tax Office</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tax_office} disabled />
            </div>
            <div className="form-group mb-6">
              <p>Taxpayer Type</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.tp_type} disabled />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <p>Address</p>
              <input type="text" className="form-control w-full rounded font-light text-gray-500"
                value={payerDetails.address} disabled />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

          <form>
            <div className="mb-2">
              <input type="text" defaultValue={routerAssId} name="" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

            <div className="mb-2">
              <label> Reason for Objection</label>
              <textarea type="text" defaultValue={objectionData.grounds} readOnly name="" className="form-control w-full rounded font-light text-gray-500"
              />
            </div>

            <div className="">
              <hr />
            </div>


            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center font-bold">Proposed Income:</label>
              <p className="font-bold">{formatNumber(objectionData.income)}</p>
            </div>
            <div className="mb-2 grid grid-cols-2 gap-2">
              <label className="self-center font-bold"> Tax liability:</label>
              <p className="font-bold">{formatNumber(objectionData.tp_tax)}</p>
            </div>
          </form>


        </div>


        <div className="w-full lg:w-1/2 ">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
            <div className=" mb-5">
              <p className="font-bold text-center">Uploaded Supporting Documents</p>
            </div>
            {objUploads.map((data) => (
              <div className="flex justify-between my-3">
                <p className="font-bold"><a href={`https://annualuploads.bespoque.dev/rhm-live/uploads/da/objection/${data.file_name}`} target="_blank" className="no-underline hover:underline text-blue-500">{data.doc_name}</a></p>
                <span className="h-5 w-5 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <FiCheck
                    size={15}
                    className="stroke-current text-green-500"
                  />
                </span>
              </div>
            ))}
            <button
              className="btn my-2 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              <a href={`/view/approvedasses/${daAssessmentId}`} target="_blank" >View Assessment</a>

            </button>
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