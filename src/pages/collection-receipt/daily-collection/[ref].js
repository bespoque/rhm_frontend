import React, { useRef } from 'react'
import { CoatOfArms, KgirsLogo, KogiGov, Signature } from '../../../components/Images/Images'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from '../../../config/url';
import setAuthToken from '../../../functions/setAuthToken';
import { formatNumber } from "../../../functions/numbers";
import Loader from "react-loader-spinner";
import QRCode from 'react-qr-code';
import ReactToPrint from "react-to-print";
import html2pdf from 'html2pdf.js';



export default function MultipleCollection() {
    const [colData, setColData] = useState([]);
    const [multipleSearchData, setmultipleSearchData] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const router = useRouter();
    const componentRef = useRef();
    const element = document.getElementById('pdf-content');
    const downloadButtonRef = useRef(null);

    useEffect(() => {
        if (router && router.query) {
            let searchDate = router.query.ref;
            let tranDate = {
                "tranDate": searchDate
            }
            setAuthToken();
            const fetchPost = async () => {
                setIsFetching(true)
                axios.post(`${url.BASE_URL}collection/view-collections`, tranDate)
                    .then(function (response) {
                        let search = response.data.body;
                        setIsFetching(false)
                        setmultipleSearchData(search)
                        console.log("search", search);
                    })
                    .catch(function (error) {
                        setIsFetching(false)
                        // if (error.response) {
                        //     setmultipleSearchErr(error.response.data.message)
                        // }

                    })
            };
            fetchPost();
        }
    }, [router]);

    const handleDownload = () => {
        const element = document.getElementById('pdf-content');

        const printWindow = window.open('', '_blank');
        const htmlContent = `
        <html>
          <head>
            <title>Collection receipt</title>
            <link rel="stylesheet" href="https://cdn.tailwindcss.com/2.2.19/tailwind.min.css">
            <style>
              ${getStyles()}
            </style>
          </head>
          <body class="bg-white">
            ${element.innerHTML}
          </body>
        </html>
      `;
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    };

    const getStyles = () => {
        const stylesheets = Array.from(document.styleSheets);
        const cssText = stylesheets
            .map((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText).join(''))
            .join('');

        return cssText;
    };

    return (
        <>
            {isFetching ? (
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
            ) :


                <div className='rounded-lg p-6 bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
                    <div className="flex justify-end mb-2">
                        <button onClick={handleDownload} className="btn w-32 bg-green-600 btn-default text-white
                    btn-outlined bg-transparent rounded-md">Download PDF</button>
                    </div>

                    <div id="pdf-content">
                        {multipleSearchData.map((el, i) => (
                            <div className="border p-4" style={{marginBottom: "24rem"}} key={el.idpymt}>
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
                                    {/* <div className="grid grid-cols-6 gap-2">
                                        <p>BEING:</p>
                                        <div className="col-span-3">
                                            <p className="font-bold"> {`Payment for (${el.rev_sub})`} </p>
                                            <small>{el.revenueItem}</small>
                                        </div>
                                    </div> */}
                                    <div className="grid grid-cols-6 gap-2">
                                        <p>Details:</p>
                                        <p className="font-bold"> {el.details} </p>
                                    </div>
                                    <div className="grid grid-cols-6 gap-2">
                                        <p>PAID AT:</p>
                                        <p className="font-bold"> {el.channel_id} </p>
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
                </div>
            }
        </>
    )
}
