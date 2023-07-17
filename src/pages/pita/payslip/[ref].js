import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Widget from '../../../components/widget';
import setAuthToken from '../../../functions/setAuthToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import url from "../../../config/url";
import Loader from 'react-loader-spinner';
import { FiCheck } from 'react-icons/fi';

export default function UploadPayslip() {
    const [payrollId, setPayrollId] = useState("")
    const [payrollYear, setPaySlipYear] = useState("")
    const [filePayslip, setFilePayslip] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(false);
    const [uploadErrors, setUploadErrors] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => false);
    const router = useRouter();
    useEffect(() => {
        if (router && router.query) {
            let routerData = String(router.query.ref);
            let payRID = routerData.split('_').pop();
            let year = routerData.split('_').shift()
            setPayrollId(payRID)
            setPaySlipYear(year)
            console.log("payRID", payRID);
            console.log("year", year);
        }
    }, [router]);

    const onChangePayslip = e => {
        const file = e.target.files[0]
        if (file) {
            if (!file) {
                setFilePayslip(null);
                return;
            }
            if (file.type !== "image/jpeg" && file.type !== "application/pdf" && file.type !== "image/png") {
                alert("file type not allowed. only pdf, png and jpeg are allowed");
                setFilePayslip(null);
                return;
            }
            if (file.size > 1024 * 100) {
                alert("file too large..file size should not exceed 100kb");
                return
            }
            else {
                setFilePayslip(file);
            }
        }
    };

    setAuthToken()
    const onSubmitPayslip = async (e) => {
        e.preventDefault()
        setIsFetching(true)
        const formData = new FormData();
        formData.append('payroll_id', payrollId);
        formData.append('doc_title', 'payslip');
        formData.append('doc_name', filePayslip);
        try {
            const res = await axios.post(`${url.BASE_URL}paye/payslip/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            setFilePayslip(null);
            setIsFetching(false)
            setUploadedFile(true);
            toast.success("Upload Successful!")
        } catch (error) {
            setFilePayslip(null);
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
    return (
        <div>
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
            <p>Upload Payslip</p>
            <Widget>
                <small className="my-3 flex justify-center">file should not be more that 100kb</small>
                <hr className="mb-2" />
                <form onSubmit={onSubmitPayslip}>
                    <div className="flex justify-between mb-5">

                        <p>Upload Payslip for {payrollYear}</p>
                        <input
                            type="file"
                            className="hidden"
                            id='payslip'
                            onChange={onChangePayslip}
                            onClick={(e) => (e.target.value = null)}
                            required
                        />

                        <div className="flex justify-evenly">

                            <p className="self-center">{filePayslip ? filePayslip.name : ""}</p>

                            <label
                                htmlFor='payslip'
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
                                Upload
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
                <div className="flex justify-center">
                    <button
                        className="disabled:opacity-50 bg-white-500 py-2 px-6 rounded-md  text-dark border hover:text-white hover:bg-green-500 hover:border-green-500"
                        type="submit"
                    >
                        <Link legacyBehavior href={`/pita/payslip`}>Done</Link>
                    </button>
                </div>
            </Widget>
        </div>
    )
}
