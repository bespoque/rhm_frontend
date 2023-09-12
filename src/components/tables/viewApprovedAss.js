import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import dateformat from "dateformat";
import { KgirsLogo, KogiGov, Signature } from "../Images/Images";
import React, { useState } from "react";
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
// import MaterialTable from "material-table";
import MaterialTable from '@material-table/core';
import { Delete, WarningRounded} from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { shallowEqual, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
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
    title: "Gross Income",
    field: "overallGross",
  },
  {
    title: "Total Tax Due",
    field: "totalTaxFormated",
  },

  {
    title: "Tax Office",
    field: "tax_office",
  },
  {
    title: "Type",
    field: "assessment_type",
  },
  {
    title: "Print Status",
    field: "printstatus",
  },
  {
    title: "Created Time",
    field: "createtime",
  },

];

export const ViewApprovedTable = ({ ApprovedData }) => {
  let items = ApprovedData;
  const [modal, setModal] = useState(false);
  const [revisedmodal, setRevisedModal] = useState(false);
  const [revisedAssFields, setRevisedAssFields] = useState({});
  const [assessId, setAssessId] = useState('');
  const [createErrors, setCreateErrors] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const router = useRouter();

  const { auth } = useSelector(
    (state) => ({
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  const DeleteRange = [1, 12]
  const reportRange = [39, 9, 20]
  const decoded = jwt.decode(auth);
  const userGroup = decoded.groups


  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleObjectionModal = () => {
    setRevisedModal(!revisedmodal);
  };

  setAuthToken();
  const DeleteAssessment = async (data) => {
    data.preventDefault()
    setIsFetching(true)
    let deleteOBJ = {
      assessment_id: assessId
    }
    try {
      await axios.delete(`${url.BASE_URL}forma/del-assessment`, { data: deleteOBJ })
      setIsFetching(false)
      toast.success("Deleted Successfully!");
      window.location.reload()
    } catch (error) {
      toast.error("Failed Try again!");
      setIsFetching(false)
    }
  };


  const ReviseAssessment = (e) => {
    e.preventDefault()
    setIsFetching(true)

    axios.post(`${url.BASE_URL}forma/new-objection`, revisedAssFields)
      .then(function (response) {
        setRevisedModal(!revisedmodal);
        setIsFetching(false)
        toast.success("Created successfully!");
        router.push(`/revise-assessment/${revisedAssFields.kgtin}_${response.data.body.assessment_id}`)
      })
      .catch(function (error) {
        setIsFetching(false)
        if (error) {
          setCreateErrors(error.response.data.message)
          toast.error(createErrors)
          setRevisedModal(!revisedmodal);
        } else {
          toast.error("Failed Try again!");

        }
      })

  };


  return (
    <>
      <ToastContainer />
      {modal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content" width="300">
            <form onSubmit={DeleteAssessment}>
              <div className="flex justify-center">
                <WarningRounded
                  size={15}
                  className="text-yellow-400"
                />
              </div>
              <p>Are you sure you want to delete?</p>
              {/* <textarea required className="form-control w-full rounded" minlength="10" maxlength="50" onChange={(e) => setComment(e.target.value)}></textarea> */}
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
      {revisedmodal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content" width="300">
            <form onSubmit={ReviseAssessment}>
              <div className="flex justify-center">
                <WarningRounded
                  size={15}
                  className="text-yellow-400"
                />
              </div>
              <p>Are you sure you want to create objection?</p>
              <div className="mt-2 flex justify-between">
                <button onClick={toggleObjectionModal}
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
      <MaterialTable title="Approved Assessments List"
        data={items}
        columns={fields}
        actions={[
          () => {
            if (userGroup.some(r => DeleteRange.includes(r))) {
              return {
                icon: Delete,
                tooltip: 'Delete Assessment',
                onClick: (event, rowData) => {
                  event.preventDefault()
                  setAssessId(rowData.assessment_id)
                  setModal(true)
                },
              };
            }
            else {
              return {

                icon: Delete,
                tooltip: 'Delete Assessment',
                hidden: true,
                onClick: (event, rowData) => {
                  event.preventDefault()
                  setAssessId(rowData.assessment_id)
                  setModal(true)
                }
              };
            }
          },
          {
            icon: () => <Icons.Objection />,
            tooltip: 'Objection',
            hidden: false,
            onClick: (event, rowData) => {
              event.preventDefault()
              setRevisedAssFields(
                {
                  "kgtin": rowData.kgtin,
                  "year": rowData.year,
                  "da_assessment_id": rowData.assessment_id,
                  "station": rowData.tax_office
                }
              )
              setRevisedModal(true)
            }
          },
        ]}

        options={{
          search: true,
          paging: true,
          filtering: true,
          actionsColumnIndex: -1,
          rowStyle: (rowData) => {
            if (rowData.printstatus === "Yes") {
              return {
                color: "#5f9f45"
                // backgroundColor: "#156448",
              }
            } else {
              return {};
            }
          },
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
          Delete: () => Delete,
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

            window.open(`/view/approvedasses/${rowData.assessment_id},${rowData.kgtin}`, "_self")
            event.stopPropagation();
          }
        }}
      />
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

export const ViewSingleApprovedTable = React.forwardRef((props, ref) => {


  const assId = props.assId
  const payerAyy = props.payerAyy
  const assobj = props.assobj
  const taxcal = props.taxcal


  const kgtinVal = payerAyy.map(function (doc) {
    let kgtin = doc.KGTIN
    return kgtin
  })
  const kgtinString = String(kgtinVal)

  let date = new Date()
  let due_date = new Date(date)
  due_date.setDate(due_date.getDate() + 60);
  let paymentDue = dateformat(due_date, "dd mmm yyyy")
  let printDate = Date.now();
  let datePrinted = dateformat(printDate, "dd mmm yyyy")

  const assessment_id = assId
  const employedCal = Number(assobj.employed)
  const selfEmployedCal = Number(assobj.self_employed)
  const grossIncCal = employedCal + selfEmployedCal

  const pfcdata = Number(assobj.pension)
  const nhisdata = Number(assobj.nhis)
  const lapdata = Number(assobj.lap)

  const deductionsTotal = (pfcdata + nhisdata + lapdata)



  return (
    <>
      <div className="mt-4" ref={ref}>

        <div align="center">
          <div className="flex justify-evenly">
            <p align="left"> <KgirsLogo /></p>
            <h3 className="mt-9">KOGI STATE GOVERNMENT</h3>
            <p align="right"> <KogiGov /></p>
          </div>
          <h5>Kogi State Internal Revenue Service</h5>
          <h6>Notice Of Assessment</h6>
        </div>
        <table width='800' height='1200' align='center' className='print'>
          <tr>
            <td width='800' height='1200' align='center' valign='top'>
              <div className="flex justify-between">
                <h6 align="left">Personal Income Tax {assobj.year}</h6>
                <small className="font-bold">{taxcal.paymentStatus}</small>
                <small>printed on {datePrinted}</small>
              </div>
              {payerAyy.map((data, idx) => (
                <table width='800' className='tb mb-4'>
                  <tr>
                    <td width='385'><table width='83%' height='100%' border='0'>
                      <tr>
                        <td width='139'><strong>NAME:</strong></td>
                        <tr className="">
                          <p key={idx}>{data.tp_name}</p>
                        </tr>
                      </tr>

                      <tr>
                        <td><strong>PHONE: </strong></td>
                        <p key={idx}> {data.phone_number} </p>
                      </tr>

                      <tr>
                        <td><strong>ADDRESS:</strong></td>
                        <div>
                          <p>{data.address}</p>
                        </div>
                      </tr>
                    </table></td>
                    <td width='403'><table width='85%' height='100%' border='0' align='right'>

                      <tr>
                        <td><strong>TAX STATION </strong></td>
                        {payerAyy.map((data, idx) => (
                          <div key={idx}>
                            {data.tax_office === "Okehi/Adavi" ?
                              <p>Adavi/Okehi</p> :
                              <p>{data.tax_office}</p>
                            }
                          </div>
                        ))}
                      </tr>
                      <tr>
                        <td><strong>KGTIN</strong></td>
                        <p key={idx}>{data.KGTIN}</p>
                      </tr>
                      <tr>
                        <td><strong>ASSESSMENT NO </strong></td>
                        {assessment_id}
                      </tr>
                      <tr>
                        <td><strong>TYPE</strong></td>
                        <p key={idx}>{data.tp_type}</p>
                      </tr>
                    </table>
                    </td>
                  </tr>
                </table>

              ))}

              <table width='800'>
                <tr>
                  <td width='400' height='1072' valign='top'><table width='377' height='1286' className='tb'>
                    <tr>
                      <td colspan='2'><div align='center'><span className='style4'>TAX COMPUTATION </span></div></td>

                    </tr>
                    <tr>
                      <td width='204' className='tb' ><span className='style27'>SOURCE OF INCOME </span></td>
                      <td width='161' className='tb' >₦</td>
                    </tr>
                    <tr>
                      <td className='tb'> Trade, Professional e.t.c </td>
                      {assobj == null || assobj == ""
                        ? <td></td> :
                        <td className='tb'><p className="font-bold" align="right">{formatNumber(assobj.self_employed)}</p> </td>
                      }
                    </tr>
                    <tr>
                      <td className='tb'>Share of Partnership </td>
                      <td className='tb'>   </td>
                    </tr>
                    <tr>
                      <td className='tb'>Employment</td>
                      {assobj == null || assobj == ""
                        ? <td><p className="font-bold text-right">0</p></td> :
                        <td className='tb'><p className="font-bold" align="right">{formatNumber(assobj.employed)}</p> </td>
                      }
                    </tr>
                    <tr>
                      <td className='tb'>Other Income </td>
                      <td className='tb'> <p className="font-bold text-right">{formatNumber(assobj.other_income)}</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style27 font-bold'>Gross Income </div></td>
                      <td className='tb'><p className="font-bold" align="right">{formatNumber((grossIncCal) + Number(assobj.other_income))}</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'>PFC</td>
                      {assobj == null || assobj == ""
                        ? <td className="tb"><p className="font-bold text-right">0</p></td> :
                        <td className='tb'><p className="font-bold" align="right">{formatNumber(assobj.pension)}</p></td>
                      }

                    </tr>
                    <tr>
                      <td className='tb'>NHIS</td>
                      {assobj == null || assobj == ""
                        ? <td className="tb"><p className="font-bold text-right">0</p></td> :
                        <td className='tb'> <p className="font-bold" align="right">{formatNumber(assobj.nhis)}</p></td>
                      }
                    </tr>
                    <tr>
                      <td className='tb'>NHF</td>
                      <td className='tb'><p className="font-bold text-right">0</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'>Life Assurance Premium</td>
                      {assobj == null || assobj == ""
                        ? <td className="tb"><p className="font-bold text-right">0</p></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(assobj.lap)}</p></td>
                      }

                    </tr>
                    <tr>
                      <td className='tb font-bold'><p align="right">Total</p></td>
                      <td className='tb'> <p className="font-bold text-right">{formatNumber(deductionsTotal)}</p></td>
                    </tr>
                    <tr>
                      <td className='tb font-bold'><div align='right' className='style16'>Assessable Income </div></td>
                      <td className='tb'> <p className="font-bold text-right">{formatNumber((((grossIncCal) + Number(assobj.other_income))) - deductionsTotal)}</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'>ADD</td>
                      <td className='tb'><p className="font-bold text-right">0</p></td>
                    </tr>
                    <tr>
                      <td className='tb'>Balancing Charges </td>
                      <td className='tb'> <p className="font-bold text-right">0</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'>DEDUCT</td>
                      <td className='tb'><p className="font-bold text-right">0</p></td>
                    </tr>
                    <tr>
                      <td className='tb'>Balancing Allowances </td>
                      <td className='tb'> <p className="font-bold text-right">0</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'>Lose Relief </td>
                      <td className='tb'><p className="font-bold text-right">0</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'>Capital Allowances </td>
                      <td className='tb'><p className="font-bold text-right">0</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style16 font-bold'>Total Income</div></td>
                      <td className='tb'> <p className="font-bold text-right">{formatNumber((((grossIncCal) + Number(assobj.other_income))) - deductionsTotal)}</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'>Consolidated Relief Allowance</td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.consolidatedRelief)}</p></td>
                      }
                    </tr>
                    <tr>
                      <td className='tb font-bold'><div align='right'>Chargeable Income </div></td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.chargeableIncome)}</p></td>
                      }
                    </tr>
                    <tr>
                      <td className='tb'><div align='left' className='style16 font-bold'>Tax Due for Payment </div></td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>First 300,000.00 at 7%</div></td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax7)}</p> </td>
                      }


                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Next 300,000.00 at 11%</div></td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax11)}</p> </td>
                      }

                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Next 500,000.00 at 15% </div></td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax15)}</p></td>
                      }

                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Next 500,000.00 at 19%</div></td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'><p className="font-bold text-right">{formatNumber(taxcal.tax19)}</p></td>
                      }

                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Next 1,600,000.00 at 21%</div></td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax21)}</p></td>
                      }

                    </tr>
                    <tr>
                      <td className='tb'><div align='center'>Above 3,200,000.00 at 24%</div></td>
                      {taxcal == null || taxcal == ""
                        ? <td className="tb"></td> :
                        <td className='tb'> <p className="font-bold text-right">{formatNumber(taxcal.tax24)}</p></td>
                      }

                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>1%(Minimun Tax)</div></td>
                      <td className='tb'><p className="font-bold text-right">{formatNumber(taxcal.tax1)}</p></td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Total </div></td>
                      <td className='tb'><p className="font-bold text-right"> {formatNumber(Number(taxcal.tax))}</p> </td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='center' className='style16'>Dev. Levy </div></td>
                      <td className='tb'> <p className="font-bold text-right">{formatNumber(Number(assobj.dev_levy))}</p></td>
                      {/* <td className='tb'> <p className="font-bold text-right">{formatNumber(Number(taxcal.devy_levy))}</p> </td> */}
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style16 font-bold'>Total Tax Due </div></td>
                      <td className='tb'><div align='right' className=' font-bold'>{formatNumber(assobj.tax)}</div></td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style16 font-bold'>Additional Assessment </div></td>
                      <td className='tb'><div align='right' className='font-bold'>{formatNumber(Number(assobj.tax) -( Number(taxcal.tax) + Number(taxcal.devy_levy)))}</div></td>
                    </tr>
                    <tr>
                      <td className='tb'><div align='right' className='style16 font-bold'>Set off WHT </div></td>
                      <td className='tb'><p className="font-bold text-right">0</p></td>
                    </tr>
                    <tr>
                      <td height='28' className='tb'><div align='right' className='style16 font-bold'>Set off 1st Assessment </div></td>
                      <td className='tb'> <p className="text-right font-bold">0</p> </td>
                    </tr>
                    <tr>
                      <td height='28' className='tb'><div align='right' className='style16 font-bold'>Set off Additional Assessment </div></td>
                      <td className='tb'> <p className="text-right font-bold">0</p> </td>
                    </tr>
                    <tr>
                      <td height='30' className='tb'><div align='right' className='style16 font-bold'>Total Tax Due for Payment </div></td>
                      <td className='tb'><p className="font-bold text-right">{formatNumber(assobj.tax)}</p></td>
                    </tr>
                  </table>
                    <br />
                    <table width='300'>
                      <tr>
                        <td width='235' className='style5 font-bold'>HOW TO PAY YOUR TAX</td>
                      </tr>
                      <tr>
                        <td width='235' className='style5'>1. Pay online by Visiting the KGIRS e-tax portal. <br />
                          https://etax.irs.kg.gov.ng</td>
                      </tr>
                      <tr>
                        <td width='235' className='style5'><span className='style27'>2. Pay via USSD from your mobile phone by dialling *389*806#</span></td>
                      </tr>
                      <tr>
                        <td width='235' className='style5'><span className='style27'>3. Pay at any of our collection banks listed</span></td>
                      </tr>
                    </table>
                  </td>
                  <td valign='top'>
                    <div>
                      <div>
                        <div>
                          {assobj.assessment_type === null || assobj.assessment_type === "" || assobj.assessment_type === 'Assessment' ?
                            <div>
                              <p className="text-justify">
                                Be informed that Tax payment is not a fine, It is a civic responsibility.
                                We have made an Assesment on you as set out Opposite, for the year {assobj.year},
                                Under the provision of personal Income Tax Act 2011 amended
                              </p>
                            </div>
                            :
                            <div>
                              <p className="text-justify">
                                Be informed that Tax payment is not a fine, It is a civic responsibility.
                                We have made an Assesment on you <span className="font-bold">Based on Best of Judgement</span> as set out Opposite, for the year {assobj.year},
                                Under the provision of personal Income Tax Act 2011 amended.
                                <p className="font-bold">Reason:  <span>{assobj.boj_comment}</span> </p>
                              </p>
                            </div>
                          }

                        </div>
                      </div>
                      <div className="flex mt-4 justify-center">
                        <Signature />
                      </div>
                      <div className="flex justify-center">
                        <div>
                          <p className="font-bold mt-3" align="center"> Sule Salihu Enehe </p>
                          <p>Executive Chaiman</p>
                          <p>Kogi State Internal Revenue Service</p>
                        </div>
                      </div>

                      <div className="mb-3 mt-4">
                        <p>Prepared By:</p>
                        <p>Collection Authority:     KGIRS CORPORATE HQTRS</p>
                        <p>Due Date of Payment:</p>
                      </div>
                      <div>

                        <div className="text-justify">
                          <p className="font-bold" align="center">RIGHT OF OBJECTION</p>
                          <p>If you do not agree to the Assesment, you are please Obliged to do the following:</p>

                          <p>I. Give Notice of Objection in writing Seeking the relevant tax office in review and revise the Assessment</p>
                          <p>II. The Objection should contain precise ground(s) of Objectionon points of fact and or subsisting laws on personal income Tax Administration</p>
                          <p>III. The Objection notice should reach the tax office within (30) days from the date of service of notice of assessment. Else
                            a penalty of 10 percent of tax payable will be added and any right of payment by two instalments will be lost.
                          </p>
                          <p>The Tax appeal Tribunal Established pursuant to section 59 of the federal inland revenue(Establishment) Act, 2007 shall have powers
                            to entertain all cases from the operation of Personal Income Tax, 2011 amended
                          </p>
                          <p align="center" className="m-5 font-bold">PAYMENT OF TAX</p>
                          <p>The net Tax Payable be paid to</p>
                          <p className="font-bold">KOGI STATE INTERNAL REVENUE SERVICE LOKOJA</p>
                          <p>The Tax ID and assessment number should always be quoted</p>
                        </div>
                        <tr width="300">
                          <td width="300" className="font-bold tb">TIN</td>
                          <td width="300" className="font-bold tb">{kgtinString}</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">Assesment no</td>
                          <td width="300" className="font-bold tb">{assessment_id}</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">Year of Assesment</td>
                          <td width="300" className="font-bold tb">{assobj.year}</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">Net Tax Payable</td>
                          <td width="300" className="font-bold tb">{formatNumber(assobj.tax)}</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">Payment due date</td>
                          <td width="300" className="font-bold tb">{paymentDue}</td>
                        </tr>
                        <p className="font-bold mt-14" align="center">COLLECTION BANK</p>
                        <tr width="300">
                          <td width="300" className="font-bold tb">Access Bank</td>
                          <td width="300" className="font-bold tb">Eco Bank</td>
                          <td width="300" className="font-bold tb">Zenith Bank</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">FCMB</td>
                          <td width="300" className="font-bold tb">Fidelity Bank</td>
                          <td width="300" className="font-bold tb">First Bank</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">Heritage Bank</td>
                          <td width="300" className="font-bold tb">KeyStone Bank</td>
                          <td width="300" className="font-bold tb">Stanbic IBTC Bank</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">Kogi Savings</td>
                          <td width="300" className="font-bold tb">Polaris Bank</td>
                          <td width="300" className="font-bold tb">Wema Bank</td>
                        </tr>
                        <tr width="300">
                          <td width="300" className="font-bold tb">UBA</td>
                          <td width="300" className="font-bold tb">Union Bank</td>
                          <td width="300" className="font-bold tb">Unity Bank</td>
                        </tr>
                      </div>
                    </div>
                  </td>

                </tr>
              </table>
            </td>
          </tr>

        </table>
      </div>
      <style
        jsx>{`
        .style1 {
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          color: #006600;
          font-size: 58px;
          font-weight: bold;
        }
        .style4 {
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          font-weight: bold;
        }
        .style5 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri}
        
         .tb {    
            border: 1px solid #000000;
            text-align: left;
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          font-size: 14px;
          height: 20px;
           border-collapse: collapse;
          padding: 2px;
        } 
        .style9 {font-size: 18px; color: #006600; font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-weight: bold; }
        .style10 {font-size: 19px; color: #006600; font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-weight: bold; }
        .style11 {font-size: 21px}
        .style16 {font-size: 12px}
        .style18 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-size: 12px; font-weight: bold; }
        .style20 {font-size: 12px; font-weight: bold; }
        .style21 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-size: 12px; font-weight: bold; font-style: italic; }
        .style27 {font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; font-size: 12px; }
        .style28 {border: 1px solid #ddd; text-align: left; font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri; border-collapse: collapse; padding: 5px; font-size: 12px; }
        .style29 {
          border: 1px solid #ddd;
          text-align: left;
          font-family: Geneva, Arial, Helvetica, sans-serif, 'Cambria', Calibri;
          border-collapse: collapse;
          padding: 5px;
          font-weight: bold;
          font-size: 12px;
        }
        
        
        
        .style30 {font-size: 15px}
        .style32 {
          font-size: 15px;
          font-weight: bold;
        }
        .style34 {font-size: 15px}
        .style35 {font-weight: bold} 
        
        .print:last-child {
             page-break-after: auto;
        }
      `}
      </style>
    </>
  );
});
