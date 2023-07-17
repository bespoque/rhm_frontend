import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormatMoneyComponent } from "../FormInput/formInputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SubmitButton } from "../CustomButton/CustomButton";
import { FiCheck } from 'react-icons/fi';

export const StartTcc = () => {
  const [kgtEnentered, setKgtEentered] = useState('')
  const [validkgtinmessage, Setvalidkgtinmessage] = useState('')
  const [invalidkgtinmessage, Setinvalidkgtinmessage] = useState('')
  const [disabled, setDisabled] = useState(true);
  const [validmsg, setvalidmsg] = useState("hidden");
  const [invalidmsg, setinvalidmsg] = useState("hidden");
  const [payerDetails, setpayerDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(() => false);
  const [isFetching2, setIsFetching2] = useState(() => false);
  const [assessmentData, setAssessmentData] = useState([]);
  const [assessmentData2, setAssessmentData2] = useState([]);
  const [assessmentData3, setAssessmentData3] = useState([]);
  const [year1Err, setYear1Err] = useState([]);
  const [year2Err, setYear2Err] = useState([]);
  const [year3Err, setYear3Err] = useState([]);
  const [tccErrors, settccErrors] = useState(() => []);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var c = new Date(year - 20, month, day);


  var e = new Date();
  var year2 = e.getFullYear();
  var month2 = e.getMonth();
  var day2 = e.getDate();
  var f = new Date(year - 21, month, day);

  var g = new Date();
  var year2 = g.getFullYear();
  var month2 = g.getMonth();
  var day2 = g.getDate();
  var j = new Date(year - 22, month, day);



  const watchYear1 = watch("year1", e);
  const watchYear2 = watch("year2", c);
  const watchYear3 = watch("year3", f);


  const KGTIN = payerDetails.KGTIN


  setAuthToken();
  const verifiyKGTIN = async () => {
    setIsFetching(true)
    let testkgtin = kgtEnentered
    let kgtin = {
      "KGTIN": `${testkgtin}`
    }
    try {
      let res = await axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, kgtin);
      setIsFetching(false)
      let userpayer = res.data.body
      setpayerDetails(userpayer)
      Setvalidkgtinmessage("KGTIN is Valid");
      setDisabled(false)
      setvalidmsg('')
      setinvalidmsg('hidden')
    } catch (err) {
      setpayerDetails([])
      setIsFetching(false)
      setDisabled(true)
      setinvalidmsg('')
      setvalidmsg('hidden')
      Setinvalidkgtinmessage("Invalid KGTIN");
    }
  };

  setAuthToken();
  useEffect(() => {
    const kgtinYear = {
      year: `${(watchYear1).getFullYear()}`,
      kgtin: `${KGTIN}`
    }
    console.log(kgtinYear);
    const fetchPostYear1 = async () => {
      setIsFetching2(true)
      try {
        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
        res = res.data.body
        let assessment = res.assessment
        console.log(assessment);
        setAssessmentData(assessment)
        setIsFetching2(false)

      } catch (e) {
        setIsFetching2(false)
        setAssessmentData([])
        if (e.response) {
          setYear1Err(() => e.response.data.message);
          toast.error(year1Err)
          setIsFetching2(false)
        } else {
          setIsFetching2(false)
          toast.error("Failed!");
        }
      }
    };
    fetchPostYear1();

  }, [watchYear1.getFullYear()]);


  useEffect(() => {
    const kgtinYear = {
      year: `${(watchYear2).getFullYear()}`,
      kgtin: `${KGTIN}`
    }
    console.log(kgtinYear);
    const fetchPostYear2 = async () => {
      setIsFetching2(true)
      try {
        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
        res = res.data.body
        let assessment = res.assessment
        setAssessmentData2(assessment)
        setIsFetching2(false)

      } catch (e) {
        setAssessmentData2([])
        setIsFetching2(false)
        if (e.response) {
          setYear2Err(() => e.response.data.message);
          toast.error(year2Err)
          setIsFetching2(false)
        } else {
          setIsFetching2(false)
          toast.error("Failed!");
        }
      }
    };
    fetchPostYear2();

  }, [watchYear2.getFullYear()]);


  useEffect(() => {
    const kgtinYear = {
      year: `${(watchYear3).getFullYear()}`,
      kgtin: `${KGTIN}`
    }

    const fetchPostYear3 = async () => {
      setIsFetching2(true)
      try {
        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
        res = res.data.body
        let assessment = res.assessment
        setAssessmentData3(assessment)
        setIsFetching2(false)

      } catch (e) {
        setAssessmentData3([])
        setIsFetching2(false)
        if (e.response) {
          setYear3Err(() => e.response.data.message);
          toast.error(year3Err)
          setIsFetching2(false)
        } else {
          setIsFetching2(false)
          toast.error("Failed!");
        }
      }
    };
    fetchPostYear3();

  }, [watchYear3.getFullYear()]);

  setAuthToken();
  const onSubmitform = data => {
    setIsFetching2(true)
    if (data.assmt_2 === '') {
      data.assmt_2 = null
    }
    if (data.assmt_3 === '') {
      data.assmt_3 = null
    }
    console.log(data);

    let createTCC = {
      file_ref: data.file_ref,
      prc_fee: data.prc_fee,
      tp_id: data.tp_id,
      tax_office: data.tax_office,
      assmt_1: data.assmt_1,
      assmt_2: data.assmt_2,
      assmt_3: data.assmt_3
    }
    if (watchYear1.getFullYear() === watchYear2.getFullYear() || watchYear1.getFullYear() === watchYear3.getFullYear() || watchYear2.getFullYear() === watchYear3.getFullYear()) {
      alert("Cannot have same year twice")
    } else {
      setIsFetching2(false)
      axios.post(`${url.BASE_URL}forma/tcc`, createTCC)
        .then(function (response) {
          // handle success
          toast.success("Created Successfully!");
          console.log(response.data.body[0].id);
          router.push(`tcc/${response.data.body[0].id}`)
          setIsFetching2(false)
        })
        .catch(function (error) {
          // handle error
          setIsFetching2(false)
          if (error.response) {
            settccErrors(() => error.response.data.message);
            toast.error(tccErrors)
          } else {
            toast.error("Failed to Create!");
          }
        })
    }


  };


  return (
    <>
      <ToastContainer />
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
          <p className="font-bold">Processing...</p>
        </div>
      )}

      <div className="border mb-3 p-6 rounded-lg bg-white w-full">
        <div className="mb-2 grid grid-cols-3 gap-2">
          <label className="self-center">Enter Taxpayer KGTIN</label>

          <div className="place-self-start">
            <input onChange={event => setKgtEentered(event.target.value)} type="text" placeholder="Enter KGTIN" />
          </div>

          <div className="self-center">
            <a
              onClick={verifiyKGTIN}
              style={{ backgroundColor: "#84abeb" }}
              className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
            >
              Verify KGTIN
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div>
            <small className={`${validmsg}`}>{payerDetails.tp_name}</small>
            <small className={`text-red-600 ${invalidmsg}`}>{invalidkgtinmessage}</small>
          </div>
        </div>

      </div>
      <form onSubmit={handleSubmit(onSubmitform)}>

        <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">
          <div className="">

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>Taxpayer:</label>
              {payerDetails === [] || payerDetails === "" || payerDetails === undefined ? <input ref={register()} readOnly name="taxpayername" className="form-control w-full rounded" type="text" placeholder="Taxpayer name" />
                :
                <div>

                  <input ref={register()} name="taxpayername" readOnly type="text" defaultValue={payerDetails.tp_name} className="form-control w-full rounded"
                  />
                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>KGTIN:</label>
              {payerDetails === [] || payerDetails === "" || payerDetails === undefined ?
                <div>
                  <input ref={register({ required: "KGTIN is required" })} readOnly name="tp_id" type="text" className="form-control w-full rounded" placeholder="KGTIN" />
                  {errors.tp_id && <p className="text-red-600">{errors.tp_id.message}</p>}
                </div>
                :
                <div>
                  <input ref={register()} name="tp_id" readOnly type="text" defaultValue={payerDetails.KGTIN} className="form-control w-full rounded"
                  />
                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label>File no:</label>
              <input ref={register({ required: "File no is required" })} name="file_ref" type="text" className="form-control w-full rounded"
              />
              {errors.file_ref && <p className="text-red-600">{errors.file_ref.message}</p>}

            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
              <label htmlFor="employername">Tax Office:</label>

              {payerDetails == null || payerDetails == "" || payerDetails == undefined ? <input ref={register()} readOnly type="text" className="form-control w-full rounded" name="tax_office" placeholder="Tax Station" />
                :
                <div>

                  <input ref={register()} name="tax_office" readOnly type="text" defaultValue={payerDetails.tax_office} className="form-control w-full rounded"
                  />
                </div>
              }

            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <label htmlFor="employername">Processing Fee:</label>
              <input ref={register({ required: "Processing fee is required" })} placeholder="₦" name="prc_fee" type="text" className="form-control w-full rounded"
              />
              {errors.prc_fee && <p className="text-red-600">{errors.prc_fee.message}</p>}
            </div>
          </div>
        </div>
        {isFetching2 && (
          <div className="flex justify-center item mb-2">
            <Loader
              visible={isFetching2}
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
        <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>

          <div className="p-3">
            <h6 className="text-right mb-6">Year 1</h6>
            <div className="mb-6 grid grid-cols-2 ">
              <label>Assessment year </label>
              <Controller
                name="year1"
                control={control}
                // defaultValue={new Date()}
                render={({ onChange, value }) => {
                  return (
                    <DatePicker
                      className="form-control w-full rounded"
                      onChange={onChange}
                      selected={value}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={8}
                      placeholderText="Select Year"
                    />
                  );
                }}
              />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Assessment ID</label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ?
                <div>
                  <input className="form-control w-full rounded" ref={register({ required: "First year Assessment is required " })} name="assmt_1" readOnly type="text" />
                  {errors.assmt_1 && <p className="text-red-600">{errors.assmt_1.message}</p>}
                </div>
                :
                <div>
                  {assessmentData.map((ele, i) => (
                    <input readOnly name="assmt_1" ref={register({ required: "First year Assessment is required " })} className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
                    />
                  ))}
                  {errors.assmt_1 && <small className="text-red-600">{errors.assmt_1.message}</small>}
                </div>
              }
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Tax Payable </label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input readOnly className="form-control w-full rounded" type="text" defaultValue={0} />
                :
                <div>
                  {assessmentData.map((ele, i) => (
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.taxAmount)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
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
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>
            <div className="mb-6 grid grid-cols-2 gap-3">
              <label>Type</label>
              {assessmentData == null || assessmentData == "" || assessmentData == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                :
                <div>

                  {assessmentData.map((ele, i) => (
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={ele?.assessment_type} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>
          </div>

          <div className="p-3 grid justify-items-stretch">
            <h6 className="text-center mb-6">Year 2</h6>
            <div className="mb-6 justify-self-center">

              <Controller
                name="year2"
                control={control}
                // defaultValue={c}
                render={({ onChange, value }) => {
                  return (
                    <DatePicker
                      className="form-control w-full rounded"
                      onChange={onChange}
                      selected={value}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={8}
                      placeholderText="Select Year"


                    />
                  );
                }}
              />
            </div>

            <div className="mb-6 justify-self-center">

              {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_2" ref={register()} type="text" />
                :
                <div>

                  {assessmentData2.map((ele, i) => (
                    <input readOnly name="assmt_2" ref={register()} className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.taxAmount)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
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
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">

              {assessmentData2 == null || assessmentData2 == "" || assessmentData2 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                :
                <div>

                  {assessmentData2.map((ele, i) => (
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={ele?.assessment_type} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

          </div>

          <div className="p-3 grid justify-items-stretch">
            <h6 className="text-center mb-6">Year 3</h6>
            <div className="mb-6 justify-self-center">

              <Controller
                name="year3"
                control={control}
                // defaultValue={f}
                render={({ onChange, value }) => {
                  return (
                    <DatePicker
                      className="form-control w-full rounded"
                      onChange={onChange}
                      selected={value}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={8}
                      placeholderText="Select Year"

                    />
                  );
                }}
              />
            </div>

            <div className="mb-6 justify-self-center">

              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly name="assmt_3" ref={register()} type="text" />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input readOnly name="assmt_3" ref={register()} className="form-control w-full rounded" key={i} defaultValue={(ele.assessment_id)} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.taxAmount)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.employed)} ref={register()} type="text"
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
                    <input readOnly name="tax1" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.self_employed)} ref={register()} type="text"
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
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={formatNumber(ele.other_income)} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

            <div className="mb-6 justify-self-center">

              {assessmentData3 == null || assessmentData3 == "" || assessmentData3 == undefined ? <input className="form-control w-full rounded" readOnly type="text" />
                :
                <div>

                  {assessmentData3.map((ele, i) => (
                    <input readOnly name="other_income" className="form-control w-full rounded" key={i} defaultValue={ele?.assessment_type} ref={register()} type="text"
                    />
                  ))}

                </div>
              }
            </div>

          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            style={{ backgroundColor: "#84abeb" }}
            className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
            type="submit"
          // disabled={disabled}
          >
            Create TCC
          </button>
        </div>
      </form>
    </>
  );
};


export const UploadTccForms = ({ tccId }) => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [uploadedFile2, setUploadedFile2] = useState(false);
  const [uploadedFile3, setUploadedFile3] = useState(false);
  const [uploadedFile4, setUploadedFile4] = useState(false);
  const [uploadedFile5, setUploadedFile5] = useState(false);
  const [uploadedFile6, setUploadedFile6] = useState(false);
  const [uploadedFile7, setUploadedFile7] = useState(false);
  const [isFetching, setIsFetching] = useState(() => false);
  const [uploadErrors, setUploadErrors] = useState(() => []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const onChange = e => {
    const file = e.target.files[0]
    console.log(file);
    if (file) {
      if (!file) {
        setFile(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile(null);
        return;
      }
      if (file.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile(file);
      }
    }
  };

  const onChange2 = e => {
    const file2 = e.target.files[0]
    if (file2) {
      if (!file2) {
        setFile2(null);
        return;
      }
      if (file2.type !== "image/jpeg" && file2.type !== "application/pdf" && file2.type !== "image/png") {
        alert("file2 type not allowed. only pdf, png and jpeg are allowed");
        setFile2(null);
        return;
      }
      if (file2.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile2(file2);
      }
    }
  };

  const onChange3 = e => {
    const file3 = e.target.files[0]
    if (file3) {
      if (!file3) {
        setFile3(null);
        return;
      }
      if (file3.type !== "image/jpeg" && file3.type !== "application/pdf" && file3.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile3(null);
        return;
      }
      if (file3.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile3(file3);
      }
    }
  };

  const onChange4 = e => {
    const file4 = e.target.files[0]
    if (file4) {
      if (!file4) {
        setFile4(null);
        return;
      }
      if (file4.type !== "image/jpeg" && file4.type !== "application/pdf" && file4.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile4(null);
        return;
      }
      if (file4.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile4(file4);
      }
    }
  };

  const onChange5 = e => {
    const file5 = e.target.files[0]
    if (file5) {
      if (!file5) {
        setFile5(null);
        return;
      }
      if (file5.type !== "image/jpeg" && file5.type !== "application/pdf" && file5.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile5(null);
        return;
      }
      if (file5.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile5(file5);
      }
    }
  };

  const onChange6 = e => {
    const file6 = e.target.files[0]
    if (file6) {
      if (!file6) {
        setFile6(null);
        return;
      }
      if (file6.type !== "image/jpeg" && file6.type !== "application/pdf" && file6.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile6(null);
        return;
      }
      if (file6.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile6(file6);
      }
    }
  };

  const onChange7 = e => {
    const file7 = e.target.files[0]
    if (file7) {
      if (!file7) {
        setFile7(null);
        return;
      }
      if (file7.type !== "image/jpeg" && file7.type !== "application/pdf" && file7.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFile7(null);
        return;
      }
      if (file7.size > 1024 * 200) {
        alert("file too large..file size shoulde not exceed 200kb");
        return
      }
      else {
        setFile7(file7);
      }
    }
  };

  setAuthToken()
  const onSubmitform = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'application_letter');
    formData.append('tcc_id', tccId);
    formData.append('doc', file);
    console.log("formData", formData);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setFile(null);
      setIsFetching(false)
      setUploadedFile(true);
      toast.success("Upload Successful!")
    } catch (error) {
      setFile(null);
      setUploadedFile(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitform2 = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'payslip');
    formData.append('tcc_id', tccId);
    formData.append('doc', file2);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile2(true);
      toast.success("Upload Successful!")
    } catch (error) {
      // toast.error("Failed to upload!")
      setUploadedFile2(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile2(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile2(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitform3 = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'passport');
    formData.append('tcc_id', tccId);
    formData.append('doc', file3);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile3(true);
      toast.success("Upload Successful!")
    } catch (error) {
      // toast.error("Failed to upload!")
      setUploadedFile3(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile3(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile3(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitform4 = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'idcard');
    formData.append('tcc_id', tccId);
    formData.append('doc', file4);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile4(true);
      toast.success("Upload Successful!")
    } catch (error) {
      // toast.error("Failed to upload!")
      setUploadedFile4(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile4(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile4(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitform5 = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'income_form');
    formData.append('tcc_id', tccId);
    formData.append('doc', file5);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile5(true);
      toast.success("Upload Successful!")
    } catch (error) {
      // toast.error("Failed to upload!")
      setUploadedFile5(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile5(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile5(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitform6 = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'intro_letter');
    formData.append('tcc_id', tccId);
    formData.append('doc', file6);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile6(true);
      toast.success("Upload Successful!")
    } catch (error) {
      // toast.error("Failed to upload!")
      setUploadedFile6(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile6(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile6(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitform7 = async data => {
    setIsFetching(true)
    const formData = new FormData();
    formData.append('item', 'sign');
    formData.append('tcc_id', tccId);
    formData.append('doc', file7);
    try {
      const res = await axios.post(`${url.BASE_URL}forma/tcc-uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsFetching(false)
      setUploadedFile7(true);
      toast.success("Upload Successful!")
    } catch (error) {
      // toast.error("Failed to upload!")
      setUploadedFile7(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile7(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        setUploadedFile7(false);
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  return (
    <>

      <ToastContainer />

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
          <p className="font-bold">Uploading...</p>
        </div>
      )}
      <h6 className="p-2 font-bold">Upload Documents</h6>
      <Widget>
        <div>
          <form onSubmit={handleSubmit(onSubmitform)}>
            <div className="flex justify-between mb-5">
              <p> Application letter </p>
              <input
                type="file"
                className="hidden"
                id='customFile'
                name="application_letter"
                // ref={register()}
                onChange={onChange}
                onClick={(e) => (e.target.value = null)}
                required
              />

              <div className="flex justify-evenly">

                <p className="self-center">{file ? file.name : ""}</p>

                <label
                  htmlFor='customFile'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                >
                  Submit
                </button>


                {uploadedFile ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={15}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form>

          <hr className="mb-2" />
          {/* 
          <form onSubmit={handleSubmit(onSubmitform2)}>
            <div className="flex justify-between mb-5">
              <p>Payslip or salary schedule</p>
              <input
                type="file"
                className="hidden"
                id='customFile2'
                // ref={register()}
                onChange={onChange2}
                onClick={(e) => (e.target.value = null)}
                required
              />

              <div className="flex justify-evenly">
                <p >{file2 ? file2.name : ""}</p>
                <label
                  htmlFor='customFile2'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                >
                  Submit
                </button>

                {uploadedFile2 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form> */}

          <hr className="mb-2" />

          <form onSubmit={handleSubmit(onSubmitform3)}>
            <div className="flex justify-between mb-5">
              <p>Passport Photograph </p>
              <input
                type="file"
                className="hidden"
                id='customFile3'
                required
                onChange={onChange3}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file3 ? file3.name : ""}</p>

                <label
                  htmlFor='customFile3'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>

                {/* {submitting3 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage3} />
                  </div>
                  : ''} */}

                {uploadedFile3 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          {/* <form onSubmit={handleSubmit(onSubmitform4)} >
            <div className="flex justify-between mb-5">
              <p>Staff ID Card </p>
              <input
                type="file"
                className="hidden"
                id='customFile4'
                required
                onChange={onChange4}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file4 ? file4.name : ""}</p>

                <label
                  htmlFor='customFile4'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
               
                >
                  Submit
                </button>

           

                {uploadedFile4 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form> */}

          <hr className="mb-2" />

          <form onSubmit={handleSubmit(onSubmitform5)}>
            <div className="flex justify-between mb-5">
              <p>Income Declaration form (F3) </p>
              <input
                required
                type="file"
                className="hidden"
                id='customFile5'
                onChange={onChange5}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file5 ? file5.name : ""}</p>

                <label
                  htmlFor='customFile5'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>



                {uploadedFile5 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form>

          <hr className="mb-2" />

          {/* <form onSubmit={handleSubmit(onSubmitform6)}>
            <div className="flex justify-between mb-5">
              <p>Letter of Introduction </p>
              <input
                required
                type="file"
                className="hidden"
                id='customFile6'
                onChange={onChange6}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file6 ? file6.name : ""}</p>

                <label
                  htmlFor='customFile6'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                >
                  Submit
                </button>


                {uploadedFile6 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form> */}

          <hr className="mb-2" />

          <form onSubmit={handleSubmit(onSubmitform7)}>
            <div className="flex justify-between mb-5">
              <p>Scanned Signature</p>
              <input
                required
                type="file"
                className="hidden"
                id='customFile7'
                onChange={onChange7}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{file7 ? file7.name : ""}</p>

                <label
                  htmlFor='customFile7'
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                >
                  Select File
                </label>

                <button
                  style={{ backgroundColor: "#84abeb" }}
                  className="btn btn-default text-white btn-outlined bg-transparent rounded-md mx-2"
                  type="submit"
                // disabled={disabled3}
                >
                  Submit
                </button>

                {/* {submitting3 ?
                  <div className='mb-2 w-24'>
                    <Progress percentage={uploadPercentage3} />
                  </div>
                  : ''} */}

                {uploadedFile7 ? (
                  <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <FiCheck
                      size={18}
                      className="stroke-current text-green-500"
                    />
                  </span>) : null}

              </div>
            </div>
          </form>


          <div className="flex justify-center">

            <button
              // onClick={window.Location("/")}
              className="disabled:opacity-50 bg-white-500 py-2 px-6 rounded-md  text-dark border hover:text-white hover:bg-green-500 hover:border-green-500"
              type="submit"
            >
              <Link legacyBehavior href={`/dashboard`}>Done</Link>

            </button>
          </div>

        </div>
      </Widget>

    </>

  )
}

