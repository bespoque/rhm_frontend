import Widget from "../widget";
import Link from 'next/link';
import { useEffect, useState } from "react";
import url from '../../config/url';
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { FiCheck } from 'react-icons/fi';


export const UploadPayeeTCC = () => {
  const [fileSign, setFileSign] = useState(null);
  const [filePass, setFilePass] = useState(null);
  const [fileLetter, setFileLetter] = useState(null);
  const [fileAssForm, setFileAssForm] = useState(null);
  const [fileIntroletter, setFileIntroLetter] = useState(null);
  const [fileStaffID, setFileStaffId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [uploadedFilePass, setUploadedFilePass] = useState(false);
  const [uploadedFileLetter, setUploadedFileLetter] = useState(false);
  const [uploadedAssForm, setUploadedAssFrom] = useState(false);
  const [uploadedIntroLetter, setUploadedIntroLetter] = useState(false);
  const [uploadedStaffID, setUploadedStaffId] = useState(false);
  const [isFetching, setIsFetching] = useState(() => false);
  const [uploadErrors, setUploadErrors] = useState(() => []);
  const [tccId, setTccId] = useState([]);
  const [kgtin, setKgtin] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let createId = routerData.split('_').shift();
      let kgtin = routerData.split('_').pop()
      setKgtin(kgtin)
      setTccId(createId)
    }
  }, [router]);

  const onChangeSign = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFileSign(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFileSign(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size should not exceed 100kb");
        return
      }
      else {
        setFileSign(file);
      }
    }
  };

  const onChangePass = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFilePass(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFilePass(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size should not exceed 100kb");
        return
      }
      else {
        setFilePass(file);
      }
    }
  };

  const onChangeLetter = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFileLetter(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFileLetter(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size should not exceed 100kb");
        return
      }
      else {
        setFileLetter(file);
      }
    }
  };

  const onChangeAssForm = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFileAssForm(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFileAssForm(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size should not exceed 100kb");
        return
      }
      else {
        setFileAssForm(file);
      }
    }
  };

  const onChangeIntroLetter = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFileIntroLetter(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFileIntroLetter(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size should not exceed 100kb");
        return
      }
      else {
        setFileIntroLetter(file);
      }
    }
  };

  const onChangeStaffID = e => {
    const file = e.target.files[0]
    if (file) {
      if (!file) {
        setFileStaffId(null);
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
        alert("file type not allowed. only pdf, png and jpeg are allowed");
        setFileStaffId(null);
        return;
      }
      if (file.size > 1024 * 100) {
        alert("file too large..file size should not exceed 100kb");
        return
      }
      else {
        setFileStaffId(file);
      }
    }
  };



  setAuthToken()
  const onSubmitformSign = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    formData.append('tcc_id', tccId);
    formData.append('doc_title', 'scanned signature');
    formData.append('doc_name', fileSign);
    formData.append('kgtin', kgtin);
    try {
      const res = await axios.post(`${url.BASE_URL}paye/tcc/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setFileSign(null);
      setIsFetching(false)
      setUploadedFile(true);
      toast.success("Upload Successful!")
    } catch (error) {
      setFileSign(null);
      setUploadedFile(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFile(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitformPass = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    formData.append('tcc_id', tccId);
    formData.append('doc_title', 'passport photo');
    formData.append('doc_name', filePass);
    formData.append('kgtin', kgtin);
    try {
      const res = await axios.post(`${url.BASE_URL}paye/tcc/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setFilePass(null);
      setIsFetching(false)
      setUploadedFilePass(true);
      toast.success("Upload Successful!")
    } catch (error) {
      setFilePass(null);
      setUploadedFilePass(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFilePass(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitLetter = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    formData.append('tcc_id', tccId);
    formData.append('doc_title', 'application letter');
    formData.append('doc_name', fileLetter);
    formData.append('kgtin', kgtin);
    try {
      const res = await axios.post(`${url.BASE_URL}paye/tcc/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setFileLetter(null);
      setIsFetching(false)
      setUploadedFileLetter(true);
      toast.success("Upload Successful!")
    } catch (error) {
      setFileLetter(null);
      setUploadedFileLetter(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedFileLetter(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitAssForm = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    formData.append('tcc_id', tccId);
    formData.append('doc_title', 'assessment form');
    formData.append('doc_name', fileAssForm);
    formData.append('kgtin', kgtin);
    try {
      const res = await axios.post(`${url.BASE_URL}paye/tcc/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setFileAssForm(null);
      setIsFetching(false)
      setUploadedAssFrom(true);
      toast.success("Upload Successful!")
    } catch (error) {
      setFileAssForm(null);
      setUploadedAssFrom(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedAssFrom(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const onSubmitIntroLetter = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    formData.append('tcc_id', tccId);
    formData.append('doc_title', 'intro letter');
    formData.append('doc_name', fileIntroletter);
    formData.append('kgtin', kgtin);
    try {
      const res = await axios.post(`${url.BASE_URL}paye/tcc/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setFileIntroLetter(null);
      setIsFetching(false)
      setUploadedIntroLetter(true);
      toast.success("Upload Successful!")
    } catch (error) {
      setFileIntroLetter(null);
      setUploadedIntroLetter(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedIntroLetter(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
        toast.error("Failed to upload!");
      }
      console.log(error);
    }

  };

  const StaffID = async (e) => {
    e.preventDefault()
    setIsFetching(true)
    const formData = new FormData();
    formData.append('tcc_id', tccId);
    formData.append('doc_title', 'staff id');
    formData.append('doc_name', fileStaffID);
    formData.append('kgtin', kgtin);
    try {
      const res = await axios.post(`${url.BASE_URL}paye/tcc/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setFileStaffId(null);
      setIsFetching(false)
      setUploadedStaffId(true);
      toast.success("Upload Successful!")
    } catch (error) {
      setFileStaffId(null);
      setUploadedStaffId(false);
      setIsFetching(false)
      if (error.response) {
        setUploadedStaffId(false);
        setUploadErrors(() => error.response.data.message);
        toast.error(uploadErrors)
      } else {
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
      <h6 className="p-2 font-bold">Upload Documents for PAYE TCC</h6>
      <Widget>
        <small className="my-3">All files should not be more that 100kb</small>
        <hr className="mb-2" />
        <div>
          <form onSubmit={onSubmitformSign}>
            <div className="flex justify-between mb-5">

              <p>Scanned Signature <span className="text-red-600">*</span></p>
              <input
                type="file"
                className="hidden"
                id='sign'
                onChange={onChangeSign}
                onClick={(e) => (e.target.value = null)}
                required
              />

              <div className="flex justify-evenly">

                <p className="self-center">{fileSign ? fileSign.name : ""}</p>

                <label
                  htmlFor='sign'
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
          <form onSubmit={onSubmitformPass}>
            <div className="flex justify-between mb-5">
              <p>Passport Photograph <span className="text-red-600">*</span></p>
              <input
                type="file"
                className="hidden"
                id='pass'
                onChange={onChangePass}
                onClick={(e) => (e.target.value = null)}
                required
              />

              <div className="flex justify-evenly">

                <p className="self-center">{filePass ? filePass.name : ""}</p>

                <label
                  htmlFor='pass'
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


                {uploadedFilePass ? (
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

          <hr className="mb-2" />

          <form onSubmit={onSubmitLetter}>
            <div className="flex justify-between mb-5">
              <p>Application letter</p>
              <input
                type="file"
                className="hidden"
                id='letter'
                required
                onChange={onChangeLetter}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{fileLetter ? fileLetter.name : ""}</p>

                <label
                  htmlFor='letter'
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


                {uploadedFileLetter ? (
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

          <hr className="mb-2" />

          <form onSubmit={onSubmitAssForm}>
            <div className="flex justify-between mb-5">
              <p>Assessment Data Form </p>
              <input
                required
                type="file"
                className="hidden"
                id='assform'
                onChange={onChangeAssForm}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{fileAssForm ? fileAssForm.name : ""}</p>

                <label
                  htmlFor='assform'
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



                {uploadedAssForm ? (
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
          <hr className="mb-2" />

          <form onSubmit={onSubmitIntroLetter}>
            <div className="flex justify-between mb-5">
              <p>Letter of Introduction</p>
              <input
                required
                type="file"
                className="hidden"
                id='introletter'
                onChange={onChangeIntroLetter}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{fileIntroletter ? fileIntroletter.name : ""}</p>

                <label
                  htmlFor='introletter'
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

                {uploadedIntroLetter ? (
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
          <hr className="mb-2" />

          <form onSubmit={StaffID}>
            <div className="flex justify-between mb-5">
              <p>Staff ID</p>
              <input
                required
                type="file"
                className="hidden"
                id='staffid'
                onChange={onChangeStaffID}
                onClick={(e) => (e.target.value = null)}
              />

              <div className="flex justify-evenly">

                <p >{fileStaffID ? fileStaffID.name : ""}</p>

                <label
                  htmlFor='staffid'
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

                {uploadedStaffID ? (
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

