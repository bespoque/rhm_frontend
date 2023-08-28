import React, { useEffect, useState } from 'react';
import { ProcessorSpinner } from '../../../../components/spiner';
import { useRouter } from 'next/router';
import NewNotificationButton from './button';
import NewAckButton from '../acknowledge/button';

const Notification = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [notice, setNotDet] = useState({});
    const router = useRouter()
    const { Notifid, JobID } = router?.query

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch('https://bespoque.dev/rhm/taxaudit/taxaudit-notifications-single.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        "job_id": JobID,
                        "id": Notifid,
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
    }, [Notifid, JobID]);


    return (
        <>
            {isFetching && <ProcessorSpinner />}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                <h2 className="text-xl font-semibold">Notification Details</h2>
                <div className="flex justify-end gap-2 items-center mb-4">
                <p><a href={notice?.notification_file} rel="noreferrer" target="_blank" className="p-2 bg-green-400 text-white rounded">View letter</a></p>
                    <NewNotificationButton id={JobID} />
                    <NewAckButton Notifid={Notifid} JobID={JobID} />
                </div>
                <p className="">
                    <span className="font-semibold">Notification Date:</span>{' '}
                    {notice?.notification_date}
                </p>
                <p className="">
                    <span className="font-semibold">Notification Status:</span>{' '}
                    {notice?.notification_status}
                </p>
                <p className="">
                    <span className="font-semibold">Notification Delivery:</span>{' '}
                    {notice?.notification_delivery}
                </p>
                <p className="">
                    <span className="font-semibold">Notification Body:</span>{' '}
                    {notice?.notification_body}
                </p>
                
                <p className="">
                    <span className="font-semibold">Notification Note:</span>{' '}
                    {notice?.notification_note}
                </p>
                <p className="">
                    <span className="font-semibold">Done By:</span> {notice?.doneby}
                </p>
                <p className="">
                    <span className="font-semibold">Create Time:</span>{' '}
                    {notice?.createtime}
                </p>
            </div>
        </>
    );
};

export default Notification;
