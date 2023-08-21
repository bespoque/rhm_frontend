import React, { useRef } from 'react'
import { CoatOfArms, KgirsLogo, KogiGov, SignatureCol } from '../../components/Images/Images'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from '../../config/url';
import { formatNumber } from "../../functions/numbers";
import Loader from "react-loader-spinner";
import QRCode from 'react-qr-code';
import ReactToPrint from "react-to-print";
import setAuthToken from '../../functions/setAuthToken';
import { toWords } from 'number-to-words';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";

export default function Index() {
    const [colData, setColData] = useState([]);
    const router = useRouter();
    const componentRef = useRef();
    const [isFetching, setIsFetching] = useState(true);
    const urlNew = "https://bespoque.dev/quickpay-live/"

    const { auth } = useSelector(
        (state) => ({
          auth: state.authentication.auth,
        }),
        shallowEqual
      );

      const decoded = jwt.decode(auth);
      const staff = decoded.staffName

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formattedDateTime = new Date().toLocaleDateString(undefined, options);
    useEffect(() => {
        setAuthToken()
        if (router && router.query) {
            let paymentID = String(router.query.ref);
            let paymentPayload = {
                "idpymt": paymentID
            }
            const fetchPost = async () => {

                if (paymentID.includes("FA")) {
                    try {
                        let response = await fetch(`${urlNew}getpayment.php?paymentref=${paymentID}&by=assessment`, {
                            method: 'GET',
                        });

                        const data = await response.json()
                        setIsFetching(false)
                        let res = [data.body];
                        setColData(res)
                        console.log("res", res);
                    } catch (e) {
                        console.log(e);
                        setIsFetching(false)
                    }
                    // axios.get(`${urlNew}getpayment.php?paymentref=${paymentID}&by=assessment`)
                    //     .then(function (response) {
                    //         let res = response.data.body;
                    //         setColData(() => [response.data.body])
                    //         console.log("res", res);
                    //         setIsFetching(false)
                    //     })
                    //     .catch(function (error) {
                    //         setIsFetching(false)
                    //         console.log(error);
                    //     })
                }
                else {
                    try {
                        let res = await axios.post(`${url.BASE_URL}collection/view-collections`, paymentPayload);
                        res = res.data.body;
                        setIsFetching(false)
                        setColData(res)
                    } catch (e) {
                        console.log(e);
                        setIsFetching(false)
                    }
                }
            };
            // const fetchPost = async () => {
            //     try {
            //         let res = await axios.post(`${url.BASE_URL}collection/view-collections`, paymentPayload);
            //         res = res.data.body;
            //         setColData(res)
            //     } catch (e) {
            //         console.log(e);
            //     }
            // };
            fetchPost();
        }
    }, [router]);

    return (
        <>
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
                    <p>Fetching data...</p>
                </div>
            )}
            <div className='rounded-lg p-6 bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
                <div className="m-3 flex justify-end">
                    <div>
                        <ReactToPrint
                            pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
                            trigger={() => <button className="btn w-32 bg-green-600 btn-default text-white
                            btn-outlined bg-transparent rounded-md"
                                type="submit"
                            >
                                Print
                            </button>}
                            content={() => componentRef.current}
                        />
                    </div>

                </div>
                {colData.map((el, i) => (
                    <div className="border p-6" ref={componentRef}>
                        <p>KOGI STATE GOVERNMENT</p>
                        <section className="flex justify-between">
                            <p className="font-bold">REVENUE RECEIPT</p>
                            <p className="font-bold">{el.ref}</p>
                        </section>
                        <section className="flex justify-end mt-8">
                            <CoatOfArms />
                            <KogiGov />
                            <KgirsLogo />
                        </section>
                        <div className="flex justify-between">
                            <div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p>PAID BY:</p>
                                    <p className="col-span-2">{el?.taxpayerName || el?.taxPayerName}</p>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p>PAYER ID:</p>
                                    <p className="col-span-2">{el.t_payer}</p>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    <p>ADDRESS:</p>
                                    <p className="col-span-2">{el?.taxpayerAddress || el?.taxPayerAddress || "-"}</p>
                                </div>
                                <div className="flex mt-10">
                                    <div className='w-16 border-b-2'>
                                    </div>
                                    <p className="align-self-center">Details</p>
                                    <div className="border-b-2 w-3/4">
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 mr-6">
                                <QRCode
                                    value={`https://irs.kg.gov.ng/verify/verify_receipt.php?ref=${el.ref}`}
                                    size={120}
                                />
                            </div>

                        </div>
                        <div className="mt-3">
                            <div className="grid grid-cols-6 gap-2">
                                <p>PAYMENT DATE:</p>
                                <p className="col-span-2">{el.tran_date}</p>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                <p>AMOUNT:</p>
                                <div className="col-span-4">
                                    <p className="">NGN {formatNumber(el.amount)}</p>
                                    <p>({toWords(el.amount)} Naira only)</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                <p>Details:</p>
                                <div className="col-span-3">
                                    <p> {el?.details} </p>
                                    {/* <small>{el.revenueItem}</small> */}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                <p>PAID AT:</p>
                                {el?.channel_id === "Offline" ?
                                    <p> {`POS ${el?.channel_id}`} </p>
                                    :
                                    <p> {el?.bank || ""} ({el.channel_id}) </p>
                                }
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                <p>AGENCY:</p>
                                <div className="col-span-3">
                                    <p> INTERNAL REVENUE SERVICE </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                <p>TAX STATION:</p>
                                <p> {el.station || "-"} </p>
                            </div>
                            <div className="border-b-2 mt-3 w-4/4 ">
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div class="self-end"><small>{'<<'} Printed by {staff} on {formattedDateTime} {'>>'}</small></div>
                            <div className="mt-2">
                                <SignatureCol />
                                <hr />
                                Authorized Signatory
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

// export default function index() {
//     const [colData, setColData] = useState({});
//     const [isFetching, setIsFetching] = useState(false);
//     const router = useRouter();
//     const componentRef = useRef();

//     const urlNew = "https://bespoque.dev/quickpay-live/"

//     useEffect(() => {
//         if (router && router.query) {
//             let paymentID = String(router?.query?.ref) || "";
//             const fetchPost = () => {
//                 setIsFetching(true)
//                 if (paymentID.includes("FA")) {
//                     axios.get(`${urlNew}getpayment.php?paymentref=${paymentID}&by=assessment`)
//                         .then(function (response) {
//                             let res = response.data.body;
//                             setColData(() => response.data.body)
//                             console.log("res", res);
//                             setIsFetching(false)
//                         })
//                         .catch(function (error) {
//                             setIsFetching(false)
//                             console.log(error);
//                         })
//                 } else if (paymentID.includes("assId")) {
//                     paymentID = paymentID.replace(/^assId-/, "")
//                     axios.get(`${urlNew}getpayment.php?paymentref=${paymentID}&by=assessment`)
//                         .then(function (response) {
//                             let res = response.data.body;
//                             setColData(() => response.data.body)
//                             console.log("res", res);
//                             setIsFetching(false)
//                         })
//                         .catch(function (error) {
//                             setIsFetching(false)
//                             console.log(error);
//                         })
//                 }
//                 else {

//                     axios.get(`${urlNew}getpayment.php?paymentref=${paymentID}`)
//                         .then(function (response) {
//                             let res = response.data.body;
//                             setColData(() => response.data.body)
//                             console.log("res", res);
//                             setIsFetching(false)
//                         })
//                         .catch(function (error) {
//                             setIsFetching(false)
//                             console.log(error);
//                         })
//                 }
//             };
//             fetchPost();
//         }
//     }, [router]);

//     return (
//         <>
//             {isFetching && (
//                 <div className="flex justify-center item mb-2">
//                     <Loader
//                         visible={isFetching}
//                         type="BallTriangle"
//                         color="#00FA9A"
//                         height={19}
//                         width={19}
//                         timeout={0}
//                         className="ml-2"
//                     />
//                     <p>Fetching data...</p>
//                 </div>
//             )}

//             <div class="my-4">
//                 <div className="flex justify-center">
//                     <div>
//                         <div className="flex justify-between my-3">
//                             <button className="btn  bg-green-600 btn-default text-white
//                             btn-outlined bg-transparent rounded-md"
//                                 type="submit"
//                                 onClick={() => router.back()}
//                             >
//                                 Back
//                             </button>
//                             <div >
//                                 <ReactToPrint
//                                     pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
//                                     // pageStyle="@page { size: 7.5in 13in  }"
//                                     trigger={() => <button className="btn w-32 bg-green-600 btn-default text-white
//                                         btn-outlined bg-transparent rounded-md"
//                                         type="submit"
//                                     >
//                                         Print
//                                     </button>}
//                                     content={() => componentRef.current}
//                                 />
//                             </div>
//                         </div>
//                         <div className="border p-6" ref={componentRef}>
//                             <p className="font-bold text-center">{colData?.pendingpayment ? "Incomplete Payment" : ""}</p>
//                             <p>KOGI STATE GOVERNMENT</p>
//                             <section className="flex justify-between">
//                                 <p className="font-bold">REVENUE RECEIPT</p>
//                                 <p className="font-bold">{`Ref - ${colData?.assessment_id || ""}`}</p>
//                             </section>
//                             <section className="flex justify-end mt-8">
//                                 <CoatOfArms />
//                                 <KogiGov />
//                                 <KgirsLogo />
//                             </section>
//                             <div className="flex justify-between">
//                                 <div>
//                                     <div className="grid grid-cols-6 gap-2">
//                                         <p>PAID BY:</p>
//                                         <p className="font-bold col-span-2">{colData?.details || ""}</p>
//                                     </div>
//                                     <div className="grid grid-cols-6 gap-2">
//                                         <p>PAYER ID:</p>
//                                         <p className="font-bold col-span-2">
//                                             {colData?.t_payer || ""}
//                                         </p>
//                                     </div>
//                                     <div className="grid grid-cols-6 gap-2">
//                                         <p>ADDRESS:</p>
//                                         <p className="font-bold col-span-2">{colData?.taxpayerAddress || ""}</p>
//                                     </div>
//                                     <div className="flex mt-10">
//                                         <div className='w-16 border-b-2'>
//                                         </div>
//                                         <p className='align-self-center'>Details</p>
//                                         <div className="border-b-2 w-3/4 ">
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-6 mr-6">
//                                     <QRCode
//                                         value={`https://irs.kg.gov.ng/verify/verify_receipt.php?ref=${colData?.assessment_id || ""}`}
//                                         size={120}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-3">
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>PAYMENT DATE:</p>
//                                     <p className="font-bold col-span-2">{colData?.tran_date || ""}</p>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>TOTAL AMOUNT:</p>
//                                     <div className="col-span-4">
//                                         <p className="font-bold">NGN {formatNumber(colData?.amount || "")}</p>

//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>AMOUNT PAID:</p>
//                                     <div className="col-span-4">
//                                         <p className="font-bold">NGN {formatNumber(colData?.amountpaid || "")}</p>

//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>BALANCE:</p>
//                                     <div className="col-span-4">
//                                         <p className="font-bold">NGN {Number(colData?.amount) - Number(colData?.amountpaid)}</p>

//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>BEING:</p>
//                                     <div className="col-span-3">
//                                         <p className="font-bold"> {`Payment for ${colData?.revenueCode || ""}`} </p>
//                                         <small>
//                                             {colData?.revenueItem || ""}
//                                         </small>
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>DETAILS:</p>
//                                     <div className="col-span-3">
//                                         <p className="font-bold"> {colData?.description || ""} </p>
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>Payment Method:</p>
//                                     <p className="font-bold"> {colData?.pmt_meth || ""} </p>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>AGENCY:</p>
//                                     <div className="col-span-3">
//                                         <p className="font-bold"> INTERNAL REVENUE SERVICE </p>
//                                     </div>
//                                 </div>
//                                 <div className="grid grid-cols-6 gap-2">
//                                     <p>TAX STATION:</p>
//                                     <p className="font-bold"> {colData?.station || ""} </p>
//                                 </div>
//                                 <div className="border-b-2 mt-3 w-4/4 ">
//                                 </div>
//                             </div>

//                             <div className="flex justify-between">
//                                 <div></div>
//                                 <div className="mt-2">
//                                     <SignatureCol />
//                                     <hr />
//                                     Authorized Signatory
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }
