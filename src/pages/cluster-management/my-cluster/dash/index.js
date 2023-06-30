import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { formatNumber } from 'accounting';
import { ProcessorSpinner } from '../../../../components/spiner/index';
import { shallowEqual, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";


const Index = () => {
    const [isFetching, setIsFetching] = useState(() => true);
    const [TotalAssAmt, setTotalAssAmt] = useState(() => "");
    const [TotalReg, setTotalReg] = useState(() => "");
    const [clustRec, setClustRec] = useState(() => []);
    const [targRec, setTargRec] = useState(() => []);
    const [showAssmt, setShowAssmt] = useState(false);
    const [showReg, setShowReg] = useState(false);
    const [assReport, setAssReport] = useState(() => [])
    const router = useRouter()
    const { targetID, clusterID, targN, targType } = router?.query

    const { auth } = useSelector(
        (state) => ({
            auth: state.authentication.auth,
        }),
        shallowEqual
    );

    const decoded = jwt.decode(auth);
    const emailAdd = decoded.user

    useEffect(() => {

        async function fetchPost() {

            try {
                const res = await fetch('https://bespoque.dev/rhm/cluster/cluster-details.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "id": clusterID,
                    })
                })
                const result = await fetch('https://bespoque.dev/rhm/cluster/target-details.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "target_id": targetID,
                    })
                })
                const targRecFetch = await result.json()
                const clustRecFetch = await res.json()
                setTargRec(targRecFetch.body[0])
                setClustRec(clustRecFetch.body[0])
                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [router]);

    const AssessmentRep = async () => {
        setIsFetching(true)
        try {
            const res = await fetch('https://bespoque.dev/rhm/cluster/target-revenueofficer-assessment.php', {
                method: 'POST',
                body: JSON.stringify({
                    "target_id": targetID,
                    "user_id": emailAdd
                })
            })
            const assReportFetch = await res.json()
            setTotalAssAmt(assReportFetch.totalAmount)
            setAssReport(assReportFetch.body)
            setIsFetching(false)
            setShowAssmt(true)
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsFetching(false)
        }
    }
    const RegRep = async () => {
        setIsFetching(true)
        try {
            const res = await fetch('https://bespoque.dev/rhm/cluster/target-revenueofficer-registration.php', {
                method: 'POST',
                body: JSON.stringify({
                    "target_id": targetID,
                    "user_id": emailAdd
                })
            })
            const regReportFetch = await res.json()
            setTotalReg(regReportFetch.totalRec)
            setIsFetching(false)
            setShowReg(true)
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsFetching(false)
        }
    }



    return (
        <>
            {isFetching && <ProcessorSpinner />}
            {/* <SectionTitle subtitle={reportHeader} /> */}
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                <div className="w-full flex items-center lg:w-1/2 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">

                    <article className="p-6">

                        <p className="font-bold"><span className="text-base">Target</span> : <span>{targN}</span></p>
                        <p className="font-bold"><span className="text-base">Target Goal</span> : <span>{formatNumber(targRec?.target_goal)}</span></p>
                        <p className="font-bold"><span className="text-base">Start</span> : <span>{targRec?.target_startdate}</span></p>
                        <p className="font-bold"> <span className="text-base">Deadline</span>: <span>{targRec?.target_deadline}</span></p>
                        <p className="font-bold"><span className="text-base">Cluster</span> : <span>{clustRec?.cluster_name}</span></p>
                        <p className="font-bold"><span className="text-base">Cluster Head</span> : <span>{clustRec?.cluster_head}</span></p>
                    </article>

                </div>
                <div className="w-full lg:w-1/2 w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    {targType === "Assessment" ?
                        <div className="grid grid-cols-2 gap-4 content-between">
                            <button className="bg-pink-600 p-4 text-white rounded-xl shadow-md" onClick={AssessmentRep}>Assessment</button>
                            <button className="bg-purple-600 p-4 text-white rounded-xl shadow-md"> Over view</button>
                        </div> :
                        <div>
                            {targType === "Taxpayers" ?
                                <div className="grid grid-cols-2 gap-4 content-between">
                                    <button className="bg-blue-600 p-4 text-white rounded-xl shadow-md" onClick={RegRep}>Registration </button>
                                    <button className="bg-purple-600 p-4 text-white rounded-xl shadow-md"> Over view</button>
                                </div> :
                                <div>
                                    {targType === "Collection" ?
                                        <div className="grid grid-cols-2 gap-4 content-between">
                                            <button className="bg-yellow-600 p-4 text-white rounded-xl shadow-md">Collection </button>
                                            <button className="bg-purple-600 p-4 text-white rounded-xl shadow-md"> Over view</button>
                                        </div> : ""
                                    }
                                </div>
                            }

                        </div>
                    }

                </div>
            </div>

            {
                showAssmt && (
                    <div className="w-full lg:w-2/2 w-full max-w-md mx-auto bg-white rounded-xl  overflow-hidden md:max-w-2xl p-4">
                        <p className="my-3 text-center">Assessment Performance</p>
                        <div className="grid grid-cols-3 gap-4 content-between">
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Total Number of Assessment: {formatNumber(assReport?.length)}</button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Total Assessment Amount: {formatNumber(TotalAssAmt)} </button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Percentage Performance: {`${((Number(TotalAssAmt) / Number(targRec?.target_goal)) * 100).toFixed(2)} %`}</button>
                        </div>
                    </div>
                )

            }

            {
                showReg && (
                    <div className="w-full lg:w-2/2 w-full max-w-md mx-auto bg-white rounded-xl  overflow-hidden md:max-w-2xl p-4">
                        <p className="my-3 text-center">Taxpayer Registration Performance</p>
                        <div className="grid grid-cols-2 gap-4 content-between">
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Total Number of Registration: {formatNumber(TotalReg)}</button>
                            <button className="bg-white p-4 text-dark rounded-xl shadow-md font-bold">Percentage Performance: {`${((Number(TotalReg) / Number(targRec?.target_goal)) * 100).toFixed(2)} %`}</button>
                        </div>
                    </div>
                )

            }

        </>
    )
}
export default Index