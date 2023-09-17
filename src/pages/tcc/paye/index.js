import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SectionTitle from '../../../components/section-title';
import setAuthToken from '../../../functions/setAuthToken';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import url from '../../../config/url';
import { formatNumber } from 'accounting';
import { useRouter } from 'next/router';
import { ProcessorSpinner } from '../../../components/spiner';



function Index() {
    const [kgtinErr, setKgtinErr] = useState("")
    const [isFetching, setIsFetching] = useState(() => false);
    const [taxpayerInfo, setTaxpayerinfo] = useState([]);
    const [payslipYear1, setPayslipYear1] = useState([]);
    const [payslipYear2, setPayslipYear2] = useState([]);
    const [payslipYear3, setPayslipYear3] = useState([]);
    const [form1Value, setForm1Value] = useState(null);
    const [form2Value, setForm2Value] = useState(null);
    const [form3Value, setForm3Value] = useState(null);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { dirtyFields }
    } = useForm(
        { mode: "onBlur", }
    )

    let yr1Gross = (Number(payslipYear1?.basic) + Number(payslipYear1?.housing) + Number(payslipYear1?.trans_allw) + Number(payslipYear1?.leave_allw) + Number(payslipYear1?.other_allw) + Number(payslipYear1?.benefits) + Number(payslipYear1?.utilities))
    let yr2Gross = (Number(payslipYear2.basic) + Number(payslipYear2.housing) + Number(payslipYear2.trans_allw) + Number(payslipYear2.leave_allw) + Number(payslipYear2.other_allw) + Number(payslipYear2.benefits) + Number(payslipYear2.utilities))
    let yr3Gross = (Number(payslipYear3.basic) + Number(payslipYear3.housing) + Number(payslipYear3.trans_allw) + Number(payslipYear3.leave_allw) + Number(payslipYear3.other_allw) + Number(payslipYear3.benefits) + Number(payslipYear3.utilities))


    console.log("payslipYear1", payslipYear1);

    const {
        register: registerkgtin,
        handleSubmit: handleSubmitkgtin,

    } = useForm(
        { mode: "onBlur", }
    )


    const watchYear1 = watch("assmtYr_1", "");
    const watchYear2 = watch("assmtYr_2", "");
    const watchYear3 = watch("assmtYr_3", "");

    console.log("watchYear1", watchYear1);

    setAuthToken();
    const CreateTcc = async (data) => {

        if (data.taxYr_1 == 0 && data.incYr_1 == 0) {
            alert("Please provide Tax and Income figures for Year one")
        }
        else {
            console.log("TCC DATA", data);
            setIsFetching(true)
            data.assmtYr_1 = (data.assmtYr_1).getFullYear()

            if (data.assmtYr_2 === undefined) {
                delete data.assmtYr_2

            } else {
                data.assmtYr_2 = (data.assmtYr_2).getFullYear()
            }

            if (data.assmtYr_3 === undefined) {
                delete data.assmtYr_3
            }
            else {
                data.assmtYr_3 = (data.assmtYr_3).getFullYear()
            }

            data.incYr_1 = (data.incYr_1).replace(/,/g, '')
            data.incYr_2 = (data.incYr_2).replace(/,/g, '')
            data.incYr_3 = (data.incYr_3).replace(/,/g, '')
            data.taxYr_1 = (data.taxYr_1).replace(/,/g, '')
            data.taxYr_2 = (data.taxYr_2).replace(/,/g, '')
            data.taxYr_3 = (data.taxYr_3).replace(/,/g, '')
            data.tp_id = taxpayerInfo.KGTIN
            data.employer = payslipYear1.org_id

            await axios.post(`${url.BASE_URL}paye/tcc`, data)
                .then(function (response) {
                    setIsFetching(false)
                    console.log("response", response);
                    router.push(`/tcc/paye/${response.data.body.id}_${response.data.body.tp_id}`)
                    toast.success("Created Successfully!")
                })
                .catch(function (error) {
                    setTaxpayerinfo("")
                    setIsFetching(false)
                    if (error.response) {
                        toast.error(error.response.data.message)
                    } else {

                    }
                })
        }

    };

    const verifiyKGTIN = (data) => {
        setIsFetching(true)
        axios.post(`${url.BASE_URL}taxpayer/view-taxpayers`, data)
            .then(function (response) {
                setIsFetching(false)
                setTaxpayerinfo(response.data.body)
                setKgtinErr("")
            })
            .catch(function (error) {
                setTaxpayerinfo("")
                setIsFetching(false)
                if (error.response) {
                    setKgtinErr(error.response.data.message)
                } else {

                }
            })
    };

    useEffect(() => {

        if (dirtyFields.assmtYr_1) {
            let kgtinYear = {
                year: String(watchYear1.getFullYear()),
                kgtin: taxpayerInfo.KGTIN
            }
            const fetchPostYear1 = async () => {

                if (form1Value === "DA") {
                    setIsFetching(true)
                    try {
                        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
                        res = res.data.body
                        console.log("res", res);
                        setIsFetching(false)
                        let assessment = res.assessment[0]
                        setPayslipYear1(assessment)


                    } catch (e) {
                        setIsFetching(false)
                        setPayslipYear1([])
                        if (e.response) {
                            toast.error(e.response.data.message)

                        } else {
                            toast.error("Failed!");
                        }
                    }

                }
                // else if (dirtyFields.assmtYr_1) {
                else if (form1Value === "PAYE") {

                    let year1 = watchYear1.getFullYear()
                    let kgtin = taxpayerInfo.KGTIN


                    setIsFetching(true)
                    axios.get(`${url.BASE_URL}paye/payslip?id=tcc&kgtin=${kgtin}&year=${year1}`)
                        .then(function (response) {
                            setIsFetching(false)
                            setPayslipYear1(response.data.body.payroll[0]);
                        })
                        .catch(function (error) {
                            setPayslipYear1([])
                            setIsFetching(false)
                            if (error.response) {
                                toast.error(error.response.data.message)
                            } else {
                                console.log(error);
                            }
                        })

                }

            };
            fetchPostYear1();
        }




    }, [watchYear1]);


    useEffect(() => {


        if (dirtyFields.assmtYr_2) {

            let kgtinYear = {
                year: String(watchYear2.getFullYear()),
                kgtin: taxpayerInfo.KGTIN
            }
            const fetchPostYear2 = async () => {

                if (form2Value === "DA") {
                    setIsFetching(true)
                    try {
                        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
                        res = res.data.body
                        setIsFetching(false)
                        let assessment = res.assessment[0]
                        setPayslipYear2(assessment)


                    } catch (e) {
                        setIsFetching(false)
                        setPayslipYear2([])
                        if (e.response) {
                            toast.error(e.response.data.message)

                        } else {
                            toast.error("Failed!");
                        }
                    }

                }
                else if (form2Value === "PAYE") {

                    let year = watchYear2.getFullYear()
                    let kgtin = taxpayerInfo.KGTIN


                    setIsFetching(true)
                    axios.get(`${url.BASE_URL}paye/payslip?id=tcc&kgtin=${kgtin}&year=${year}`)
                        .then(function (response) {
                            setIsFetching(false)
                            setPayslipYear2(response.data.body.payroll[0]);
                        })
                        .catch(function (error) {
                            setPayslipYear2([])
                            setIsFetching(false)
                            if (error.response) {
                                toast.error(error.response.data.message)
                            } else {
                                console.log(error);
                            }
                        })

                }

            };
            fetchPostYear2();
        }

    }, [watchYear2]);


    useEffect(() => {


        if (dirtyFields.assmtYr_3) {

            let kgtinYear = {
                year: String(watchYear3.getFullYear()),
                kgtin: taxpayerInfo.KGTIN
            }
            const fetchPostYear3 = async () => {

                if (form3Value === "DA") {
                    setIsFetching(true)
                    try {
                        let res = await axios.post(`${url.BASE_URL}forma/view-tax-income`, kgtinYear);
                        res = res.data.body
                        setIsFetching(false)
                        let assessment = res.assessment[0]
                        setPayslipYear3(assessment)


                    } catch (e) {
                        setIsFetching(false)
                        setPayslipYear3([])
                        if (e.response) {
                            toast.error(e.response.data.message)

                        } else {
                            toast.error("Failed!");
                        }
                    }

                }
                // else if (dirtyFields.assmtYr_1) {
                else if (form3Value === "PAYE") {

                    let year = watchYear3.getFullYear()
                    let kgtin = taxpayerInfo.KGTIN


                    setIsFetching(true)
                    axios.get(`${url.BASE_URL}paye/payslip?id=tcc&kgtin=${kgtin}&year=${year}`)
                        .then(function (response) {
                            setIsFetching(false)
                            setPayslipYear3(response.data.body.payroll[0]);
                        })
                        .catch(function (error) {
                            setPayslipYear3([])
                            setIsFetching(false)
                            if (error.response) {
                                toast.error(error.response.data.message)
                            } else {
                                console.log(error);
                            }
                        })

                }

            };
            fetchPostYear3();
        }

    }, [watchYear3]);



    return (

        <>
            <ToastContainer />
            {isFetching && (
                <ProcessorSpinner />
            )}
            <SectionTitle subtitle="Paye Tcc" />
            <div className="border mb-3 p-6 rounded-lg bg-white w-full">
                <p className="text-red-600">{kgtinErr}</p>
                <form onSubmit={handleSubmitkgtin(verifiyKGTIN)} className="mb-2 grid grid-cols-4 gap-2">
                    <label className="self-center">Enter Taxpayer KGTIN</label>

                    <div className="place-self-start">
                        <input type="text" name='KGTIN' className="form-control w-full rounded" ref={registerkgtin()} placeholder="Enter KGTIN" />
                    </div>

                    <div className="self-center block">
                        <button
                            type="submit"
                            style={{ backgroundColor: "#84abeb" }}
                            className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                        >
                            Verify KGTIN
                        </button>
                    </div>
                </form>

            </div>

            <form onSubmit={handleSubmit(CreateTcc)}>

                <div className="flex border mb-3 block p-3 rounded-lg bg-white w-full">
                    <div className="">

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label>Taxpayer:</label>

                            <div>

                                <input ref={register()} value={taxpayerInfo.tp_name} readOnly type="text" className="form-control w-full rounded"
                                />
                            </div>

                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label>KGTIN:</label>
                            <div>
                                <input ref={register()} value={taxpayerInfo.KGTIN} readOnly name="KGTIN" type="text" className="form-control w-full rounded" placeholder="KGTIN" />
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label>File no:</label>
                            <input ref={register()} required name="file_ref" type="text" className="form-control w-full rounded"
                            />

                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <label htmlFor="employername">Tax Office:</label>
                            <div>
                                <input ref={register()} value={taxpayerInfo.tax_office} name="tax_station" readOnly type="text" className="form-control w-full rounded"
                                />
                            </div>
                        </div>
                        <div className="mb-6 grid grid-cols-3 gap-4">
                            <label htmlFor="employername">Processing Fee:</label>
                            <input ref={register()} required placeholder="₦" name="prc_fee" type="text" className="form-control w-full rounded"
                            />
                        </div>
                    </div>
                </div>
                <div className={`flex justify-between border mb-3 rounded-lg bg-white w-full`}>

                    <div className="p-3">
                        <div className="flex justify-end mb-2">
                            <select className="form-control rounded"
                                value={form1Value}
                                onChange={(e) => setForm1Value(e.target.value)}
                            >
                                <option value="">Please Select</option>
                                <option value="DA">Direct Assessment</option>
                                <option value="PAYE">PAYE</option>
                            </select>
                        </div>
                        <h6 className="text-right mb-6">Year 1</h6>
                        <div className="mb-6 grid grid-cols-2 ">
                            <label>Assessment year </label>
                            <Controller
                                name="assmtYr_1"
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
                            <label>Gross Income</label>
                            <div>
                                <input readOnly name="incYr_1" value={formatNumber(Number(payslipYear1?.self_employed) + Number(payslipYear1?.employed) + Number(payslipYear1?.other_income) || yr1Gross)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Consolidated Relief </label>
                            <div>
                                <input readOnly name="" value={formatNumber(payslipYear1.consolidated_relief)} className="form-control w-full rounded" type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Taxable Income </label>
                            <div>
                                <input readOnly name="" value={formatNumber(Number(payslipYear1?.self_employed) + Number(payslipYear1?.employed) + Number(payslipYear1?.other_income)) || formatNumber(yr1Gross - (Number(payslipYear1.consolidated_relief) + Number(payslipYear1.other_relief)))} className="form-control w-full rounded" type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Tax Payable </label>
                            <div>
                                <input readOnly name="taxYr_1" value={formatNumber(payslipYear1.tax)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <label>Assessment Type </label>

                            <div>
                                <input readOnly value={payslipYear1?.assessment_type === "Assessment" ? "Direct Assessment" : "PAYE"} className="form-control w-full rounded" type="text"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="p-3 grid justify-items-stretch">
                        <div className="flex justify-end mb-2">
                            <select className="form-control rounded"
                                value={form2Value}
                                onChange={(e) => setForm2Value(e.target.value)}

                            >
                                <option value="">Please Select</option>
                                <option value="DA">Direct Assessment</option>
                                <option value="PAYE">PAYE</option>
                            </select>
                        </div>
                        <h6 className="text-center mb-6">Year 2</h6>
                        <div className="mb-6 justify-self-center">

                            <Controller
                                name="assmtYr_2"
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


                        <div className="mb-6 justify-self-center">

                            <div>
                                <input readOnly name="incYr_2" value={formatNumber(Number(payslipYear2?.self_employed) + Number(payslipYear2?.employed) + Number(payslipYear2?.other_income) || yr2Gross)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>

                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly value={formatNumber(payslipYear2.consolidated_relief)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly value={formatNumber(Number(payslipYear2?.self_employed) + Number(payslipYear2?.employed) + Number(payslipYear2?.other_income)) || formatNumber(yr2Gross - (Number(payslipYear2.consolidated_relief) + Number(payslipYear2.other_relief)))} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="taxYr_2" value={formatNumber(payslipYear2.tax)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>
                        <div className="mb-6 justify-self-center">

                            <div>
                                <input readOnly value={payslipYear2?.assessment_type === "Assessment" ? "Direct Assessment" : "PAYE"} className="form-control w-full rounded" type="text"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="p-3 grid justify-items-stretch">
                        <div className="flex justify-end mb-2">
                            <select className="form-control rounded"
                                value={form3Value}
                                onChange={(e) => setForm3Value(e.target.value)}
                            >
                                <option value="">Please Select</option>
                                <option value="DA">Direct Assessment</option>
                                <option value="PAYE">PAYE</option>
                            </select>
                        </div>
                        <h6 className="text-center mb-6">Year 3</h6>
                        <div className="mb-6 justify-self-center">

                            <Controller
                                name="assmtYr_3"
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

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="incYr_3" value={formatNumber(Number(payslipYear3?.self_employed) + Number(payslipYear3?.employed) + Number(payslipYear3?.other_income) || yr3Gross)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly value={formatNumber(payslipYear3.consolidated_relief)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly value={formatNumber(Number(payslipYear3?.self_employed) + Number(payslipYear3?.employed) + Number(payslipYear3?.other_income)) || formatNumber(yr3Gross - (Number(payslipYear3.consolidated_relief) + Number(payslipYear3.other_relief)))} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 justify-self-center">
                            <div>
                                <input readOnly name="taxYr_3" value={formatNumber(payslipYear3.tax)} className="form-control w-full rounded" ref={register()} type="text"
                                />
                            </div>
                        </div>

                        <div className="mb-6 grid justify-self-center">

                            <div>
                                <input readOnly value={payslipYear3?.assessment_type === "Assessment" ? "Direct Assessment" : "PAYE"} className="form-control w-full rounded" type="text"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        style={{ backgroundColor: "#84abeb" }}
                        className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </>
    )
}

export default Index