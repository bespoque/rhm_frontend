import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.css';
import jwt from "jsonwebtoken";
import { useSelector, shallowEqual } from "react-redux";
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
import ReactToPrint from "react-to-print";
import { SignatureCol } from "../Images/Images";
import { toWords } from 'number-to-words';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const ViewApprovedObjectionTable = ({ submittedData }) => {
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
      <MaterialTable title="Approved Objection List"
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
            window.open(`/view/objection/approved/${rowData.assessment_id}_${rowData.kgtin}`, "_self")
            event.stopPropagation();
          }
        }}
      />
    </>
  );
};

export const ViewApprovedObjectionSingle = ({
  apprObjData
}) => {


  const [showModal, setShowModal] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();
  const componentRef = useRef();
  
  const { auth } = useSelector(
    (state) => ({
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups
  const chairman = [1, 9]

  const openModal = (text) => {
    text.preventDefault()
    setStatus(text.target.name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const pageStyle = `
  @media print {
    body {
      padding: 0;
      margin-top: 49mm; 
    }
    @page {
      size: A4;
      header: none;
      footer: none;
    }
  }
`;

  const handleSaveChanges = async () => {
    let bod = {
      "assessment_id": apprObjData.assessment_id,
      "id": apprObjData.id,
      "vetstatus": status,
      "vettedby": decoded.user,
      "vetcomment": textareaValue,
      "status": status
    }
    console.log("bod", bod);
    if (textareaValue === "") {
      alert("please add a comment")
    } else {
      setDisabled(true)
      try {
        const response = await fetch('https://bespoque.dev/rhm-live/update-objection-vet.php', {
          method: 'POST',
          body: JSON.stringify({
            "assessment_id": apprObjData.assessment_id,
            "id": apprObjData.id,
            "vetstatus": status,
            "vettedby": decoded.user,
            "vetcomment": textareaValue,
            "status": status
          })
        })
        console.log("response.data", response.data);
        toast.success("Saved Successfully!");
        closeModal();
        router.push("/view/objection/approved")
        console.log("Success!");
      } catch (error) {
        setDisabled(false)
        console.log(error);
      }

    }

  };


 
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  let today = new Date().toLocaleDateString('en-us', options);
  let timeCreated = new Date(apprObjData.createtime).toDateString()
  const recTaxToWords = toWords(Number(apprObjData.tax) || 0)
  const DATaxToWords = toWords(Number(apprObjData.tp_tax) || 0)
  console.log("apprObjData", apprObjData);

  return (
    <>
      <ToastContainer />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-2 border-gray-300 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* modal header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-2xl font-semibold">EC Approval</h3>
                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={closeModal}>
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* modal body */}
              <div className="relative p-6 flex-auto">
                <form>
                  <div className="mb-4">
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      id="textarea-content"
                      rows="5"
                      placeholder="Enter comment here"
                      value={textareaValue}
                      onChange={handleTextareaChange}
                    />
                  </div>
                </form>
              </div>
              {/* modal footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button className="btn bg-green-600 text-white btn-default text-white btn-outlined bg-transparent rounded-md mr-2" onClick={closeModal} >
                  Close
                </button>
                <button className="btn bg-blue-600 text-white btn-default text-white btn-outlined bg-transparent rounded-md" onClick={() => handleSaveChanges()}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{pageStyle}</style>
      {apprObjData.vetstatus === "VETTED" ?

        <div className="m-3 flex justify-end">
          <div>
            <ReactToPrint
              trigger={() => <button
                type="submit" className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md"
              >
                Print
              </button>}
              content={() => componentRef.current}
            />
          </div>
        </div>
        :
        <div className="m-3 flex justify-end">
          {apprObjData.vetstatus === "Pending" ?
            <div className="flex justify-between space-x-4">
              {userGroup.some(r => chairman.includes(r)) ?
                <>
                  <button className="btn w-32 bg-green-600 btn-default text-white btn-outlined bg-transparent rounded-md" onClick={(text) => openModal(text)} name="VETTED">Sign</button>
                  <button className="btn w-32 bg-red-600 btn-default text-white btn-outlined bg-transparent rounded-md" onClick={(text) => openModal(text)} name="OVERRULED">Decline</button>
                </>
                :
                ""
              }
            </div> : ""
          }
        </div>
      }

      <div className="mt-10">
        {apprObjData.notice === null ? "Objection type not available"
          :
          <div ref={componentRef} className="p-4 mt-5">
            <div className="flex justify-center">
              {apprObjData.notice === "undertaxed" ?
                <div className="text-justify text-base max-w-prose"  >
                  <p className="flex justify-between mt-3"> <span className="font-bold">{apprObjData.file_ref}</span> {today}  </p>
                  <p>{apprObjData.taxPayerName}</p>
                  <p>{apprObjData.kgtin}</p>
                  <p className="w-64">{apprObjData.taxPayerAddress}</p>
                  <p>Sir/Ma</p><br />

                  <div>
                    <p className="font-bold">RE: {apprObjData.grounds}</p><br />
                  </div>

                  <p>The above Subject refers;</p>
                  <p>
                    We acknowledge the receipt of your letter dated
                    <span className="font-bold"> {timeCreated}, </span>
                    in respect to the objection of your Direct Assessment
                  </p>
                  <br />
                  <p>
                    We have reviewed your letter of complaint and objection along with
                    your previous tax records with Kogi State Internal Revenue Service.
                    The Management has looked at the reasonability of your objection
                    and revised your assessment to <span className="font-bold">₦{formatNumber(apprObjData.tax)} {`(${recTaxToWords} Naira only)`} </span>
                    Instead of <span className="font-bold"> ₦{formatNumber(apprObjData.tp_tax)} <span>{`(${DATaxToWords} Naira only)`}</span> </span>
                  </p><br />
                  <p>
                    Please Take Note that you have been previously under assessed, but
                    Management has waived recovery of such moneys as stipulated in
                    section 52[1] of PITA 2011 as amended.
                  </p><br />
                  <p>
                    You are by this expected to make payments to any Kogi State Internal
                    Revenue Service designated banks using the Assessment ID <span className="font-bold">{apprObjData.assessment_id}</span>.
                  </p>

                  <p><br />
                    Yours Faithfully..
                  </p>
                  <p>For:<span className="font-bold"> KOGI STATE INTERNAL REVENUE SERVICE </span></p><br /><br />
                  <SignatureCol />
                  <p className="font-bold">Sule Salihu Enehe</p>
                  Executive Chairman

                </div>
                :
                <div>
                  {apprObjData.notice === "no_PITA" ?
                    <div className="text-justify text-base max-w-prose" >
                      <p className="flex justify-between mt-3"> <span>{apprObjData.file_ref}</span> {today}  </p>
                      <p>{apprObjData.taxPayerName}</p>
                      <p>{apprObjData.kgtin}</p>
                      <p className="w-64">{apprObjData.taxPayerAddress}</p>
                      <p>Sir/Ma</p><br />
                      <div>
                        <p className="font-bold">RE: {apprObjData.grounds}</p><br />
                      </div>
                      <p>The above Subject refers;</p>
                      <p>
                        We acknowledge the receipt of your letter dated
                        <span className="font-bold"> {(timeCreated)}, </span>
                        in respect to the objection of your Direct Assessment
                      </p>
                      <br />
                      <p>
                        We have reviewed your letter of complaint and objection along with
                        your previous tax records with Kogi State Internal Revenue Service.
                        The Management has looked at the reasonability of your objection
                        and revised your assessment to <span className="font-bold">₦{formatNumber(apprObjData.tax)} <span>{`(${recTaxToWords} Naira only)`}</span> </span>
                        Instead of <span className="font-bold"> ₦{formatNumber(apprObjData.tp_tax)} <span>{`(${DATaxToWords} Naira only)`}</span> </span>
                      </p><br />

                      <p>
                        You are by this expected to make payments to any Kogi State Internal
                        Revenue Service designated banks using the Assessment ID <span className="font-bold">{apprObjData.assessment_id}</span>.
                      </p>
                      <br />

                      <p>
                        Yours Faithfully..
                      </p>
                      <p>For:<span className="font-bold"> KOGI STATE INTERNAL REVENUE SERVICE </span></p><br /><br />
                      <SignatureCol />
                      <p className="font-bold">Sule Salihu Enehe</p>
                      Executive Chairman

                    </div>
                    :
                    <div>
                      {apprObjData.notice === "PITA" ?
                        <div className="text-justify text-base max-w-prose">
                          <p className="flex justify-between mt-3"> <span>{apprObjData.file_ref}</span> {today}  </p>
                          <p>{apprObjData.taxPayerName}</p>
                          <p>{apprObjData.kgtin}</p>
                          <p className="w-64">{apprObjData.taxPayerAddress}</p>
                          <p>Sir/Ma</p><br />
                          <div>
                            <p className="font-bold">RE: {apprObjData.grounds}</p><br />
                          </div>
                          <p>The above Subject refers;</p>
                          <p>
                            We acknowledge the receipt of your letter dated
                            <span className="font-bold"> {(timeCreated)}, </span>
                            in respect to the objection of your Direct Assessment
                          </p>
                          <br />
                          <p>
                            We have reviewed your letter of objection in line with section 24[A] of
                            PITA 2011 as amended.The Management has looked at the reasonability of your objection
                            and revised your assessment to <span className="font-bold">₦{formatNumber(apprObjData.tax)} <span>{`(${recTaxToWords} Naira only)`}</span> </span>
                            Instead of <span className="font-bold"> ₦{formatNumber(apprObjData.tp_tax)} <span>{`(${DATaxToWords} Naira only)`}</span> </span>
                          </p><br />

                          <p>
                            You are by this expected to make payments to any Kogi State Internal
                            Revenue Service designated banks using the Assessment ID <span className="font-bold">{apprObjData.assessment_id}</span>.
                          </p><br />

                          <p>
                            Yours Faithfully..
                          </p>
                          <p>For:<span className="font-bold"> KOGI STATE INTERNAL REVENUE SERVICE </span></p><br /><br />
                          <SignatureCol />
                          <p className="font-bold">Sule Salihu Enehe</p>
                          Executive Chairman

                        </div>
                        :
                        <div>
                          {apprObjData.notice === "document_review" ?
                            <div className="text-justify text-sm  max-w-prose" style={{fontSize: '16.5px'}}>
                              <p className="flex justify-between mt-3"> <span>{apprObjData.file_ref}</span> {today}  </p>
                              <p>{apprObjData.taxPayerName}</p>
                              <p>{apprObjData.kgtin}</p>
                              <p className="w-64">{apprObjData.taxPayerAddress}</p>
                              <p>Sir/Ma</p><br />
                              <div>
                                <p className="font-bold">RE: {apprObjData.grounds}</p><br />
                              </div>
                              <p>The above Subject refers;</p>
                              <p>
                                We acknowledge the receipt of your letter dated
                                <span className="font-bold"> {(timeCreated)}, </span>
                                in respect to the objection of your Direct Assessment.
                              </p><br />

                              <p>
                                We have reviewed your letter of objection in line with section 24[A] of
                                PITA 2011 as amended.The Management has looked at the reasonability of your objection
                                and revised your assessment to <span className="font-bold">₦{formatNumber(apprObjData.tax)} {`(${recTaxToWords} Naira only)`} </span>
                                Instead of <span className="font-bold"> ₦{formatNumber(apprObjData.tp_tax)} {`(${DATaxToWords} Naira only)`} </span>
                              </p><br />
                              <p>
                                You may wish to peruse the sections 3 and 48 of the Personal Income Tax Act (PITA) 2011
                                as ammended which create that obligation on every citizen of Nigeria
                              </p><br />
                              <p>
                                You are by this expected to make payments to any Kogi State Internal
                                Revenue Service designated banks using the Assessment ID <span className="font-bold">{apprObjData.assessment_id}</span>.
                                Otherwise submit the following document for the year <span className="font-bold">{apprObjData.year}</span> to enable
                                us carry out proper assessment in consideration of your objection:
                              </p><br />
                              <section>
                                <ul>
                                  <li>1. Audited financial statements</li>
                                  <li>2. Bank accounts of the directors and</li>
                                  <li>3. Any other relevant document to that effect</li>
                                </ul>
                              </section><br />
                              <p>
                                Yours Faithfully..
                              </p>
                              <p>For: <span className="font-bold">  STATE INTERNAL REVENUE SERVICE </span></p><br />
                              <SignatureCol />
                              <p className="font-bold">Sule Salihu Enehe</p>
                              Executive Chairman

                            </div> : ""
                          }
                        </div>
                      }
                    </div>
                  }

                </div>
              }
            </div>
          </div>
        }
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