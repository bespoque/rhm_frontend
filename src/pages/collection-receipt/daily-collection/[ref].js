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
import html2pdf from 'html2pdf.js';



export default function MultipleCollection() {
    const [multipleSearchData, setmultipleSearchData] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const totalRecords = multipleSearchData.length;
    const recordsStart = (currentPage - 1) * recordsPerPage + 1;
    const recordsEnd = Math.min(currentPage * recordsPerPage, totalRecords);
    const recordsRemaining = totalRecords - recordsEnd;
    


    const router = useRouter();
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
                        console.log("Error", error);
                        // if (error.response) {
                        //     setmultipleSearchErr(error.response.data.message)
                        // }

                    })
            };
            fetchPost();
        }
    }, [router]);

    const handleDownload = async () => {
        const currentRecords = multipleSearchData.slice(
            (currentPage - 1) * recordsPerPage,
            currentPage * recordsPerPage
        );

        const pdfContent = generatePDFContent(currentRecords);

        const options = {
            margin: 10,
            filename: `collection_receipt${currentPage}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a5', orientation: 'landscape' },
        };

        const element = document.createElement('div');
        element.innerHTML = pdfContent;

        await html2pdf().set(options).from(element).save();

        if (currentPage < Math.ceil(multipleSearchData.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const generatePDFContent = (records) => {
        return `
          <div>
            ${records.map((el) => (
            `
              <div class="border p-4 mb-14" key=${el.idpymt}>
              <p>KOGI STATE GOVERNMENT</p>
              <section class="flex justify-between">
                  <p class="font-bold">REVENUE RECEIPT</p>
                  <p class="font-bold">${el.ref}</p>
              </section>
              <section class="flex justify-end mt-3">
              <img src="/images/icons/coat of arms.png" width='60' height='25'  />
              <img src="/images/kog_govt.png" width='73' height='30'  />
              <img src="/images/logo2.png" width='50' height='50'  />
                  <KgirsLogo />
              </section>
              <div class="flex justify-between">
                  <div>
                      <div class="grid grid-cols-6 gap-2">
                          <p>PAID BY:</p>
                          <p class="font-bold col-span-2">${el.taxpayerName}</p>
                      </div>
                      <div class="grid grid-cols-6 gap-2">
                          <p>PAYER ID:</p>
                          <p class="font-bold col-span-2">${el.t_payer}</p>
                      </div>
                      <div class="grid grid-cols-6 gap-2">
                          <p>ADDRESS:</p>
                          <p class="font-bold col-span-2">${el.taxpayerAddress}</p>
                      </div>
                      <div class="flex ">
                          <div class='w-16 border-b-2'>
                          </div>
                          <p class='align-self-center'>Details</p>
                          <div class="border-b-2 w-3/4 ">
                          </div>
                      </div>
                  </div>
             
              </div>
              <div class="">
                  <div class="grid grid-cols-6 gap-2">
                      <p>PAYMENT DATE:</p>
                      <p class="font-bold col-span-2">${el.tran_date}</p>
                  </div>
                  <div class="grid grid-cols-6 gap-2">
                      <p>AMOUNT:</p>
                      <div class="col-span-4">
                          <p class="font-bold">NGN ${formatNumber(el.amount)}</p>
                      </div>
                  </div>
             
                  <div class="grid grid-cols-7 gap-2">
                      <p>Details:</p>
                      <p class="font-bold col-span-5 pl-4"> ${el.details.substring(0, 40)} </p>
                  </div>
                  <div class="grid grid-cols-6 gap-2">
                      <p>PAID AT:</p>
                      <p class="font-bold"> ${el.channel_id} </p>
                  </div>
                  <div class="grid grid-cols-6 gap-2">
                      <p>AGENCY:</p>
                      <div class="col-span-3">
                          <p class="font-bold"> INTERNAL REVENUE SERVICE </p>
                      </div>
                  </div>
                  <div class="grid grid-cols-6 gap-2">
                      <p>TAX STATION:</p>
                      <p class="font-bold"> ${el.station} </p>
                  </div>
                  <div class="border-b-2 mt-3 w-4/4 ">
                  </div>
              </div>

              <div class="flex justify-between">
                  <div></div>
                  <div class="mt-2">
                  <img src="/images/signature.png" width='100' height='30'  />
                      <hr />
                      Authorized Signatory
                  </div>
              </div>
          </div>
              
              `
        )).join('')}
          </div>
        `;
    };


    // const getStyles = () => {
    //     const stylesheets = Array.from(document.styleSheets);
    //     const cssText = stylesheets
    //         .map((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText).join(''))
    //         .join('');

    //     return cssText;
    // };

    // return (
    //     <div>
    //       <h1>API Response:</h1>
    //       <div id="pdf-content">
    //         {multipleSearchData 
    //           .slice(0, currentPage * recordsPerPage)
    //           .map((record) => (
    //             <div key={record.idpymt}>
    //               <h2 className="text-xl font-bold">Record ID: {record.idpymt}</h2>
    //               <p>Bank: {record.bank}</p>
    //               <p>Assessment ID: {record.assessment_id}</p>
    //               <p>Channel ID: {record.channel_id}</p>
    //               {/* Render other fields as needed */}
    //               <hr className="my-4" />
    //             </div>
    //           ))}
    //       </div>
    //       <button onClick={handleDownload}>Download PDF</button>
    //     </div>
    //   );

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
                <div>
                    <div className="flex justify-end mb-2">
                        <button onClick={handleDownload} className="btn w-32 bg-green-600 btn-default text-white
                    btn-outlined bg-transparent rounded-md">Download PDF</button>
                    </div>

                    <div id="pdf-content">
                        <p class="text-gray-800">Downloaded Records: {recordsStart} - {recordsEnd}</p>
                        <p class="text-gray-800">Records Remaining: {recordsRemaining}</p>
                    </div>
                </div>
            }
            {/* {isFetching ? (
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
                        {multipleSearchData.slice(0, currentPage * recordsPerPage).map((el) => (
                            <div className="border p-4 mb-3" key={el.idpymt}>
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
                                        </div>
                                    </div>
                               
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
            } */}
        </>
    )
}
