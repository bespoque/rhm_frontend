import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { KgirsLogo } from '../../../components/Icons';
import { CoatOfArms, KogiGov, Signature } from '../../../components/Images/Images';
import setAuthToken from '../../../functions/setAuthToken';
import axios from "axios";
import url from '../../../config/url';
import { formatNumber } from '../../../functions/numbers';

export default function VerifyTcc() {
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

                await axios.post(`${url.BASE_URL}collection/view-collections`, paymentPayload)
                    .then(function (res) {
                        res = res.data.body;
                        setColData(res)

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            };
            fetchPost();
        }
    }, [router]);
    return (
        <>
            <div class="p-6">
                {colData.map((el, i) => (
                    <div class="border p-6">
                        <p>KOGI STATE GOVERNMENT</p>
                        <section class="flex justify-between">
                            <p class="font-bold">REVENUE RECEIPT</p>
                            <p class="font-bold">{el.ref}</p>
                        </section>
                        <section class="flex justify-end mt-8">
                            <CoatOfArms />
                            <KogiGov />
                            <KgirsLogo />
                        </section>
                        <div class="flex justify-between">
                            <div>
                                <div class="grid grid-cols-6 gap-2">
                                    <p>PAID BY:</p>
                                    <p class="font-bold col-span-2">{el.taxpayerName}</p>
                                </div>
                                <div class="grid grid-cols-6 gap-2">
                                    <p>PAYER ID:</p>
                                    <p class="font-bold col-span-2">{el.t_payer}</p>
                                </div>
                                <div class="grid grid-cols-6 gap-2">
                                    <p>ADDRESS:</p>
                                    <p class="font-bold col-span-2">{el.taxpayerAddress}</p>
                                </div>
                                <div class="flex mt-10">
                                    <div class='w-16 border-b-2'>
                                    </div>
                                    <p class='align-self-center'>Details</p>
                                    <div class="border-b-2 w-3/4 ">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 mr-6">
                                QR Code
                            </div>

                        </div>
                        <div class="mt-3">
                            <div class="grid grid-cols-6 gap-2">
                                <p>PAYMENT DATE:</p>
                                <p class="font-bold col-span-2">{el.tran_date}</p>
                            </div>
                            <div class="grid grid-cols-6 gap-2">
                                <p>AMOUNT:</p>
                                <div class="col-span-4">
                                    <p class="font-bold">NGN {formatNumber(el.amount)}</p>

                                </div>
                            </div>
                            <div class="grid grid-cols-6 gap-2">
                                <p>BEING:</p>
                                <div class="col-span-3">
                                    <p class="font-bold"> {`Payment for (${el.rev_sub})`} </p>
                                </div>
                            </div>
                            <div class="grid grid-cols-6 gap-2">
                                <p>PAID AT:</p>
                                <p class="font-bold"> {el.bank} </p>
                            </div>
                            <div class="grid grid-cols-6 gap-2">
                                <p>AGENCY:</p>
                                <div class="col-span-3">
                                    <p class="font-bold"> INTERNAL REVENUE SERVICE </p>
                                </div>
                            </div>
                            <div class="grid grid-cols-6 gap-2">
                                <p>TAX STATION:</p>
                                <p class="font-bold"> {el.station} </p>
                            </div>
                            <div class="border-b-2 mt-3 w-4/4 ">
                            </div>
                        </div>

                        <div class="flex justify-between">
                            <div></div>
                            <div class="mt-2">
                                <Signature />
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
