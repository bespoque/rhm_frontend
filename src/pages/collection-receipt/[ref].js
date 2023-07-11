import React, { useRef } from 'react'
import { CoatOfArms, KgirsLogo, KogiGov, Signature } from '../../components/Images/Images'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from '../../config/url';
import setAuthToken from '../../functions/setAuthToken';
import { formatNumber } from "../../functions/numbers";
import Loader from "react-loader-spinner";
import QRCode from 'react-qr-code';
import ReactToPrint from "react-to-print";


export default function Index() {
    const [colData, setColData] = useState([]);
    const router = useRouter();
    const componentRef = useRef();
    useEffect(() => {
        if (router && router.query) {
            let paymentID = router.query.ref;
            let paymentPayload = {
                "idpymt": paymentID
            }
            setAuthToken();
            const fetchPost = async () => {
                try {
                    let res = await axios.post(`${url.BASE_URL}collection/view-collections`, paymentPayload);
                    res = res.data.body;
                    setColData(res)
                } catch (e) {
                    console.log(e);
                }
            };
            fetchPost();
        }
    }, [router]);

    return (
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
                                <p className="font-bold col-span-2">{el.taxpayerName}</p>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                <p>PAYER ID:</p>
                                <p className="font-bold col-span-2">{el.t_payer}</p>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                <p>ADDRESS:</p>
                                <p className="font-bold col-span-2">{el.taxpayerAddress}</p>
                            </div>
                            <div className="flex mt-10">
                                <div className='w-16 border-b-2'>
                                </div>
                                <p className='align-self-center'>Details</p>
                                <div className="border-b-2 w-3/4 ">
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
                            <p className="font-bold col-span-2">{el.tran_date}</p>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p>AMOUNT:</p>
                            <div className="col-span-4">
                                <p className="font-bold">NGN {formatNumber(el.amount)}</p>
                                {/* <small>Eighty thousand seven hundred and thirty two naira only</small> */}
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p>BEING:</p>
                            <div className="col-span-3">
                                <p className="font-bold"> {`Payment for (${el.rev_sub})`} </p>
                                <small>{el.revenueItem}</small>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p>PAID AT:</p>
                            <p className="font-bold"> {el.bank} </p>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p>AGENCY:</p>
                            <div className="col-span-3">
                                <p className="font-bold"> INTERNAL REVENUE SERVICE </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <p>TAX STATION:</p>
                            <p className="font-bold"> {el.station} </p>
                        </div>
                        <div className="border-b-2 mt-3 w-4/4 ">
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div></div>
                        <div className="mt-2">
                            <Signature />
                            <hr />
                            Authorized Signatory
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
