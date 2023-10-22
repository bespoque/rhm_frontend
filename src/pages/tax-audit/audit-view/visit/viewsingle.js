import React, { useEffect, useState } from 'react';
import { ProcessorSpinner } from '../../../../components/spiner';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleVisit = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [notice, setNotDet] = useState({});
    const router = useRouter()
    const { VisitId, JobID } = router?.query



    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('https://test.rhm.backend.bespoque.ng/taxaudit/taxaudit-notification-auditlog-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        "visit_id": VisitId,
                    })
                })
                const dataFetch = await res.json()
                setNotDet(dataFetch.body[0])
                setIsFetching(false)
            } catch (error) {
                console.error('Server Error:', error)
            } finally {
                setIsFetching(false)
            }
        }
        fetchPost();
    }, [VisitId, JobID]);


    return (
        <>
            <ToastContainer />
            

            {isFetching && <ProcessorSpinner />}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Visit details</h2>
                    <div className="flex">
                        <button onClick={() => router.back()} className="p-2 bg-gray-400 text-white w-20 rounded mr-3">Back</button>
                    </div>

                </div>
                <p className="">
                    <span className="font-semibold">Personel Met:</span>{' '}
                    {notice?.personnelmet}
                </p>
                <p className="">
                    <span className="font-semibold">Designation:</span>{' '}
                    {notice?.designation}
                </p>
                <p className="">
                    <span className="font-semibold">Notification Delivery:</span>{' '}
                    {notice?.notification_delivery}
                </p>
                <p className="">
                    <span className="font-semibold">Done By:</span> {notice?.doneby}
                </p>
                <p className="">
                    <span className="font-semibold">Create Time:</span>{' '}
                    {notice?.createtime}
                </p>
                <p className="">
                    <span className="font-semibold">Note:</span>{' '}
                    {notice?.note}
                </p>
            </div>
        </>
    );
};

export default SingleVisit;
