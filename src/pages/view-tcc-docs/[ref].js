import url from '../../config/url';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import Loader from 'react-loader-spinner';
import SectionTitle from '../../components/section-title';
import Link from 'next/link';

const ViewDocumentsTcc = () => {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(() => true);
    const [uploads, setUploads] = useState([])
    const [idTcc, setIdTcc] = useState('')

    const uploadBase = 'https://annualuploads.bespoque.dev/rhm-live/uploads/da/tcc/'
    const appletter = uploads.filter(data => data.item === "application_letter");
    const docLet = appletter.map(item => item.doc)

    const paySlip = uploads.filter(data => data.item === "payslip");
    const docPay = paySlip.map(item => item.doc)

    const passPort = uploads.filter(data => data.item === "passport");
    const docPass = passPort.map(item => item.doc)

    const idCard = uploads.filter(data => data.item === "idcard");
    const docId = idCard.map(item => item.doc)

    const incomeForm = uploads.filter(data => data.item === "income_form");
    const docIncomeForm = incomeForm.map(item => item.doc)

    const introLetter = uploads.filter(data => data.item === "intro_letter");
    const docIntroLett = introLetter.map(item => item.doc)

    const sign = uploads.filter(data => data.item === "sign");
    const docSign = sign.map(item => item.doc)


    useEffect(() => {
        if (router && router.query) {
            let tCCId = router.query.ref;
            setIdTcc(tCCId)
            let userId = {
                id: `${tCCId}`
            }
            setAuthToken()
            const fetchPost = async () => {
                try {
                    let res = await axios.post(`${url.BASE_URL}forma/view-tcc`, userId);
                    let tccData = res.data.body.tccUploads
                    setUploads(tccData)
                    setIsFetching(false)
                } catch (err) {
                    setIsFetching(false)
                    console.log(err);
                }
            };
            fetchPost();
        }
    }, [router]);
    return (

        <>
            <button className="btn bg-green-600 btn-default text-white
            btn-outlined bg-transparent rounded-md"
                type="submit"
            >
                <Link legacyBehavior href={`/view/listtcc/${idTcc}`}>Back</Link>
            </button>
            <SectionTitle title="View TCC Uploads" subtitle="TCC Documents " />

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
                    <p>Fetching data...</p>
                </div>
            )
                :

                <div>

                    <div className="grid justify-items-start">

                        <div className="font-semibold">
                            Application letter
                        </div>

                        <div className="flex">
                            {docLet.map((element, i) => (
                                <div key={i} className="p-2">
                                    <a href={`${uploadBase}${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                                </div>
                            ))}
                        </div>

                    </div>
                    <hr />
                    <div className="grid justify-items-start">

                        <div className="font-semibold">
                            Passport
                        </div>

                        <div className="flex">
                            {docPass.map((element, i) => (
                                <div key={i} className="p-2">
                                    <a href={`${uploadBase}${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                                </div>
                            ))}
                        </div>

                    </div>
                    <hr />
                    <div className="grid justify-items-start">

                        <div className="font-semibold">
                            Income Form
                        </div>

                        <div className="flex">
                            {docIncomeForm.map((element, i) => (
                                <div key={i} className="p-2">
                                    <a href={`${uploadBase}${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                                </div>
                            ))}
                        </div>

                    </div>
                    <hr />
                    <div className="grid justify-items-start">

                        <div className="font-semibold">
                            Signature
                        </div>

                        <div className="flex">
                            {docSign.map((element, i) => (
                                <div key={i} className="p-2">
                                    <a href={`${uploadBase}${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            }
        </>

    )
};

export default ViewDocumentsTcc;
